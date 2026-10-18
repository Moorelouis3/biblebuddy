export type FirstJohnTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstJohnTwoRawNotes(rawText: string): FirstJohnTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstJohnTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstJohn\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First John 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstJohn\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstJohn\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First John 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 John 2:${startVerse}` : `1 John 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First John 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_JOHN_TWO_RAW_NOTES = `# FirstJohn 2:1-2
# 👨‍⚖️ An Advocate With The Father
---
## 👴 My Little Children, These Things Write I Unto You, That Ye Sin Not

"Little children" was John's own term of endearment for the believers he was writing to.

He was likely an old man by this point, decades after he had walked with Jesus.

John uses this phrase the way a father speaks to children he still worries over.

His goal in writing was not to scold anyone into guilt.

He wanted them to stop sinning, not to feel crushed by failure.

👴 Little children was John's own term of endearment
📜 John wrote as an old man, decades later
🙏 His goal was to help them stop sinning
📖 Love, not guilt, drives this whole letter

## ⚖️ We Have An Advocate With The Father

"Advocate" was a legal term for someone who argues your case before a judge.

John is saying that Jesus himself stands up for a believer who sins.

He defends that case personally before God.

This is not a backup plan only for people who fail often.

Sin still happens after belief, and God already provided for it.

⚖️ Advocate means a legal defender in court
🙏 Jesus argues the believer's case before God
❌ Not a plan only for occasional failure
📖 God already provided for sin after belief

## ✝️ Jesus Christ The Righteous

Calling Jesus "the righteous" names him as the one person qualified to defend sinners.

A good lawyer needs standing with the judge, not just good arguments.

Jesus has that standing because he never sinned himself.

His own righteousness is what makes his defense of others effective.

✝️ Righteous means Jesus himself never sinned
⚖️ A defender needs standing with the judge
🙏 Jesus already has that standing
📖 His righteousness makes his defense effective

## 🩸 He Is The Propitiation For Our Sins

"Propitiation" means a payment that satisfies a debt and turns away deserved anger.

In the Old Testament, this word described a sacrifice that covered sin before God.

John is saying Jesus himself is that sacrifice, not just someone who offers one.

His death did not just excuse sin, it actually paid for it in full.

🩸 Propitiation means a payment that satisfies a debt
📜 Old Testament sacrifices covered sin this same way
🕊️ Jesus himself is that sacrifice, not the giver
📖 His death paid for sin in full

## 🌍 Not For Ours Only, But Also For The Sins Of The Whole World

John is widening the scope of what he just said about Jesus.

This sacrifice was not limited to the small circle of people who first read this letter.

It was large enough to cover every person who would ever believe, in every place.

John is removing any excuse to think God's offer was too small or too exclusive.

🌍 The sacrifice reaches beyond John's first readers
🌐 It covers everyone who will ever believe
🚫 God's offer was never too small or exclusive
📖 This removes any excuse to doubt its reach

# FirstJohn 2:3-6
# 🔑 Knowing Him By Keeping His Word
---
## 🔑 Hereby We Do Know That We Know Him

"Hereby" points forward to a test John is about to give.

Knowing God is not just a feeling or a private conviction.

John is about to name something a person can actually check in their own life.

This matters because feelings can be mistaken, but obedience can be examined honestly.

🔑 Hereby means a test is coming next
🙏 Knowing God is not only a feeling
🔍 John gives something a person can check
📖 Obedience can be examined, feelings cannot

## ✅ If We Keep His Commandments

The test John names is obedience, not knowledge of facts about God.

"Keep" means an ongoing pattern of obeying, not a single good decision.

A person who truly knows God will show it in how they actually live.

This is not about earning a relationship with God through perfect behavior.

It is evidence that a real relationship with him already exists.

✅ The test is obedience, not facts about God
🔄 Keep means an ongoing pattern, not one choice
🙏 Obedience proves relationship, not earns it
📖 Real knowledge of God shows in a life

## 🗣️ He That Saith, I Know Him, And Keepeth Not His Commandments, Is A Liar

John names the opposite case just as plainly.

Someone can claim a close relationship with God.

That claim can still sit right next to open disobedience.

John does not call that combination confusion or a weak faith.

He calls it a lie, with no softer word offered.

🗣️ A claim without obedience is a lie
❌ John offers no softer word for it
🙏 Claiming closeness does not excuse disobeying
📖 Words about God must match a life

## 💗 In Him Verily Is The Love Of God Perfected

"Perfected" here does not mean flawless or finished.

It means reaching its intended goal, not achieving flawless perfection.

God's love is not fully realized in someone's life until it produces real obedience.

Keeping God's word is love actually doing what love is meant to do.

💗 Perfected means reaching its intended goal
🎯 Doing what it was actually meant to do
✅ God's love shows itself through obedience
📖 Obeying is love doing its actual job

## 👣 He That Saith He Abideth In Him Ought Himself Also So To Walk, Even As He Walked

"Abide" means staying in close, permanent connection with Jesus, not a visit now and then.

"Walk" describes someone's whole pattern of daily living, every choice and habit together.

John says that claim and daily life must match, down to the example Jesus himself set.

Jesus becomes the actual pattern believers are measured against, not a vague standard.

🏠 Abide means permanent connection, not a visit
👣 Walk means a whole pattern of daily living
🎯 The claim and the daily life must match
📖 Jesus himself is the pattern believers follow

# FirstJohn 2:7-11
# 💡 Walking In The Light, Not Darkness
---
## 📜 I Write No New Commandment Unto You, But An Old Commandment

John is talking about the command to love one another.

He calls it old because it goes all the way back to what they first heard about Jesus.

This was not a brand new rule John invented for this letter.

It had already been part of the teaching from the very beginning of their faith.

📜 The old commandment is to love one another
🕰️ Old means it goes back to the start
🚫 John did not invent a brand new rule
📖 Love was always part of the original message

## 🔄 Again, A New Commandment I Write Unto You

John calls the same command both old and new on purpose.

It is old because it was always there, and new because of how Jesus lived it out.

Jesus gave this familiar command a depth no one had fully seen before.

Love did not change, but the example behind it did.

🔄 Same command, called both old and new
🕰️ Old because it was always commanded
✨ New because of how Jesus lived it
📖 Jesus gave the command fresh depth

## 🌅 The Darkness Is Past, And The True Light Now Shineth

John describes a change already underway, not a future hope only.

"Darkness" stands for the world's ignorance and sin before Jesus came.

"Light" stands for the truth and life Jesus actually brought.

Because of Jesus, that shift had already started in real history.

🌑 Darkness stands for sin and ignorance
🌅 Light stands for truth Jesus brought
⏳ This shift was already underway
📖 Jesus started this change in real history

## 💔 He That Saith He Is In The Light, And Hateth His Brother

John connects claiming spiritual truth directly to how someone treats other believers.

Hatred toward a fellow believer contradicts any claim to walk in God's light.

This is not about occasional disagreement or hurt feelings.

John means a settled, lasting attitude of hostility toward someone.

💔 Hatred toward a believer contradicts the claim
🔗 Light and love for others are linked
🚫 This is not ordinary disagreement
📖 A settled hatred cannot coexist with light

## 🕯️ He That Loveth His Brother Abideth In The Light

Love for other believers is the proof John keeps pointing back to.

This love is not just a feeling of affection.

It shows up in how someone actually treats people day to day.

John ties clear spiritual vision directly to this kind of love.

🕯️ Love for believers proves light is real
🙏 It is more than a warm feeling
👀 It shows up in daily treatment of others
📖 Love and clear spiritual vision go together

## 🚶 None Occasion Of Stumbling In Him

A person walking in real love does not trip others into sin.

"Occasion of stumbling" pictures something left in a path that trips up the person walking it.

Hatred creates exactly that kind of hidden obstacle for other believers.

Love, by contrast, keeps the path clear for everyone else.

🚶 Occasion of stumbling means a hidden obstacle
💔 Hatred creates that obstacle for others
🧹 Love keeps the path clear instead
📖 How we treat others can trip them up

## 🙈 Darkness Hath Blinded His Eyes

John ends this section with a picture of someone who cannot see where they are going.

Living in hatred does more than hurt relationships.

It also damages a person's own spiritual sight.

The person stuck in that darkness often does not realize they cannot see clearly.

This is why John keeps urging his readers to examine their own hearts honestly.

🙈 Hatred blinds a person's own spiritual sight
🧍 They often cannot see the damage themselves
🚫 Darkness harms more than relationships
📖 Honest self examination matters to John

# FirstJohn 2:12-14
# 👨‍👩‍👧‍👦 Written To Children, Fathers, And Young Men
---
## ✅ Your Sins Are Forgiven You For His Name's Sake

John addresses "little children" here as a term for all his readers, not just the youngest believers.

The reason given for writing to them is already settled forgiveness, not a goal still to reach.

"For his name's sake" means the forgiveness rests on who Jesus is, not on anything they did.

This gives every reader a secure starting point before John says anything else to them.

👶 Little children here means all his readers
✅ Forgiveness is already settled, not a future goal
✝️ It rests on who Jesus is, not effort
📖 John starts from security, not pressure

## 👴 Fathers, Because Ye Have Known Him That Is From The Beginning

"Fathers" refers to the most mature believers in the group John is writing to.

What John praises in them is depth of relationship, not length of religious activity.

They have known Jesus as the eternal one who existed before anything was made.

Spiritual maturity here means a deepening knowledge of who Jesus actually is.

👴 Fathers means the most mature believers
🏆 John praises depth, not just activity
♾️ They know Jesus as the eternal one
📖 Maturity means knowing Jesus more deeply

## 💪 Young Men, Because Ye Have Overcome The Wicked One

"Young men" pictures believers in the strength and fight of active spiritual battle.

What John praises in them is a real victory already won, not just effort being made.

"The wicked one" names Satan directly as a real, active opponent.

Faith here looks like actual combat with a real enemy, not a theory.

💪 Young men pictures active spiritual strength
🏆 John praises a victory already won
😈 The wicked one is Satan himself
📖 Faith includes real combat with a real enemy

## 🔄 I Have Written Unto You

John shifts from "I write" to "I have written" within the same short passage.

Many scholars believe this marks a transition from his main point to a closing summary.

Others see little difference and treat the shift as simple variation in style.

Either way, John is circling back to make sure his point has landed.

🔄 John shifts verb tense mid passage
📝 Many see it as moving toward a summary
🤷 Others see simple stylistic variation
📖 Either way, John repeats the point on purpose

## 💪 The Word Of God Abideth In You

John names the actual source of the young men's strength and victory.

Their strength did not come from willpower or natural toughness.

It came from God's word living inside them permanently, not visiting occasionally.

This is the same "abide" John has already used for staying connected to Jesus.

💪 God's word is the source of their strength
🙅 Not willpower or natural toughness
🏠 Abide means living in them permanently
📖 Strength flows from staying connected to Jesus

# FirstJohn 2:15-17
# 🌍 Love Not The World
---
## 🌍 Love Not The World, Neither The Things That Are In The World

"World" here does not mean the physical planet or the people living on it.

It means a whole system of values that runs against God, organized without him at the center.

John is not telling believers to avoid people or hate creation itself.

He is warning against loving a value system that competes directly with love for God.

🌍 World means a value system against God
🚫 Not a command to hate people or creation
⚖️ Loving the world competes with loving God
📖 The warning is about values, not geography

## 🔥 The Lust Of The Flesh, And The Lust Of The Eyes, And The Pride Of Life

John names three separate pulls this value system has on every person.

"Lust of the flesh" means craving physical pleasure beyond what God allows.

"Lust of the eyes" means wanting whatever a person sees in someone else's life.

"Pride of life" means taking pride in status, wealth, or achievement.

Together these three cover nearly every temptation a person faces.

🔥 Lust of the flesh craves physical pleasure
👀 Lust of the eyes wants what others have
🏆 Pride of life boasts in status or wealth
📖 Together they cover nearly every temptation

## ⏳ The World Passeth Away, And The Lust Thereof

John points out that everything this system offers has an expiration date built in.

"Passeth away" describes something already fading, not just something that will end far in the future.

Every pleasure, possession, and status symbol this world offers is temporary by nature.

Chasing something built to fade is a losing investment from the very start.

⏳ The world and its desires are already fading
📉 Passeth away means fading now, not just later
💸 Everything it offers is temporary by nature
📖 Chasing something temporary is a losing investment

## ♾️ He That Doeth The Will Of God Abideth For Ever

John sets up a direct contrast with what he just said about the fading world.

Doing God's will is not about occasional good deeds.

It describes a life actually lived according to what God wants.

That kind of life is the one thing John says will last forever.

♾️ Doing God's will is the opposite of fading
🙏 It means a life actually lived for God
🚫 Not occasional good deeds, but a whole pattern
📖 This is the one thing that lasts forever

# FirstJohn 2:18-23
# ⚠️ Many Antichrists
---
## ⏰ It Is The Last Time

John is not predicting an exact date for the end of history.

"The last time" describes the whole period between Jesus's first coming and his return.

Believers throughout this entire era are living in what John calls the last time.

This phrase is about a season the church is already living in, not a future surprise.

⏰ Last time means the whole church era
🚫 Not a prediction of an exact date
⏳ Believers are already living in this season
📖 A present reality, not a future shock

## 👥 Antichrist Shall Come, Even Now Are There Many Antichrists

"Antichrist" means someone who stands directly against Christ, not merely someone who ignores him.

John's readers had already heard that a figure like this was expected.

John points out that smaller versions of that same spirit were already active in his own day.

One final antichrist does not cancel out many earlier ones carrying the same spirit.

👥 Antichrist means standing directly against Christ
📜 Readers already expected a figure like this
🔍 Smaller versions were already active in John's day
📖 Many carry that spirit before any final one

## 🚪 They Went Out From Us, But They Were Not Of Us

John is describing people who had left the church community entirely.

Their leaving proved something that had already been true before they ever left.

They had never actually belonged to the group in the first place.

A person's departure can reveal what was true about them all along.

🚪 These people had left the church community
🔍 Their leaving proved a prior reality
🙅 They had never truly belonged
📖 Leaving can reveal a hidden truth

## 🕊️ Ye Have An Unction From The Holy One

"Unction" means an anointing, the way oil was once poured on someone to mark them for a role.

Here it pictures the Holy Spirit poured out on every true believer.

This anointing is not reserved for a few special teachers or leaders.

Every believer already carries this gift from God.

🕊️ Unction means an anointing by the Spirit
🫗 It pictures oil poured out to mark someone
🙏 This gift is not just for leaders
📖 Every believer already carries it

## 🧠 Ye Know All Things

This does not mean believers already understand every fact there is to know.

It means they have what they need to recognize true teaching about Jesus.

The Spirit gives a believer a working sense for what is actually true.

False teachers cannot fool someone who already carries that sense inside them.

🧠 Not total knowledge of every fact
🔍 A working sense for recognizing true teaching
🙏 This comes from the Spirit, not study alone
📖 False teaching cannot fool a Spirit led believer

## 🚫 No Lie Is Of The Truth

John states something that sounds obvious but needed saying plainly.

A lie can never actually grow out of the truth, no matter how convincing it sounds.

This matters because the false teachers John is warning about claimed to teach real truth.

John reminds his readers that truth and lies simply cannot share the same root.

🚫 A lie cannot grow out of the truth
🗣️ False teachers still claimed to teach truth
🌱 Truth and lies do not share one root
📖 A convincing lie is still not truth

## 🗣️ Who Is A Liar But He That Denieth That Jesus Is The Christ

John names the one test that actually separates true teaching from false.

Denying that Jesus is the Christ is not a small theological disagreement.

It strikes at the center of everything the Christian faith is built on.

John calls this denial exactly what it is, a lie.

🗣️ The test is what someone says about Jesus
🎯 This strikes the very center of the faith
❌ It is not a small disagreement
📖 John names this denial a lie directly

## 👥 He Is Antichrist, That Denieth The Father And The Son

John shows that denying Jesus and denying God the Father are actually the same act.

Someone cannot worship the Father and reject the Son.

The two are tied together too closely to separate that way.

Rejecting Jesus is rejecting the very God Jesus came to reveal.

👥 Denying the Son means denying the Father too
🔗 The two cannot be separated that way
🙅 Cannot reject the Son and keep the Father
📖 Jesus came to reveal the very God denied

## 🙅 Whosoever Denieth The Son, The Same Hath Not The Father

John states the negative side of this truth in the plainest terms possible.

There is no relationship with God the Father that bypasses Jesus the Son.

Someone cannot reject Jesus and still claim a real connection to God.

The two relationships stand or fall together completely.

🙅 No connection to the Father without the Son
🚫 Rejecting Jesus means missing the Father too
🔗 The two relationships stand or fall together
📖 There is no bypassing Jesus to reach God

## 🙏 He That Acknowledgeth The Son Hath The Father Also

John closes this point with the positive side of the same truth.

"Acknowledgeth" means openly confessing and accepting who Jesus actually is.

Anyone who truly receives Jesus the Son receives the Father along with him.

This is John's real hope for every reader facing these false claims.

🙏 Acknowledging Jesus means truly accepting who he is
🎁 Receiving the Son means receiving the Father too
💗 This is John's hope for his readers
📖 Confessing Jesus opens the way to the Father

# FirstJohn 2:24-29
# 🤝 Abide In Him
---
## 🏠 Let That Therefore Abide In You, Which Ye Have Heard From The Beginning

John circles back to a phrase he has already used several times in this chapter.

"That which ye have heard from the beginning" means the original teaching about Jesus they first received.

John is urging his readers to hold onto that original message instead of trading it for something newer.

New sounding teaching is not automatically better teaching.

🏠 Abide means letting the original teaching stay
📜 It points back to what they first heard
🚫 Newer sounding teaching is not automatically truer
📖 John urges holding the original message

## ♾️ The Promise That He Hath Promised Us, Even Eternal Life

John finally names the actual reward for staying faithful to this original teaching.

"Eternal life" means far more than living forever without end.

It describes a real, personal relationship with God that time itself cannot interrupt.

This promise is the whole reason John bothered writing this letter at all.

♾️ Eternal life is more than endless years
🤝 It means a real relationship with God
⏳ Time cannot interrupt that relationship
📖 This promise is John's whole reason for writing

## 🎭 Them That Seduce You

"Seduce" here means to deceive someone gradually, not to physically force them.

John is warning about false teachers working through gentle, convincing persuasion.

They do not announce themselves with an open attack.

Their danger is exactly how reasonable and appealing they sound at first.

A deception that announced itself plainly would never need a separate warning like this one.

🎭 Seduce means gradual deception, not force
🗣️ False teachers persuade gently, not attack openly
🍯 Their danger is sounding reasonable and appealing
📖 Obvious lies would not need this warning

## 🙅 Ye Need Not That Any Man Teach You

John is not telling his readers to ignore every teacher or stop learning entirely.

He already assumes his readers have the Spirit's anointing from earlier in this chapter.

That anointing means they do not need some new secret teacher claiming hidden knowledge.

The Spirit already gives every believer what they need to test what they are taught.

🙅 Not a command to ignore all teachers
🕊️ The Spirit's anointing was already given
🔑 No secret teacher with hidden knowledge is needed
📖 The Spirit equips believers to test teaching

## ✅ The Same Anointing Teacheth You Of All Things, And Is Truth, And Is No Lie

John repeats "anointing" here on purpose, tying this straight back to verse twenty.

Three things are said about this anointing in a row, each building on the last.

It teaches, it is truth itself, and it never produces a lie.

A gift this reliable does not need an outside expert to validate it.

✅ The anointing teaches, is truth, never a lie
🔗 This ties straight back to verse twenty
🛡️ It never produces a lie
📖 A gift this reliable needs no outside validation

## 🙌 That We May Have Confidence, And Not Be Ashamed Before Him At His Coming

John looks ahead to the moment Jesus actually returns.

"Confidence" here means being able to stand before Jesus without fear or hiding.

Abiding in the original teaching now is what produces that confidence later.

A life shaped by faithfulness today removes the dread of that future meeting.

🙌 Confidence means facing Jesus without fear
👣 Faithful living now shapes that future confidence
🚫 It removes the dread of his return
📖 Abiding today prepares for that coming day

## 👶 Every One That Doeth Righteousness Is Born Of Him

John ends the chapter by naming the real evidence of new spiritual life.

"Born of him" describes an actual new birth, not a gradual self improvement project.

A genuinely new birth shows itself through a changed pattern of living.

Right living does not create that new birth.

It only proves that new birth is already there.

👶 Born of him means a real new birth
🔄 It is not gradual self improvement
👣 New birth shows up in changed living
📖 Right living proves new life, never creates it
`.trim();

export const FIRST_JOHN_TWO_PERSONAL_SECTIONS = parseFirstJohnTwoRawNotes(FIRST_JOHN_TWO_RAW_NOTES);
