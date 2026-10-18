export type FirstJohnThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstJohnThreeRawNotes(rawText: string): FirstJohnThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstJohnThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstJohn\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First John 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstJohn\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstJohn\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First John 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 John 3:${startVerse}` : `1 John 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 First John 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_JOHN_THREE_RAW_NOTES = `# FirstJohn 3:1-3
# 👶 Called The Sons Of God
---
## 💗 Behold What Manner Of Love

"Behold" is John's way of stopping the reader to look closely at something amazing.

He wants his readers to pause before they rush past this truth.

The Father did not just tolerate believers, he bestowed actual love on them.

"Bestowed" means a gift freely given, not something earned.

Being called a son of God is the gift John wants no one to miss.

👀 Behold means stop and look closely
🎁 Bestowed means a gift freely given
💗 The Father freely gave his love
📖 Being God's child is the gift named here

## 🌍 Therefore The World Knoweth Us Not

John explains why many people do not understand believers.

"The world" here means people living by their own values.

Not every person on earth is meant by this word.

The world did not recognize Jesus when he came.

It will not recognize his followers either.

This is not a reason for shame.

It is actually expected instead.

🌍 World means living by its own values
🙈 It did not recognize Jesus either
🚫 Not every person on earth
📖 Missing Jesus means missing his followers too

## 👶 Beloved Now Are We The Sons Of God

John calls his readers "beloved" to remind them they are loved before anything else.

Being a son of God here is not a future hope only.

It is already true the moment someone believes.

This status does not depend on feeling close to God that day.

It rests on what Christ has already done.

👶 Beloved means deeply loved already
✅ Sonship is already true now
🚫 Not a future hope only
📖 It rests on what Christ did

## ❓ It Doth Not Yet Appear What We Shall Be

John admits something important, the full future is not spelled out yet.

Believers do not get a complete picture of their future glory right now.

"Doth not yet appear" means it has not been revealed in full.

This is honesty, not evasion.

Some things about eternity stay hidden until the moment actually arrives.

❓ Doth not yet appear means not revealed
🙈 The full future stays hidden now
🙏 This is honesty, not a dodge
📖 Some things wait until they arrive

## 👁️ We Shall See Him As He Is

John gives one certain fact even though the full future stays hidden.

When Christ appears, believers will finally see him exactly as he is.

That moment will change them to be like him.

Seeing him clearly is what produces that change.

This is the hope every believer is already holding onto.

👁️ Seeing Christ as he is
🔄 That sight will change believers
✨ Becoming like him follows seeing him
📖 This hope is already held now

## 🧼 Every Man That Hath This Hope In Him Purifieth Himself

Hoping to be like Christ someday changes how a person lives right now.

"Purifieth" means working to remove sin from daily life.

This purifying is not forced.

It flows from genuinely holding onto this hope.

Someone who really expects to see Christ wants to look more like him already.

Hope that does not change daily living is not the hope John means.

🧼 Purifieth means removing sin from life
🙏 This purifying flows from real hope
👣 Hope changes how someone lives now
📖 Hope with no change is not real hope

# FirstJohn 3:4-6
# ⚖️ No Sin In Him
---
## ⚖️ Sin Is The Transgression Of The Law

John gives sin its plain definition here.

"Transgression" means crossing a line that was already clearly marked.

Sin is not just a mistake or a weakness.

It is a direct violation of God's own law.

Calling it a crossing, not an accident, keeps the definition honest.

⚖️ Transgression means crossing a marked line
🚫 Sin is a violation not a mistake
📏 God's law sets the line
📖 Honest definitions keep sin from being softened

## 🩸 He Was Manifested To Take Away Our Sins

"Manifested" means made visible in a way that could be clearly seen.

Jesus coming to earth was God's sin problem showing up in flesh and blood.

His whole mission centered on removing sin, not just teaching about it.

This phrase names the purpose behind his entire life on earth.

Every part of his ministry pointed toward this one goal.

🩸 Manifested means made visible in flesh
🎯 Removing sin was his mission
📜 Not just teaching, actually removing sin
📖 His whole life pointed to this goal

## ✝️ In Him Is No Sin

John states a simple fact about Jesus with no qualification.

Jesus never sinned, not once, in any way.

This matters because only someone sinless could actually take away sin from others.

A flawed sacrifice could never fully pay for anyone else's wrongdoing.

His sinless life is what makes his death actually effective.

✝️ Jesus never sinned, not once
🎁 Only a sinless person can pay for sin
💔 A flawed sacrifice could not work
📖 His sinless life makes his death effective

## 🏠 Whosoever Abideth In Him Sinneth Not

"Abideth" means staying in close, continuing connection with Jesus.

John is not saying a believer becomes perfectly sinless.

He means a settled pattern of sin cannot exist alongside real closeness to Jesus.

Someone truly connected to Jesus will not keep living in ongoing sin as a lifestyle.

Abiding and a sinful lifestyle cannot share the same life.

🏠 Abideth means staying closely connected
🚫 Not claiming perfect sinlessness here
🔄 A settled sin pattern cannot remain
📖 Abiding and ongoing sin cannot share a life

## 🔍 Hath Not Seen Him Neither Known Him

John describes someone who keeps sinning as a settled way of life.

"Seen" and "known" here mean a real, personal encounter with Jesus, not just facts about him.

Someone who truly meets Jesus is changed by that meeting.

A life with no change at all suggests no real meeting ever happened.

This is a warning aimed at self examination, not a weapon to judge others.

👁️ Seen and known mean real encounter
📚 Not just facts about Jesus
🔄 Real meetings produce real change
📖 This warns self examination not judgment of others

# FirstJohn 3:7-10
# 👪 Children Of God, Children Of The Devil
---
## 🎭 Let No Man Deceive You

John warns his "little children" about false teachers one more time.

These teachers claimed a person could sin freely and still be close to God.

John flatly refuses to let that idea stand unchallenged.

A real relationship with God always shows up in how someone actually lives.

Belief that produces no change in behavior is not the real thing.

🎭 False teachers claimed sin did not matter
🚫 John refuses to let that stand
👣 Real faith shows up in living
📖 Belief with no change is not real

## ✅ He That Doeth Righteousness Is Righteous

John gives the test in its simplest possible form.

Righteous living is the actual proof of a righteous standing with God.

This is not about reaching sinless perfection.

It is about a genuine, ongoing pattern of obeying God.

Jesus himself, who is perfectly righteous, is the standard this pattern is measured against.

✅ Righteous living proves righteous standing
🚫 Not about sinless perfection
🔄 A genuine ongoing pattern of obedience
📖 Jesus himself is the standard

## 😈 He That Committeth Sin Is Of The Devil

John names where this pattern of sin actually comes from.

"Of the devil" means sharing the devil's own character and direction, not literal fathering.

Someone who lives a sin dominated life is following the devil's pattern, not God's.

This is a strong statement on purpose, meant to end any confusion.

John wants no gray area left on this point.

😈 Of the devil means sharing his character
🚫 Not literal fathering, but a pattern
🔗 Sin patterns follow the devil's lead
📖 John leaves no gray area here

## 🕰️ The Devil Sinneth From The Beginning

John points to how long this pattern of sin has existed.

The devil has been in open rebellion against God since before human history even began.

Sin is not a modern problem or a passing trend.

It traces back to the very first rebellion against God.

Understanding this stops anyone from treating sin as something small or new.

🕰️ The devil's rebellion predates human history
🚫 Sin is not a modern problem
⚔️ It traces to the first rebellion
📖 This stops anyone from treating sin as small

## 🛡️ That He Might Destroy The Works Of The Devil

John names the purpose behind Jesus coming to earth.

"Destroy" here means to completely undo something, not just weaken it for a while.

The works of the devil include sin, death, and deception of every kind.

Jesus did not come only to forgive sin.

He came to actually dismantle the entire system sin runs on.

🛡️ Destroy means completely undo not weaken
⚰️ The devil's works include sin and death
✝️ Jesus came to dismantle that system
📖 Forgiveness was not his only goal

## 👶 Whosoever Is Born Of God Doth Not Commit Sin

This verse sounds like it contradicts chapter one, where John admits believers still sin.

John is describing a settled direction of life, not sinless perfection.

Someone truly born of God does not practice sin as a steady habit.

Occasional failure is very different from a life aimed at sin.

Direction matters more here than a single slip.

👶 Born of God describes a new direction
🚫 Not a claim of sinless perfection
🔄 Steady sin habits do not fit this
📖 Direction matters more than one failure

## 🌱 His Seed Remaineth In Him

"Seed" here is a picture for God's own nature planted inside a believer.

That nature was not placed there to sit unused.

It keeps producing a changed life, the way a planted seed keeps growing.

This seed is also why that changed life keeps lasting over time.

A permanent planting explains the strong language John just used about not sinning.

🌱 Seed pictures God's nature planted inside
🌳 It keeps growing into a changed life
⏳ The planting is permanent not temporary
📖 This explains John's strong language on sin

## 👀 In This The Children Of God Are Manifest

John gives one final, visible way to tell the two groups apart.

"Manifest" means plainly shown, not hidden or hard to see.

Doing righteousness and loving fellow believers mark someone as a child of God.

Missing either one of those marks the opposite family instead.

John will not let anyone claim the title "child of God" apart from actual love and righteousness.

👀 Manifest means plainly shown not hidden
✅ Righteousness and love mark God's children
❌ Missing either marks the other family
📖 John allows no claim without both

# FirstJohn 3:11-15
# 😡 Not As Cain
---
## 📜 The Message That Ye Heard From The Beginning

John points back to the very first thing believers were ever taught.

The core message was never complicated or secret.

Love one another was the instruction from day one.

John keeps circling back to this one command throughout the whole letter.

A command repeated this often is clearly the point, not a side note.

📜 The first teaching was simple
💗 Love one another from day one
🔄 John repeats this command often
📖 Repetition shows this is the point

## 😡 Not As Cain Who Was Of That Wicked One

John reaches back to the very first murder in the Bible for his example.

Cain is named as an example of the opposite of brotherly love.

"Of that wicked one" ties Cain's actions directly to the devil's own character.

Genesis never uses that exact phrase, but John draws the connection plainly.

Hatred toward a brother, taken far enough, always leads somewhere destructive.

😡 Cain is the opposite example
😈 Ties Cain to the devil's character
📜 Genesis lacks this exact phrase
📖 Unchecked hatred leads somewhere destructive

## 💔 His Own Works Were Evil And His Brother's Righteous

John names the actual reason behind Cain's murder.

Cain did not kill his brother over a random disagreement.

Abel's righteousness exposed Cain's own evil by simple contrast.

That contrast made Cain feel judged without a single word being spoken.

Jealousy over someone else's goodness can turn into real hatred fast.

💔 Cain's own works were evil
⚖️ Abel's righteousness exposed that evil
😤 Contrast felt like silent judgment
📖 Jealousy over goodness can turn violent

## 🌍 Marvel Not If The World Hate You

"Marvel" here means being shocked or caught off guard by something.

John tells his readers not to be surprised when the world treats them with hostility.

Cain hating righteous Abel was the very first example of this same pattern.

Opposition from the world is expected, not a sign something has gone wrong.

Hatred toward goodness has a long, consistent history.

😮 Marvel means being caught off guard
😡 Cain hating Abel started this pattern
🚫 Opposition is expected not a warning sign
📖 Hatred toward goodness has a long history

## 🔄 We Have Passed From Death Unto Life

John names a change that has already happened, not one still in progress.

"Passed" describes a completed move from one state into a totally different one.

Spiritual death means separation from God.

Spiritual life means real connection with him.

Loving other believers is the proof that this change has truly happened.

It is evidence of new life, not the cause of it.

🔄 Passed means a completed move already
⚰️ Spiritual death means separation from God
🌱 Spiritual life means real connection with God
📖 Loving believers proves this change is real

## 💀 He That Loveth Not His Brother Abideth In Death

John states the negative side of the same truth plainly.

Someone who does not love fellow believers is still living in spiritual death.

This is true no matter what that person claims to believe.

Love for others is not optional extra credit for a believer.

It is the actual evidence of whether real spiritual life is present at all.

💀 Not loving believers means abiding in death
🗣️ True no matter what someone claims
🚫 Love is not optional extra credit
📖 Love is evidence real life is present

## 🔪 Whosoever Hateth His Brother Is A Murderer

John makes a claim that sounds extreme at first.

He is not saying every angry feeling equals a literal killing.

He means that hatred and murder share the same root motive in the heart.

Murder is simply where unchecked hatred eventually leads if it is left alone.

God judges the hidden root, not only the visible final act.

🔪 Hatred and murder share one root
❌ Not every angry feeling is literal killing
🌱 Murder is where hatred eventually leads
📖 God judges the hidden root itself

# FirstJohn 3:16-18
# 🩸 Love In Deed And In Truth
---
## 🩸 Hereby Perceive We The Love Of God

John gives the clearest possible picture of what real love looks like.

Jesus laying down his life is the standard every other love gets measured against.

This was not a forced death he could not escape.

It was a willing gift, freely given on purpose.

Love is now defined by an action, not just a feeling.

🩸 Jesus laying down his life defines love
🎯 This is the standard for all love
🙏 A willing gift not a forced death
📖 Love is an action not just a feeling

## 🤝 We Ought To Lay Down Our Lives For The Brethren

John moves from what Jesus did to what believers owe each other.

This does not always mean a literal, physical death.

It means being willing to sacrifice comfort, time, or resources for another believer's good.

Love this costly is the pattern Jesus set, not an optional extra.

Real love shows up in actual giving, not warm feelings alone.

🤝 Believers owe this kind of love too
💰 Sacrifice of time or resources counts
🚫 Not always a literal physical death
📖 Real love gives it does not just feel

## 💰 Whoso Hath This World's Good And Seeth His Brother Have Need

John paints a very specific, everyday scene on purpose.

"This world's good" means ordinary material resources like money, food, or property.

One believer clearly has enough, and another clearly does not.

John is not talking about an abstract, far away kind of love.

He means the plain situation of seeing a need right in front of you.

💰 World's good means ordinary resources
👀 One has enough another has need
🚫 Not an abstract or distant scenario
📖 This is a need seen right there

## 🚪 Shutteth Up His Bowels Of Compassion

"Bowels" in this phrase is an old way of naming deep, gut level emotion.

Ancient readers thought of compassion as something felt physically in the stomach, not just in the mind.

"Shutteth up" pictures a door closing on that feeling on purpose.

Seeing a need and choosing to feel nothing is what John is describing here.

A closed heart in the face of real need cannot coexist with God's love.

🚪 Shutteth up means closing a door
❤️ Bowels meant gut level compassion
🙈 Choosing to feel nothing on purpose
📖 A closed heart cannot hold God's love

## 🗣️ Not In Word Neither In Tongue But In Deed And In Truth

John closes this section with a direct, practical command.

"Word" and "tongue" both point to love that stays as talk only.

"Deed" and "truth" point to love that actually shows up in real action.

Kind words cost nothing if they never turn into anything real.

John wants a love that can actually be seen, not just heard.

🗣️ Word and tongue mean talk only
✋ Deed and truth mean real action
💸 Kind words alone cost nothing
📖 Love must be seen not just heard

# FirstJohn 3:19-24
# 🙏 Confidence Toward God
---
## ✅ Hereby We Know That We Are Of The Truth

John points back to the costly, practical love he just described.

Loving in deed, not just in word, is how a believer can know they are genuine.

"Assure our hearts" means settling doubts a person might have about their own standing with God.

This assurance is not based on a feeling of certainty alone.

It is based on evidence that can actually be seen in a life.

✅ Costly love proves genuine faith
🧘 Assure means settling inner doubt
🚫 Not a feeling of certainty alone
📖 Real evidence is seen in a life

## ⚖️ If Our Heart Condemn Us God Is Greater Than Our Heart

John addresses a believer whose own conscience still feels guilty.

"Condemn" here means the heart accusing itself, even after real forgiveness.

Feelings of guilt are not always an accurate measure of someone's actual standing with God.

God's knowledge of the full truth is greater than any person's shifting feelings.

He sees the whole picture a guilty conscience cannot see clearly.

⚖️ Condemn means the heart accusing itself
😟 Guilty feelings are not always accurate
👁️ God sees the full true picture
📖 His knowledge outweighs shifting feelings

## 🙏 If Our Heart Condemn Us Not Then Have We Confidence

John now describes the opposite, healthier condition.

A clear conscience is not the same thing as sinless perfection.

It describes someone who is not knowingly hiding sin or ignoring God's commands.

"Confidence toward God" means approaching him without fear or hiding.

A clean conscience and bold prayer are directly connected.

🙏 A clear conscience is not perfection
🙈 It means not knowingly hiding sin
💪 Confidence means approaching God without fear
📖 A clean conscience leads to bold prayer

## 🎁 Whatsoever We Ask We Receive Of Him

This promise is not a blank check for any request at all.

It is tied directly to the obedient life John just described.

Someone living in close obedience naturally asks for things that match God's will.

Prayers lined up with God's will are the prayers God delights to answer.

Obedience shapes a person's prayers before God ever answers a single one.

🎁 Not a blank check for anything
🔗 Tied to an obedient life
🙏 Obedient prayers match God's will
📖 Obedience shapes prayer before any answer

## ✝️ Believe On The Name Of His Son Jesus Christ

John names the first half of what he calls "his commandment."

Believing here means trusting Jesus personally, not just agreeing he existed.

"The name" stands for everything Jesus actually is and did.

This is the foundation every other obedience in this letter is built on.

Without this belief, nothing else John has said holds any real weight.

✝️ Believing means trusting Jesus personally
📛 The name stands for all Jesus is
🏗️ This belief is the foundation
📖 Nothing else holds weight without it

## 💗 Love One Another As He Gave Us Commandment

John names the second half of the one commandment.

Belief in Jesus and love for other believers are never separated in this letter.

"As he gave us commandment" points back to Jesus's own direct instruction to his followers.

Believing correctly without loving others is not the obedience John describes.

Both halves have to be present together, every time.

💗 Love is the second half of this
🔗 Belief and love are never separated
📜 Jesus gave this command directly
📖 Both halves must be present together

## 🕊️ Hereby We Know That He Abideth In Us By The Spirit

John ends the chapter with how a believer can actually know God lives in them.

Obedience to this commandment is the visible evidence of that invisible truth.

The Holy Spirit is named here as the one who makes this abiding real.

This same Spirit will be the direct subject of the very next chapter.

John always ties a hidden spiritual reality to something that can actually be observed.

🕊️ The Spirit makes abiding real
👣 Obedience is the visible evidence
🔜 The Spirit leads into chapter four
📖 Hidden realities show in observable life
`.trim();

export const FIRST_JOHN_THREE_PERSONAL_SECTIONS = parseFirstJohnThreeRawNotes(FIRST_JOHN_THREE_RAW_NOTES);
