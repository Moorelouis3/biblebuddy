export type JohnFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnFifteenRawNotes(rawText: string): JohnFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 15:${startVerse}` : `John 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 John 15 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_FIFTEEN_RAW_NOTES = `# John 15:1-3
# 🍇 The True Vine And The Husbandman
---
## 🍇 I Am The True Vine

A vine is a plant whose branches only bear fruit while attached to the main stem.

Israel is pictured as God's vine throughout the Old Testament, in Psalms and in Isaiah.

That old vine often produced only wild, sour grapes instead of good fruit.

Jesus calls himself the true vine, the one who finally succeeds where Israel failed.

The husbandman is the gardener who plants, waters, and tends the vine.

Here that gardener is named plainly as God the Father.

🍇 A vine bears fruit only while attached

📜 Israel was pictured as God's vine before

🌱 Jesus is the vine that truly succeeds

📖 The husbandman is God the Father himself

## ✂️ Every Branch That Beareth Not Fruit He Taketh Away

Not every branch stays attached forever.

A branch that produces no fruit gets removed completely.

Fruit here means a changed life, proof that a person is truly joined to Jesus.

Removing a dead branch is not harsh.

It keeps the whole vine healthy instead.

This warns against claiming to follow Jesus without any real change to show for it.

✂️ A fruitless branch gets removed completely

🍇 Fruit means a visibly changed life

🌿 Removing dead branches keeps the vine healthy

📖 Real following always shows some change

## 🌾 He Purgeth It That It May Bring Forth More Fruit

Purgeth means to prune.

A healthy branch gets pruned on purpose, not punished.

That pruning makes it grow even stronger.

The same Greek word behind purgeth is translated clean just one verse later.

Pruning in a person's life can feel like a painful cut at the time.

The purpose of that cut is always more fruit, never less.

🌾 Purgeth means to prune for more growth

🌱 Pruning a branch is not a punishment

✂️ Painful cutting can still aim at growth

📖 Purgeth and clean share one Greek word

## 📜 Clean Through The Word Which I Have Spoken

Jesus just used the word purgeth, meaning pruned.

That same word shares its root with the word clean, used here.

The disciples are already clean in that sense, already pruned.

This happened through what Jesus has already taught them.

This kind of clean is not about washing dirt off the outside.

It is about a changed heart, shaped by truth already spoken.

📜 Purgeth and clean share one root

🧽 This clean is not about dirt

🗣️ Jesus' words shape a person inside

📖 Being clean comes from receiving truth

# John 15:4-8
# 🌿 Abide In The Vine
---
## 🌿 Abide In Me, And I In You

Abide means to remain, to stay permanently joined, not just visit for a while.

Jesus describes a relationship that goes in both directions at once.

He stays joined to the disciple.

The disciple also stays joined to him.

A branch cut off from the vine cannot survive on its own.

It may still look healthy for a little while first.

This is not a one time decision but an ongoing, daily connection.

🌿 Abide means to stay permanently joined

🔁 The connection runs in both directions

🍃 A cut branch cannot survive alone

📖 Staying joined is an ongoing choice

## 🍃 As The Branch Cannot Bear Fruit Of Itself

A branch has no power of its own to grow grapes.

All the nutrients, water, and life it needs flow in from the vine itself.

A disciple trying to produce real spiritual fruit through sheer effort works the same way.

Willpower alone cannot manufacture what only a real connection to Jesus can supply.

🍃 A branch has no power alone

💧 Life flows in from the vine

💪 Willpower alone cannot manufacture fruit

📖 Fruit requires real connection, not effort

## 🚫 Without Me Ye Can Do Nothing

This is one of the most direct statements Jesus makes about dependence in the whole Gospel.

Not some things, not most things, but nothing of lasting spiritual value.

A branch separated from the vine can still look green for a little while.

It is already dying underneath.

Nothing shows on the outside yet.

Real fruit, the kind that lasts, only grows out of real abiding.

🚫 Nothing of lasting value without him

🌿 A separated branch still looks green for now

💀 It is already dying underneath

📖 Lasting fruit only grows from abiding

## 🔥 Cast Forth As A Branch, And Is Withered

Withered means dried up, dead, and useless for anything but burning.

A branch that never bonds with the vine eventually gets removed.

Workers in a vineyard gathered these dead branches and burned them for fuel.

Jesus is describing a real and final separation, not just a temporary setback.

The warning is serious, matching how seriously he treats the call to abide.

🔥 Withered means dried up and dead

🧺 Workers gathered dead branches for burning

⚠️ This pictures a real, final separation

📖 Jesus treats abiding with real seriousness

## 🙏 Ask What Ye Will, And It Shall Be Done

This promise comes with a condition attached, right there in the same sentence.

Abiding in Jesus and having his words abide in the disciple comes first.

Prayer here is not a magic formula detached from a real relationship.

A request that flows out of real abiding lines up naturally with what Jesus already wants.

That is why it gets answered, not because the words themselves are powerful.

🙏 The promise has a condition attached

🌿 Abiding comes before the asking

🎯 Requests line up with what Jesus wants

📖 Answered prayer flows from real connection

## 👨‍👦 Herein Is My Father Glorified

Fruit on the branches is what brings honor and credit back to the gardener.

A vineyard known for good grapes reflects well on whoever planted and tended it.

In the same way, a disciple's fruitful life brings honor back to God the Father.

Bearing fruit is also tied directly to being recognized as a true disciple.

The two ideas are linked together.

Fruit and discipleship rise or fall as one.

👨‍👦 Good fruit brings honor to the gardener

🍇 A disciple's fruit reflects on the Father

🎓 Bearing fruit marks a true disciple

📖 Fruit and discipleship rise together

# John 15:9-11
# ❤️ Continue In My Love
---
## ❤️ As The Father Hath Loved Me, So Have I Loved You

Jesus measures his own love for the disciples against the love the Father has for him.

That is the highest possible standard, not a lesser, watered down version of love.

The love between Father and Son has existed from eternity, long before creation.

Jesus is inviting ordinary people into the edge of that same eternal love.

❤️ Jesus compares his love to the Father's

🔝 That love is the highest standard

♾️ It existed before creation itself

📖 Disciples are invited into that love

## 🛡️ If Ye Keep My Commandments, Ye Shall Abide In My Love

Keeping commandments is not how someone earns Jesus' love in the first place.

It is how someone stays consciously aware of a love already given.

Jesus points back to his own example, keeping his Father's commandments and abiding in his love.

The pattern repeats here.

Obedience and love are never separated from each other.

🛡️ Obedience does not earn this love

🔁 It keeps a person aware of it

🧑 Jesus models the same pattern himself

📖 Obedience and love stay joined together

## 😊 That My Joy Might Remain In You

Jesus names the goal of everything he has just said, joy.

This is not a shallow, temporary happiness that depends on circumstances.

This is Jesus' own joy, the steady kind he carries even heading toward the cross.

A joy that stays full only requires staying connected to him.

😊 The goal here is lasting joy

🌊 This joy is deeper than happiness

🙂 It is Jesus' own joy, shared

📖 Full joy comes from staying connected

# John 15:12-17
# 🤝 Chosen As Friends
---
## 💞 This Is My Commandment, That Ye Love One Another

Out of everything Jesus could command, he narrows it down to one thing.

Love for one another is not one rule among many.

It is the central rule.

This repeats the same command Jesus already gave back in John chapter thirteen.

Saying it twice in two chapters shows exactly how important it is to him.

💞 Love for each other is the central command

🔁 Jesus repeats this from chapter thirteen

⭐ It outranks every other instruction

📖 Repetition shows how much this matters

## ✝️ Greater Love Hath No Man Than This

Jesus defines the highest possible form of love in one plain sentence.

Laying down a life for friends means sacrificing everything, including survival itself.

Jesus says this just hours before he will actually do exactly that on the cross.

This is not poetic exaggeration.

It previews his own death, now only hours away.

✝️ This defines love's highest possible form

💀 Laying down a life means full sacrifice

⏳ Jesus says this hours before the cross

📖 He previews his own death here

## 🤝 Ye Are My Friends, If Ye Do Whatsoever I Command You

Friendship here is not permission to do whatever a person personally prefers.

Real friendship with Jesus still includes obedience to what he actually commands.

In the ancient world, a loyal friend lined up with a leader's purpose.

They did not demand their own way instead.

This friendship is close.

It is still not equal in authority.

🤝 Friendship still requires real obedience

👑 Ancient friends lined up with their leader

🙅 It is not doing whatever one wants

📖 Close, but still not equal, friendship

## 🧑‍🤝‍🧑 Henceforth I Call You Not Servants

Henceforth means from this point onward.

It marks a clear change in the relationship.

A servant works for a master without being told the master's reasons or plans.

Jesus is changing the relationship, moving the disciples from servants into something closer.

This shift happens right as Jesus is about to leave them through his death.

🧑‍🤝‍🧑 Henceforth means from this point onward

🧰 Servants are not told the master's reasons

🔄 Jesus is changing the relationship here

📖 This shift happens right before his death

## 📬 All Things That I Have Heard Of My Father

This is the proof Jesus gives for why the disciples count as friends now.

A servant only receives orders.

A friend gets let in on the full plan.

Jesus has been passing along everything the Father has shown him this entire Gospel.

Being trusted with real information is itself a mark of friendship.

📬 Jesus passes along what the Father showed him

🤝 Servants only receive orders, not reasons

🎓 Friends get let in on the plan

➡️ Being trusted with truth marks friendship

## 🎯 Ye Have Not Chosen Me, But I Have Chosen You

In most rabbi and student relationships of this time, students chose their own teacher.

Jesus reverses that completely.

He is the one who selected his disciples first.

Being chosen was not random.

It came with a clear purpose, to bear fruit that remains.

That fruit is meant to last, not fade after one short season.

🎯 Jesus chose the disciples, not the reverse

🔄 This reversed the normal teacher pattern

🍇 Being chosen came with a purpose

📖 That fruit is meant to remain

## 🙌 Whatsoever Ye Shall Ask Of The Father In My Name

Jesus already made a nearly identical promise back in John chapter fourteen.

Asking in Jesus' name means asking in line with his character and purpose.

It is not a magic phrase attached to the end of a prayer.

This promise closes the section the same way it opened, focused on fruit and abiding.

🙌 This promise repeats John chapter fourteen

🏷️ His name means his character and purpose

🚫 It is not a magic phrase

📖 Fruit and prayer stay connected here

# John 15:18-21
# ⚔️ Hated By The World
---
## 🌍 If The World Hate You

The world here does not mean the whole planet.

It means people and systems organized against God.

Jesus prepares the disciples now for a hatred they have not faced yet.

He names it before it happens, so it does not come as a shock later.

This hatred is not earned by any wrongdoing on the disciples' part.

🌍 The world means people against God

⚠️ This warning comes before it happens

🚫 This hatred is not earned by sin

📖 Being warned prevents a later shock

## 👥 If Ye Were Of The World, The World Would Love His Own

Belonging fully to the world's values and goals would make a person welcome within it.

The disciples no longer fully belong there, since Jesus has chosen them out of it.

That separation is exactly what triggers the world's hostility.

Being disliked for following Jesus is not a failure.

It can be a sign of real belonging to him.

👥 Full belonging to the world brings its love

✂️ Jesus has chosen them out of it

⚡ That separation triggers real hostility

📖 Being disliked can signal real belonging

## 📏 The Servant Is Not Greater Than His Lord

Jesus already used this exact phrase back in John chapter thirteen, washing the disciples' feet.

Here the same phrase carries a harder meaning, suffering instead of service.

If the master faced persecution, the servant should expect the very same treatment.

Following Jesus was never promised to be safe.

📏 The servant and lord share one standard

🔁 Jesus used this phrase back in chapter thirteen

⚔️ If the lord suffered, so will the servant

📖 Following Jesus was never promised safety

## 😣 If They Have Persecuted Me, They Will Also Persecute You

This is not a maybe.

Jesus states it as something certain to happen.

Persecution already followed Jesus through nearly his entire public ministry.

The disciples are told plainly to expect the same pattern in their own lives.

Those who listened to Jesus would also listen to his disciples.

😣 Persecution is stated as a certainty

🔁 It already followed Jesus closely

👥 Disciples should expect the same pattern

📖 Some will still listen, just as some did

# John 15:22-27
# 🕊️ The Comforter Promised
---
## ⚖️ If I Had Not Come And Spoken Unto Them

Jesus is not saying people were sinless before he arrived.

He means they now have no excuse left for rejecting God.

Seeing Jesus in person and hearing him teach removed every reasonable doubt.

Clear revelation always raises the stakes for whoever receives it.

⚖️ People already sinned before Jesus came

👀 Seeing him removed any reasonable doubt

📈 Clear revelation raises the stakes

📖 Rejecting him now is without excuse

## 🧥 They Have No Cloak For Their Sin

A cloak here pictures a covering someone might hide behind for protection.

Ignorance can sometimes function like a cloak, a reasonable excuse for not knowing better.

Jesus removed that particular excuse by coming and showing exactly who God is.

What is left behind is a choice, made with full knowledge, not confusion.

🧥 A cloak means a hiding excuse

❓ Ignorance can sometimes work like a cloak

🚫 Jesus removed that excuse completely

📖 What remains is a knowing choice

## 💔 He That Hateth Me Hateth My Father Also

Jesus ties himself and the Father closely together.

Neither one can be separated from the other.

Rejecting Jesus is never just rejecting a teacher or a prophet.

It reaches all the way back to rejecting God himself.

This matches what Jesus already said earlier in this same Gospel.

He and the Father are one.

💔 Hating Jesus reaches back to the Father

🔗 The two cannot be separated this way

🙅 Rejecting Jesus is never just about a teacher

📖 Jesus and the Father remain one

## 📜 They Hated Me Without A Cause

Jesus quotes directly from the Psalms to explain what is happening to him.

Psalm thirty five and Psalm sixty nine both describe suffering for no real reason.

Calling this hatred without a cause means it was never a fair response to anything Jesus did.

Scripture had already described this exact pattern long before Jesus arrived.

📜 Jesus quotes directly from the Psalms

❓ Without a cause means no fair reason

🔮 Scripture described this pattern beforehand

📖 Old promises are landing in real time

## 🕊️ When The Comforter Is Come

Comforter translates a Greek word meaning someone called alongside to help, like a legal advocate.

Jesus already promised this same Helper back in John chapter fourteen.

Here he adds one clear detail.

The Comforter proceeds from the Father and comes through the Son.

This is the Holy Spirit, sent to continue exactly what Jesus started.

🕊️ Comforter means a helper called alongside

⚖️ The word can mean a legal advocate

🔗 The Spirit comes from Father and Son

📖 The Spirit continues what Jesus started

## 👀 Ye Also Shall Bear Witness

The disciples are not just receivers of truth.

They become witnesses who pass it on.

Bearing witness means testifying to something personally seen and experienced firsthand.

They had already spent real time with Jesus from the very beginning of his ministry.

That firsthand experience is exactly what qualifies them to testify now.

👀 Witnesses testify to what they saw

⏳ They were there from the beginning

🗣️ Firsthand experience qualifies their testimony

📖 Jesus passes the mission on to them
`.trim();

export const JOHN_FIFTEEN_PERSONAL_SECTIONS = parseJohnFifteenRawNotes(JOHN_FIFTEEN_RAW_NOTES);
