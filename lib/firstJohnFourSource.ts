export type FirstJohnFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstJohnFourRawNotes(rawText: string): FirstJohnFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstJohnFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstJohn\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First John 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstJohn\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstJohn\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First John 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 John 4:${startVerse}` : `1 John 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First John 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_JOHN_FOUR_RAW_NOTES = `# FirstJohn 4:1-3
# 🕵️ Try The Spirits Whether They Are Of God
---
## 🙏 Believe Not Every Spirit

"Believe" here does not mean a vague feeling of trust.

It means putting full confidence in a claim or a teacher.

John warns against doing that automatically, with every spirit.

Not all spiritual experiences or teachings come from God.

Some come from deception.

Caution, not blind acceptance, is what faith requires here.

🙏 Believe means trusting completely
🚫 Not every spirit deserves trust
🕵️ Some spirits deceive on purpose
📖 Caution guards against deception

## 🧪 Try The Spirits

"Try" means testing something to see if it is genuine.

Ancient metalworkers tried silver and gold with fire to prove it real.

John calls for that same kind of testing on teachings about Jesus.

Not every voice that sounds spiritual should be trusted right away.

A belief about Christ can be tested against what Scripture already says.

Testing protects the church from deception that looks sincere.

🧪 Try means testing for the genuine
🔥 Like metal tested in fire
📜 Test teaching against Scripture
📖 Testing guards the church from deception

## 🌍 Many False Prophets Are Gone Out Into The World

A false prophet claims to speak for God without actually being sent by him.

John says many of these had already appeared by his own time.

This was not a future danger only.

It was already happening among the churches he wrote to.

Deception spreads the same way truth does, through teaching and influence.

Recognizing this kept believers from being caught off guard.

🗣️ False prophets claim God sent them
⏳ Already present in John's own day
🌐 Deception spreads through teaching too
📖 Believers were warned, not surprised

## ✝️ Confesseth That Jesus Christ Is Come In The Flesh

"Confesseth" means openly declaring something as true, not just privately believing it.

"Come in the flesh" means Jesus was fully and truly human, not just appearing human.

Some false teachers in John's day denied Jesus had a real physical body.

That denial was not a small detail to overlook.

Jesus being truly human was necessary for him to die for sin.

A spirit that denies this cannot be from God.

🗣️ Confesseth means openly declaring belief
👤 Come in the flesh means truly human
🚫 Some teachers denied his real body
📖 A real death required a real body

## 😈 This Is That Spirit Of Antichrist

"Antichrist" means standing directly against Christ, not just disagreeing with him.

John's readers had already heard this spirit of opposition was coming.

He tells them it had already arrived, working in the world.

This spirit works through false teaching, not only open hostility.

Denying who Jesus truly is, is the mark this spirit leaves behind.

John names the danger instead of leaving it vague.

⚔️ Antichrist means standing against Christ
⏳ Already active in John's own time
🎭 Works through false teaching
📖 Denying Jesus is its clearest mark

# FirstJohn 4:4-6
# 💪 Greater Is He That Is In You
---
## 👶 Ye Are Of God Little Children

John calls his readers "little children" out of real affection, not condescension.

"Ye are of God" names where their true identity now comes from.

This is a statement of fact, not a wish or a hope.

Their standing does not depend on how strong their faith feels that day.

It rests on whose family they already belong to.

👶 Little children shows real affection
✅ Of God names their true identity
🚫 Not based on feelings that day
📖 Identity rests on whose family they are in

## 🏆 Ye Have Overcome Them

"Overcome" means winning out over something that tried to defeat you.

"Them" points back to the false prophets and their false teaching.

John's readers had already resisted that deception successfully.

This was not a hoped for future victory.

It was already true the moment he wrote these words.

🏆 Overcome means a battle already won
😈 Them refers to the false teachers
✅ Already true, not a future hope
📖 Resisting deception counts as victory

## 💪 Greater Is He That Is In You Than He That Is In The World

John names the actual reason behind that victory.

"He that is in you" means the Holy Spirit living inside each believer.

"He that is in the world" points to the spirit of antichrist from before.

The outcome was never really in doubt once that comparison is made.

God living inside a believer outranks any power working in the world.

🕊️ He in you means the Holy Spirit
😈 He in the world means antichrist's spirit
⚖️ The comparison was never close
📖 God in you outranks the world

## 🗣️ They Are Of The World Therefore Speak They Of The World

"They" here means the false teachers John has been warning about.

Where a teacher's message comes from shapes what they end up saying.

Teaching rooted in worldly thinking will sound appealing to worldly ears.

That appeal is not proof the message is true.

Popularity and truth are not the same thing.

🗣️ They refers to the false teachers
🌍 Worldly roots shape worldly speech
👂 Worldly ears find it appealing
📖 Popularity never proves truth

## ⚖️ The Spirit Of Truth And The Spirit Of Error

John ends this section by naming two opposite sources clearly.

"The spirit of truth" refers to the Holy Spirit, who leads toward what is real.

"The spirit of error" names the opposite force, one that leads people astray.

Every teaching about Jesus ultimately traces back to one of these two sources.

There is no safe, neutral third option between them.

✅ Spirit of truth leads to what is real
❌ Spirit of error leads people astray
🔀 Every teaching traces to one source
📖 No neutral option exists between them

# FirstJohn 4:7-10
# ❤️ Love Is Of God
---
## 💗 Let Us Love One Another For Love Is Of God

John moves from testing spirits to the command he returns to again and again.

"Love is of God" means real love originates in him, not in human effort alone.

Love is not simply a strategy that happens to work well for relationships.

It flows from God's own character into the people who belong to him.

A command this central deserves close attention every single time it appears.

💗 Love originates in God himself
🚫 Not just a useful human strategy
🔄 God's character flows into his people
📖 This command repeats for a reason

## 👪 Every One That Loveth Is Born Of God And Knoweth God

"Born of God" describes a real spiritual birth, not a figure of speech.

"Knoweth God" means an actual relationship with him, not just facts.

John ties genuine love directly to both of these realities.

Someone who truly loves others shows evidence of a new birth.

That same love also proves real knowledge of God.

Love becomes the visible proof of invisible realities.

👪 Born of God means real spiritual birth
🧠 Knoweth God means real relationship
💗 Genuine love proves both realities
📖 Love makes invisible truth visible

## 🚫 He That Loveth Not Knoweth Not God

John states the negative side of that same truth without softening it.

Someone who consistently fails to love others does not actually know God.

This is not about one bad day or one moment of impatience.

It describes a settled pattern with no love in it at all.

Knowledge of God and a loveless life cannot coexist.

🚫 Not loving reveals not knowing God
🔄 This describes a settled pattern
❌ Not about one bad moment
📖 Knowing God and loveless living cannot mix

## 🎁 God Is Love

This is one of the most direct statements about God's nature in the whole Bible.

John does not say God merely has love, like a quality among others.

He says God's very nature is love itself.

Everything else God does flows out from that core identity.

Misunderstanding this phrase leads to misunderstanding almost everything else about him.

🎁 God is love, not merely loving
🏗️ Love is his core nature
🔄 Everything else flows from this
📖 Misreading this misreads God himself

## 🩸 Manifested The Love Of God Toward Us

"Manifested" means made visible in a way that could actually be seen and witnessed.

God's love was never only a hidden feeling toward humanity.

It showed up in a real historical event people could point to.

Sending his Son into the world was that visible proof.

Love this real could not stay invisible forever.

👀 Manifested means made visible
🕊️ God sent his Son as proof
📜 A real event, not just a feeling
📖 Real love could not stay hidden

## ✝️ Sent His Son To Be The Propitiation For Our Sins

"Propitiation" means a sacrifice that fully satisfies a debt or an offense owed.

Sin created a real problem between humanity and God, not just a distant feeling.

Jesus's death actually paid that debt in full.

It did not merely cover sin over for a time.

This was not humanity reaching up to God first.

God himself provided the solution, out of his own initiative.

⚖️ Propitiation means a debt fully paid
💔 Sin was a real problem, not a feeling
✝️ Jesus's death paid it in full
📖 God moved first, not humanity

# FirstJohn 4:11-13
# 🤝 We Ought Also To Love One Another
---
## 🤝 If God So Loved Us We Ought Also To Love One Another

"Ought" means a real obligation, not merely a nice suggestion to consider.

God's love toward believers is the stated reason behind that obligation.

Receiving love this costly changes what a person then owes to others.

Loving other believers is not optional extra credit for the already generous.

It is the expected response to having been loved first.

📏 Ought means a real obligation
🎁 God's love is the reason given
💗 Costly love changes what is owed
📖 Loving others is the expected response

## 👁️ No Man Hath Seen God At Any Time

John states a plain, physical fact before making his larger point.

No human being has ever looked directly at God with physical eyes.

This might seem to make God feel distant or hard to reach.

John is about to explain how that distance gets closed anyway.

The next line answers the question this one raises.

👁️ No one has seen God physically
❓ This could feel distant
🔜 John answers this right after
📖 The next line closes that gap

## 🏠 If We Love One Another God Dwelleth In Us

"Dwelleth" means living inside permanently, not visiting for a short while.

John just said no one has seen God directly.

Loving other believers is how his invisible presence becomes visible instead.

This love is not simply evidence of God's presence.

It is the actual means through which that presence becomes real to others.

🏠 Dwelleth means living inside permanently
👁️ Answers the problem of not seeing God
💗 Love makes his presence visible
📖 Love is the means, not just proof

## ✨ His Love Is Perfected In Us

"Perfected" here does not mean flawless or without any mistakes.

It means brought to its full, intended purpose.

God's love reaches its goal when it moves through a believer into someone else.

Love that stays only received and never given has not reached that goal yet.

Love was never meant to stop with the person who first received it.

✨ Perfected means reaching full purpose
🚫 Not the same as flawless
🔄 Love must move through a believer
📖 Love was never meant to stop there

## 🕊️ He Hath Given Us Of His Spirit

John now names how a believer can actually know God dwells in them.

The Holy Spirit living inside someone is the evidence, not a feeling alone.

This same proof appeared already at the end of chapter three.

John repeats it here because it answers the same question again.

A changed, loving life is what that indwelling Spirit produces.

🕊️ The Spirit is the evidence given
🔁 This proof repeats from chapter three
👣 A changed life is what it produces
📖 Love and the Spirit agree here

# FirstJohn 4:14-16
# 🕊️ He That Dwelleth In Love Dwelleth In God
---
## 👨‍👦 The Father Sent The Son To Be The Saviour Of The World

John and the other apostles were eyewitnesses to this, not secondhand reporters.

"Testify" means giving a firsthand account of something actually seen.

"Saviour of the world" means Jesus came to rescue, not merely to teach or inspire.

This sending was the Father's own plan, carried out through the Son.

Eyewitness testimony stands behind this claim, not legend built up over time.

👀 Testify means a firsthand eyewitness account
🛟 Saviour means rescue, not just teaching
📜 The Father's plan, the Son's mission
📖 Eyewitnesses stand behind this claim

## ✝️ Whosoever Shall Confess That Jesus Is The Son Of God

"Confess" means openly declaring a belief, not simply agreeing with it in private.

"Son of God" names who Jesus actually is, not merely a title of respect.

This confession is not just reciting the right words correctly.

It is a genuine declaration that shapes how someone actually lives.

God's presence is promised to the person who makes it real.

🗣️ Confess means open declaration
👑 Son of God names who Jesus is
🚫 Not just reciting words correctly
📖 God's presence follows a real confession

## 💗 We Have Known And Believed The Love That God Hath To Us

John links knowing and believing together as two parts of the same thing.

Knowing without believing is just information stored without trust.

Believing without knowing is trust with no real foundation underneath it.

God's love toward believers is the actual content both verbs point to.

Head and heart are meant to agree on the same truth.

🧠 Knowing without trust is just information
❤️ Believing without knowing lacks foundation
🔗 Both point to God's love
📖 Head and heart agree here

## 🏠 He That Dwelleth In Love Dwelleth In God And God In Him

John repeats "dwelleth" here on purpose, tying this verse back to verse twelve.

Love is not just something a believer does occasionally.

It becomes the actual place a believer lives, in a spiritual sense.

This dwelling runs in both directions at the same time.

The believer lives in God, and God lives in the believer.

🔁 Dwelleth repeats the idea from verse twelve
🏠 Love becomes a believer's dwelling place
🔄 Dwelling runs in both directions
📖 Believer in God, God in the believer

# FirstJohn 4:17-18
# 🛡️ Perfect Love Casteth Out Fear
---
## ✨ Herein Is Our Love Made Perfect

"Herein" points back to the mutual dwelling John just described.

"Made perfect" again means reaching its full, intended purpose, not flawless performance.

Love reaches that purpose when it produces real confidence rather than nagging doubt.

This perfecting is something God does in a believer over time.

It is not an achievement a believer manufactures through sheer effort alone.

👉 Herein points back to mutual dwelling
✨ Perfect means reaching full purpose
🙏 It produces confidence, not doubt
📖 God perfects this, not self effort

## ⚖️ Boldness In The Day Of Judgment

"Boldness" means approaching a moment without dread or hidden fear.

"The day of judgment" refers to the time every person will face God directly.

Many people expect that day to bring only terror.

A believer whose love has matured can face it with genuine confidence instead.

This confidence rests on Christ, not on a flawless personal record.

💪 Boldness means facing it without dread
⚖️ The day of judgment means facing God
🚫 Not based on a flawless record
📖 Confidence rests on Christ instead

## 🪞 As He Is So Are We In This World

"He" here refers to Jesus Christ himself.

John is not claiming believers become sinless or divine like Christ.

He means believers increasingly reflect Christ's love while still living in this world.

That growing likeness is what produces the boldness just mentioned.

The more a believer resembles Christ, the less reason there is to fear judgment.

🪞 He refers to Jesus Christ
🚫 Not claiming sinless perfection
🔄 Growing likeness in love, not status
📖 Likeness to Christ removes fear's grip

## 😨 There Is No Fear In Love But Perfect Love Casteth Out Fear

John names something fear and mature love cannot do together.

"Casteth out" means actively driving something away, not merely coexisting beside it.

Fear here specifically means dread of punishment, not every kind of fear.

Healthy reverence for God is not what this verse is removing.

As love matures in a believer, that specific dread has less room to remain.

😨 Dread of punishment is what is removed
🚪 Casteth out means actively driving away
🙏 Healthy reverence for God still remains
📖 Mature love leaves dread no room

## 😟 He That Feareth Is Not Made Perfect In Love

John closes this thought by naming what unfinished love still looks like.

Someone still gripped by dread of judgment has not yet matured in this love.

This is not a harsh verdict meant to shame anyone immediately.

It is an honest diagnosis meant to point toward continued growth.

Growing in love is the path out of that lingering dread.

😟 Ongoing dread signals unfinished love
🩺 This is diagnosis, not shame
🌱 Growth in love is the path forward
📖 Maturing love is still underway

# FirstJohn 4:19-21
# 👨‍👩‍👧 He Who Loveth God Love His Brother Also
---
## 💞 We Love Him Because He First Loved Us

John names where a believer's love for God actually begins.

It is not a love that originates on its own, independent of God.

It is a response to a love that moved first, long before any response was possible.

Human love for God always comes second in this sequence.

Nothing about getting this order backwards actually works.

💞 Human love is always a response
🥇 God's love moved first
🔄 The order cannot be reversed
📖 Response love follows received love

## 🤥 If A Man Say I Love God And Hateth His Brother He Is A Liar

John uses a strong, direct word here on purpose, not to be unkind.

"Liar" means the claim being made does not match the reality of a person's life.

Claiming to love God while hating a fellow believer cannot both be true.

One of those two claims has to give way to the other.

John will not let the words stand without the life to back them up.

🗣️ Liar means the claim does not match reality
❌ Love for God and hatred cannot coexist
⚖️ One claim must give way
📖 Words need a life to back them

## ❓ How Can He Love God Whom He Hath Not Seen

John asks this as a genuine, pointed question, not a rhetorical throwaway line.

Loving a brother who can actually be seen and interacted with is the easier test.

Failing that easier, visible test makes the harder, invisible claim hard to believe.

Love for God that produces no visible love for others is suspect by this logic.

Visible love is the proof the invisible claim is real.

❓ A pointed question, not rhetoric only
👀 Visible love is the easier test
🚫 Failing it undermines the harder claim
📖 Visible love proves the invisible claim

## 📜 Love His Brother Also

John closes the letter's main argument with the command stated one final time.

"This commandment" is not new information introduced here for the first time.

It has been the thread running through this entire letter from the beginning.

Loving God and loving a fellow believer were never two separate commands.

They were always meant to be lived out together, as a single instruction.

🔁 The command repeats the letter's main thread
🔗 Loving God and loving others are tied
🚫 Never meant as two separate commands
📖 One instruction, lived out together
`.trim();

export const FIRST_JOHN_FOUR_PERSONAL_SECTIONS = parseFirstJohnFourRawNotes(FIRST_JOHN_FOUR_RAW_NOTES);
