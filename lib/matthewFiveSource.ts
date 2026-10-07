export type MatthewFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewFiveRawNotes(rawText: string): MatthewFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 5:${startVerse}` : `Matthew 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Matthew 5 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_FIVE_RAW_NOTES = `# Matthew 5:1-2
# ⛰️ Jesus Teaches From The Mountain
---
## 🏔️ Seeing The Multitudes, He Went Up Into A Mountain

Large crowds had been following Jesus since the healings in chapter four.

He steps away from the crowd before he begins teaching.

Going up a mountain for important teaching recalls Moses on Sinai.

Matthew's Jewish readers would catch that echo immediately.

🏔️ Large crowds already followed Jesus

🚶 He steps away before teaching

📜 The mountain recalls Moses at Sinai

📖 Jewish readers would catch that echo

---

## 🪑 When He Was Set, His Disciples Came Unto Him

"Set" here is an old way of saying he sat down.

Jewish rabbis commonly taught while seated, a position of settled authority.

Standing was more for casual remarks, not formal instruction.

His disciples gather close while a wider crowd remains nearby.

🪑 Set means he sat down

📚 Rabbis taught seated, not standing

👥 His disciples gather in close

➡️ A wider crowd stays nearby too

---

## 👄 He Opened His Mouth, And Taught Them

"Opened his mouth" is an old phrase for beginning a weighty speech.

The Old Testament uses the same phrase for solemn, important announcements.

Matthew signals that something significant is about to be said.

What follows will be the longest connected teaching Jesus ever gives.

👄 Opened his mouth signals a weighty speech

📜 The Old Testament uses this same phrase

⚠️ Matthew signals something significant is coming

📖 This becomes Jesus's longest connected teaching

---

## 🗣️ And Taught Them, Saying

The word them points mainly to the disciples who just sat down with him.

Matthew seven later shows the wider multitude also hearing this same sermon.

The sermon was first aimed at those committed to following Jesus.

Anyone listening in was welcome to hear the same hard words.

👥 Them points mainly to the disciples

🎧 The wider crowd was listening too

🎯 The sermon targets committed followers first

📖 Anyone could still hear every word

# Matthew 5:3-6
# 😔 Blessed Are The Humble And Hungry
---
## 🙏 Blessed Are The Poor In Spirit

"Blessed" here means deeply favored and flourishing, not simply happy for a moment.

"Poor in spirit" means recognizing you have nothing to offer God on your own.

This is the opposite of pride or self reliance before God.

Jesus opens his most famous teaching by praising spiritual emptiness, not spiritual achievement.

🙏 Blessed means deeply favored, not just happy

🪣 Poor in spirit means spiritually empty handed

🚫 It is the opposite of pride

📖 Jesus praises spiritual emptiness first

---

## 👑 Theirs Is The Kingdom Of Heaven

This reward is stated in the present tense, not as a future hope only.

The kingdom of heaven describes God's reign breaking into the world right now.

Those who come to God empty handed already belong to that kingdom.

Nothing about this blessing waits for some later day to begin.

⏳ This reward is present, not only future

👑 The kingdom means God's reign breaking in

🤲 Empty handed people already belong to it

📖 This blessing starts now, not later

---

## 😢 Blessed Are They That Mourn

This mourning is grief over sin, brokenness, and loss, not everyday sadness.

It includes grieving your own sin as well as the pain of a broken world.

This kind of mourning takes the state of things seriously instead of ignoring it.

Jesus calls this grief blessed because of what follows it.

😢 This mourning is grief over brokenness

💔 It includes grief over your own sin

👀 It takes the world's pain seriously

📖 Jesus calls this grief blessed

---

## 🙌 They Shall Be Comforted

The prophet Isaiah promised comfort for those mourning over Israel's brokenness.

Jesus picks up that same old promise and applies it personally.

"Comforted" here points to God's own comfort, not a passing distraction.

Grief in this life is never the final word for those who mourn.

📜 Isaiah promised comfort long before this

🙌 Comforted here means God's own comfort

⏳ Grief is never the final word

📖 God promises real comfort to come

---

## 💪 Blessed Are The Meek

"Meek" does not mean weak or easily pushed around.

The same Greek word describes a powerful horse trained to obey its rider.

Meekness is controlled strength placed under God's authority.

Moses himself was once described using this exact word.

💪 Meek means controlled strength, not weakness

🐴 It describes a trained, obedient horse

🙏 It means strength under God's authority

📖 Moses was described with this word

---

## 🌍 They Shall Inherit The Earth

This line echoes Psalm thirty seven, a promise written centuries earlier.

In Jesus's world, the powerful and violent usually seized land for themselves.

This promise reverses that entire expectation completely.

God, not force, decides who ends up receiving the earth.

📜 This line echoes Psalm thirty seven

⚔️ Normally the powerful seized land

🔄 Jesus reverses that expectation completely

📖 God decides who inherits the earth

---

## 🥵 Hunger And Thirst After Righteousness

Hunger and thirst describe a desperate, physical kind of need, not a mild preference.

In a dry climate, real thirst could be a matter of life and death.

Jesus uses that same intensity to describe wanting to live rightly before God.

This craving is not a casual interest in being a little better.

🥵 Hunger and thirst describe desperate need

🏜️ Thirst could mean life or death

🎯 Jesus applies that intensity to righteousness

📖 This craving is anything but casual

---

## 🍽️ They Shall Be Filled

The same word elsewhere describes animals being fed until fully satisfied.

This is not a partial relief but a complete filling.

Jesus promises that this deep craving for righteousness will one day be fully met.

No one who hungers for God in this way is ignored forever.

🍽️ Filled describes complete satisfaction, not partial

🐑 The word elsewhere describes feeding animals fully

⏳ This craving will one day be met

📖 God does not ignore this hunger

# Matthew 5:7-12
# 🕊️ Blessed Are The Merciful And Persecuted
---
## 🤝 Blessed Are The Merciful

Mercy here means actively helping someone who does not deserve or cannot repay it.

This goes further than simply feeling sorry for someone in trouble.

In Jesus's teaching, mercy received and mercy given are always connected.

Showing mercy to others reflects how God has already treated us.

🤝 Mercy means actively helping the undeserving

💭 It goes beyond just feeling sorry

🔄 Mercy given and received stay connected

📖 It reflects how God treats us

---

## 💰 They Shall Obtain Mercy

This promise does not mean mercy is earned like a wage.

It means a merciful life and a mercy filled relationship with God go together.

Refusing mercy to others while expecting it from God does not fit this pattern.

Jesus repeats this same warning later in a parable about an unforgiving servant.

💰 Mercy is not earned like a wage

🔗 A merciful life connects to God's mercy

🚫 You cannot refuse mercy and expect it

📖 Jesus repeats this warning again later

---

## ❤️ Blessed Are The Pure In Heart

"Pure in heart" means undivided devotion, not simply avoiding outward sin.

A person could follow every external rule and still fail this test.

This purity is about motive, not just behavior others can see.

Jesus consistently cares more about the heart than the performance.

❤️ Pure in heart means undivided devotion

👀 It is about motive, not just action

🎭 Outward rule keeping is not enough

📖 Jesus always weighs the heart first

---

## 🤲 They Shall See God

In the Old Testament, directly seeing God's face was considered deadly for sinful people.

This promise points toward an unmediated, face to face relationship with God.

That kind of closeness was once thought impossible for ordinary people.

Jesus promises it anyway to those with undivided hearts.

⚠️ Seeing God's face once meant death

🤝 This promises direct closeness with God

🚫 That closeness once seemed impossible

📖 Jesus promises it to the pure

---

## 🕊️ Blessed Are The Peacemakers

A peacemaker actively works to end conflict, not someone who merely avoids it.

This takes effort, patience, and sometimes real personal risk.

Avoiding an argument is not the same thing as making peace.

Jesus calls for people who step toward conflict to resolve it.

🕊️ A peacemaker actively ends conflict

💪 This takes real effort and risk

🙅 Avoiding conflict is not the same

📖 Jesus calls for people who step in

---

## 👪 They Shall Be Called The Children Of God

Peacemaking reflects God's own character as the ultimate reconciler of people to himself.

Being called God's child here is tied directly to acting like him.

This is a family resemblance, not just a title.

Those who make peace look like their Father.

👨‍👧 This ties identity to God's own character

🔗 God himself is the ultimate reconciler

👪 It is a family resemblance, not a title

📖 Peacemakers look like their Father

---

## 🎯 Blessed Are They Which Are Persecuted For Righteousness' Sake

This suffering comes specifically from doing what is right, not from any random hardship.

Jesus repeats the exact same reward promised back in the very first beatitude.

Bookending the list like this ties every blessing to this same kingdom reward.

Persecution for a crime or for just being difficult does not count here.

🎯 This suffering comes from doing right

🔁 Jesus repeats the very first reward

📚 The list is bookended on purpose

📖 Every blessing ties to one kingdom

---

## 🗣️ Blessed Are Ye, When Men Shall Revile You

"Revile" means to insult or mock someone to their face, not behind their back.

This verse shifts from "they" to "you," addressing the disciples directly.

Jesus names mockery, persecution, and false accusation together as one experience.

These disciples would face exactly this treatment within their own lifetimes.

🗣️ Revile means mocking someone openly

👉 This verse speaks directly to you

🎭 Mockery and persecution come together here

📖 Disciples would face this in their lifetimes

---

## ❌ Shall Say All Manner Of Evil Against You Falsely, For My Sake

"Falsely" means the accusation is untrue, not deserved criticism.

"For my sake" ties this suffering to loyalty to Jesus.

This is not a blessing on just any suffering.

It is a blessing on suffering caused by following Christ.

❌ Falsely means the accusation is untrue

🙏 For my sake ties this to Jesus

🚫 This is not about any suffering

📖 It is about suffering for Christ

---

## 😊 Rejoice, And Be Exceeding Glad

This command to respond with joy sounds strange next to real suffering.

Jesus is not denying that persecution hurts in the moment.

He is pointing past the pain toward a reward that outweighs it.

Joy here looks forward, not a denial of present pain.

😊 Rejoice sounds strange next to suffering

💔 Jesus does not deny the pain

🔭 He points past it to a reward

📖 This joy looks forward, not backward

---

## 🔗 So Persecuted They The Prophets Which Were Before You

Jesus links his disciples directly to Israel's long line of persecuted prophets.

Prophets like Elijah and Jeremiah suffered for speaking God's truth plainly.

Being mocked for following Jesus places disciples in very good company.

This suffering was never a sign that something had gone wrong.

🔗 Jesus links disciples to the prophets

📜 Elijah and Jeremiah suffered the same way

👥 This places disciples in good company

📖 Suffering here is not a bad sign

# Matthew 5:13-16
# 🧂 Salt And Light
---
## 🧂 Ye Are The Salt Of The Earth

Salt in the ancient world preserved food and kept it from spoiling.

It also added flavor to otherwise plain and bland food.

Jesus says disciples serve this same purpose within the world around them.

Their presence is meant to slow decay and bring out what is good.

🧂 Salt preserved food from spoiling

😋 Salt also added flavor

🌍 Disciples work the same way in the world

📖 Their presence slows decay and adds good

---

## 📉 If The Salt Have Lost His Savour

Salt from the Dead Sea region often contained impurities that reduced its strength.

Salt in this condition no longer did what salt was supposed to do.

Jesus pictures a disciple who still looks like salt but has stopped acting like it.

Identity without impact misses the entire point.

🧂 Impure salt lost its real strength

👀 It still looked like salt

🚫 A disciple can lose impact the same way

📖 Identity without impact misses the point

---

## 🚶 Cast Out, And To Be Trodden Under Foot Of Men

Useless salt in this period was often thrown out onto a path or road.

People walking by would simply tread it underfoot like dirt.

This is a picture of something that once mattered becoming worthless.

Jesus warns that losing distinct influence carries a real cost.

🚶 Useless salt got thrown onto roads

👣 People walked over it like dirt

📉 Something valuable can become worthless

📖 Losing influence carries a real cost

---

## 💡 Ye Are The Light Of The World

Jesus repeats the same "ye are" pattern used just before with salt.

This is a statement about identity, not a goal still to reach.

Light here means visible truth and goodness shown openly to others.

Disciples already carry this identity the moment they follow Jesus.

💡 Ye are repeats the identity pattern

🌍 Light means visible truth and goodness

✅ This is identity, not a future goal

📖 Disciples carry this from the start

---

## 🏘️ A City That Is Set On An Hill Cannot Be Hid

Many towns in Galilee were built on hillsides, visible for miles around.

At night, their lamp lit windows could be seen from far away.

Jesus uses an image his listeners could picture immediately from daily life.

A disciple's life is just as naturally visible to everyone nearby.

🏘️ Galilean towns often sat on hills

🌃 Their lights were visible at night

👀 Listeners could picture this immediately

📖 A disciple's life is just as visible

---

## 🧺 Light A Candle, And Put It Under A Bushel

A "bushel" was a large basket used to measure grain, not a lamp cover.

Hiding a lit lamp under a basket defeats the entire purpose of lighting it.

No one lights a lamp intending to immediately smother it.

Jesus points out an action that makes no practical sense at all.

🧺 A bushel was a grain measuring basket

🔥 Hiding a lamp defeats its purpose

🙅 No one lights a lamp to hide it

📖 This action makes no practical sense

---

## 🕯️ It Giveth Light Unto All That Are In The House

Many homes in this period were small, single rooms shared by a whole family.

One lamp, placed well, was enough to light the entire space.

Jesus pictures a light doing exactly the job it was made for.

A disciple's good influence is meant to reach everyone nearby, not a select few.

🏠 Homes were often one small room

🕯️ One lamp lit the whole space

🎯 Jesus pictures light doing its job

📖 Good influence should reach everyone nearby

---

## 👁️ Let Your Light So Shine Before Men

This shining happens through visible actions, not through announcing good intentions.

"Before men" means other people are meant to actually see this.

Jesus is not describing a private, invisible kind of faith.

What disciples do in daily life is meant to be seen.

👁️ Shining happens through visible action

🗣️ Before men means others can see it

🚫 This is not a private faith

📖 Daily life is meant to be seen

---

## 🙌 That They May See Your Good Works, And Glorify Your Father

The goal of visible good works is never to draw attention to yourself.

Glorify means to point credit and honor toward someone else entirely.

Jesus redirects every bit of attention back to God the Father.

Good works done well end in worship, not personal praise.

🙅 The goal is never self attention

🙌 Glorify means pointing honor elsewhere

🎯 Jesus redirects attention to the Father

📖 Good works should end in worship

# Matthew 5:17-20
# 📜 Jesus And The Law
---
## 📚 Think Not That I Am Come To Destroy The Law, Or The Prophets

"The law, or the prophets" was a common Jewish shorthand for the entire Old Testament.

Some already worried that Jesus's teaching might cancel out the Scriptures.

Jesus directly addresses that fear before it can spread any further.

He is about to correct a misunderstanding, not confirm one.

📚 Law and prophets means the whole Old Testament

😟 Some feared Jesus would cancel Scripture

🛑 Jesus addresses that fear directly

📖 He corrects a misunderstanding here

---

## 🎯 I Am Not Come To Destroy, But To Fulfil

"Fulfil" means to bring something to its complete, intended meaning.

Jesus is not erasing the Old Testament but living out what it always pointed toward.

Every law, promise, and prophecy finds its intended goal in him.

This is completion, not cancellation.

🎯 Fulfil means completing the intended meaning

➡️ Jesus lives out what it pointed toward

🔗 Every promise finds its goal in him

📖 This is completion, not cancellation

---

## ✅ Verily I Say Unto You

"Verily" is an old word meaning truly or certainly.

Jesus uses this exact phrase repeatedly throughout his teaching.

It functions like an underline, marking a statement as especially important.

What follows this phrase deserves the reader's full attention.

✅ Verily means truly or certainly

🔁 Jesus repeats this phrase often

📌 It marks an especially important statement

📖 What follows deserves full attention

---

## 🔤 One Jot Or One Tittle Shall In No Wise Pass From The Law

A "jot" was the smallest letter in the Hebrew alphabet, barely more than a mark.

A "tittle" was an even tinier stroke used to tell two similar letters apart.

Jesus picks the smallest possible details to make his point as strong as possible.

Nothing in Scripture, down to its smallest details, is treated as unimportant.

🔤 A jot was the smallest Hebrew letter

✏️ A tittle was an even tinier mark

💪 Jesus picks the smallest details on purpose

📖 Nothing in Scripture is treated as unimportant

---

## ⏳ Till All Be Fulfilled

This phrase sets a boundary on how long Scripture's authority holds.

Jesus ties its lasting authority to his own work of fulfilling it.

Nothing is said here about Scripture quietly expiring over time.

Its authority stands until everything it points toward is complete.

⏳ This sets a boundary on Scripture's authority

🔗 That authority ties to Jesus fulfilling it

🚫 Scripture does not quietly expire

📖 It stands until everything is complete

---

## 🔍 Whosoever Therefore Shall Break One Of These Least Commandments

"Least" commandments means even the smallest, easiest to overlook instructions.

Jesus is not only concerned with major, obvious sins.

Teaching others to treat small commands as optional carries real weight.

Small matters of obedience are never actually small to Jesus.

🔍 Least means even the smallest commands

🎯 Jesus cares about more than major sins

🗣️ Teaching others to skip them carries weight

📖 Small obedience is never small to Jesus

---

## 📏 The Same Shall Be Called Great In The Kingdom Of Heaven

Greatness here is measured by consistent obedience and faithful teaching.

This is not about fame, status, or public recognition.

Someone faithful in overlooked details can rank as truly great.

Jesus redefines greatness around faithfulness rather than visibility.

📏 Greatness is measured by obedience here

🚫 This is not about fame or status

🔍 Faithfulness in small things counts as great

📖 Jesus redefines greatness around faithfulness

---

## 👀 Except Your Righteousness Shall Exceed The Righteousness Of The Scribes And Pharisees

Scribes and Pharisees were known for careful, detailed obedience to religious law.

By outward appearances, they were considered the most righteous people in Jewish society.

Jesus says their standard is still not high enough to enter the kingdom.

The rest of this chapter will show exactly where they fell short.

📜 Scribes and Pharisees kept detailed religious law

👀 They looked like the most righteous people

⚠️ Jesus says their standard is not enough

📖 The chapter will show where they fell short

# Matthew 5:21-26
# 😡 Anger And Reconciliation
---
## 👂 Ye Have Heard That It Was Said By Them Of Old Time

This phrase introduces a teaching the crowd had already heard many times before.

It usually points to either the Old Testament text itself or common rabbinic teaching about it.

Jesus uses this same formula six times across this chapter.

Each time, he follows it with his own deeper correction.

👂 This introduces a familiar teaching

📜 It points to Scripture or common teaching

🔁 Jesus repeats this formula six times

📖 Each time he deepens the teaching

---

## 🔢 Thou Shalt Not Kill

This is the sixth of the Ten Commandments, first given through Moses.

On the surface, this command only addresses the physical act of murder.

Most people listening could honestly say they had never broken it.

Jesus is about to show that the command reaches much further than that.

🔢 This is the sixth commandment

🩸 It addresses the physical act of murder

✅ Most listeners felt they kept this one

📖 Jesus shows it reaches further

---

## ⚖️ But I Say Unto You

Jesus repeats this contrast phrase again right after quoting the Law.

Claiming authority to add to Moses's own words was a bold move.

No ordinary rabbi would speak about the Law this way.

Jesus speaks as someone with authority equal to the Law's original giver.

⚖️ Jesus contrasts his words with the Law

💪 Adding to Moses's words was bold

🚫 No ordinary rabbi spoke this way

📖 Jesus speaks with the Law giver's authority

---

## ❤️‍🔥 Whosoever Is Angry With His Brother Without A Cause

Jesus moves the command from the outward act to the inward attitude.

Anger without real cause means a grudge or rage that has no fair justification.

This does not outlaw every emotion of anger in every situation.

It targets anger nursed and held onto without good reason.

❤️‍🔥 Jesus moves from action to attitude

⚖️ Without a cause means no fair reason

🚫 Not every angry feeling is condemned

📖 This targets anger held onto wrongly

---

## 🗣️ Whosoever Shall Say To His Brother, Raca

"Raca" is an Aramaic insult, something close to calling someone empty headed or worthless.

It was a common term of contempt in everyday first century speech.

Jesus treats this kind of verbal contempt with surprising seriousness.

Words meant to belittle someone carry real moral weight.

🗣️ Raca was an Aramaic insult

🤡 It meant something like empty headed

⚠️ Jesus treats contempt seriously

📖 Belittling words carry real weight

---

## 🤬 Whosoever Shall Say, Thou Fool

This insult goes further than Raca, attacking someone's whole character and worth.

It questions whether a person has any moral or spiritual value at all.

Jesus escalates the warning along with the escalating insult.

Degrading another person's worth is treated as a serious offense before God.

🤬 This insult attacks a person's character

❓ It questions someone's whole moral worth

📈 The warning escalates with the insult

📖 Degrading others is a serious offense

---

## 🛐 If Thou Bring Thy Gift To The Altar

Bringing an offering to the temple altar was a central act of Jewish worship.

This scene imagines someone already in the middle of worshiping God.

Jesus deliberately interrupts an act of worship to make his point.

Even sincere worship is not the most urgent thing in this moment.

🛐 Bringing a gift was central worship

🏛️ This scene is set at the temple

✋ Jesus interrupts worship on purpose

📖 Worship is not always the most urgent thing

---

## 📝 Thy Brother Hath Ought Against Thee

"Ought" is an old word simply meaning anything at all.

This covers any unresolved grievance, not only serious disputes.

Jesus assumes the worshiper will already know exactly who and what this means.

Unresolved conflict is treated as unfinished business before God.

📝 Ought is an old word for anything

🔍 This covers even minor grievances

🧠 The worshiper already knows the situation

📖 Unresolved conflict is unfinished business

---

## 🥇 First Be Reconciled To Thy Brother

Jesus places reconciliation ahead of completing an act of religious worship.

"Be reconciled" means actively working to restore the broken relationship.

This may mean traveling back out of the temple to make things right.

God cares more about restored relationships than about ritual being finished on schedule.

🥇 Reconciliation comes before finishing worship

🤝 Be reconciled means actively restoring the relationship

🚶 This might mean leaving the temple

📖 God values relationships over ritual schedules

---

## ⏱️ Agree With Thine Adversary Quickly

This pictures someone being taken to court over an unpaid debt.

"Quickly" stresses urgency, settling the matter before it reaches a judge.

Letting conflict escalate often brings consequences far worse than the original problem.

Jesus uses an everyday legal scene to teach about personal relationships.

⚖️ This pictures a debt dispute

⏱️ Quickly stresses settling it fast

📈 Delay often makes consequences worse

📖 Jesus teaches through an everyday legal scene

---

## 🪙 Till Thou Hast Paid The Uttermost Farthing

A farthing was one of the smallest coins in common use at the time.

"Uttermost" means every single bit, down to this smallest unit.

Debt left unresolved in this picture results in real imprisonment.

Jesus warns that avoided conflict rarely disappears, it just grows more costly.

🪙 A farthing was a very small coin

💯 Uttermost means every last bit

⛓️ Unresolved debt could mean prison

📖 Avoided conflict grows more costly

# Matthew 5:27-30
# 👁️ Lust And Radical Dealing With Sin
---
## 🔢 Thou Shalt Not Commit Adultery

This is the seventh of the Ten Commandments, given through Moses.

On the surface, it addresses only the physical act of unfaithfulness.

Most listeners could honestly claim they had never broken this one either.

Jesus is about to trace this command back to its root.

🔢 This is the seventh commandment

🩸 It addresses the physical act itself

✅ Most listeners felt they kept this one

📖 Jesus traces it back to its root

---

## 👀 Whosoever Looketh On A Woman To Lust After Her

This is not a passing glance or a simple noticing of beauty.

"To lust after her" describes a deliberate, repeated gazing meant to desire and possess.

The verb describes intention, not an accidental or unavoidable glance.

Jesus targets a chosen pattern of desire, not a fleeting human reaction.

👀 This is not a passing glance

🎯 It describes deliberate, repeated gazing

🧠 The verb describes intention, not accident

📖 Jesus targets chosen desire, not reaction

---

## ❤️ Hath Committed Adultery With Her Already In His Heart

Jesus locates the sin in the heart's intention, not only the physical act.

This does not erase the difference between a thought and an action.

It does mean the heart's desire is already morally serious to God.

Outward innocence does not guarantee an innocent heart.

❤️ The sin starts in the heart's intention

⚖️ A thought and an act still differ

🎯 Desire itself is morally serious

📖 Outward innocence does not guarantee an innocent heart

---

## ⚠️ If Thy Right Eye Offend Thee

"Offend" here means causes you to stumble into sin, not simply annoy you.

The right eye represents whatever specific thing leads a person into this temptation.

Jesus is not describing minor irritation but a serious spiritual danger.

Something trusted and valuable can still become a source of sin.

⚠️ Offend means causing you to stumble

👁️ The eye represents a specific temptation

🚨 This describes serious danger, not annoyance

📖 Valuable things can still become sin's source

---

## 🎭 Pluck It Out, And Cast It From Thee

Jesus is using hyperbole here, a deliberate exaggeration to drive home a point.

No one in his audience understood this as a literal command to harm themselves.

The point is to deal with the source of temptation as decisively as possible.

Half measures rarely work against something that tempts you consistently.

🎭 This is hyperbole, not a literal command

🧠 No listener took this as self harm

💪 The point is decisive action

📖 Half measures rarely defeat real temptation

---

## ⚖️ Profitable For Thee That One Of Thy Members Should Perish

"Profitable" here means a better deal in the long run, even if it costs something now.

Losing something valuable now is better than losing everything to sin's full consequence.

Jesus is weighing a smaller loss against a much larger one.

This logic values eternal consequences over present comfort.

⚖️ Profitable means the better deal long term

💔 A small loss beats a total loss

🔭 Jesus weighs small loss against large

📖 Eternal consequences outweigh present comfort

---

## ✋ If Thy Right Hand Offend Thee

The hand represents action, paired here with the eye's representing desire.

Together the eye and the hand cover both wanting and doing.

Jesus addresses the full pattern that leads from temptation into sin.

No part of this process is treated as beyond dealing with seriously.

✋ The hand represents action, not desire

🔗 Together they cover wanting and doing

🎯 Jesus addresses the full pattern

📖 No part of it is ignored

---

## 🔁 Cut It Off, And Cast It From Thee

This repeats the same hyperbole used just before with the eye.

Repetition here underlines just how seriously Jesus wants this point taken.

Both verses use vivid, physical language to describe a spiritual decision.

Dealing radically with sin's source matters more than appearing comfortable.

🔁 This repeats the eye's hyperbole

📢 Repetition underlines the seriousness

🎭 Vivid language describes a spiritual decision

📖 Dealing with sin matters more than comfort

# Matthew 5:31-32
# 💔 Divorce
---
## 📜 Whosoever Shall Put Away His Wife

"Put away" is an old phrase simply meaning to divorce someone.

This phrase was already a well known part of the Jewish legal system.

Jesus is addressing an existing practice, not introducing a brand new topic.

Divorce in this culture carried serious social and economic consequences, especially for the wife.

📜 Put away means to divorce

⚖️ This was an existing legal practice

👥 Jesus addresses a known topic

📖 Divorce carried serious consequences, especially for wives

---

## 📑 Let Him Give Her A Writing Of Divorcement

This certificate comes from a law found back in Deuteronomy chapter twenty four.

The document legally proved a woman was free to remarry without penalty.

It existed to protect her, not simply to make divorce convenient.

By Jesus's time, some teachers had stretched this law to allow divorce too easily.

📜 This certificate comes from Deuteronomy

✅ It proved she was free to remarry

🛡️ It existed to protect her

📖 Some teachers stretched this law too far

---

## ✅ Saving For The Cause Of Fornication

"Fornication" here points to sexual unfaithfulness within the marriage.

This is the one exception Jesus names in this teaching.

Some religious teachers of the time allowed divorce for almost any reason at all.

Jesus narrows acceptable grounds back down sharply from that loose standard.

💔 Fornication means sexual unfaithfulness here

✅ This is the one named exception

📏 Some teachers allowed divorce too easily

📖 Jesus narrows the grounds sharply

---

## 💍 Whosoever Shall Marry Her That Is Divorced Committeth Adultery

This line addresses someone who marries a person divorced outside of this one exception.

Jesus treats that new marriage as itself a form of unfaithfulness.

This teaching protected a woman from being treated as disposable through easy divorce.

The whole passage pushes toward lifelong faithfulness as the intended design.

💍 This addresses marrying someone wrongly divorced

⚠️ Jesus calls that marriage unfaithful too

🛡️ This protected women from being disposable

📖 Lifelong faithfulness is the intended design

# Matthew 5:33-37
# 🤞 Oaths And Honest Speech
---
## 📜 Thou Shalt Not Forswear Thyself

"Forswear" means to break a promise made under a sworn oath.

This command assumes oaths are sometimes necessary to guarantee honesty.

The Old Testament allowed oaths as long as they were kept faithfully.

Breaking a sworn promise was treated as a serious offense against God.

📜 Forswear means breaking a sworn promise

✅ The Old Testament allowed careful oaths

🙏 Oaths guaranteed honesty when kept

📖 Breaking one offended God seriously

---

## 🙌 Shalt Perform Unto The Lord Thine Oaths

This line comes from commands scattered through Leviticus, Numbers, and Deuteronomy.

An oath sworn in God's name carried his authority behind the promise.

Failing to keep it treated God's name carelessly, not just the other person.

This was the accepted standard before Jesus adds anything further.

📜 This comes from several Old Testament books

🙌 An oath invoked God's own authority

⚠️ Breaking it treated God's name carelessly

📖 This was the accepted old standard

---

## 📈 Swear Not At All

Jesus pushes past the old standard toward something more demanding.

He is not banning every legal oath, like a courtroom promise to testify truthfully.

He is targeting a culture that used oaths to dress up unreliable speech.

A truthful person should not need an oath to be believed.

📈 Jesus goes beyond the old standard

⚖️ This does not ban every legal oath

🎭 It targets dressed up, unreliable speech

📖 Truthful people need no oath to be believed

---

## 🙌 Neither By Heaven, For It Is God's Throne

Swearing "by heaven" was a common way to invoke God's authority indirectly.

Avoiding God's actual name felt safer to some, but still called on him.

Calling heaven "God's throne" ties this casual phrase directly back to him.

There was no truly neutral way to swear that left God out of it.

🙌 Swearing by heaven still invoked God

🚫 Avoiding his name did not avoid him

👑 Heaven is tied directly to his throne

📖 No oath left God out entirely

---

## 🪑 Nor By The Earth, For It Is His Footstool

This picture comes from the prophet Isaiah, describing God's vast greatness.

A footstool sits beneath someone seated on a much larger throne.

Calling earth God's footstool pictures his authority as far greater than the whole planet.

Swearing by the earth still ends up swearing by its owner.

📜 This image comes from Isaiah

🪑 A footstool sits beneath a throne

🌍 Earth pictures God's vast greatness

📖 Swearing by earth still means God

---

## 🏙️ Neither By Jerusalem, For It Is The City Of The Great King

Jerusalem was considered God's own chosen city throughout Jewish history.

Calling it "the city of the great King" names God as that king directly.

Even a geographic location carried God's authority in this culture.

Every example in this list circles back to the same unavoidable point.

🏙️ Jerusalem was God's chosen city

👑 The great King names God directly

🗺️ Even places carried his authority

📖 Every example circles back to God

---

## 🙋 Thou Canst Not Make One Hair White Or Black

Swearing "by thy head" called on your own life as a guarantee.

Hair color was something ancient people associated with health, age, and vitality.

No person actually controls something this small about their own body.

Swearing by yourself is an empty promise backed by power you do not have.

🙋 Swearing by your head calls on your life

🎨 Hair color signaled health and vitality

🚫 No one controls something this small

📖 This oath is backed by no real power

---

## 🗣️ Let Your Communication Be, Yea, Yea, Nay, Nay

"Communication" here simply means your ordinary, everyday speech.

Jesus calls for words so reliable they need no oath attached to them.

A simple yes or no should already carry full weight on its own.

This is a call to a consistent, trustworthy character, not a speech trick.

🗣️ Communication means ordinary everyday speech

✅ Words should need no oath attached

⚖️ A simple yes or no should suffice

📖 This calls for trustworthy character

---

## 🤔 Whatsoever Is More Than These Cometh Of Evil

Needing an oath at all suggests an assumption that plain words cannot be trusted.

That assumption itself grows out of a world shaped by dishonesty and broken trust.

Jesus traces the entire practice of oath taking back to that root problem.

A truly honest community would have little use for oaths in daily life.

🤔 Needing an oath assumes distrust

🌍 Dishonesty is the root of that assumption

🔍 Jesus traces oaths back to that root

📖 Honest people have little use for oaths

# Matthew 5:38-42
# 🤚 Turning The Other Cheek
---
## 📜 An Eye For An Eye, And A Tooth For A Tooth

This law comes from Exodus and Leviticus, limiting punishment to match the harm done.

Its original purpose was to stop revenge from spiraling out of proportion.

It was meant for courts to apply evenly, not for personal use.

By Jesus's time, many had turned it into an excuse for personal payback.

📜 This law comes from Exodus and Leviticus

⚖️ It limited punishment to match harm

🏛️ Courts applied it, not individuals

📖 Many turned it into personal payback

---

## 🙅 That Ye Resist Not Evil

This does not call for total passivity in the face of every wrong.

It calls for refusing to answer evil with personal revenge of your own.

Jesus is addressing personal retaliation, not every form of resistance to wrongdoing.

This teaching reshapes how disciples respond to being personally wronged.

🚫 This is not total passivity

🙅 It refuses personal revenge specifically

🎯 Jesus targets retaliation, not all resistance

📖 This reshapes how disciples respond

---

## ✋ Whosoever Shall Smite Thee On Thy Right Cheek

A backhanded strike with the right hand was a common insult in this culture.

It was meant to shame someone publicly, not to cause serious physical injury.

Hitting the right cheek with the right hand required an awkward backhand motion.

This verse pictures a deliberate insult, not a random act of violence.

✋ A backhand strike was a public insult

🎭 It aimed to shame, not injure

🔄 Hitting the right cheek required a backhand

📖 This pictures insult, not random violence

---

## 🔄 Turn To Him The Other Also

Offering the other cheek refuses to answer the insult with a matching one.

It also denies the attacker the reaction he was trying to provoke.

This response takes real courage, not weakness or passivity.

It breaks the cycle of insult and retaliation on purpose.

🔄 This refuses a matching insult back

🙅 It denies the reaction he wanted

💪 This response takes real courage

📖 It breaks the cycle on purpose

---

## 👕 If Any Man Will Sue Thee At The Law, And Take Away Thy Coat

The "coat" here refers to an inner tunic, a basic everyday garment.

Jewish law allowed lawsuits over debts, sometimes involving a person's own clothing.

This scene pictures someone losing a legal argument over a very basic possession.

Jesus starts with an already difficult, humiliating legal loss.

👕 The coat was a basic inner garment

⚖️ Lawsuits could involve someone's clothing

😔 This pictures a humiliating legal loss

📖 Jesus starts from a hard situation

---

## 🧥 Let Him Have Thy Cloak Also

The "cloak" was an outer garment many poor people used as a blanket at night.

Mosaic law actually protected the cloak from being taken as collateral overnight.

Jesus tells his listener to surrender even that legally protected item willingly.

This goes beyond what the law required, into voluntary generosity.

🧥 The cloak doubled as a nighttime blanket

🛡️ The law protected it from being taken

🤲 Jesus asks for voluntary generosity here

📖 This goes beyond what the law required

---

## ⚔️ Whosoever Shall Compel Thee To Go A Mile

Roman soldiers had the legal right to force civilians to carry gear one mile.

This practice was deeply resented under Roman military occupation.

Simon of Cyrene later experiences this exact kind of forced service with Jesus's cross.

Jesus addresses a real, hated feature of daily life under occupation.

⚔️ Roman soldiers could force this service

😡 This practice was deeply resented

🔗 Simon of Cyrene later faces this exact thing

📖 Jesus addresses real daily hardship

---

## 🔢 Go With Him Twain

"Twain" is an old word simply meaning two.

Jesus tells his listener to voluntarily double a hated, forced obligation.

Doing this turns a resented duty into an act of free generosity.

Choosing more than required flips the entire meaning of the situation.

🔢 Twain is an old word for two

➕ Jesus says to double the obligation

🔄 This turns duty into generosity

📖 Choosing more flips the situation's meaning

---

## 🤲 Give To Him That Asketh Thee

This instruction calls for a basic, ready posture of generosity toward need.

It does not demand giving away everything without any wisdom or limit.

Jesus is correcting a stingy, self protective instinct, not banning discernment entirely.

Generosity here flows from the same spirit as the earlier examples in this passage.

🤲 This calls for ready generosity

🧠 It does not ban wise discernment

🎯 Jesus corrects a stingy instinct

📖 This flows from the same spirit

---

## 💰 From Him That Would Borrow Of Thee Turn Not Thou Away

This extends the same generosity to lending, not only to outright giving.

Turning someone away in need was the easier, more comfortable default choice.

Jesus asks disciples to resist that comfortable instinct toward self protection.

Generosity in this passage covers both giving and lending without resentment.

💰 This extends generosity to lending

😌 Turning someone away was the easy choice

🛡️ Jesus asks disciples to resist that instinct

📖 Generosity covers both giving and lending

# Matthew 5:43-48
# ❤️ Loving Your Enemies
---
## 📜 Thou Shalt Love Thy Neighbour

This command comes directly from Leviticus chapter nineteen.

In its original context, "neighbour" often meant fellow Israelites specifically.

Jesus later expands this definition dramatically in the parable of the good Samaritan.

Here, he builds on a command his listeners already knew well.

📜 This command comes from Leviticus

👥 Neighbour originally meant fellow Israelites

🌍 Jesus later expands this definition

📖 He builds on a familiar command

---

## 🚫 And Hate Thine Enemy

This second half was never actually commanded anywhere in the Old Testament.

It had become a common, unspoken assumption many people simply accepted as true.

Jesus names this false addition before he corrects it directly.

Recognizing a wrong assumption is often the first step toward correcting it.

🚫 This half was never actually commanded

🧠 It became a common false assumption

🔍 Jesus names the assumption first

📖 Naming it is the first correction

---

## ❤️ Love Your Enemies

This is one of the most demanding and well known commands Jesus ever gave.

It targets people who have genuinely wronged you, not just people you dislike.

Jesus does not offer this as a suggestion among other options.

This command sits at the very center of his entire sermon.

❤️ This is a famous, demanding command

🎯 It targets people who wronged you

✅ This is not an optional suggestion

📖 It sits at the sermon's center

---

## 🗣️ Bless Them That Curse You

Cursing here means wishing harm or speaking evil against someone out loud.

Blessing in response means speaking good toward that same person instead.

This directly reverses the natural human instinct to curse back.

Jesus asks for a response that defies instinct on purpose.

🗣️ Cursing means wishing harm aloud

🙏 Blessing means speaking good instead

🔄 This reverses the natural instinct

📖 Jesus asks for a response against instinct

---

## 😤 Pray For Them Which Despitefully Use You

"Despitefully use" means to mistreat someone out of real spite or cruelty.

Praying for someone like this goes further than simply tolerating them.

It means actively wanting good things for someone who wants you harm.

This kind of prayer changes the person praying as much as anyone else.

😤 Despitefully use means spiteful mistreatment

🙏 Praying goes further than tolerating

💛 It means wanting good for your enemy

📖 This prayer changes the one praying

---

## 👨‍👧 That Ye May Be The Children Of Your Father Which Is In Heaven

Being called God's child here depends on reflecting his own character.

This is a family resemblance that shows up in action, not just in name.

Loving enemies is one way that resemblance becomes visible to others.

Jesus ties identity directly to how a person actually treats their enemies.

👨‍👧 Being God's child means reflecting his character

👪 This resemblance shows up in action

👁️ Loving enemies makes it visible

📖 Identity shows in how you treat enemies

---

## ☀️ He Maketh His Sun To Rise On The Evil And On The Good

Sunlight and rain in this culture were considered direct gifts from God himself.

God gives this common grace without checking anyone's moral record first.

Both good and evil people wake up to the same sunrise every single day.

Jesus points to nature itself as proof of God's wide, impartial generosity.

☀️ Sunlight was seen as a gift from God

📋 God gives it without checking moral records

🌅 Good and evil see the same sunrise

📖 Nature itself proves God's wide generosity

---

## 😌 If Ye Love Them Which Love You, What Reward Have Ye

Loving people who already love you back requires very little real effort.

This kind of love asks nothing difficult or costly of a person.

Jesus questions whether this common, easy love deserves any special reward at all.

He is raising the bar far above this comfortable, natural baseline.

😌 Loving those who love you is easy

💤 It asks nothing difficult or costly

❓ Jesus questions if this deserves reward

📖 He raises the bar higher

---

## 💰 Do Not Even The Publicans The Same

"Publicans" were tax collectors, widely viewed as corrupt and morally compromised.

Jewish society generally considered them among the lowest moral examples available.

Even people viewed that negatively still manage this same basic, easy love.

Jesus uses a despised example to show how low this common standard really is.

💰 Publicans were tax collectors, widely despised

📉 They were seen as a low moral example

✅ Even they manage this easy love

📖 Jesus shows how low this standard is

---

## 🤝 If Ye Salute Your Brethren Only, What Do Ye More Than Others

A "salute" in this culture was a formal greeting, acknowledging someone as an equal.

Greeting only your own close circle required no real generosity of spirit.

Even outsiders with no faith commitment manage this same limited courtesy.

Jesus again measures the easy, natural baseline before raising it.

🤝 A salute was a formal greeting

👥 Greeting only your circle takes no effort

🌍 Outsiders manage this same courtesy

📖 Jesus measures the baseline again

---

## 🎯 Be Ye Therefore Perfect

"Perfect" here translates a word meaning complete, whole, or fully mature.

It does not demand flawless performance in every single moment of life.

This call matches the complete, impartial fairness God has just been shown to have.

Maturity in love, not flawlessness, is the actual target of this command.

🎯 Perfect means complete or fully mature

🚫 It does not demand flawless performance

⚖️ It matches God's complete fairness

📖 Maturity in love is the real target

---

## ☀️ Even As Your Father Which Is In Heaven Is Perfect

God's own character, shown moments earlier through sun and rain, sets this standard.

This standard is impossibly high by human measure, yet it is the real goal.

Jesus closes the entire sermon section on loving enemies with this same high bar.

The chapter ends by pointing every command in it straight back to God's own character.

☀️ God's character sets this high standard

🎯 It is impossibly high, yet the real goal

🔚 Jesus closes on this same high bar

📖 Every command points back to God
`.trim();

export const MATTHEW_FIVE_PERSONAL_SECTIONS = parseMatthewFiveRawNotes(MATTHEW_FIVE_RAW_NOTES);
