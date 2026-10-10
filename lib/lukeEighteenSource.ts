export type LukeEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeEighteenRawNotes(rawText: string): LukeEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 18:${startVerse}` : `Luke 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Luke 18 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_EIGHTEEN_RAW_NOTES = `# Luke 18:1-8
# ⚖️ The Widow Who Would Not Quit
---
## 🙏 That Men Ought Always To Pray, And Not To Faint

"Faint" means more than feeling tired.

Here it means giving up completely and quitting.

Jesus tells this parable to fight that exact temptation.

Prayer that never gets answered can tempt anyone to stop asking.

This parable arms the disciples before that discouragement ever hits.

🙏 Faint means giving up completely

⏳ Unanswered prayer can wear anyone down

🛡️ Jesus prepares disciples before discouragement comes

📖 This parable guards against giving up

## ⚖️ A Judge Which Feared Not God, Neither Regarded Man

This judge answers to no one.

He does not fear God's judgment over his decisions.

He does not care what people think of him either.

A judge like that has no real reason to be fair.

An unfair judge like this is about to change anyway.

⚖️ The judge fears no authority

🙅 He ignores God's judgment entirely

👤 He ignores public opinion too

➡️ An unfair judge is about to change

## 👩 There Was A Widow In That City

Widows were among the most vulnerable people in this culture.

They often had no husband, no income, and no legal power.

This widow has no way to force the judge to listen.

Her only weapon is showing up again and again.

That detail makes the rest of the story possible.

👩 Widows had little social power

💸 She had no income or protection

🚪 She could not force the judge

📖 Her persistence becomes her only weapon

## ⚔️ Avenge Me Of Mine Adversary

"Avenge" here does not mean personal revenge.

It means render a fair legal decision in her favor.

"Adversary" means the opponent she is facing in this dispute.

She is asking the judge to finally rule justly.

⚖️ Avenge means a fair ruling

🙅 Not personal revenge at all

👤 Adversary means her opponent in court

📖 She only wants a just decision

## ⏳ He Would Not For A While

At first the judge refuses to help her at all.

Delay was his first answer, not his final one.

Verse four shows his honest inner thoughts to the reader.

He admits he does not fear God or care what people think.

⏳ The judge delays at first

🚪 Delay is not yet his final answer

🧠 Verse four reveals his private thoughts

📖 His honesty here exposes his real character

## 😩 Lest By Her Continual Coming She Weary Me

"Weary" means to wear someone down through constant pressure.

The judge finally gives in, but only out of exhaustion.

He never actually becomes a fair man.

Her persistence changes his behavior, not his character.

😩 Weary means worn down over time

🤷 He gives in from exhaustion only

🚫 His character never actually changes

➡️ Persistence changed his action not his heart

## 👑 Shall Not God Avenge His Own Elect

Jesus now draws the comparison plainly.

If even a corrupt judge eventually gives justice, God certainly will.

"Elect" means the people God has personally chosen as His own.

God is nothing like that reluctant, unfair judge.

He hears everyone who cries out to Him day and night.

👑 Elect means God's chosen people

⚖️ Even an unfair judge grants justice

❤️ God is nothing like that judge

📖 God hears every cry day and night

## ⏱️ He Will Avenge Them Speedily

"Speedily" does not mean an instant answer.

It means God's justice comes in His own perfect timing.

What feels painfully slow to the widow is not slow to God.

This verse comforts anyone still waiting on an answer.

⏱️ Speedily means in God's timing

🙅 Not necessarily an instant answer

⏳ Waiting does not mean God forgot

📖 God's timing differs from ours

## ❓ Shall He Find Faith On The Earth

This question lands as a surprising twist.

Jesus is not asking about prayer requests anymore.

He is asking whether people will still be trusting Him when He returns.

The whole parable was never really about a judge at all.

It was about staying faithful while waiting on God's answer.

❓ A surprising question ends the parable

🙏 It asks about faith, not requests

⏳ It points toward Jesus's eventual return

📖 The real point is staying faithful

# Luke 18:9-14
# 🙏 The Pharisee And The Publican
---
## 🪞 Certain Which Trusted In Themselves That They Were Righteous

This parable is aimed at a very specific kind of person.

It targets people who believe their own goodness makes them right with God.

That same belief also tends to produce one more habit.

They look down on anyone who does not measure up to their own standard.

🪞 Aimed at self righteous people

👎 They looked down on others

📏 They trusted their own standard

📖 Pride and contempt often travel together

## 👳 The One A Pharisee, And The Other A Publican

A Pharisee was a respected religious teacher known for strict obedience to the law.

A publican collected taxes for Rome, often by overcharging his own people.

Pharisees were honored in this culture.

Publicans were despised as traitors and cheats.

Jesus picks the two most opposite reputations he can find.

👳 Pharisee means a respected teacher

💰 Publican means a Roman tax collector

👎 Publicans were widely despised

📖 Jesus contrasts two opposite reputations

## 🗣️ I Thank Thee, That I Am Not As Other Men Are

This prayer sounds thankful on the surface.

Underneath, it is really a comparison contest.

The Pharisee measures his own goodness against everyone else's failures.

He names extortioners, unjust men, and adulterers by name.

His prayer is aimed more at himself than at God.

🗣️ Sounds thankful on the surface

📏 Really compares himself to others

👎 He names other people's sins

📖 His focus stays on himself

## 📿 I Fast Twice In The Week, I Give Tithes Of All

The law only required fasting once a year, on the Day of Atonement.

This man fasted twice every single week, far beyond what was required.

He also tithed on everything he owned, not just his main income.

His resume of good works is real, not invented.

The problem was never his actions.

📿 Fasting once a year was required

⏫ He fasted twice every week

💰 He tithed on everything he owned

📖 His actions were real, not fake

## 👀 Standing Afar Off, Would Not Lift Up So Much As His Eyes Unto Heaven

The publican stays far from the center of the temple.

Looking upward in prayer was the normal posture of that day.

He cannot even bring himself to do that.

His whole body language communicates shame before he says a word.

👀 He avoids the temple's center

⬆️ Looking up was the normal posture

😔 His body shows deep shame

📖 Posture speaks before words do

## 💔 Smote Upon His Breast, Saying, God Be Merciful To Me A Sinner

Striking the chest was a physical sign of grief and guilt.

His prayer contains no comparison and no resume at all.

He asks only for mercy, nothing more.

Seven words carry his entire request to God.

💔 Striking the chest showed grief

🙏 His prayer holds no comparison

🆘 He asks only for mercy

📖 A short prayer can carry everything

## ✅ Went Down To His House Justified Rather Than The Other

"Justified" means declared right with God, not earned through good deeds.

The publican leaves forgiven, even though his resume was empty.

The Pharisee leaves exactly as he arrived, unchanged.

Humility opened a door that good works alone never could.

✅ Justified means declared right with God

🙏 Humility opened the door for him

🚫 Good works alone did not work

📖 Humility reaches God further than pride

## ⚖️ Every One That Exalteth Himself Shall Be Abased

"Exalteth" means lifting yourself up above others.

"Abased" means being brought back down low.

Jesus states a pattern that runs through the whole chapter.

Pride eventually gets humbled, and humility eventually gets lifted.

This single sentence sums up both men in the story.

⬆️ Exalteth means lifting yourself up

⬇️ Abased means being brought down low

🔁 Pride and humility often reverse

📖 This sentence sums up both men

# Luke 18:15-17
# 👶 Let The Children Come
---
## 👶 Brought Unto Him Also Infants

"Infants" means very young children, even babies.

Parents want Jesus to simply touch them and bless them.

The disciples see this as a waste of Jesus's time.

They try to turn the families away.

👶 Infants means very young babies

🙏 Parents wanted a simple blessing

🚫 Disciples saw this as unimportant

📖 They tried turning the families away

## 🤲 Suffer Little Children To Come Unto Me

"Suffer" here is an old word meaning allow or permit.

Jesus overrules His own disciples in this moment.

He calls the children toward Himself instead of away.

Children are never an interruption to Jesus.

🤲 Suffer means allow or permit

🔁 Jesus overrules His disciples here

👶 He calls the children closer

📖 Children are never an interruption

## 🔑 Forbid Them Not, For Of Such Is The Kingdom Of God

"Such" points to the kind of trust children naturally have.

A small child depends completely on someone else for everything.

That total dependence is exactly what belongs in God's kingdom.

It is not about innocence so much as total trust.

🔑 Such means that kind of trust

🤲 Children depend on others completely

🚪 Total dependence fits God's kingdom

📖 Trust matters more than innocence here

## 🚪 Whosoever Shall Not Receive The Kingdom Of God As A Little Child

Receiving something as a child means accepting it without earning it first.

A child cannot pay for a gift or negotiate its terms.

Adults often want to earn their way into God's favor instead.

Jesus says that approach will never get anyone in.

🎁 Receiving means accepting, not earning

👶 Children cannot pay for gifts

🚫 Earning your way in does not work

📖 The kingdom comes as a gift

# Luke 18:18-23
# 💰 The Rich Ruler's Question
---
## 👑 A Certain Ruler Asked Him, Saying, Good Master

This man held real wealth and likely some civic or synagogue authority.

"Good Master" was a polite, respectful way to address a teacher.

He comes with a sincere, urgent question.

He wants to know what he must do to inherit eternal life.

👑 A ruler means wealth and authority

🙏 Good Master was a respectful title

❓ His question sounds sincere and urgent

📖 He wants to know about eternal life

## ❓ Why Callest Thou Me Good? None Is Good, Save One, That Is, God

Jesus questions the man's casual use of the word good.

He is not rejecting the compliment outright.

He is pointing the man toward a bigger question about who Jesus really is.

Only God truly deserves that title without qualification.

❓ Jesus questions the casual compliment

👆 He points toward His true identity

🙌 Only God is fully good

📖 The real question is who Jesus is

## 📜 Thou Knowest The Commandments

Jesus lists commandments that deal with how people treat each other.

Do not commit adultery, kill, steal, bear false witness, or dishonor your parents.

These are the commandments easiest to measure by outward behavior.

The man answers with full confidence that he has kept every one.

📜 These commandments cover how we treat others

✅ They are easy to measure outwardly

💪 The man claims full obedience

📖 Outward obedience looks complete so far

## 💎 Yet Lackest Thou One Thing: Sell All That Thou Hast

Jesus names the one commandment this man never expected.

His wealth has quietly become his own kind of idol.

Selling everything would strip away the thing he trusts most.

Jesus is not against wealth itself here.

He is exposing what this particular man actually worships.

💎 Wealth had become his idol

🎯 Jesus names the real obstacle

🙅 This is not against wealth itself

📖 Jesus exposes what the man worships

## 🤝 Distribute Unto The Poor, And Thou Shalt Have Treasure In Heaven

Giving to the poor would trade an earthly treasure for a lasting one.

Come, follow me is the real invitation inside this hard command.

Jesus is not asking for less in this man's life.

He is offering something worth far more than money.

🤝 Giving trades earthly treasure for lasting treasure

🚶 Follow me is the real invitation

📈 Jesus offers something worth more

📖 The invitation matters more than the cost

## 😔 He Was Very Sorrowful, For He Was Very Rich

The man's confidence collapses the moment the cost becomes clear.

His wealth, once a sign of blessing, now feels like chains.

He walks away sad instead of walking away free.

The chapter never says what he decided next.

😔 His confidence collapses at the cost

⛓️ Wealth now feels like chains

🚶 He walks away sad, not free

📖 His final choice is left untold

# Luke 18:24-27
# 🐫 A Camel Through A Needle's Eye
---
## 🚧 How Hardly Shall They That Have Riches Enter Into The Kingdom Of God

"Hardly" here means with great difficulty, not barely at all.

Riches are not evil by themselves.

Riches tend to make a person feel self sufficient.

That feeling of self sufficiency quietly competes with trusting God.

🚧 Hardly means with great difficulty

💰 Riches are not evil themselves

🛡️ Wealth can feel like self sufficiency

📖 Self sufficiency competes with trusting God

## 🐫 Easier For A Camel To Go Through A Needle's Eye

A needle's eye is the tiny hole a thread passes through.

A camel was one of the largest animals in that region.

Jesus deliberately pairs the biggest animal with the smallest opening.

This is intentional, obvious overstatement meant to shock the listener.

It is not describing a real, narrow gate somewhere in Jerusalem.

🧵 A needle's eye is a tiny sewing hole

🐫 A camel was a very large animal

😲 This pairing is intentional overstatement

📖 The point is impossibility, not a real gate

## 😨 Who Then Can Be Saved?

The disciples assumed wealth was proof of God's favor.

If the wealthy and successful cannot enter, they wonder who possibly can.

Their question reveals how deeply that assumption ran.

Jesus is about to correct the whole premise.

😨 They assumed wealth meant favor

❓ Their question reveals that assumption

🤯 The premise itself needed correcting

📖 Jesus is about to answer plainly

## 🙌 The Things Which Are Impossible With Men Are Possible With God

Salvation was never something a person could achieve through effort or wealth.

It only ever comes as something God makes possible.

That truth applies equally to the richest ruler and the poorest beggar.

No one earns their way in, and no one is shut out by poverty either.

🙌 Salvation is never self achieved

💰 Wealth cannot buy a way in

🚪 Poverty cannot block the way either

📖 Only God makes salvation possible

# Luke 18:28-30
# 🏠 Peter's Question About Reward
---
## 🙋 Lo, We Have Left All, And Followed Thee

Peter speaks up right after watching the rich ruler walk away.

He wants to know if the disciples' own sacrifice actually counts for something.

Unlike the ruler, the disciples already gave up everything they had.

Peter's question is honest, not proud.

🙋 Peter speaks right after the ruler leaves

🤲 He asks if sacrifice really counts

✅ Disciples already gave up everything

📖 His question sounds honest, not proud

## 👪 Left House, Or Parents, Or Brethren, Or Wife, Or Children

Jesus lists the exact kind of sacrifice He means.

Home, family, and marriage were the center of life in this culture.

Walking away from any of them carried a real, painful cost.

Jesus never pretends that cost is small.

👪 Jesus names family and home directly

💔 These were central to life then

⚖️ The cost was real and painful

📖 Jesus never minimizes that cost

## 🎯 For The Kingdom Of God's Sake

The sacrifice only counts when the motive behind it is right.

Leaving family for selfish reasons is not the same thing at all.

This phrase ties the whole sacrifice back to its true purpose.

Motive is what gives the sacrifice its real meaning.

🎯 Motive decides what the sacrifice means

🚫 Selfish reasons do not qualify

🔗 This ties sacrifice to its purpose

📖 The kingdom's sake is the true aim

## 🎁 Manifold More In This Present Time, And In The World To Come Life Everlasting

"Manifold" means many times over, far beyond the original amount.

Jesus promises a return in this life, not only after death.

The new family found in the church often replaces what was given up.

Eternal life in the world to come is the greater promise still.

🎁 Manifold means many times over

🌍 A return comes even in this life

👪 Church family can replace what was lost

📖 Eternal life is the greater promise

# Luke 18:31-34
# ✝️ Jesus Foretells His Death
---
## 🛣️ Behold, We Go Up To Jerusalem

Jerusalem sits high in the hill country, so every approach is called going up.

This is Jesus's final approach to the city before His crucifixion.

He says it plainly, without any hint of secrecy.

The road ahead leads directly to the cross.

🛣️ Going up describes Jerusalem's elevation

✝️ This is His final approach there

🗣️ Jesus speaks plainly, not secretly

📖 This road leads to the cross

## 📜 All Things That Are Written By The Prophets Shall Be Accomplished

Centuries of prophecy about the Messiah's suffering converge on this one week.

"Son of man" is the title Jesus most often used for Himself.

Nothing happening next is an accident or a surprise to God.

Every painful detail ahead was already written long before it happened.

📜 Prophecy converges on this one week

🏷️ Son of man was Jesus's chosen title

🎯 Nothing ahead is an accident

📖 It was written long before it happened

## ⚔️ Delivered Unto The Gentiles, And Shall Be Mocked

"Gentiles" here points specifically to the Roman authorities.

Jewish leaders could convict Him, but only Rome could execute Him.

"Spitefully entreated" means treated with deliberate cruelty and contempt.

Being spit on was one of the deepest public insults in that culture.

🏛️ Gentiles here means Roman authorities

⚖️ Only Rome could carry out execution

😠 Spitefully entreated means deliberate cruelty

📖 Spitting on Him was a deep insult

## ✝️ The Third Day He Shall Rise Again

"Scourge" means a brutal whipping before execution.

Jesus names His own death in plain, specific terms.

Then He adds the part almost no one expects.

Death was never going to be the end of this story.

🩸 Scourge means a brutal whipping

☠️ Jesus names His death plainly

🌅 The third day reverses everything

📖 Death was never the final word

## 🙈 This Saying Was Hid From Them

The disciples hear every word but cannot process any of it.

A suffering, dying Messiah does not match what they expected Him to be.

Their understanding will only catch up after the resurrection actually happens.

For now, the plainest words in the chapter sound like a riddle to them.

🙈 They hear the words, not the meaning

🤔 A suffering Messiah did not fit expectations

⏳ Understanding comes only after the resurrection

📖 Plain words sounded like a riddle

# Luke 18:35-39
# 👁️ The Blind Beggar Cries Out
---
## 🏙️ Come Nigh Unto Jericho, A Certain Blind Man Sat By The Way Side Begging

Jericho sat along a major road used by crowds of Passover travelers.

A blind man in this era had almost no way to earn a living.

Begging by the roadside was often his only real option.

He positions himself exactly where crowds like this one would pass.

🏙️ Jericho sat on a busy travel road

👁️ Blindness left few ways to earn income

🙏 Begging was often his only option

📖 He waits exactly where crowds pass

## 👂 Hearing The Multitude Pass By, He Asked What It Meant

He cannot see the crowd, but he can hear it clearly.

Something about the noise tells him this is not an ordinary day.

Blindness sharpens his attention to every other sense available to him.

He immediately asks someone nearby what is happening.

👂 He hears the crowd before seeing it

❓ Unusual noise tells him something is happening

👃 Blindness sharpens his other senses

📖 He asks instead of staying silent

## 🗣️ They Told Him, That Jesus Of Nazareth Passeth By

A bystander answers his question honestly.

"Nazareth" marks Jesus by His hometown, a small and unimpressive village.

That one small detail is enough to change this man's entire day.

He already knows exactly who this name belongs to.

🗣️ A bystander answers him honestly

🏡 Nazareth names His unimpressive hometown

💡 That name changes his entire day

📖 He already knows who Jesus is

## 👑 Jesus, Thou Son Of David, Have Mercy On Me

"Son of David" is a title that points directly to the promised Messiah.

A blind beggar uses the clearest messianic title in the whole Gospel.

He is not simply asking a kind stranger for help.

He is confessing exactly who he believes Jesus to be.

👑 Son of David points to the Messiah

🙏 A beggar uses the clearest title

❤️ This is more than a polite request

📖 It is a confession of faith

## 🙅 They Which Went Before Rebuked Him, That He Should Hold His Peace

The crowd tries to silence him, treating his cry as an embarrassment.

He refuses to be quieted by people with no authority over his need.

His cry only grows louder instead of weaker.

This echoes the persistent widow from earlier in the chapter.

🙅 The crowd tries to silence him

🗣️ He refuses to stay quiet

📢 His cry grows louder, not weaker

📖 This echoes the persistent widow's story

# Luke 18:40-43
# 👁️ The Blind Beggar Receives His Sight
---
## ❓ What Wilt Thou That I Shall Do Unto Thee

Jesus stops everything the moment He hears this man's cry.

He then asks a question that seems almost unnecessary for a blind man.

Jesus wants the man to name his own specific request out loud.

The man answers plainly, Lord, that I may receive my sight.

🛑 Jesus stops at the man's cry

❓ He still asks what the man wants

🗣️ The man names his request plainly

📖 Jesus invites specific, honest requests

## 🙏 Thy Faith Hath Saved Thee

Jesus credits the man's faith, not his own healing power alone.

"Saved" here covers both his physical healing and something deeper.

Faith was the channel this man used to reach out to Jesus.

It was never a magic word on its own.

🙏 Faith is credited, not just power

❤️ Saved covers healing and something deeper

🔗 Faith was his channel to Jesus

📖 Faith reaches out, it does not perform magic

## 👁️ Immediately He Received His Sight, And Followed Him, Glorifying God

The healing happens instantly, with no delay or process at all.

His very first action with his new sight is following Jesus.

He does not wander off to celebrate alone.

Glorifying God becomes his immediate, natural response.

⚡ Healing happens instantly, with no delay

🚶 His first act is following Jesus

🙌 He glorifies God right away

📖 New sight leads straight to worship

## 🙌 All The People, When They Saw It, Gave Praise Unto God

The miracle does not stay private to one grateful man.

The whole crowd that once tried to silence him now praises God instead.

Luke eighteen opened with a widow begging a reluctant judge for justice.

It closes with a beggar receiving mercy and a whole crowd praising God for it.

👥 The miracle becomes a public moment

🔄 The silencing crowd now praises God

🔁 The chapter opened with persistent begging

📖 It closes with mercy received and praised
`.trim();

export const LUKE_EIGHTEEN_PERSONAL_SECTIONS = parseLukeEighteenRawNotes(LUKE_EIGHTEEN_RAW_NOTES);
