export type RomansSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansSixRawNotes(rawText: string): RomansSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 6:${startVerse}` : `Romans 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 6 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_SIX_RAW_NOTES = `# Romans 6:1-4
# 💧 Buried And Raised With Christ
---
## ❓ Shall We Continue In Sin, That Grace May Abound?

Paul raises a wrong idea people might take from the chapter before this one.

Romans five showed that grace is bigger than sin.

Someone might twist that into an excuse to keep sinning.

Paul asks the question out loud only to shut it down.

Grace was never a reason to sin more.

It is the reason sin no longer rules.

❓ Paul raises a question to correct it

📈 Grace is bigger than sin itself

🚫 More sin was never Paul's point

➡️ Grace ends sin's rule, not permission to sin

## 🚫 God Forbid

God forbid is an old way of saying absolutely not.

Paul is not casually disagreeing here.

He is rejecting the idea with his strongest possible words.

The King James Bible uses this phrase whenever an idea is unthinkable.

Grace making room for more sin counts as unthinkable to Paul.

🚫 God forbid means absolutely not

💪 Paul uses his strongest possible words

📜 The phrase marks an idea as unthinkable

📖 Grace excusing sin is unthinkable to Paul

## 🌊 Baptized Into His Death

Baptism here means more than a one time religious ceremony.

Paul says believers are joined to the actual death of Christ.

Going under the water pictures burial, not just washing.

The old life is treated as something that has already died.

This union with Christ's death is what breaks sin's claim on a person.

🌊 Baptism pictures real burial, not a wash

✝️ Believers are joined to Christ's death

⚰️ The old life is treated as dead

📖 Union with Christ's death breaks sin's claim

## 🌅 Walk In Newness Of Life

Newness of life means a genuinely new way of living.

It is not a patched up version of the old life.

Christ's resurrection becomes the pattern for this new walk.

The same power that raised Jesus now drives this new direction.

Baptism points to a changed direction, not just a changed title.

🌅 Newness means a whole new way of living

🚫 Not a patched up old life

⚡ Christ's resurrection is the pattern now

➡️ The direction changes, not just the title

# Romans 6:5-7
# ⛓️ Freed From Sin's Old Grip
---
## 🌱 Planted Together In The Likeness Of His Death

Planted together pictures a seed joined completely into the ground.

A seed does not keep its old shape once it is planted.

Paul says believers are joined to Christ's death the same way.

Being joined that closely to his death means sharing his resurrection too.

One cannot happen without the other.

🌱 Planted means joined completely, like a seed

🪦 The old shape does not survive planting

🤝 Believers are joined to Christ this way

📖 Sharing his death guarantees sharing his resurrection

## ⚰️ Our Old Man Is Crucified With Him

The old man means the person someone used to be before Christ.

It is not a reference to age or to a literal man.

Crucified with him means that old identity was put to death.

Crucifixion was slow and public, not quick or hidden.

The old self does not get repaired.

It gets replaced entirely.

👤 Old man means the former self, not age

⚰️ Crucified with him means put to death

🐌 Crucifixion was slow, not quick or hidden

📖 The old self is replaced, not repaired

## 💔 The Body Of Sin Might Be Destroyed

Destroyed here does not mean the physical body is annihilated.

The body of sin means sin's controlling power working through the body.

That power gets broken, not the body itself.

Paul's goal is that a person should no longer serve sin.

The aim is a changed master, not a disappearing body.

🚫 Destroyed does not mean the body disappears

⚡ Body of sin means sin's controlling power

💔 That power gets broken, not the body

➡️ The goal is a new master

## ⚖️ He That Is Dead Is Freed From Sin

Freed here is a legal word, like a debt that is fully paid.

A dead person has no bill left to pay.

Paul says that is exactly the believer's new legal status toward sin.

Sin no longer holds any claim worth collecting.

The record itself is closed.

⚖️ Freed means a legal release from debt

💀 A dead person owes nothing more

📜 Believers now hold this same legal status

📖 Sin's claim on them is closed

# Romans 6:8-11
# ♾️ Dead To Sin And Alive To God
---
## 🔗 We Shall Also Live With Him

Dying with Christ and living with Christ always come as a pair.

Paul never separates the two.

Nobody gets the death without eventually getting the life.

Belief is the link connecting both halves of that promise.

Sharing his death guarantees sharing his life.

🔗 Death and life with Christ are paired

🚫 Nobody gets just one half of this

🙏 Belief holds both halves together

📖 Sharing his death guarantees sharing his life

## 👑 Death Hath No More Dominion Over Him

Dominion means ruling power, like a king's total control.

Death used to rule over everyone without exception.

Christ's resurrection broke that rule permanently.

He does not face a second death, ever.

Dominion over him is finished for good.

👑 Dominion means total ruling power

⚰️ Death used to rule everyone

✝️ Christ's resurrection broke that rule

📖 Death's rule over him is finished for good

## 🎯 He Died Unto Sin Once

Once here means a single, final event, not the first of many.

Christ did not die again and again for different sins.

One death settled the whole problem completely.

Nothing about that death needs to be repeated.

He now lives entirely directed toward God.

🎯 Once means final, not first of many

🚫 Christ did not die again and again

✅ One death settled sin completely

📖 He now lives fully directed toward God

## 🧮 Reckon Ye Also Yourselves To Be Dead

Reckon means to count something as true, like an accountant closing a ledger.

Paul is not describing a feeling here.

He is giving a command to actively believe a settled fact.

Believers must treat sin's claim on them as already closed.

Feelings may lag behind, but the fact does not change.

🧮 Reckon means count as true, like a ledger

🚫 This is not about a feeling

📋 It is a command to believe a fact

📖 The fact stands even when feelings lag

# Romans 6:12-14
# 👑 Who Really Reigns In You
---
## 🪑 Let Not Sin Therefore Reign In Your Mortal Body

Reign means ruling like a king from a throne.

Paul pictures sin trying to sit on that throne inside a person.

The command is to refuse it that seat.

Mortal body means the ordinary, physical body a person still lives in.

The body still gets old and dies.

It does not have to obey sin anyway.

👑 Reign means ruling from a throne

🚪 Sin tries to take that throne

🚫 The command is to refuse it the seat

📖 The body still answers to God, not sin

## 🔥 The Lusts Thereof

Lust here does not mean only sexual desire.

It means any strong craving that pulls a person away from God.

That could be anger, greed, pride, or any other demanding want.

Obeying sin usually starts with obeying one of these cravings first.

Refusing sin's reign means refusing to chase those cravings.

🔥 Lust means any strong craving, not just desire

😡 Anger, greed, and pride all count

🎯 Obeying sin starts with obeying a craving

📖 Refusing sin means refusing the craving first

## 🛠️ Yield Ye Your Members As Instruments

Members here means the parts of the body, hands, eyes, feet, and more.

Instruments means tools, the same word used for a weapon or a tool in a shop.

Paul pictures the body as a toolbox that gets handed to a master.

It can be handed to sin for wrong use.

It can be handed to God for right use instead.

🛠️ Members means body parts, hands, eyes, feet

🔧 Instruments means tools, even a weapon

📦 The body is handed to a master

📖 It serves sin or it serves God

## 📏 Ye Are Not Under The Law, But Under Grace

Under the law means living under a system that only measures failure.

Under grace means living under a relationship that already forgives and empowers.

This does not mean there is no standard left at all.

It means the power to meet it now comes from somewhere new.

Grace changes the source of the power, not the existence of right and wrong.

📏 Under the law means only measuring failure

🤝 Under grace means a relationship that empowers

🚫 Grace does not erase right and wrong

📖 Grace changes where the power comes from

# Romans 6:15-19
# 🤝 A New Master And A New Obedience
---
## 🔁 Shall We Sin, Because We Are Not Under The Law?

Paul repeats almost the same question from verse one.

This time the wrong idea comes from being under grace instead of law.

Some might think fewer rules means fewer limits on behavior.

Paul answers with the same strong rejection as before.

Grace never removes the question of who a person is serving.

🔁 Paul repeats the question from verse one

📏 Fewer rules does not mean fewer limits

🚫 Paul rejects that idea just as strongly

📖 Grace never removes the question of service

## 🙋 To Whom Ye Yield Yourselves Servants To Obey

Everyone serves somebody.

There is no truly neutral, unaffiliated life.

Whatever a person obeys becomes that person's actual master.

Paul names only two options here, sin or obedience to righteousness.

One master leads to death, the other to righteousness.

🙋 Everyone serves somebody

🚫 Neutral, unaffiliated living does not exist

👑 What you obey becomes your master

📖 One master means death, the other life

## 🧰 That Form Of Doctrine Which Was Delivered You

Form of doctrine means a shape or pattern of teaching, like a mold.

A mold gives metal its exact final shape.

The teaching the Romans received worked the same way on their lives.

It was not just information to agree with in their heads.

It was a pattern meant to shape their whole way of living.

🧰 Form means a mold, a shape giver

🔥 A mold shapes metal into its final form

🧠 Teaching here was not just information

📖 It shaped their whole way of living

## 🔓 Being Then Made Free From Sin

Being free from sin does not mean being free from service.

Paul immediately pairs this freedom with a new master, righteousness.

Every person is going to serve somebody.

The real question was never whether to serve.

The real question was always who to serve.

🔓 Freedom from sin is not freedom from service

➕ Freedom and a new master arrive together

🙋 Everyone ends up serving somebody

📖 The real question was always who, not whether

## 🗣️ Yielded Your Members Servants To Uncleanness

Paul admits he is using a simple, human picture here on purpose.

He calls it speaking after the manner of men.

People understand slavery and service better than abstract theology.

The same body parts once handed to uncleanness can now be handed to holiness.

Nothing about the body changed.

Only who it serves is different now.

🗣️ Paul uses a simple, human picture on purpose

🙇 People understand service better than abstract theology

🔁 Same body parts, now serving a new master

📖 What changed is who the body serves

# Romans 6:20-23
# ⚖️ Wages Versus A Gift
---
## 🎭 Free From Righteousness

This freedom sounds good on the surface.

It actually means having no obligation to do what is right.

Serving sin never came with any requirement to live well.

That is not real freedom, it is the absence of any standard.

Paul is describing a trap, not an achievement.

🎭 This freedom sounds good but is not

🚫 It meant no obligation to do right

⚠️ Serving sin came with no standard at all

📖 Paul describes a trap, not an achievement

## 🍇 What Fruit Had Ye Then

Fruit means the visible result that a life actually produces.

A life serving sin produces a harvest too, just a bad one.

Paul asks the Romans to look back honestly at that harvest.

The verse itself answers with one word, ashamed.

The chapter is about to name exactly what that harvest leads to, death.

🍇 Fruit means the visible result of a life

🌾 Sin produces a harvest, just a bad one

😳 Shame is the honest response to that harvest

📖 That harvest leads to death

## 🌾 Ye Have Your Fruit Unto Holiness

Serving God produces its own harvest too.

That harvest is holiness, a life actually set apart for good.

This is the direct opposite of the shame named in the verse before.

One master produces regret, the other produces a life worth having.

Both harvests are real, only one is worth growing.

🌾 Serving God produces its own harvest

✨ That harvest is holiness, a life set apart

🔄 This is the opposite of the earlier shame

📖 Only one harvest is worth growing

## 💰 The Wages Of Sin Is Death

Wages means pay that someone has actually earned through work.

Sin is pictured here as an employer, not just a bad habit.

Every day spent serving sin adds to the paycheck it is building.

That paycheck is death, exactly what was earned and nothing less.

Sin always pays out exactly what it owes.

💰 Wages means pay that was actually earned

👔 Sin is pictured as an employer here

📆 Every day serving sin adds to the paycheck

📖 Death is exactly what sin pays out

## 🎁 The Gift Of God Is Eternal Life

A gift is never earned.

It is simply given.

God does not pay out eternal life as a wage for good behavior.

It comes only through Jesus Christ.

It is free to anyone who receives it.

Sin hands out exactly what is earned.

God hands out far more than anyone could ever earn.

🎁 A gift is never earned, only given

✝️ Eternal life comes only through Jesus Christ

⚖️ Sin pays exactly what is earned

📖 God gives far more than anyone could earn
`.trim();

export const ROMANS_SIX_PERSONAL_SECTIONS = parseRomansSixRawNotes(ROMANS_SIX_RAW_NOTES);
