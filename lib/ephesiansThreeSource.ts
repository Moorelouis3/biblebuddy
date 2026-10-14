export type EphesiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansThreeRawNotes(rawText: string): EphesiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 3:${startVerse}` : `Ephesians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ephesians 3 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_THREE_RAW_NOTES = `# Ephesians 3:1-4
# 🔓 The Mystery Entrusted To Paul
---
## ⛓️ The Prisoner Of Jesus Christ For You Gentiles

Paul was sitting in a real Roman jail cell as he wrote this letter.

He does not call himself a prisoner of Rome.

He calls himself a prisoner of Jesus Christ.

Paul believed his chains were part of a mission, not a punishment.

That mission was bringing the gospel to Gentile readers like the Ephesians.

⛓️ Paul was a real Roman prisoner
✝️ He names Christ as the true cause
🌍 His mission reached Gentile believers
📖 Chains could not stop that mission

## 📜 The Dispensation Of The Grace Of God

Dispensation means a job handed to someone to manage on another's behalf.

Paul pictures himself as a steward entrusted with a task, not a title he grabbed.

That task was God's grace itself, given to Paul to explain and spread.

He did not earn this assignment.

It was given to him.

📜 Dispensation means a job entrusted to someone
🧑‍💼 Paul acts as a steward, not an owner
🎁 Grace was the task he carried
📖 The assignment was given, not earned

## 🧭 Given Me To You Ward

You ward is an old way of saying toward you.

Paul is telling the Ephesians this specific assignment was aimed at them.

It was not a general task for just anyone.

God pointed Paul's whole ministry in their direction on purpose.

🧭 You ward means toward you
🎯 Paul's task aimed at this church
🙅 Not a vague, general assignment
📖 God pointed this ministry at them

## 💡 By Revelation He Made Known Unto Me The Mystery

A mystery in the Bible does not mean something spooky or unsolved.

It means a truth that was hidden until God chose to reveal it.

Paul says God showed him this truth directly, not through study or guesswork.

Revelation means God pulled back a curtain Paul could never have opened himself.

💡 Mystery means a truth once hidden
🙅 Not spooky or still unsolved
👁️ Revelation means God pulled back the curtain
📖 Paul could not have found this alone

## 📝 As I Wrote Afore In Few Words

Paul reminds his readers he already touched on this earlier in the letter.

Chapters one and two already described Gentiles being brought near to God.

He is not introducing a brand new idea here.

He is circling back to expand on something he already said briefly.

📝 Paul points back to earlier in the letter
🔁 Chapters one and two already touched this
🙅 Not a brand new topic
📖 He now expands what he said briefly

## 🧠 My Knowledge In The Mystery Of Christ

Paul claims real, specific insight into this mystery of Christ.

He is not boasting about being smarter than other believers.

He is explaining that this insight was entrusted to him for a reason.

That reason was to pass it on clearly to the Ephesians.

🧠 Paul claims real insight here
🙅 Not a boast about being smarter
🎯 The insight was entrusted for a purpose
📖 That purpose was passing it on clearly

# Ephesians 3:5-7
# 🕊️ Revealed By The Spirit
---
## 📜 In Other Ages Was Not Made Known Unto The Sons Of Men

Other ages points back to the centuries before Christ came.

Pieces of this plan were hinted at in the Old Testament.

The full picture, Gentiles included equally with Israel, was never spelled out plainly before.

God had kept the complete shape of this plan under wraps until now.

📜 Other ages means the centuries before Christ
🧩 Old pieces hinted, but did not explain
🙅 The full picture stayed unclear before Christ
📖 God kept the complete plan under wraps

## 👂 Revealed Unto His Holy Apostles And Prophets By The Spirit

These apostles and prophets are New Testament figures, not Old Testament ones.

They are the first generation of church leaders who received this teaching directly.

The Holy Spirit is named as the one who actually delivered the message.

This was not something any one person figured out through clever study.

👂 These are New Testament church leaders
🆕 The first generation to receive this
🕊️ The Holy Spirit delivered the message
📖 Not discovered through clever study

## 🤝 Fellowheirs, And Of The Same Body, And Partakers Of His Promise

Paul stacks three different pictures to describe one single truth.

Fellowheirs pictures Gentiles sharing the same inheritance as Jewish believers.

Of the same body pictures them joined into one church, not a separate group.

Partakers of his promise pictures them fully included in God's covenant promises.

Three images, one point, Gentiles are not second class members.

🤝 Fellowheirs means an equal shared inheritance
👥 Same body means one church, not two
🎁 Partakers means fully included in the promise
📖 Three pictures say one thing, full equality

## ⚒️ Whereof I Was Made A Minister

Minister here means servant, not a position of status or rank.

Paul is describing a job God assigned him, not an honor he claimed.

He uses this exact word to describe his entire calling in this letter.

Serving the gospel, not ruling over it, defines what Paul believes he is.

⚒️ Minister means servant, not a rank
🎯 This was a job God assigned
🙅 Not a title Paul claimed himself
📖 Serving the gospel defines his calling

## 💪 By The Effectual Working Of His Power

Effectual working means power that actually accomplishes what it sets out to do.

Paul is not describing his own talent or effort here.

He is describing God's own power moving through him to get real results.

Every bit of Paul's ministry runs on borrowed strength, not self made ability.

💪 Effectual working means power that gets results
🙅 Not Paul's own talent or effort
🔋 God's power moved through him
📖 Paul's ministry ran on borrowed strength

# Ephesians 3:8-10
# 💎 The Unsearchable Riches Of Christ
---
## 👇 Less Than The Least Of All Saints

Paul invents an odd grammatical phrase here on purpose.

Less than the least is not normal Greek or English, it stretches the language.

Paul reached for the smallest possible phrase to describe how he saw himself.

This is not false modesty, it reflects Paul's memory of persecuting the church before his conversion.

👇 Paul invents an unusual phrase on purpose
📏 He stretches language toward the smallest size
🙅 This is not false modesty
📖 His past still shaped how he saw himself

## 💎 The Unsearchable Riches Of Christ

Unsearchable means something too vast to ever fully map out or exhaust.

Riches pictures the benefits of knowing Christ as a treasure beyond counting.

Paul is not saying these riches are hidden or hard to find.

He is saying they are too large for anyone to ever finish exploring.

💎 Unsearchable means impossible to fully map
🏔️ Riches pictures a treasure beyond counting
🔍 Not hidden, simply too vast to finish
📖 There is always more of Christ to find

## 👥 The Fellowship Of The Mystery

Fellowship here means shared participation, not a social gathering.

Paul's job was to make sure every believer could share in this truth.

That included Gentiles who had never had access to it before.

Nobody was meant to be left on the outside of this teaching.

👥 Fellowship means shared participation
🎯 Paul worked to spread this truth
🌍 Gentiles were included for the first time
📖 Nobody stays on the outside of it

## 🫙 Hid In God Who Created All Things

This does not mean God was hiding something shameful or embarrassing.

It means this plan was built into creation itself from the very beginning.

God folded this plan into the world before anyone could see it unfold.

The right time to reveal it had simply not yet arrived.

🫙 Not something shameful being hidden
🌍 Folded into creation from the start
⏳ The right time had not yet arrived
📖 God's plans can wait for their moment

## 👑 The Principalities And Powers In Heavenly Places

Principalities and powers refers to spiritual and angelic authorities, not human rulers.

These beings exist in a realm beyond what human eyes can see.

Paul says even these powerful spiritual beings are learning something new here.

What they are learning comes from watching the church, not from watching Paul alone.

👑 These are spiritual, not human rulers
👻 They exist beyond what eyes can see
👀 They are learning something new here
📖 They learn it by watching the church

## 💠 The Manifold Wisdom Of God

Manifold means many sided, like a jewel cut with many different faces.

God's wisdom is not shown in only one single way.

The church itself, Jew and Gentile joined as one body, displays that wisdom.

Every different angle of that unity reflects a different facet of God's plan.

💠 Manifold means many sided, like a jewel
🙅 Wisdom is not shown only one way
⛪ The church itself displays that wisdom
📖 Each facet reflects a piece of God's plan

# Ephesians 3:11-13
# 🚪 Boldness And Access
---
## ⏳ The Eternal Purpose Which He Purposed

Eternal purpose means this plan existed before the world was even made.

Paul already used nearly identical language back in chapter one.

Nothing about including the Gentiles was a last minute decision by God.

God had already settled on this plan long before Paul ever wrote a word.

⏳ This plan predates creation itself
🔁 Paul already said this in chapter one
🙅 Not a last minute decision
📖 God settled this long before Paul wrote

## 🚪 We Have Boldness

Boldness here is a courtroom word, describing freedom to speak without fear.

A commoner approaching a king usually needed permission and careful manners.

Believers approach God with the confidence of someone already welcome in the room.

That welcome comes through Christ, not through personal status or achievement.

🚪 Boldness is a courtroom word for confidence
👑 Commoners once needed permission before a king
🤝 Believers are already welcome in the room
📖 That welcome comes through Christ alone

## 🔑 Access With Confidence By The Faith Of Him

Access means the actual right to enter, not just permission to look from outside.

Confidence describes the settled feeling that comes with that right.

Both come through faith in Christ, not through a person's own effort.

Nobody in Christ needs to earn a way into God's presence.

🔑 Access means the right to actually enter
😌 Confidence is the settled feeling that follows
🙏 Both come through faith in Christ
📖 Nobody has to earn this entrance

## 😔 Faint Not At My Tribulations For You

Tribulations names Paul's real sufferings, including the prison chains from verse one.

Paul worried the Ephesians might feel discouraged or guilty watching him suffer on their behalf.

He tells them plainly not to lose heart over it.

His suffering was not wasted, and it was not their fault.

😔 Tribulations means Paul's real sufferings
😟 He worried they might feel discouraged
🙅 He tells them not to lose heart
📖 His suffering was never wasted or their fault

## 🏆 Which Is Your Glory

Paul reframes his suffering in one surprising sentence.

Instead of calling it a loss, he calls it their glory.

His chains proved the gospel was worth suffering for, which honored their faith.

What looked like shame to the world became honor in God's story.

🏆 Paul reframes suffering as their glory
🔄 Not a loss, but something that honors them
✝️ His chains proved the gospel was worth it
📖 Shame to the world became honor instead

# Ephesians 3:14-19
# 🙏 Paul's Prayer For Strength And Love
---
## 🙇 I Bow My Knees Unto The Father

Bowing the knees pictures a posture of deep, humble request.

Jewish prayer was usually offered standing, which makes this posture stand out.

Paul chooses this lower, more earnest position on purpose here.

This signals how seriously Paul takes the request that follows.

🙇 Bowing pictures deep, humble request
🧍 Standing was the more usual prayer posture
🎯 Paul chooses this lower posture on purpose
📖 It shows how seriously he takes this prayer

## 👪 Of Whom The Whole Family In Heaven And Earth Is Named

Father and family share the same root idea in the original language.

Every believer, living now or already with God, draws their identity from that one Father.

This family includes far more people than just the Ephesians reading this letter.

It stretches across every believer in every place and time.

👪 Father and family share one root idea
🌍 Every believer draws identity from one Father
⏳ This family spans the living and the dead
📖 It stretches across every place and time

## 💪 Strengthened With Might By His Spirit In The Inner Man

Inner man describes the unseen part of a person, their mind and will and heart.

This is different from outward circumstances like comfort or success.

Paul prays for strength that holds steady no matter what is happening outside.

That kind of strength comes only from the Spirit, not from willpower.

💪 Inner man means the unseen part of us
🙅 Different from outward comfort or success
⛈️ This strength holds steady through hard circumstances
📖 It comes from the Spirit, not willpower

## 🏠 That Christ May Dwell In Your Hearts By Faith

This prayer is for believers who already trust in Christ.

Dwell pictures someone moving in and settling down, not just visiting.

Paul is not praying for their first step of faith.

He is praying for a deeper, ongoing at home feeling of Christ in their lives.

🏠 Dwell pictures moving in, not just visiting
🙏 This prayer is for believers already saved
📈 It asks for growth, not a first step
📖 Christ settling in more fully over time

## 🌳 Rooted And Grounded In Love

Rooted pictures a plant with roots sunk deep into the soil.

Grounded pictures a building with a foundation sunk deep into the ground.

Both images describe something stable because of what lies beneath the surface.

Love is the soil and the foundation Paul wants their whole life resting on.

🌳 Rooted pictures a plant's deep roots
🏗️ Grounded pictures a building's deep foundation
💪 Both images describe hidden stability
📖 Love is what their whole life rests on

## 📐 The Breadth, And Length, And Depth, And Height

Paul stacks four different dimensions together on purpose.

He is describing the size of Christ's love, not a literal object.

No single measurement could ever capture something this large.

Stacking all four dimensions shows the love has no edge a person can find.

📐 Four dimensions describe Christ's love
🙅 Not a literal object being measured
🌌 No single measurement could capture it
📖 This love has no edge to find

## 🧠 The Love Of Christ, Which Passeth Knowledge

Passeth knowledge means this love goes beyond what the mind alone can fully grasp.

Paul is not saying believers cannot know anything about this love.

He is saying full understanding will always stay slightly out of reach.

Some truths are meant to be experienced even more than they are explained.

🧠 Passeth knowledge means beyond full understanding
🙅 Not saying nothing can be known
🎯 Full understanding stays slightly out of reach
📖 Some truths are felt more than explained

## 🌊 Filled With All The Fulness Of God

Fulness already appeared back in chapter one, describing Christ filling all in all.

Paul now prays that same fulness would fill individual believers too.

This is the highest possible goal Paul could ask for on their behalf.

Nothing beyond this exists to pray for next.

🌊 Fulness already appeared in chapter one
🔁 Paul now prays it over individual believers
🏔️ This is the highest goal Paul could ask
📖 Nothing beyond this remains to request

# Ephesians 3:20-21
# 🙌 Unto Him Be Glory
---
## 🚀 Exceeding Abundantly Above All That We Ask Or Think

Paul stacks several intensifying words together in one short burst.

Abundantly already means more than enough on its own.

Exceeding abundantly pushes that idea even further past any normal limit.

God's ability outpaces even a believer's biggest prayer or wildest imagination.

🚀 Paul stacks several intensifying words together
🎁 Abundantly already means more than enough
📈 Exceeding abundantly pushes it further still
📖 God outpaces even the biggest imagination

## 🔋 According To The Power That Worketh In Us

This power is not a new idea introduced here for the first time.

Paul already described this same resurrection power back in chapter one.

It is the same strength that raised Christ from the dead.

That power is already living and working inside every believer right now.

🔋 Not a new power introduced here
✝️ The same power that raised Christ
🔁 Paul already named it in chapter one
📖 It already works inside believers now

## ⛪ Glory In The Church By Christ Jesus

Paul ties God's glory directly to the church, not to something separate from it.

The church is not a side project while God's real glory happens elsewhere.

Believers gathered together are one actual place where that glory is seen.

That glory comes specifically through Christ Jesus, not through human achievement.

⛪ God's glory is tied to the church
🙅 Not a side project away from glory
👀 Believers together show that glory
📖 It comes through Christ, not human effort

## ⏳ World Without End

World without end is an old English way of saying forever.

It is not describing the end of the physical planet.

Paul closes his prayer by pointing straight toward eternity.

This chapter that began with a prisoner's chains ends on a note that never runs out.

⏳ World without end means forever
🌍 Not about the planet ending
🔭 Paul points straight toward eternity
📖 The chapter ends on what never runs out
`.trim();

export const EPHESIANS_THREE_PERSONAL_SECTIONS = parseEphesiansThreeRawNotes(EPHESIANS_THREE_RAW_NOTES);
