export type ProverbsTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyOneRawNotes(rawText: string): ProverbsTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 21:${startVerse}` : `Proverbs 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 21 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_ONE_RAW_NOTES = `# Proverbs 21:1-4
# 👑 God Directs Kings And Sees Hearts
---
## 👑 The King's Heart Is In The Hand Of The LORD

This states plainly that even the most powerful ruler is under God's control.

A king in the ancient world answered to no earthly authority above him.

Yet Proverbs claims God still directs him from the inside, not just the outside.

That kind of control reaches further than any human law could reach.

👑 A king answered to no earthly ruler

🕊️ God still directs him from within

⚖️ Human law could never reach this far

📖 No throne sits outside God's control

## 🌊 As The Rivers Of Water: He Turneth It Whithersoever He Will

Ancient farmers built channels to redirect river water into their fields.

A single farmer could turn the flow with only a small gate.

This pictures God moving a king's heart with that same ease.

The king feels free, yet his direction is still being guided.

🌊 Farmers redirected rivers with simple channels

🚪 A small gate turned the whole flow

👑 God moves a king's heart that easily

📖 Freedom still sits inside God's plan

## 👤 Every Way Of A Man Is Right In His Own Eyes

This does not mean a person's own judgment is actually correct.

It means people naturally feel confident about their own choices.

That confidence can exist even when a choice is deeply wrong.

Feeling right and being right are two different things.

👤 Not a claim that self judgment is correct

😊 People naturally feel confident in their choices

⚠️ Confidence can exist even when wrong

📖 Feeling right differs from being right

## ⚖️ But The LORD Pondereth The Hearts

Pondereth means weighing something carefully to judge its true worth.

God does not judge by outward appearance or by confident feelings.

He weighs the actual motives sitting underneath a person's actions.

That weighing sees what a person's own eyes cannot see.

⚖️ Pondereth means weighing something carefully

👁️ God does not judge by appearance

💭 He weighs the motives underneath actions

📖 God sees what self judgment misses

## 🐑 To Do Justice And Judgment Is More Acceptable To The LORD Than Sacrifice

Sacrifice was the main way Israelites approached God with an offering.

This verse ranks something else even higher than that offering.

Justice and judgment mean treating other people with honest daily treatment.

God cares more about how people treat each other than about ritual alone.

🐑 Sacrifice was Israel's main way to approach God

⚖️ Justice and judgment mean honest daily treatment

📈 This verse ranks honest treatment above ritual

📖 God cares about daily honesty, not just offerings

## 👀 An High Look, And A Proud Heart

A high look means a facial expression showing open contempt for others.

A proud heart means an inner attitude of self exaltation.

Proverbs names the outward sign and the inner cause together.

The face usually reveals what the heart already contains.

👀 A high look means visible contempt

💔 A proud heart means self exaltation

🔗 The outward sign matches the inner cause

📖 The face reveals what the heart holds

## 🌾 And The Plowing Of The Wicked, Is Sin

Plowing was an ordinary, necessary farm task, not a wrongdoing itself.

This does not mean farming is somehow sinful on its own.

It means even a wicked person's normal, everyday work is tainted.

A proud, wicked heart corrupts actions that would otherwise be neutral.

🌾 Plowing was ordinary, necessary farm work

🚫 Farming itself is not the sin here

👤 A wicked heart taints normal actions

📖 Pride corrupts even neutral, everyday work
# Proverbs 21:5-8
# 💰 Diligence, Lies, And A Crooked Path
---
## 💪 The Thoughts Of The Diligent Tend Only To Plenteousness

Diligent means someone who works with steady, careful effort over time.

Plenteousness means having more than enough, real abundance.

Proverbs ties careful planning directly to that kind of abundance.

Good outcomes usually start with patient thinking, not luck.

💪 Diligent means steady, careful effort

🌾 Plenteousness means real abundance

🧠 Careful planning leads to abundance

📖 Good outcomes start with patient thinking

## ⏱️ But Of Every One That Is Hasty Only To Want

Hasty means acting quickly without stopping to think it through.

Want here means lacking basic necessities, real poverty.

This verse contrasts patient planning with rushed, careless decisions.

Speed without thought tends to end in shortage, not gain.

⏱️ Hasty means acting without thinking

📉 Want means real lack and poverty

⚖️ This contrasts patience with rushed choices

📖 Speed without thought often ends in shortage

## 💰 The Getting Of Treasures By A Lying Tongue

This describes wealth gained specifically through deceit and false words.

A lying tongue could mean false promises, forged deals, or outright fraud.

Proverbs is naming a particular kind of gain, not wealth generally.

The method of gaining the treasure is what makes it wrong.

💰 This means wealth gained through deceit

🗣️ A lying tongue covers many kinds of fraud

🎯 Proverbs targets the method, not wealth itself

📖 How wealth is gained matters to God

## 💨 Is A Vanity Tossed To And Fro Of Them That Seek Death

Vanity here means something empty, with no lasting substance.

Tossed to and fro pictures something blown around with no stable footing.

Wealth built on lies never actually settles into something solid.

Chasing that kind of gain is described as chasing death itself.

💨 Vanity means something empty and hollow

🌪️ Tossed to and fro means unstable

🏚️ Dishonest wealth never settles into anything solid

📖 Chasing this gain is chasing death

## 🏴 The Robbery Of The Wicked Shall Destroy Them

Robbery here covers any gain taken by force or by fraud.

Proverbs states plainly that this kind of gain eventually ruins the one who took it.

The destruction is not described as accidental or merely possible.

It is treated as the certain outcome of that path.

🏴 Robbery covers gain taken by force or fraud

💥 That gain eventually ruins its owner

🎯 The outcome is certain, not accidental

📖 Robbery destroys the robber in the end

## ⚖️ Because They Refuse To Do Judgment

Judgment here means treating other people with basic fairness.

The wicked in this verse are not condemned for one single act.

They are condemned for an ongoing refusal to live with honesty.

That refusal, not any one robbery, is named as the root cause.

⚖️ Judgment means basic fairness toward others

🔁 This names an ongoing refusal, not one act

🌱 The refusal is the root cause named

📖 A fair life was rejected on purpose

## 🌀 The Way Of Man Is Froward And Strange

Froward is an old word meaning stubbornly crooked and hard to correct.

Strange here means foreign to what is right, off the intended path.

This describes the natural direction of a person left to their own way.

Without correction, a person tends to drift somewhere twisted.

🌀 Froward means stubbornly crooked

🧭 Strange means off the intended path

👤 This describes an uncorrected natural drift

📖 Left alone, a path tends to twist

## 💛 But As For The Pure, His Work Is Right

Pure here describes a person whose motives are honest, not mixed.

That kind of person's actions line up with what is actually right.

Proverbs draws a direct line from a clean motive to a straight path.

The heart behind an action shapes where that action leads.

💛 Pure means honest, unmixed motives

🧭 A clean motive leads to a straight path

🔗 Motive and action are directly linked

📖 The heart shapes where the path leads
# Proverbs 21:9-12
# 🏠 Housetops, Neighbours, And A Watching God
---
## 🏠 It Is Better To Dwell In A Corner Of The Housetop Than With A Brawling Woman In A Wide House

Houses in this culture had flat roofs used as extra living space.

A corner of the housetop meant a small, cramped, exposed spot to sleep.

Brawling means constant arguing and conflict inside the home.

Proverbs says that cramped discomfort still beats a spacious home full of conflict.

This same comparison repeats later in the book, showing how seriously it was meant.

🏠 Flat roofs served as extra living space

📐 A housetop corner meant small and exposed

😠 Brawling means constant household conflict

📖 Peace mattered more than comfortable space

## 👤 The Soul Of The Wicked Desireth Evil

Soul here means the whole inner self, not just emotion.

This describes evil as something the wicked person actually wants, not stumbles into.

That desire sits underneath their choices before any single action happens.

Proverbs is naming an inner appetite, not just outward behavior.

👤 Soul means the whole inner self

🎯 Evil is wanted, not stumbled into

🌱 The desire exists before the action

📖 This names an appetite, not just behavior

## 🤝 His Neighbour Findeth No Favour In His Eyes

Favour here means kindness or goodwill shown toward someone nearby.

A person driven by that kind of inner appetite has none left for others.

Even a close neighbour gets no benefit of the doubt.

An inward desire for evil crowds out ordinary kindness.

🤝 Favour means kindness shown to others

🏘️ Even a close neighbour gets none

🚫 Evil desire crowds out ordinary kindness

📖 What fills the heart limits what it gives

## 🙄 When The Scorner Is Punished, The Simple Is Made Wise

A scorner is someone who mocks correction and refuses to listen.

The simple here means someone untaught, not stupid, just inexperienced.

Watching a mocker face consequences teaches the untaught person a lesson firsthand.

Sometimes wisdom comes from observing someone else's mistake, not from direct teaching.

🙄 A scorner mocks correction and refuses it

🌱 The simple means untaught, not stupid

👀 Watching consequences can teach by itself

📖 Wisdom sometimes comes from watching others fail

## 🧠 And When The Wise Is Instructed, He Receiveth Knowledge

This does not describe someone who already knows everything.

Even a wise person is shown still needing and accepting instruction.

Proverbs pairs this with the scorner to contrast two different responses to correction.

One response is refusal, and the other is a readiness to keep learning.

🧠 A wise person still needs instruction

🔁 This contrasts two responses to correction

✅ One refuses, the other stays teachable

📖 Wisdom includes staying willing to learn

## 👁️ The Righteous Man Wisely Considereth The House Of The Wicked

Considereth means paying careful, thoughtful attention to something.

House here can mean the wicked person's whole household and way of life.

A righteous person pays attention to how that path actually turns out.

That careful observation shapes wiser choices for their own life.

👁️ Considereth means paying careful attention

🏠 House means a household's whole way of life

🧠 Watching that path shapes wiser choices

📖 Careful observation guides a righteous life

## 💥 But God Overthroweth The Wicked For Their Wickedness

Overthroweth means bringing something down completely, not just weakening it.

This states plainly that God himself judges the wicked, not just people.

The reason given is their own wickedness, nothing external or unfair.

Human observation and divine judgment work on two different levels here.

💥 Overthroweth means bringing down completely

⚖️ God himself judges, not only people

🎯 Their own wickedness is the stated reason

📖 Human insight and divine judgment differ
# Proverbs 21:13-16
# 😢 Ears, Anger, And The Way Of Life
---
## 🙉 Whoso Stoppeth His Ears At The Cry Of The Poor

Stoppeth his ears pictures someone deliberately refusing to listen.

The cry of the poor means a real, desperate appeal for help.

This describes a choice, not simple ignorance of someone's need.

Refusing to hear is treated as an active act, not a passive one.

🙉 Stoppeth his ears means refusing to listen

😢 The cry of the poor is real

🎯 This describes a choice, not ignorance

📖 Ignoring need is treated as active refusal

## 🔄 He Also Shall Cry Himself, But Shall Not Be Heard

This describes a reversal, the same treatment coming back around.

A day will come when this person also needs help badly.

By then, their own earlier refusal has already cost them.

Proverbs ties how a person treats others to how they will be treated.

🔄 This describes a reversal coming back around

📅 A day of needing help will come

💔 Their own refusal already cost them

📖 How you treat others returns to you

## 😌 A Gift In Secret Pacifieth Anger

Pacifieth means calming something down, cooling off strong feeling.

A gift given in secret avoids embarrassing the angry person publicly.

That privacy lets the person accept peace without losing face.

How a gift is given matters as much as the gift itself.

😌 Pacifieth means calming strong feeling

🤫 A secret gift avoids public embarrassment

🙌 Privacy lets a person accept peace

📖 How a gift is given matters too

## 👕 And A Reward In The Bosom Strong Wrath

Bosom here means the fold of clothing worn over the chest, used like a pocket.

Slipping a reward into that private fold repeats the same idea of discretion.

Strong wrath describes anger serious enough to need real effort to cool.

Even deep anger can be calmed by a wise, quiet gesture.

👕 Bosom means a fold used as a pocket

🤐 Slipping a gift there repeats the discretion

🔥 Strong wrath means serious, deep anger

📖 Even deep anger can be quietly calmed

## 😊 It Is Joy To The Just To Do Judgment

Just here means a person committed to living rightly.

Doing judgment means acting with fairness toward other people in daily life.

For this kind of person, fairness itself brings real joy, not burden.

Proverbs treats righteous living as something that can genuinely feel good.

😊 Just means someone committed to right living

⚖️ Doing judgment means daily fairness

🎉 Fairness itself brings this person joy

📖 Righteous living can genuinely feel good

## ⚠️ But Destruction Shall Be To The Workers Of Iniquity

Iniquity means deep, willful wrongdoing, more than a single mistake.

Workers of iniquity means people who practice wrongdoing as a pattern.

This verse pairs two opposite responses to the same idea of judgment.

Fairness brings joy to one group and ruin to the other.

⚠️ Iniquity means willful, ongoing wrongdoing

🔁 Workers of iniquity means a practiced pattern

⚖️ Two opposite responses appear in one verse

📖 The same fairness brings joy or ruin

## 🚶 The Man That Wandereth Out Of The Way Of Understanding

Wandereth pictures someone drifting slowly off a path, not running away suddenly.

The way of understanding means the path of wisdom laid out through this whole book.

This is not one dramatic decision but a gradual straying over time.

Small drifts away from wisdom add up the same as one big departure.

🚶 Wandereth means drifting slowly off a path

🧭 The way of understanding means wisdom's path

⏳ This is gradual straying, not one moment

📖 Small drifts add up over time

## 💀 Shall Remain In The Congregation Of The Dead

Congregation of the dead is a striking way to picture the company already lost to life.

It pictures that drifting person ending up gathered among people already lost to wisdom.

This is a strong warning image, not a literal prediction of early death.

Wandering from wisdom is treated as its own kind of death.

💀 It pictures those already lost to wisdom

⚠️ This is a warning image, not literal

🌑 It shows where the drifting path ends

📖 Wandering from wisdom is its own death
# Proverbs 21:17-20
# 🍷 Pleasure, Peace, And A Wise Man's House
---
## 🎭 He That Loveth Pleasure Shall Be A Poor Man

Pleasure here means chasing comfort and enjoyment as life's main goal.

Loving pleasure that much tends to drain resources rather than build them.

Proverbs states this as a plain, observed outcome, not a threat.

A life organized around enjoyment rarely leaves anything left over.

🎭 Pleasure means chasing comfort as the main goal

📉 That focus tends to drain resources

🎯 This is an observed outcome, not a threat

📖 Enjoyment focused living rarely leaves anything over

## 🍷 He That Loveth Wine And Oil Shall Not Be Rich

Wine and oil were everyday luxuries in this culture, not rare extravagances.

Loving them here means constantly indulging in comfort, not one occasional treat.

That habit of constant indulgence works against building lasting wealth.

The verse names a habit, not the wine or oil themselves as evil.

🍷 Wine and oil were everyday luxuries

🔁 Loving them means constant indulgence

💰 That habit works against lasting wealth

📖 The habit is named, not the items

## 💰 The Wicked Shall Be A Ransom For The Righteous

Ransom means a price paid to secure someone's release or safety.

And the transgressor for the upright repeats the same idea in different words.

Hebrew poetry often says one idea twice using different wording for emphasis.

The exact mechanism is not spelled out, but the wicked end up serving the righteous somehow.

💰 Ransom means a price paid for safety

🔁 The second half repeats the same idea

📜 Hebrew poetry often doubles an idea for emphasis

📖 The wicked end up serving the righteous

## 🔁 It Is Better To Dwell In The Wilderness Than With A Contentious And An Angry Woman

This repeats the same comparison already made in verse nine of this chapter.

Wilderness here means empty, difficult land far from normal comforts.

Contentious means constantly quarreling, always ready for a fight.

Repeating this warning twice in one chapter shows how seriously Proverbs takes it.

🔁 This repeats verse nine's comparison

🏜️ Wilderness means empty, difficult land

😠 Contentious means constantly quarreling

📖 Repeating a warning twice signals its weight

## 🏠 There Is Treasure To Be Desired And Oil In The Dwelling Of The Wise

This pictures a wise person's household as genuinely well provided for.

Treasure and oil here stand for real, lasting material security.

That security is shown as a natural result of wise living.

Wisdom is connected here to practical, everyday stability, not just good ideas.

🏠 A wise household is well provided for

💎 Treasure and oil mean lasting security

🌱 Security is shown as wisdom's natural result

📖 Wisdom connects to practical stability

## 💸 But A Foolish Man Spendeth It Up

Spendeth it up means using resources up completely, leaving nothing saved.

This describes the same kind of household, but managed foolishly instead.

The resources exist either way, wisdom is shown entirely in how they are handled.

A fool and a wise man can start with the same treasure and end differently.

💸 Spendeth it up means using everything up

🏠 The same kind of household is pictured

🧠 The difference is entirely in the handling

📖 Wisdom shows in management, not just having
# Proverbs 21:21-24
# 🏰 Righteousness, Wisdom, And A Proud Name
---
## 🏃 He That Followeth After Righteousness And Mercy

Followeth after pictures actively chasing something, not passively waiting for it.

Righteousness means living rightly, and mercy means showing kindness to others.

Pairing these two together shows that right living includes real kindness.

Neither one alone is treated as the whole picture here.

🏃 Followeth after means actively chasing something

⚖️ Righteousness means living rightly

❤️ Mercy means showing real kindness

📖 Right living includes genuine kindness

## 🎁 Findeth Life, Righteousness, And Honour

This names three separate rewards for the same pursuit.

Life here points to more than survival, a full, flourishing existence.

Honour means genuine respect earned over time, not claimed for oneself.

Chasing righteousness and mercy is shown paying off in more than one way.

🎁 Three separate rewards are named here

🌱 Life means a full, flourishing existence

🏅 Honour means respect earned over time

📖 One pursuit pays off in several ways

## 🏰 A Wise Man Scaleth The City Of The Mighty

Fortified cities in this world relied on high, thick walls for safety.

Scaleth pictures someone climbing over defenses built to keep everyone else out.

This describes wisdom succeeding where raw military strength alone might fail.

A clever plan is shown outmatching a well defended position.

🏰 Fortified cities relied on thick walls

🧗 Scaleth pictures climbing past strong defenses

🧠 Wisdom succeeds where raw strength might fail

📖 A clever plan can outmatch strong defenses

## 🛡️ And Casteth Down The Strength Of The Confidence Thereof

The confidence thereof means the very thing that city trusted for its safety.

Casteth down means bringing that trusted strength crashing to nothing.

A wall meant to keep an army out becomes useless against the right strategy.

Whatever people trust for security can still be undone by wisdom.

🛡️ The confidence thereof means the city's trusted safety

💥 Casteth down means bringing that trust down

🧱 Even strong walls fail against the right strategy

📖 Trusted security can still be undone by wisdom

## 🛡️ Whoso Keepeth His Mouth And His Tongue Keepeth His Soul From Troubles

Keepeth here means guarding something carefully, watching it closely.

Mouth and tongue together stand for everything a person says out loud.

Careless words are shown as a direct source of real trouble.

Guarding speech is treated as guarding the whole self from harm.

🛡️ Keepeth means guarding something carefully

🗣️ Mouth and tongue mean everything said aloud

⚠️ Careless words are a direct source of trouble

📖 Guarding speech guards the whole self

## 😤 Proud And Haughty Scorner Is His Name

Haughty means looking down on others from a place of assumed superiority.

Scorner was already defined earlier in this chapter as someone who mocks correction.

Calling this person's very name proud and haughty is not a compliment.

That name describes their whole identity, not just one bad habit.

😤 Haughty means assumed superiority over others

🙄 Scorner mocks correction, as defined earlier

🏷️ This name is not a compliment

📖 The name describes a whole identity

## 💼 Who Dealeth In Proud Wrath

Dealeth in pictures someone operating in anger the way a merchant deals in goods.

Proud wrath means anger rooted in wounded ego, not honest grievance.

This person's whole way of engaging with others runs through that anger.

Pride and anger are shown feeding each other in the same person.

💼 Dealeth in means operating in something regularly

🔥 Proud wrath means anger from wounded ego

🔗 Pride and anger feed each other

📖 This anger shapes how they treat everyone
# Proverbs 21:25-28
# 🛌 Laziness, Greed, And A Lying Witness
---
## 😴 The Desire Of The Slothful Killeth Him

Slothful is an old word for someone habitually, deliberately lazy.

Killeth here is a strong word, not a casual exaggeration.

This person wants good things but will not act to get them.

Wanting without acting is shown as genuinely dangerous, not just unproductive.

😴 Slothful means habitually, deliberately lazy

💀 Killeth is used here as a strong word

🎯 Wanting without acting is the real problem

📖 This inaction is shown as dangerous

## ✋ For His Hands Refuse To Labour

Refuse means an active choice, not an inability to work.

Hands here stand for the physical effort a person is capable of.

This is not describing someone unable to work, but someone unwilling.

The gap between wanting and refusing to act is the real danger.

✋ Refuse means an active choice

💪 Hands stand for physical effort available

🚫 This is unwillingness, not inability

📖 Wanting without acting causes real harm

## 👀 He Coveteth Greedily All The Day Long

Coveteth means wanting something that belongs to someone else.

All the day long shows this desire as constant, never satisfied.

This describes an appetite that never reaches a point of enough.

That endless wanting shapes this person's whole daily posture.

👀 Coveteth means wanting what belongs to others

⏳ All the day long means constant desire

🌀 This appetite never reaches enough

📖 Endless wanting shapes a daily posture

## 🎁 But The Righteous Giveth And Spareth Not

Spareth not means holding nothing back, giving freely and fully.

This sits in direct contrast to the greedy craving just described.

One person constantly wants more, the other constantly gives away.

Generosity here is shown as the opposite instinct of greed.

🎁 Spareth not means giving freely and fully

⚖️ This contrasts directly with greedy craving

🔄 One craves more, the other gives away

📖 Generosity is greed's opposite instinct

## 🚫 The Sacrifice Of The Wicked Is Abomination

Abomination is one of this book's strongest words for something God finds truly disgusting.

This echoes a similar warning already given earlier in Proverbs about worship without a right heart.

Even a religious act like sacrifice does not automatically please God.

The person offering it matters as much as the offering itself.

🚫 Abomination means something truly disgusting to God

🔁 This echoes an earlier warning in Proverbs

🐑 Sacrifice does not automatically please God

📖 The heart behind it matters most

## 🎭 How Much More, When He Bringeth It With A Wicked Mind?

This is not describing an honest mistake or an imperfect offering.

A wicked mind means bringing the sacrifice with dishonest or selfish intent.

That deliberate motive makes an already bad offering even worse.

Going through religious motions cannot cover up a dishonest purpose.

🎭 This is not an honest mistake

😈 A wicked mind means dishonest, selfish intent

📉 Bad motive makes a bad offering worse

📖 Religious motions cannot cover dishonest purpose

## ⚖️ A False Witness Shall Perish

A false witness means someone lying under oath in a legal case.

This kind of lying could cost an innocent person their freedom or life.

Perish here names a serious, lasting consequence, not a small penalty.

Courts in this culture depended heavily on truthful witnesses to function at all.

⚖️ A false witness lies under oath

⚠️ Innocent people could lose freedom or life

💀 Perish names a serious consequence

📖 Courts depended on truthful witnesses

## 👂 But The Man That Heareth Speaketh Constantly

Heareth here means someone who actually listens carefully before speaking.

Speaketh constantly means their words hold up and keep being trusted over time.

This contrasts a careful, honest witness with the false one just described.

A reputation for truth is built by consistency, not by one good moment.

👂 Heareth means listening carefully first

🗣️ Speaketh constantly means words that keep holding up

⚖️ This contrasts with the false witness above

📖 Trust is built through consistency
# Proverbs 21:29-31
# 🐴 A Hard Face, A Wise Heart, And A Ready Horse
---
## 😤 A Wicked Man Hardeneth His Face

Hardeneth his face pictures forcing a bold, unashamed expression on purpose.

This is a deliberate mask, not a natural, honest reaction.

A wicked person uses that hardened look to project confidence they may not feel.

The face becomes a tool for hiding guilt rather than showing it.

😤 Hardeneth his face means a forced expression

🎭 This mask is deliberate, not natural

💪 It projects confidence that may be false

📖 The face hides guilt instead of showing it

## 🧭 But As For The Upright, He Directeth His Way

Directeth his way means walking with clear, settled purpose.

This contrasts a wicked person's forced mask with genuine, quiet confidence.

The upright person does not need to fake anything to seem steady.

Real integrity produces a settled path without needing a performance.

🧭 Directeth his way means walking with purpose

⚖️ This contrasts fake confidence with real confidence

🌱 No performance is needed to seem steady

📖 Integrity produces a settled path naturally

## 🧠 There Is No Wisdom Nor Understanding Nor Counsel Against The LORD

This names three separate ways people try to succeed, wisdom, understanding, and counsel.

None of them work when they are aimed against what God wants.

Human cleverness is shown to have a hard limit here.

No amount of planning can ultimately outmaneuver God's purposes.

🧠 Three human strengths are named together

🚫 None work against God's purposes

🧱 Human cleverness has a hard limit

📖 No plan can outmaneuver God

## 🐴 The Horse Is Prepared Against The Day Of Battle

War horses required significant time, training, and expense to prepare properly.

This pictures a kingdom doing everything humanly possible to be ready for war.

That kind of preparation was a serious, practical responsibility, not laziness.

The verse does not criticize preparing carefully for battle.

🐴 War horses required real time and training

🛡️ This pictures full, careful readiness for war

✅ Preparation is treated as a real duty

📖 Careful preparation is not criticized here

## 🏆 But Safety Is Of The LORD

Safety here means the actual outcome of the battle, who wins and who survives.

Every human preparation still cannot guarantee that outcome by itself.

This does not tell people to skip preparing for what is ahead.

It tells people where the final result actually comes from.

🏆 Safety means the real outcome of battle

⚠️ Preparation alone cannot guarantee it

✅ Preparing is still expected of people

📖 The final result comes from God
`.trim();

export const PROVERBS_TWENTY_ONE_PERSONAL_SECTIONS = parseProverbsTwentyOneRawNotes(PROVERBS_TWENTY_ONE_RAW_NOTES);
