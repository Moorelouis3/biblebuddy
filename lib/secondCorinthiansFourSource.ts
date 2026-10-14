export type SecondCorinthiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansFourRawNotes(rawText: string): SecondCorinthiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 4:${startVerse}` : `2 Corinthians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 4 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_FOUR_RAW_NOTES = `# SecondCorinthians 4:1-3
# 🤲 Honest Ministry In The Open
---
## 🤲 Therefore Seeing We Have This Ministry

"This ministry" points back to the work named in chapter three.

Paul had just explained that God made him a servant of a new covenant.

That covenant writes God's law on hearts instead of stone.

Paul draws his strength from a calling, not from his own skill.

📜 This ministry means the new covenant work

🤲 God gave Paul this calling as a gift

💪 His strength comes from God, not himself

📖 Chapter three already explained this calling

## 😓 As We Have Received Mercy, We Faint Not

"Faint" here means to give up or lose heart completely.

Paul says receiving mercy is the reason he keeps going.

He remembers this work was never something he earned.

Remembering mercy keeps a person steady through hard ministry.

😓 Faint means give up or lose heart

🎁 Mercy came as a gift, not a wage

💪 Mercy is why Paul keeps going

📖 Remembering mercy keeps a person steady

## 🙈 Renounced The Hidden Things Of Dishonesty

"Renounced" means Paul turned his back on something.

"Hidden things of dishonesty" means secret, shameful tricks.

Some preachers in Corinth used tricks like this for money.

Paul refuses that path on purpose.

He works in the open instead.

🙈 Renounced means turned his back on

🤐 Hidden things means secret shameful tricks

💰 Some preachers used tricks for money

➡️ Paul chooses to work in the open

## 🦊 Not Walking In Craftiness

"Craftiness" means clever tricks used to manipulate someone.

Some traveling teachers in Corinth used clever arguments to win a following.

Paul will not use that approach, even to gain more influence.

He trades cleverness for plain honesty.

🦊 Craftiness means clever manipulation

🗣️ Other teachers used tricks to gain followers

🚫 Paul refuses that method completely

📖 Plain honesty matters more than influence

## 📖 Handling The Word Of God Deceitfully

"Handling deceitfully" means twisting scripture to say what you want.

Paul could have bent the message to make it easier to accept.

Instead he teaches it exactly as it stands.

Faithfulness to the message matters more than approval.

📖 Handling deceitfully means twisting scripture

🎭 Bending the message would be easier

🚫 Paul teaches it exactly as it stands

➡️ Faithfulness matters more than approval

## 🧭 Commending Ourselves To Every Man's Conscience

"Conscience" means the inner sense that tells someone right from wrong.

Paul is not simply asking people to trust his claims about himself.

He wants his life and words to prove themselves true.

He lives every day aware that God is watching.

🧭 Conscience senses right and wrong inside

👀 Paul wants his life to prove itself

🙏 He lives aware that God is watching

📖 A true life speaks louder than a claim

## 👁️ If Our Gospel Be Hid, It Is Hid To Them That Are Lost

This does not mean Paul failed to explain the gospel clearly.

It means some people refuse to see what is plainly in front of them.

The problem sits with the hearer, not with the message.

A closed message and a closed heart are two very different things.

👁️ Hid does not mean Paul explained it poorly

🙅 Some simply refuse to see it

❤️‍🔥 The problem sits with the hearer

📖 A closed heart differs from a closed message
# SecondCorinthians 4:4-6
# 💡 The Light Of The Gospel
---
## 👹 The God Of This World

This title refers to Satan, not to God himself.

Satan is given real but limited power over a fallen world.

Paul names him this way so the reader is not confused about who is speaking.

The true God is named plainly just two verses later.

👹 This title refers to Satan

⏳ His power is real but limited

🔀 Paul separates this title from the true God

📖 Two very different powers are named here

## 🙈 Hath Blinded The Minds Of Them Which Believe Not

This blinding is spiritual, not physical.

It describes a mind that refuses to accept what it already sees.

Unbelief here is resistance, not simple ignorance.

A person can hear the truth clearly and still choose not to receive it.

🙈 Blinded describes a spiritual condition here

🚫 Unbelief is resistance, not ignorance

👂 A person can hear truth and refuse

📖 Choosing not to believe still has real consequences

## 🪞 Who Is The Image Of God

"Image" means an exact likeness, not a rough copy.

Christ is not simply a messenger sent from God.

Looking at Christ shows exactly who God is.

This is the same word used of Adam in Genesis, now fulfilled perfectly in Christ.

🪞 Image means an exact likeness

👤 Christ is more than a messenger

👀 Looking at Christ reveals who God is

📖 This fulfills the pattern first shown in Genesis

## 🗣️ We Preach Not Ourselves, But Christ Jesus The Lord

Some teachers in Corinth built their own reputation first.

Paul draws the opposite line here on purpose.

His message centers on Christ, not on himself.

This single line sums up his entire approach to ministry.

🗣️ Some teachers built their own reputation

🎯 Paul centers his message on Christ

🚫 Not on his own name or status

📖 This line sums up his whole approach

## 🙇 Ourselves Your Servants For Jesus' Sake

"Servants" here means bond servants, people fully devoted to another's household.

Paul claims real authority as an apostle, yet calls himself a servant.

That authority is used to serve the Corinthians, not to rule over them.

Christ is the reason behind both the serving and the authority.

🙇 Servants means fully devoted household workers

👑 Paul holds real authority as an apostle

🤝 That authority is used to serve others

📖 Christ is the reason behind both

## 🌅 God, Who Commanded The Light To Shine Out Of Darkness

This line calls back to the very first words God spoke in Genesis.

The same God who created physical light now creates light inside a person.

That inner light is not something a person can produce on their own.

Creation and conversion come from the exact same voice.

🌅 This recalls God's first words in Genesis

💡 The same God now creates light inside people

🚫 A person cannot produce this light alone

📖 Creation and conversion share the same source

## ✨ In The Face Of Jesus Christ

This phrase does not describe a literal glowing face.

It means God's full character is now visible through the person of Jesus.

Moses once saw only a reflection of God's glory on a mountain.

Now that same glory is seen plainly in Christ.

✨ This is not a literal glowing face

👤 It means God's character revealed in Jesus

🪨 Moses only saw a reflection on a mountain

📖 Christ reveals that glory plainly
# SecondCorinthians 4:7-12
# 🏺 Treasure In Earthen Vessels
---
## 🏺 We Have This Treasure In Earthen Vessels

"Earthen vessels" means plain clay jars, cheap and easily broken.

The treasure is the gospel message Paul just described.

A priceless treasure is placed inside the cheapest possible container.

Think of a diamond stored inside a paper cup instead of a locked case.

🏺 Earthen vessels means cheap clay jars

💎 The treasure is the gospel itself

📦 A priceless gift sits in a fragile container

📖 The container was never the point

## 💪 That The Excellency Of The Power May Be Of God

A clay jar gets no credit for what it carries.

Paul's own weakness makes it obvious where the real power comes from.

If Paul looked strong and impressive, people might credit him instead of God.

The cracks in the jar let the light show through clearly.

💪 A clay jar gets no credit

👀 Paul's weakness points attention away from himself

🙅 Strength would risk stealing credit from God

📖 Human weakness can make God's power obvious

## 😣 Troubled On Every Side, Yet Not Distressed

"Troubled" means under real outside pressure from every direction.

"Distressed" means crushed to the point of having no way out.

Paul admits the pressure is constant and real.

He denies that the pressure has ever cornered him completely.

😣 Troubled means pressure from every direction

🧱 Distressed means crushed with no way out

✅ Paul admits the pressure is real

📖 Pressure has never fully cornered him

## 🤔 Perplexed, But Not In Despair

"Perplexed" means genuinely unsure what to do next.

"Despair" means giving up hope entirely.

Paul openly admits confusion about his circumstances at times.

Confusion about the next step is not the same as losing hope.

🤔 Perplexed means unsure what to do next

🕳️ Despair means giving up hope entirely

🗣️ Paul admits real confusion at times

📖 Confusion is not the same as hopelessness

## 🏃 Persecuted, But Not Forsaken

"Forsaken" means abandoned completely, left with no help at all.

Paul faced real, ongoing persecution for preaching the gospel.

He never once says that persecution means God left him.

The attacks were real, but God's presence never left with them.

🏃 Persecuted means actively hunted and opposed

🚫 Forsaken means abandoned with no help

🛡️ Attacks were real, but God stayed near

📖 Persecution never meant abandonment

## 🧱 Cast Down, But Not Destroyed

"Cast down" means knocked to the ground by a hard blow.

"Destroyed" means permanently ended, with nothing left to rebuild.

Paul gets knocked down more than once in his ministry.

Every time, he gets back up again.

🧱 Cast down means knocked down hard

💥 Destroyed means permanently ended

🔁 Paul keeps getting back up

📖 A hard fall is not the end

## ☠️ Always Bearing About In The Body The Dying Of The Lord Jesus

"Bearing about" means carrying something everywhere, all the time.

Paul's body constantly shows the same kind of suffering Jesus carried to the cross.

This is not a one time event but a daily pattern of his life.

His suffering connects him to Christ instead of separating him from Christ.

☠️ Bearing about means carrying constantly

✝️ His suffering mirrors the suffering of Jesus

📆 This is a daily pattern, not one event

📖 Suffering connects Paul to Christ

## 🌱 That The Life Also Of Jesus Might Be Made Manifest

"Manifest" means made plainly visible to everyone watching.

Paul's suffering is not the whole story here.

Resurrection life shows up clearly against the backdrop of that suffering.

A light is easiest to see in a dark room.

🌱 Manifest means made plainly visible

🌑 Suffering is not the whole story

✨ Resurrection life shows up against that darkness

📖 Light shows clearest in a dark room

## 💀 Alway Delivered Unto Death For Jesus' Sake

This is not a literal daily execution.

It describes facing constant, real danger because of his preaching.

Paul lived with death as a genuine possibility, not a distant idea.

That risk never stopped him from continuing the work.

💀 This describes constant real danger

🗣️ The danger came from his preaching

⚠️ Death felt like a real possibility to him

📖 Risk never stopped the work

## ⚖️ Death Worketh In Us, But Life In You

Paul's hardship is not wasted or pointless suffering.

His suffering in ministry becomes spiritual benefit for the believers he serves.

He absorbs the cost so the Corinthians can receive the gain.

That exchange is the shape of ministry itself.

⚖️ Paul's suffering is not wasted

🎁 It becomes benefit for the believers he serves

🤝 He absorbs the cost for their gain

📖 This exchange is the shape of ministry
# SecondCorinthians 4:13-15
# 🙏 The Same Spirit Of Faith
---
## 📜 We Having The Same Spirit Of Faith

This line quotes Psalm one hundred sixteen directly.

Paul claims the very same bold faith that psalm describes.

That faith spoke even while surrounded by real trouble.

Paul says his own faith follows that exact same pattern.

📜 This line quotes Psalm one hundred sixteen

🙏 Paul claims that same bold faith

😣 That psalm was written during real trouble

📖 Paul's faith follows the same pattern

## 🗣️ I Believed, And Therefore Have I Spoken

Genuine belief does not stay silent for long.

The psalmist spoke because what he believed was too real to hide.

Paul applies that same pattern to his own preaching.

What fills the heart eventually comes out through the mouth.

🗣️ Real belief rarely stays silent

📜 The psalmist spoke from genuine belief

🎯 Paul applies that pattern to himself

📖 What fills the heart comes out the mouth

## ⬆️ He Which Raised Up The Lord Jesus Shall Raise Up Us Also

This is the hope underneath everything Paul listed earlier in this chapter.

The resurrection is not only a past event about Jesus.

It is a future promise that includes every believer too.

That future hope is what makes present suffering bearable.

⬆️ This is the hope under every hardship listed

✝️ The resurrection is not only about Jesus

🙌 It is a future promise for every believer

📖 Future hope makes present suffering bearable

## 🤝 Shall Present Us With You

"Present" means to formally bring someone forward, the way a guest is presented to a king.

Paul is not picturing a private, solitary reward.

He pictures himself standing together with the Corinthians he served.

Their shared future is part of his present hope.

🤝 Present means formally brought forward

👑 Think of a guest presented to a king

👥 Paul pictures standing with the Corinthians

📖 Their shared future shapes his present hope

## 🌊 That The Abundant Grace Might Redound To The Glory Of God

"Redound" means to flow back and overflow onto something else.

Grace reaching many people through Paul's ministry does not stop with them.

It flows onward until it reaches back to God's own glory.

The goal was never Paul's reputation or even the Corinthians' comfort alone.

🌊 Redound means to flow back and overflow

🎁 Grace reaches many people through this ministry

🔁 It flows onward toward God's glory

📖 God's glory was always the real goal
# SecondCorinthians 4:16-18
# ⚖️ An Eternal Weight Of Glory
---
## 🏃 For Which Cause We Faint Not

This line echoes the same phrase that opened the whole chapter.

Paul has just listed real suffering, confusion, and constant danger.

None of it has talked him into giving up.

The reasons for pressing on only grow stronger as the chapter continues.

🏃 This echoes the opening line of the chapter

📋 Real suffering was just listed in detail

🚫 None of it produced giving up

📖 The reasons to continue keep growing

## 👴 Though Our Outward Man Perish

"Outward man" means the physical body, the part that ages and wears down.

Paul's body has already taken real damage from the hardships just listed.

He admits that decline plainly, without pretending otherwise.

Honesty about physical decline does not threaten his hope.

👴 Outward man means the physical body

💥 Real damage has already happened to it

🗣️ Paul admits this decline plainly

📖 Honesty about decline does not threaten hope

## 🌱 Yet The Inward Man Is Renewed Day By Day

"Inward man" means the inner self, the part that trusts and hopes in God.

A body can weaken while the spirit inside it actually grows stronger.

This renewal happens daily, not just once at conversion.

Two opposite directions run at the same time in one person.

🌱 Inward man means the inner self

📈 It can grow stronger as the body weakens

📆 Renewal happens daily, not only once

📖 Two directions run together in one life

## ⏳ Our Light Affliction, Which Is But For A Moment

This does not mean Paul's suffering was minor.

Chapter eleven later lists beatings, shipwrecks, and constant danger.

"Light" and "a moment" only make sense next to eternity.

Compared to forever, even years of real suffering look brief.

⏳ This does not mean the suffering was minor

📋 Chapter eleven lists severe hardships later

♾️ Light only makes sense next to eternity

📖 Years of suffering look brief against forever

## 👑 A Far More Exceeding And Eternal Weight Of Glory

"Weight of glory" is an old picture connecting honor with something heavy and solid.

Suffering in this life is pictured as light by comparison.

Glory in the next life is pictured as something with real weight.

The scale tips enormously in favor of what is coming.

👑 Weight of glory pictures honor as something heavy

🪶 Present suffering is light by comparison

⚖️ Future glory carries real weight

📖 The scale favors what is still coming

## 👀 The Things Which Are Seen Are Temporal

"Temporal" means lasting only for a limited time.

Paul is not saying visible things are fake or worthless.

He is saying they do not last forever.

Every hardship Paul listed in this chapter falls into that same category.

👀 Temporal means lasting a limited time

🚫 Visible things are not called fake

⏳ They simply do not last forever

📖 Even hardship fits inside that category

## ♾️ But The Things Which Are Not Seen Are Eternal

This verse closes the chapter by naming the whole pattern plainly.

What a person focuses on shapes what they can endure.

Paul has trained his attention on what lasts forever.

That single choice explains everything else written in this chapter.

♾️ This closes the chapter's whole pattern

👁️ Focus shapes what a person can endure

🎯 Paul trained his attention on what lasts

📖 That choice explains the rest of the chapter
`.trim();

export const SECOND_CORINTHIANS_FOUR_PERSONAL_SECTIONS = parseSecondCorinthiansFourRawNotes(SECOND_CORINTHIANS_FOUR_RAW_NOTES);
