export type FirstPeterOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstPeterOneRawNotes(rawText: string): FirstPeterOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstPeterOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstPeter\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Peter 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstPeter\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstPeter\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Peter 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Peter 1:${startVerse}` : `1 Peter 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Peter 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_PETER_ONE_RAW_NOTES = `# FirstPeter 1:1-2
# 🧎 An Apostle Of Jesus Christ
---
## 🧎 An Apostle Of Jesus Christ

"Apostle" means someone sent out with authority from the one who sent them.

Peter was one of the twelve men Jesus personally chose and trained.

He had denied even knowing Jesus on the night before the crucifixion.

This letter opens with the highest title Jesus ever gave him.

Grace had turned a failure into a sent messenger.

🧎 Apostle means sent with Jesus's authority
🕊️ Peter was one of the twelve
😓 He once denied knowing Jesus
📖 Grace turned failure into a messenger

## 🗺️ Scattered Throughout Pontus, Galatia, Cappadocia, Asia, And Bithynia

"Scattered" translates the Greek word diaspora.

That word also describes Jews living far from Israel.

These five regions sat inside what is now modern Turkey.

Many of Peter's readers were Jewish believers pushed out by persecution.

Peter writes to people who were far from home in more ways than one.

🗺️ Scattered translates the word diaspora
🏛️ These regions sat in modern Turkey
🔥 Persecution had pushed many from home
📖 Peter writes to people far from home

## ✅ Elect According To The Foreknowledge Of God

"Elect" means chosen, the same word used for Israel.

"Foreknowledge" means God's choice did not start when someone first believed.

It reaches back before anything in history happened.

"Sprinkling of the blood" recalls the blood that sealed Israel's covenant at Sinai.

Peter borrows that old covenant picture and applies it to these new believers.

Being chosen here rests on God's plan, not a person's timing.

✅ Elect means chosen like Israel
⏳ Foreknowledge means God's choice came first
🩸 Sprinkling of blood recalls Sinai's covenant
📖 Being chosen rests on God's plan

# FirstPeter 1:3-5
# 🙌 Blessed Be The God And Father Of Our Lord Jesus Christ
---
## 🙌 Blessed Be The God And Father Of Our Lord Jesus Christ

"Blessed" here means praised, not a wish for good luck.

Peter opens this section the way many Jewish prayers began.

He praises God for something already done, not something only hoped for.

"His abundant mercy" names the reason behind every gift that follows.

Nothing in the verses ahead rests on human effort.

🙌 Blessed here means praised
📿 This follows a Jewish prayer pattern
🎁 Peter praises something God already did
📖 Abundant mercy is the reason for it all

## 👶 Begotten Again Unto A Lively Hope

"Begotten again" means given a brand new spiritual birth.

Jesus described this same idea to Nicodemus as being born again.

"Lively hope" means a hope that is alive and active.

That hope is not wishful thinking.

It rests on one specific event, Jesus rising from the dead.

A dead savior could never produce a living hope.

👶 Begotten again means a new birth
🌱 Lively hope means an active hope
⚰️ It rests on Jesus rising from death
📖 A dead savior gives no living hope

## 🛡️ An Inheritance Incorruptible, And Undefiled, And That Fadeth Not Away

"Incorruptible" means it cannot decay or be destroyed.

"Undefiled" means nothing can stain or ruin it.

"Fadeth not away" pictures a flower that never withers.

An earthly inheritance could be stolen, divided, or lost to disaster.

This inheritance is kept safe in heaven, far from every enemy.

🛡️ Incorruptible means it cannot decay
🧼 Undefiled means nothing can stain it
🌸 Fadeth not away means never withering
📖 This inheritance sits safe in heaven

## 💂 Kept By The Power Of God Through Faith Unto Salvation

"Kept" pictures a guard standing watch over something valuable.

The power doing the guarding belongs to God, not the believer.

Faith receives that protection, but faith is not its source.

"Ready to be revealed" means full salvation is coming but not fully seen yet.

Believers are guarded now for a rescue still being finished.

💂 Kept pictures a guard standing watch
💪 The power guarding it is God's
🔑 Faith receives it but is not the source
📖 The rescue is guarded now and finished later

# FirstPeter 1:6-9
# ⏳ Greatly Rejoice Though Now For A Season
---
## ⏳ Greatly Rejoice Though Now For A Season

Peter does not ask believers to pretend hard times feel good.

"For a season" reminds the reader that present suffering has a limit.

"If need be" admits that not every trial is required.

The joy described here looks past the trial to what it produces.

This joy is aimed at the future, not denial of present pain.

⏳ For a season means suffering has a limit
🙅 Peter never pretends trials feel good
🔭 This joy looks past the trial
📖 The joy is aimed at the future

## 😔 In Heaviness Through Manifold Temptations

"Heaviness" means real grief, the weight of genuine sorrow.

"Manifold" means many different kinds, not just one hardship.

The Greek word behind "temptations" here can also mean trials.

Peter is describing outside pressure and loss, not sin's pull.

Real faith and real grief are shown living together in this verse.

😔 Heaviness means real grief
🌀 Manifold means many different kinds
⚖️ This word can mean trial or temptation
📖 Real faith and real grief can coexist

## 🔥 Much More Precious Than Of Gold That Perisheth

Peter pictures faith tested the way fire tests and purifies gold.

Ancient refiners heated ore until its impurities burned away.

Even gold, the most valuable metal people knew, eventually wears out.

Tested faith outlasts something that already has a built in end.

What survives the fire is worth more than what tested it.

🔥 Faith is tested like gold in fire
⚒️ Refiners burned away the impurities
💰 Even gold eventually wears out
📖 Tested faith outlasts what tested it

## 👀 Whom Having Not Seen, Ye Love

Peter's readers had never physically seen Jesus the way the twelve disciples had.

Their love was not built on an eyewitness memory.

Faith here means trusting someone they could not verify firsthand.

Not seeing Jesus in person never stopped them from loving him fully.

👀 These readers never physically saw Jesus
❤️ Their love was not built on sight
🤝 Faith here trusts without firsthand proof
📖 Not seeing him never blocked loving him

## 🗣️ Joy Unspeakable And Full Of Glory

"Unspeakable" means a joy too large to put fully into words.

"Full of glory" means that joy already carries a taste of heaven.

This joy exists even while present suffering is still happening.

It is not the absence of pain but something bigger sitting beside it.

Peter pairs deep suffering and overflowing joy in the very same breath.

🗣️ Unspeakable means too large for words
✨ Full of glory means heaven's own weight
🌗 This joy exists alongside suffering
📖 Suffering and joy sit together here

## 🎯 Receiving The End Of Your Faith, Even The Salvation Of Your Souls

"The end" here means the goal, not a stopping point.

Faith was always headed somewhere, not just a feeling to maintain.

"Salvation of your souls" names that destination plainly.

The chain that started back in verse three leads straight to this result.

Every trial described before this verse was moving toward it.

🎯 End here means goal not a stop
🧭 Faith was always headed somewhere
💗 Salvation of souls names that destination
📖 Every trial was moving toward this

# FirstPeter 1:10-12
# 📜 The Prophets Have Enquired And Searched Diligently
---
## 📜 The Prophets Have Enquired And Searched Diligently

Old Testament prophets wrote about a salvation they did not fully understand.

"Enquired" means they actively investigated, not that they stumbled onto it.

"Searched diligently" pictures careful, repeated study, not a quick glance.

They were studying their own God given words, trying to grasp them fully.

📜 Prophets wrote about a salvation unseen
🔍 Enquired means they actively investigated
🧐 Searched diligently means careful study
📖 They studied their own God given words

## 🕊️ The Spirit Of Christ Which Was In Them

This names the Holy Spirit as the one speaking through these prophets.

"Christ" is named here even though he had not yet come in the flesh.

The same Spirit that inspired Isaiah and Daniel is the Spirit of Jesus.

This verse quietly places Christ active long before Bethlehem.

🕊️ This names the Holy Spirit in them
⏳ Christ is named before his own birth
🔗 One Spirit inspired all these prophets
📖 Christ was active long before Bethlehem

## ⚔️ The Sufferings Of Christ, And The Glory That Should Follow

The prophets knew a suffering messiah and a glorious messiah were both coming.

What confused them was how both could belong to one person.

Isaiah's suffering servant and Daniel's glorious son of man seemed hard to reconcile.

The gospel later showed both happened in the same man, in two stages.

Suffering came first at the cross, and glory follows at his return.

⚔️ Prophets saw both suffering and glory coming
❓ They could not see how both fit
✝️ Suffering and glory became two stages
📖 Suffering came first, glory follows later

## ✍️ Not Unto Themselves, But Unto Us They Did Minister

The prophets were serving a future they would not personally see.

Their words were written for believers centuries after their own lifetimes.

Peter's readers are the direct recipients of a message prepared generations earlier.

A person writing today can still serve a reader never met.

✍️ Prophets served a future unseen to them
⏳ Their message was for readers centuries later
🎁 Peter's readers are the direct recipients
📖 A writer can serve readers never met

## 👼 Which The Angels Desire To Look Into

"Desire to look into" pictures someone bending down for a closer look.

Even angels, who already stand in God's presence, do not fully grasp this.

They watch human salvation unfold with real wonder, not distant indifference.

What amazes angels is worth a person's full attention too.

👼 This pictures bending for a closer look
✨ Even angels do not fully grasp this
👀 They watch salvation unfold with wonder
📖 What amazes angels deserves full attention

# FirstPeter 1:13-16
# 👘 Gird Up The Loins Of Your Mind
---
## 👘 Gird Up The Loins Of Your Mind

Ancient robes were long and loose, easy to trip over while working.

Before running or fighting, a person tucked the robe into their belt.

"Gird up the loins" pictures that same readiness, applied to the mind.

Peter is asking for mental readiness, not physical preparation.

Scattered thinking trips a person the same way a loose robe once did.

👘 Loose robes could trip ancient walkers
🪢 Girding tucked the robe in for action
🧠 This pictures readiness in a person's mind
📖 Scattered thinking trips like a loose robe

## 🧊 Be Sober, And Hope To The End

"Sober" here means a clear, steady mind, not only avoiding alcohol.

"Hope to the end" means a hope that holds firm all the way.

"The revelation of Jesus Christ" names Christ's return as that goal.

This hope aims at a fixed future event, not wishful thinking.

🧊 Sober means a clear steady mind
🏁 Hope to the end holds firm
🔭 Christ's return is named as that goal
📖 This hope aims at a fixed future

## 🏺 Not Fashioning Yourselves According To The Former Lusts

"Fashioning" means shaping a life to match a certain pattern.

"Former lusts" points back to habits these believers lived by before Christ.

"In your ignorance" describes a time before they knew better.

Peter assumes real change becomes possible once someone knows the truth.

🏺 Fashioning means shaping life to a pattern
⏪ Former lusts were old habits before Christ
🙈 Ignorance describes not yet knowing better
📖 Knowing the truth makes real change possible

## 📜 Be Ye Holy, For I Am Holy

Peter quotes this command directly from the Old Testament law.

"Holy" means set apart, distinct from ordinary or common use.

God's own holiness is the reason given for this command.

"In all manner of conversation" means in every part of daily life.

The call to be holy was never meant for one corner of life.

📜 This quotes an Old Testament command
✂️ Holy means set apart from the ordinary
🪞 God's own holiness is the reason given
📖 Holiness was meant for all of life

# FirstPeter 1:17-21
# ⚖️ Without Respect Of Persons Judgeth
---
## ⚖️ Without Respect Of Persons Judgeth

"Respect of persons" means favoritism based on status or wealth.

God's judgment never bends for someone powerful or rich.

Peter calls God "Father" here, yet still names him as judge.

Love and impartial judgment sit together in the same verse.

⚖️ Respect of persons means favoritism
🚫 God's judgment never bends for status
👨‍👧 Peter calls God both Father and judge
📖 Love and judgment sit together here

## 🏕️ Pass The Time Of Your Sojourning Here In Fear

"Sojourning" means living as a temporary resident, not a permanent citizen.

Peter already called these readers strangers scattered across the provinces in verse one.

"Fear" here means reverence and seriousness, not terror or anxiety.

Knowing a stay is temporary should shape how seriously someone lives it.

🏕️ Sojourning means living as a temporary resident
🗺️ Peter already called them strangers earlier
🙏 Fear here means reverence not terror
📖 A temporary stay still deserves serious living

## 🔓 Not Redeemed With Corruptible Things, As Silver And Gold

"Redeemed" means bought back, the word used for freeing a captive.

"Corruptible things" means anything that wears out or loses value over time.

Even silver and gold could not pay a price this large.

"Vain conversation received by tradition" points to empty customs from their ancestors.

Some of those customs had gone unquestioned for generations.

🔓 Redeemed means bought back like a captive
💰 Corruptible things wear out over time
🪙 Even silver and gold could not pay it
📖 Old family customs were not the answer

## 🐑 As Of A Lamb Without Blemish And Without Spot

This language comes straight from the Old Testament sacrifice system.

A lamb offered to God had to be physically perfect, with no flaw.

Jesus is described using that same standard, but as a person, not an animal.

"Blemish" and "spot" both point to one idea, complete moral perfection.

🐑 This language comes from Old Testament sacrifice
✅ A sacrificial lamb had to be flawless
✝️ Jesus is described by that same standard
📖 Blemish and spot both mean moral perfection

## 📝 Foreordained Before The Foundation Of The World

"Foreordained" means planned and decided ahead of time, not decided later.

"Before the foundation of the world" pushes that plan back before creation.

"Manifest in these last times" means that plan became visible at Jesus's coming.

Jesus's death was never an emergency response to a surprise.

📝 Foreordained means planned ahead of time
🌌 This plan predates creation itself
👁️ Manifest means it became visible in history
📖 Jesus's death was never an emergency plan

## 🎯 That Your Faith And Hope Might Be In God

Peter ties this whole argument back to one simple destination.

God raising Jesus from the dead and giving him glory proves the plan worked.

That proof is the reason faith and hope can rest safely in God.

Faith resting on a finished resurrection is stronger than faith resting on an unproven promise.

🎯 This verse names the whole point
⚰️ The resurrection proves the plan worked
🙏 Faith and hope can rest in God
📖 Finished proof beats an unproven promise

# FirstPeter 1:22-25
# 🧼 Purified Your Souls In Obeying The Truth
---
## 🧼 Purified Your Souls In Obeying The Truth

"Purified" means cleansed, made fit for a holy purpose.

This cleansing came through obeying the truth, not a ritual washing.

Peter credits the Spirit as the one working that obedience in them.

A changed life is treated here as proof of real inward change.

🧼 Purified means cleansed for a holy purpose
📜 This came through obeying the truth
🕊️ The Spirit worked this change in them
📖 A changed life proves real inward change

## 🎭 See That Ye Love One Another With A Pure Heart Fervently

"Unfeigned" means genuine, without any pretending or acting.

"Fervently" pictures intense effort, like a runner straining toward the finish.

Peter is not describing a soft, occasional feeling toward other believers.

Pure hearted love here takes real, continued effort to sustain.

🎭 Unfeigned means genuine with no pretending
🏃 Fervently pictures a runner straining onward
❤️ This is not a soft occasional feeling
📖 Pure love takes real continued effort

## 🌱 Born Again, Not Of Corruptible Seed, But Of Incorruptible

"Seed" pictures the source that produces new life.

A natural human birth starts from seed that eventually decays.

This new birth starts from a different kind of seed.

That seed never decays.

"By the word of God" names that incorruptible seed plainly.

🌱 Seed pictures the source of new life
💀 Natural birth starts from seed that decays
🌿 This new birth never decays
📖 God's word is that incorruptible seed

## 🌾 All Flesh Is As Grass, And All The Glory Of Man As The Flower Of Grass

Grass in that region grew fast after rain and dried out just as fast.

"All flesh" means every human life, without exception.

"The glory of man" points to anything people are proud of, like status or beauty.

Peter is quoting Isaiah's picture of how quickly all of that fades.

What looks impressive today can be gone as fast as a wilted field.

🌾 Grass there grew and dried out fast
👤 All flesh means every human life
👑 Glory of man means pride or status
📖 Human glory fades as fast as grass

## ♾️ The Word Of The Lord Endureth For Ever

Peter sets God's word directly against the grass he just described.

Grass withers, flowers fall, and human glory fades, every single time.

God's word is the one thing in that comparison that never does.

That lasting word is the same gospel message Peter's readers had already heard.

The gospel they believed is not one more fading thing.

🌾 This word is set against fading grass
💀 Grass, flowers, and glory all fade
♾️ God's word is the one that does not
📖 The gospel is not one more fading thing
`.trim();

export const FIRST_PETER_ONE_PERSONAL_SECTIONS = parseFirstPeterOneRawNotes(FIRST_PETER_ONE_RAW_NOTES);
