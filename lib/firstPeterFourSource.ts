export type FirstPeterFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstPeterFourRawNotes(rawText: string): FirstPeterFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstPeterFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstPeter\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Peter 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstPeter\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstPeter\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Peter 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Peter 4:${startVerse}` : `1 Peter 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Peter 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_PETER_FOUR_RAW_NOTES = `# FirstPeter 4:1-3
# 🛡️ Arm Yourselves Likewise With The Same Mind
---
## 🩸 Forasmuch Then As Christ Hath Suffered For Us In The Flesh

"Forasmuch" is an old word meaning because.

Peter ties this whole chapter to what he just said about Christ.

Christ already suffered in the body and died for his people.

That finished fact is the reason for every command that follows.

Peter never commands without first pointing back to what Christ did.

🩸 Forasmuch means because, in old English
✝️ Points back to Christ's own suffering
🔗 Ties this chapter to the last one
📖 Every command rests on what Christ did

## 🛡️ Arm Yourselves Likewise With The Same Mind

"Arm" pictures a soldier putting on armor before a battle.

Peter is not describing a physical weapon here.

He means preparing the mind the same determined way.

"Likewise" means the same way Christ faced suffering.

Peter wants that same readiness in his readers now.

⚔️ Arm pictures a soldier readying for battle
🧠 The battle here is fought in the mind
🔁 Likewise means the same way Christ did
📖 Peter wants that same readiness now

## 🚫 For He That Hath Suffered In The Flesh Hath Ceased From Sin

This does not mean physical pain magically ends a person's sinning.

Peter is describing someone who has died to their old way of life.

Christ's own suffering led to a complete break from sin.

Peter expects that same break to show up in his readers.

Suffering with Christ in mind changes what a person wants.

🚫 This does not mean pain erases sin
💀 It pictures dying to an old life
✝️ Christ's suffering led to a complete break
📖 Suffering with Christ changes what someone wants

## 🎯 That He No Longer Should Live The Rest Of His Time In The Flesh To The Lusts Of Men

"The lusts of men" means the selfish cravings most people chase after.

Peter contrasts two different ways to spend the time left in this life.

One path chases whatever the body or crowd wants in the moment.

The other follows the will of God instead.

Peter is asking for a complete change in direction, not a small tweak.

🎯 Lusts of men means selfish human cravings
⏳ The question is how remaining time gets spent
🔀 Two paths are set against each other
📖 Peter asks for a full change in direction

## 🍷 The Time Past Of Our Life May Suffice Us To Have Wrought The Will Of The Gentiles

"Suffice" means enough, more than enough already.

"Wrought the will of the Gentiles" means living fully by Gentile custom.

Many of Peter's readers had once lived exactly that way before following Christ.

Peter is saying that old season has already used up its welcome.

There is no need to return to a life already lived in full.

✅ Suffice means already more than enough
🔄 Means living fully by Gentile custom
👥 Many readers once lived exactly that way
📖 That old season already used up its welcome

## 🍇 When We Walked In Lasciviousness, Lusts, Excess Of Wine, Revellings, Banquetings, And Abominable Idolatries

"Lasciviousness" means unrestrained sexual immorality.

Peter names five other behaviors alongside it, all common in pagan life.

"Revellings" and "banquetings" describe wild drinking parties tied to pagan worship.

These feasts were often held in honor of Roman or Greek gods.

Walking away from all of this made a believer stand out instantly.

📜 Lists six behaviors from pagan life
💔 Lasciviousness means unrestrained sexual immorality
🍷 Revellings and banquetings were wild worship parties
📖 Walking away made a believer stand out

# FirstPeter 4:4-6
# 😲 Wherein They Think It Strange
---
## 😲 Wherein They Think It Strange That Ye Run Not With Them To The Same Excess Of Riot

"Wherein" means because of this change in you.

Old friends are confused and shocked by the change.

"Excess of riot" means the same reckless partying from the verse before.

Peter's readers used to join in, and now they do not.

That absence is loud enough that people notice and react.

😲 Old friends are shocked by the change
🍾 Excess of riot means reckless partying
🚶 Readers used to join in, now do not
📖 Absence from sin gets noticed by others

## 🗣️ Speaking Evil Of You

"Speaking evil" means spreading insults behind someone's back.

Old friends did not just feel confused, they struck back with words.

Living differently from a surrounding culture usually draws criticism, not applause.

Peter already warned his readers to expect exactly this kind of reaction.

Standing apart from a crowd rarely goes unnoticed.

🗣️ Speaking evil means spreading insults behind someone's back
😠 Confusion turned into open criticism
🚫 Standing apart draws attention from a crowd
📖 Peter already warned this would happen

## ⚖️ Who Shall Give Account To Him That Is Ready To Judge The Quick And The Dead

"The quick" is an old word for the living, not people moving fast.

This phrase names everyone who has ever lived, living or dead.

Peter reminds his readers that their critics answer to someone bigger than them.

God, not public opinion, is the one keeping the final record.

That truth takes the sting out of being mocked by neighbors.

⚖️ Quick is an old word for the living
🌍 This covers everyone who has ever lived
👑 Critics answer to God, not themselves
📖 God's judgment outweighs public opinion

## ⚰️ For This Cause Was The Gospel Preached Also To Them That Are Dead

"Them that are dead" likely means people who have since died.

Many scholars believe this points back to those who heard the gospel while alive.

This connects to the same difficult verses back in chapter three.

Peter does not spell out every detail of this verse.

What stays clear is that the gospel's reach includes people already gone.

⚰️ Dead likely means people already gone
📜 Many link this to chapter three
❓ Not every detail is spelled out
📖 Even the dead were once reached

## 🔄 That They Might Be Judged According To Men In The Flesh, But Live According To God In The Spirit

"Judged according to men in the flesh" points to ordinary human death.

"Live according to God in the spirit" points to life that continues with God.

Peter draws a sharp line between those two kinds of life.

Physical death was never the end of the story for these believers.

Peter closes this thought by looking past what the body experiences.

⚰️ Judged in the flesh points to ordinary death
🕊️ Living in the spirit continues with God
🔀 Peter draws a line between two lives
📖 Physical death was never the final word

# FirstPeter 4:7-9
# ⏳ The End Of All Things Is At Hand
---
## ⏳ But The End Of All Things Is At Hand

"At hand" means close and approaching, not already arrived.

Peter is not naming an exact date for this ending.

He is pointing to a settled certainty that history is heading somewhere.

That certainty is meant to shape how believers live right now.

Urgency, not fear, is the point Peter wants his readers to feel.

⏳ At hand means close, not already here
📅 No exact date is given
🧭 History is heading toward a real end
📖 That certainty should shape life now

## 🙏 Be Ye Therefore Sober, And Watch Unto Prayer

"Sober" here means clear minded, not drunk.

"Watch" means staying alert, the way a guard stays awake at night.

Peter pairs these two words because a clear mind feeds real prayer.

A distracted or foggy mind drifts easily away from prayer.

Both words describe the same kind of steady attention.

🧠 Sober means clear minded, not drunk
👀 Watch means staying alert like a guard
🙏 Clear minds feed real prayer
📖 Both words describe steady attention

## ❤️ And Above All Things Have Fervent Charity Among Yourselves

"Charity" in this older English means selfless love, not a donation.

"Fervent" means intense and unwavering, not occasional or halfhearted.

Peter ranks this command above every other instruction in the list.

Love for other believers was meant to be the community's defining mark.

This is not a mild suggestion tucked among many others.

❤️ Charity means selfless love, not money given
🔥 Fervent means intense, not occasional
🥇 Peter ranks this above every other command
📖 Love was meant to define the community

## 🧺 For Charity Shall Cover The Multitude Of Sins

This does not mean love earns forgiveness from God.

It points to how love absorbs offenses between people day to day.

A community full of real love overlooks small faults instead of dwelling on them.

Grudges and bitterness have far less room to grow in a community like that.

Love becomes the thing that keeps relationships from falling apart over small wrongs.

🚫 This is not about earning forgiveness from God
🤝 Love absorbs offenses between people
🌱 Grudges have less room to grow
📖 Love keeps relationships from falling apart

## 🏠 Use Hospitality One To Another Without Grudging

Hospitality in this culture meant opening your own home to traveling believers.

There were few inns, and the ones that existed were often unsafe.

Christian hospitality supplied real physical safety for people on the move.

"Without grudging" means giving that welcome freely, not with silent resentment.

A grudging welcome defeats the whole purpose of offering it.

🏠 Hospitality meant opening your home to travelers
🛑 Inns were rare and often unsafe
🛡️ Christian homes gave real safety
📖 A grudging welcome defeats its purpose

# FirstPeter 4:10-11
# 🎁 As Every Man Hath Received The Gift
---
## 🎁 As Every Man Hath Received The Gift, Even So Minister The Same One To Another

"The gift" here means a spiritual ability God gives for serving others.

Peter assumes every believer already has at least one such gift.

"Minister" means to actively use that gift for someone else's benefit.

A gift that stays unused serves no one, including the person holding it.

These gifts were never meant to stay private.

🎁 The gift means a spiritual ability from God
👤 Every believer already has at least one
🤲 Minister means using it for someone else
📖 Gifts were never meant to stay private

## 🧮 As Good Stewards Of The Manifold Grace Of God

A "steward" manages something valuable that belongs to someone else.

These gifts belong to God, not to the person holding them.

"Manifold" means many and varied, not just one single kind.

God's grace shows up in more than one shape across the church.

A good steward uses what was entrusted well, without claiming ownership.

🧮 Steward means managing something that belongs to another
🎁 Gifts belong to God, not their holder
🌈 Manifold means many different kinds
📖 A steward never claims ownership

## 🗣️ If Any Man Speak, Let Him Speak As The Oracles Of God

"Oracles of God" means words carrying God's own authority, not casual opinion.

Peter is describing someone teaching or speaking inside the church.

That kind of speech should sound like it carries real weight.

It should never be used as a platform for someone's own cleverness.

The speaker's own ideas take a back seat to God's actual message.

🗣️ Oracles of God means words with real authority
⛪ This applies to speaking inside the church
⚖️ Speech should carry real weight, not cleverness
📖 God's message matters more than the speaker's ideas

## 💪 If Any Man Minister, Let Him Do It As Of The Ability Which God Giveth

"Ability which God giveth" means even practical strength is a gift, not something earned.

This line pairs with the command just before it on purpose.

Speaking gifts and serving gifts both trace back to the same source.

A person serving others should not take personal credit for their own competence.

Both speaking and serving point back to the same giver.

🔗 This verse pairs with the one before
💪 Ability itself is a gift from God
🚫 No one earns credit for their own strength
📖 Speaking and serving share the same giver

## 👑 That God In All Things May Be Glorified Through Jesus Christ, To Whom Be Praise And Dominion For Ever And Ever

Every gift and every act of service points back to God.

That is the one reason behind everything Peter just listed.

"Dominion" means total ruling power, not shared with anyone else.

Peter ends this section with worship instead of another instruction.

The whole purpose of using a gift well is God receiving the glory.

🎯 This names the real reason gifts exist
👑 Dominion means total ruling power
🙌 Peter ends with worship, not instruction
📖 Using a gift well glorifies God

# FirstPeter 4:12-14
# 🔥 Beloved, Think It Not Strange
---
## 🔥 Beloved, Think It Not Strange Concerning The Fiery Trial Which Is To Try You

"Fiery trial" borrows the picture of metal being refined over intense heat.

That heat is not meant to destroy the metal, only to purify it.

Peter already used this exact picture back in chapter one.

He is warning his readers ahead of time not to expect an easy life.

Real suffering was coming, and Peter wanted no one caught by surprise.

🔥 Fiery trial pictures metal being refined
✨ The heat purifies, it does not destroy
🔁 Peter used this picture back in chapter one
📖 No reader should be caught by surprise

## 🤔 As Though Some Strange Thing Happened Unto You

This does not mean suffering is rare or unusual for a believer.

Peter is correcting a natural but wrong assumption his readers might have.

Persecution was not some bizarre accident outside God's plan.

It was something Peter expected his readers to face from the start.

Expecting suffering changes how a person responds when it actually arrives.

🚫 Suffering is not rare for a believer
🤔 Peter corrects a natural wrong assumption
📋 Persecution was expected, not accidental
📖 Expecting it changes how someone responds

## 😊 But Rejoice, Inasmuch As Ye Are Partakers Of Christ's Sufferings

"Partakers" means sharing directly in something, not just standing nearby.

"Inasmuch as" means to the exact degree that something is true.

Suffering for following Christ connects a believer to Christ's own experience.

That connection, not the pain itself, is the actual reason for rejoicing.

Peter is not asking anyone to enjoy pain for its own sake.

🤝 Partakers means sharing directly in something
📏 Inasmuch as means to that same degree
✝️ Suffering connects a believer to Christ
📖 The connection is the reason for joy

## 🌟 That, When His Glory Shall Be Revealed, Ye May Be Glad Also With Exceeding Joy

"His glory shall be revealed" points forward to Christ's return.

Present suffering and future glory are linked together in this sentence.

"Exceeding joy" means joy that goes far past the ordinary kind.

The suffering now is not the final word on how the story ends.

Peter keeps pointing his readers toward what is still coming.

🌟 Points forward to Christ's return
🔗 Links present suffering to future glory
🎉 Exceeding joy means joy past the ordinary
📖 Suffering is not the final word

## 😊 If Ye Be Reproached For The Name Of Christ, Happy Are Ye

"Reproached" means insulted or shamed publicly for being a believer.

"Happy" again means blessed by God, not simply feeling cheerful.

Being mocked for Christ's name was common for Peter's first readers.

Peter flips the expected reaction completely upside down.

Shame from people and blessing from God can happen at the exact same time.

😠 Reproached means insulted publicly for being a believer
😊 Happy means blessed, not just cheerful
🔄 Peter flips the expected reaction completely
📖 Shame from people, blessing from God, together

## 👻 For The Spirit Of Glory And Of God Resteth Upon You

"Resteth upon" pictures something settling down and staying in place.

This is not a quick, passing visit from God's Spirit.

The Spirit remains present through the hardship, not just before or after it.

Peter is naming a real presence, not just a comforting idea.

God's Spirit stays closest exactly when the pressure is highest.

🛋️ Resteth upon means settling in and staying
⏳ This is not a quick, passing visit
🫂 The Spirit stays through the hardship
📖 God stays closest when pressure is highest

# FirstPeter 4:15-16
# ⚠️ But Let None Of You Suffer As A Murderer
---
## ⚠️ But Let None Of You Suffer As A Murderer, Or As A Thief, Or As An Evildoer

Peter lists three specific categories of real, deserved punishment.

A murderer, a thief, and an evildoer all suffer because of actual guilt.

Peter draws a sharp line between that kind of suffering and suffering for Christ.

Not all suffering carries the same meaning or the same honor.

Mixing these two kinds of suffering together would miss Peter's whole point.

⚠️ Peter lists three categories of real guilt
🔪 A murderer, thief, and evildoer suffer justly
✂️ He draws a line between guilt and faith
📖 Not all suffering carries the same meaning

## 🗣️ Or As A Busybody In Other Men's Matters

"Busybody" describes someone who meddles constantly in other people's business.

This behavior causes real friction and makes enemies unnecessarily.

Peter adds this to the list right alongside crimes like theft.

Needless meddling was apparently a real problem in these churches.

Suffering caused by poor behavior still is not suffering for Christ.

🗣️ Busybody means someone who meddles constantly
💥 It causes real friction unnecessarily
📋 Peter lists it beside actual crimes
📖 That suffering is not suffering for Christ

## ✝️ Yet If Any Man Suffer As A Christian, Let Him Not Be Ashamed

"Christian" was still a new label when Peter wrote this letter.

Outsiders in Antioch first used the word, likely as an insult.

It meant something like "little Christ" or "follower of that Christ person."

Peter tells his readers to wear that label proudly instead of hiding from it.

Shame has no place attached to that specific name.

✝️ Christian was still a new label here
😏 Outsiders in Antioch coined it as mockery
🏷️ It meant something like little Christ
📖 Peter says wear that name without shame

## 🙌 But Let Him Glorify God On This Behalf

"On this behalf" means specifically because of being called a Christian.

Peter turns a painful label into an occasion for worship.

The insult becomes a moment to point back to God instead.

This is the same pattern Peter has repeated through the whole letter.

Suffering never gets the final word when God gets the glory instead.

🙌 On this behalf means because of that name
🔄 Peter turns an insult into worship
🔁 This pattern repeats through the letter
📖 God gets the final word, not the insult

# FirstPeter 4:17-19
# ⚖️ For The Time Is Come That Judgment Must Begin
---
## ⚖️ For The Time Is Come That Judgment Must Begin At The House Of God

"The house of God" means the church, God's own family of believers.

Judgment beginning there first sounds backward at first read.

Peter means a present, purifying kind of judgment, not final condemnation.

God examines and refines his own household before dealing with the outside world.

That order says something serious about how closely God watches his own people.

🏠 House of God means the church family
🔥 This judgment purifies, it does not condemn
📋 God deals with his own household first
📖 God watches his own people closely

## ❓ And If It First Begin At Us, What Shall The End Be Of Them That Obey Not The Gospel Of God

Peter asks a question meant to make his readers think, not answer casually.

If God's own refining of believers is already this serious, the comparison matters.

Those who reject the gospel entirely face something far more serious.

Peter is reasoning from a smaller case to a far greater one.

The hardship believers face now is nothing compared to what rejecting God costs.

❓ Peter asks a question to make readers think
📈 He argues from a smaller case
🚫 Rejecting the gospel costs far more
📖 Present hardship is nothing compared to that cost

## 😟 And If The Righteous Scarcely Be Saved, Where Shall The Ungodly And The Sinner Appear

"Scarcely" means barely, only just, with real difficulty.

This is not describing an easy stroll into salvation for anyone.

Even those who trust God pass through real struggle to get there.

Peter's question about the ungodly and the sinner has no comforting answer.

The contrast is meant to feel unsettling, not casual.

😟 Scarcely means barely, with real difficulty
🚶 Even the righteous struggle on this path
❓ The question about sinners has no easy answer
📖 This contrast is meant to feel unsettling

## 🙏 Wherefore Let Them That Suffer According To The Will Of God Commit The Keeping Of Their Souls To Him In Well Doing

"Commit the keeping of their souls" means handing over full trust and care.

Peter pictures someone placing something precious into another person's hands for safekeeping.

"Wherefore" ties this instruction directly to everything just said about judgment and struggle.

Right action, well doing, continues alongside that trust, not instead of it.

Trusting God was never meant to replace living faithfully.

🙏 Commit the keeping means handing over full trust
🤲 Pictures placing something precious into safe hands
🔗 Wherefore ties this to everything just said
📖 Trust and right living go together

## 🛠️ As Unto A Faithful Creator

"Faithful" means never breaking a promise.

"Creator" reminds the reader that this same God made them in the first place.

The one who formed a life can be trusted to keep it safe.

Peter closes the whole chapter by returning to that basic, steady truth.

Every hard thing in this chapter rests on a God who can be trusted completely.

🛠️ Faithful means never breaking a promise
🌍 Creator means the one who made them
🤝 The maker can be trusted to keep them
📖 Every hard thing rests on a trustworthy God
`.trim();

export const FIRST_PETER_FOUR_PERSONAL_SECTIONS = parseFirstPeterFourRawNotes(FIRST_PETER_FOUR_RAW_NOTES);
