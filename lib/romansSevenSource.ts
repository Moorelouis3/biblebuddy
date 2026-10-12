export type RomansSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansSevenRawNotes(rawText: string): RomansSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 7:${startVerse}` : `Romans 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 7 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_SEVEN_RAW_NOTES = `# Romans 7:1-6
# ⚰️ Dead To The Law, Free To Serve
---
## 👑 The Law Hath Dominion Over A Man

Dominion means total ruling authority, the kind a king holds over a kingdom.

Paul says the law holds this kind of power over a person.

That power only lasts while the person is alive.

Death is the one thing that actually breaks the law's hold.

A law can only rule the living, never the dead.

👑 Dominion means total ruling authority

⏳ The law only rules while someone lives

💀 Death breaks the law's hold

📖 A law cannot rule the dead

## 💍 The Woman Which Hath An Husband Is Bound

Paul gives a real world example to make the idea concrete.

A married woman is bound by law to her husband.

That bond holds only as long as he is alive.

If he dies, the law no longer binds her to him.

She is free to marry another man without committing adultery.

The law's claim always depends on someone staying alive.

💍 Marriage bound her to her husband

⏳ The bond held only while he lived

💀 His death ended the law's claim

📖 Death, not choice, breaks the law's grip

## ⚰️ Ye Also Are Become Dead To The Law

Paul now applies that marriage picture to believers.

Believers have died to the law, just like that widow.

This death happened through the body of Christ.

Believers are now free to be joined to someone new.

That new union is with Christ, who was raised from the dead.

The purpose of the new union is to bear fruit unto God.

⚰️ Believers died to the law too

✝️ This death happened through Christ's body

🤝 Believers are now joined to the risen Christ

📖 The new union exists to bear fruit

## 🔥 The Motions Of Sins, Which Were By The Law

"Motions of sins" means the sinful desires and impulses inside a person.

Paul calls this life "in the flesh," the old life before Christ.

Back then, those sinful impulses were active and in control.

They did not lead anywhere good.

Paul says plainly where they led, to death.

🔥 Motions of sins means sinful impulses

👤 In the flesh means life before Christ

🎯 Those impulses were active and in control

📖 That old life led only to death

## 🌱 Newness Of Spirit, And Not In The Oldness Of The Letter

Paul now contrasts two very different ways of obeying God.

The oldness of the letter means obeying rules from the outside only.

The newness of spirit means a changed heart that wants to obey.

Believers are no longer bound to the first way.

The law did not change, but the way of serving it did.

📜 Oldness of the letter means outward rule keeping

🌱 Newness of spirit means a changed heart

🔓 Believers are freed from the first way

📖 How someone serves God changed, not the law

# Romans 7:7-13
# ⚖️ The Law Exposes Sin
---
## ❓ Is The Law Sin? God Forbid

Paul asks a question only to reject it immediately.

Someone might wrongly read his last point as an attack on the law itself.

God forbid means absolutely not, Paul's strongest possible rejection.

The real problem has always been sin, not the law.

The law was never the villain in this story.

❓ Paul asks only to reject the idea

🚫 God forbid means absolutely not

😈 Sin, not the law, is the real problem

📖 The law was never the villain

## 🎯 Thou Shalt Not Covet

"Covet" means wanting something that belongs to someone else.

Paul says he would not have recognized this desire as sin without the command naming it.

The law acts like a mirror here, showing what was already there.

It did not create the desire.

It revealed it for what it actually was.

🎯 Covet means wanting what belongs to another

🪞 The law acts like a mirror

👁️ It did not create the desire

📖 It revealed sin for what it was

## 🔑 Wrought In Me All Manner Of Concupiscence

"Concupiscence" is an old word for strong, sinful desire.

Sin used the commandment as an opening, not as its cause.

Think of a locked door that someone only wants to open once told not to.

Before that command existed, sin had no clear target to aim at.

🔑 Concupiscence means strong sinful desire

🚪 Sin used the command as an opening

🔒 Think of a door nobody wanted open

📖 The command became sin's target, not its cause

## 😴 When The Commandment Came, Sin Revived, And I Died

Paul describes sin as being "dead," meaning unnoticed, not absent.

Before he fully grasped the command, sin was quiet and unrecognized.

Once the command arrived, sin became active and obvious.

Paul's own sense of being right with God "died" in that moment.

😴 Dead here means unnoticed, not absent

⚡ The command woke sin up

👁️ Sin became active once it was named

📖 Paul's sense of being right with God died

## 🐍 Sin, Taking Occasion By The Commandment, Deceived Me

The commandment was meant to point toward life.

Sin twisted that good purpose into something deadly.

Sin used deception to pull this off, not honesty.

It used the very commandment meant for life to bring death instead.

✅ The commandment was meant for life

🐍 Sin twisted that good purpose

🎭 Sin worked by deception, not honesty

📖 The life giving command became the trap

## ✅ The Law Is Holy, And The Commandment Holy, And Just, And Good

Paul defends the law clearly after describing all this damage.

The law itself is holy, just, and good.

Sin is the one that used something good for evil.

The law's purpose here was to show sin for how bad it really is.

Nothing about this makes the law the villain.

✅ The law is holy, just, and good

⚖️ Sin misused something good

🔬 The law exposed sin's true nature

📖 Sin deserves the blame, not the law

# Romans 7:14-17
# 🔗 Sold Under Sin
---
## 👤 I Am Carnal, Sold Under Sin

"Carnal" means ruled by the flesh instead of the Spirit.

"Sold under sin" pictures a person sold into slavery.

Paul says the law itself is spiritual and good.

The real problem is the condition of the person under it.

👤 Carnal means ruled by the flesh

⛓️ Sold under sin means enslaved to it

📜 The law itself is spiritual and good

📖 The problem is the person, not the law

## 🔄 What I Would, That Do I Not

Paul describes a conflict almost everyone can recognize.

He does not do the good he actually wants to do.

He ends up doing the very thing he hates.

This is not confusion about right and wrong.

It is a struggle to actually do what he already knows is right.

🔄 Paul wants good but does not do it

😣 He does the thing he hates instead

🧠 This is not confusion about right and wrong

📖 The struggle is doing it, not knowing it

## 💔 I Consent Unto The Law That It Is Good

Hating his own wrongdoing actually proves something important.

It shows Paul already agrees the law is good.

If he thought the law was wrong, failing to keep it would not bother him.

His frustration is evidence that his conscience sides with God's law.

💔 Hating his sin proves something

✅ It shows he agrees the law is good

🧭 His conscience sides with the law

📖 Frustration here is evidence of agreement

## 🏠 It Is No More I That Do It, But Sin That Dwelleth In Me

Paul is not making an excuse here.

He is naming a power at work inside him, separate from his true desires.

"Sin that dwelleth in me" means sin living inside him like an unwanted resident.

This distinction matters for understanding the rest of the chapter.

His true self is not the same as the sin still acting through him.

🚫 This is not an excuse

🏠 Sin dwelling in him is an unwanted resident

🧍 Paul separates himself from that sin

📖 His true self is not sin's actions

# Romans 7:18-20
# 🤲 Willing But Powerless
---
## 👤 In Me Dwelleth No Good Thing

Paul is talking about his flesh here, not his whole self.

"In my flesh" means the part of him still prone to sin.

He says no good thing lives there naturally.

This is an honest, specific confession, not self hatred.

👤 In my flesh means his sin prone nature

🚫 No good lives there naturally

🎯 This is a specific, honest confession

📖 It is not self hatred, it is honesty

## 🙋 To Will Is Present With Me

"To will" means wanting or intending to do something.

Paul says the wanting part is not his problem.

He genuinely wants to do what is good.

The failure comes later, in actually carrying it out.

🙋 To will means wanting or intending

✅ Paul genuinely wants to do good

⚙️ The failure is in carrying it out

📖 Wanting good was never his struggle

## 🔁 The Good That I Would I Do Not

Paul repeats the same struggle from verse fifteen on purpose.

Repetition here is not careless writing.

It shows how constant and real this conflict actually is.

The good he wants and the evil he does keep trading places.

🔁 Paul repeats the struggle on purpose

📌 Repetition shows how real the conflict is

⚖️ Good and evil keep trading places

📖 This conflict is constant, not occasional

## 🔂 Now If I Do That I Would Not

Paul circles back to the same point one more time.

The pattern he described is not a single bad moment.

It is a repeated condition he keeps running into.

Naming it again drives home how trapped this feels before rescue comes.

🔂 Paul circles back to the same point

🧩 This is a repeated condition, not one moment

🔒 It shows how trapped this feels

📖 The rescue has not arrived yet

# Romans 7:21-25
# ⚔️ The War Within And The Rescue
---
## 🔍 I Find Then A Law

Paul names something he keeps noticing about himself.

Whenever he wants to do good, evil shows up right alongside it.

He calls this a "law," meaning a pattern that always holds true.

It is not an occasional slip.

It is a constant rule he cannot escape on his own.

🔍 Paul names a pattern he keeps noticing

⚖️ Evil shows up whenever he wants good

📏 Law here means a constant pattern

📖 It is a rule, not an occasional slip

## ❤️ I Delight In The Law Of God After The Inward Man

"The inward man" means the renewed part of a person.

It is the part that genuinely loves God's law.

Paul says this part of him delights in what God commands.

This is real agreement, not forced obedience.

❤️ Inward man means his renewed part

📜 That part loves God's law

🙌 Paul genuinely delights in God's commands

📖 This is real agreement, not forced obedience

## ⚔️ Another Law In My Members, Warring Against The Law Of My Mind

Paul describes an actual war happening inside himself.

"My members" means his body and its impulses.

That war fights directly against what his mind already knows is right.

The result is captivity, being dragged along by sin instead of leading.

⚔️ A real war is happening inside him

🧠 His mind knows what is right

🔗 His body wages war against his mind

📖 The result is captivity, not freedom

## 😩 O Wretched Man That I Am

"Wretched" means utterly miserable, not just mildly frustrated.

Paul is not performing despair here, he means it.

"The body of this death" describes a body still weighed down by sin.

Even someone as mature in faith as Paul reaches this low point.

😩 Wretched means utterly miserable

💯 Paul means this, he is not performing

⚰️ A body still weighed down by sin

📖 Even mature believers reach this low point

## 🙏 I Thank God Through Jesus Christ Our Lord

Right after the lowest point, Paul answers with gratitude, not despair.

Jesus Christ is the rescue Paul has been building toward this whole chapter.

Paul then gives an honest summary of his current state.

With his mind he serves God's law.

With his flesh he still serves sin's law.

🙏 Paul answers despair with gratitude

✝️ Jesus Christ is the rescue

🧠 His mind serves God's law

📖 The flesh still fights, but rescue is real
`.trim();

export const ROMANS_SEVEN_PERSONAL_SECTIONS = parseRomansSevenRawNotes(ROMANS_SEVEN_RAW_NOTES);
