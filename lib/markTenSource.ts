export type MarkTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkTenRawNotes(rawText: string): MarkTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 10:${startVerse}` : `Mark 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Mark 10 sections, received " + sections.length);
  }

  return sections;
}

const MARK_TEN_RAW_NOTES = `# Mark 10:1-5
# ⚖️ A Question About Divorce
---
## 🗺️ Coasts Of Judaea By The Farther Side Of Jordan

The farther side of Jordan means the region called Perea.

Perea sat east of the Jordan River, across from Judaea.

Jesus had been teaching up north in Galilee before this.

Now he moves south, back toward Jerusalem, through Perea.

This whole journey is heading toward the cross.

🗺️ Farther side of Jordan means Perea

🧭 Perea sat east of the river

🚶 Jesus moves from Galilee toward Jerusalem

📖 This journey is heading toward the cross

## 🪤 Tempting Him

"Tempting" here does not mean offering him something pleasant.

It means testing him, trying to trap him in his own words.

The Pharisees already knew divorce was a fiercely debated topic.

Two rabbinic schools disagreed sharply over what counted as lawful grounds.

Whatever Jesus said, one side could use it against him.

🪤 Tempting means testing or trapping

⚖️ Divorce law was already a hot debate

👥 Two rabbi schools disagreed on grounds

➡️ Any answer risked being used against him

## 📜 A Bill Of Divorcement

A bill of divorcement was a short written legal certificate.

Deuteronomy twenty four allowed a husband to write one and send his wife away.

It proved she was legally free to marry someone else.

The debate was never whether divorce existed in the law.

The debate was how loosely or strictly that law could be used.

📜 Bill of divorcement means a legal certificate

✍️ Deuteronomy twenty four first allowed it

🆓 It freed a wife to remarry

📖 The fight was over its loose use

## 💔 For The Hardness Of Your Heart

"Hardness of heart" means a stubborn resistance to God's original plan.

Jesus says Moses allowed divorce as a concession, not as the ideal.

God permitted it because people kept refusing to live up to something better.

A law allowing something is not the same as a law celebrating it.

💔 Hardness of heart means stubborn resistance

📜 Moses allowed it as a concession

🚫 Permission is not the same as praise

📖 God's original plan aimed higher than this

# Mark 10:6-9
# 👫 One Flesh By Design
---
## 🌱 From The Beginning Of The Creation

Jesus skips past Moses and points all the way back to creation.

"From the beginning" means Genesis, before any law was ever written.

God designed marriage as male and female joined together from the very start.

Any argument about divorce has to answer to that original design first.

🌱 From the beginning points to Genesis

👫 God designed male and female together

🏛️ Marriage predates every written law

➡️ Design comes before any legal debate

## 🔗 Leave His Father And Mother, And Cleave To His Wife

"Cleave" means to hold fast, to be joined tightly to something.

A new marriage shifts a person's deepest loyalty to a new household.

This does not mean cutting off parents completely.

It means a husband and wife now become each other's primary bond.

🔗 Cleave means to hold fast

🏠 Marriage creates a new primary household

👨‍👩‍👧 Parents are honored, not replaced

📖 A new bond takes first place

## ✌️ They Twain Shall Be One Flesh

"Twain" is an old word simply meaning two.

Two separate people are described as becoming one flesh.

That is more than a shared house or a shared name.

Scripture describes marriage as a real, binding unity between two lives.

✌️ Twain simply means two

🤝 Two become one flesh

🏡 More than a shared house

📖 Marriage is a real binding unity

## 💥 What God Hath Joined Together, Let Not Man Put Asunder

"Asunder" means torn apart or separated by force.

Jesus names marriage as something God joins, not something people merely arrange.

If God does the joining, no human has the authority to undo it lightly.

This verse does not answer every hard situation a marriage can face.

It does name marriage as weightier than Jesus's questioners were treating it.

💥 Asunder means torn apart

🙏 God does the joining, not man

⚖️ No one undoes it lightly

📖 Marriage carries more weight than they assumed

# Mark 10:10-16
# 🧒 Children And The Kingdom
---
## 🏠 In The House His Disciples Asked Him Again

Public teaching in front of crowds often got a private follow up later.

"The house" was a private home, away from the Pharisees who had just questioned him.

The disciples wanted Jesus to explain his hard teaching more plainly.

This pattern repeats often in Mark, public word, then private explanation.

🏠 The house meant private, away from Pharisees

🙋 Disciples wanted the teaching explained further

🔁 Public teaching often got a private follow up

📖 Mark repeats this pattern often

## ⚖️ Committeth Adultery Against Her

This line extends real protection to the wife, not just the husband.

Jewish law at the time rarely protected a wife's standing after a divorce.

Jesus says a man who divorces and remarries still commits adultery against his first wife.

That was a strong and unusual statement for its time.

⚖️ This protects the wife's standing

📜 Law rarely protected her before this

💔 Remarriage after divorce still counts as adultery

📖 A strong statement for its time

## 📜 If A Woman Shall Put Away Her Husband

Jewish law generally did not allow a wife to initiate divorce on her own.

Roman and Greek law in that region allowed it in some cases.

Jesus extends the exact same standard to women as he gave to men.

Both sides are held to the same measure here.

📜 Jewish law rarely let wives divorce

🏛️ Roman law allowed it more often

⚖️ Jesus holds both sides equally

📖 No double standard in this teaching

## 🙅 His Disciples Rebuked Those That Brought Them

The disciples are not being cruel for no reason here.

In this culture, children were not treated as equals worth a teacher's time.

The disciples likely thought they were protecting Jesus from a waste of his attention.

They were wrong about what actually mattered to him.

🙅 Disciples thought children were a distraction

👶 Children held little status in this culture

🛡️ They thought they were protecting Jesus

📖 They misjudged what mattered to him

## 😠 Much Displeased

Mark rarely records Jesus as visibly angry.

This moment is one of the clearest exceptions.

Pushing children away from him crossed a real line for Jesus.

His anger shows exactly how much he valued the people his disciples dismissed.

😠 Jesus is visibly angry here

🚫 One of Mark's clearest examples

🧒 Pushing children away crossed a line

📖 His anger shows who he valued

## ✅ Suffer The Little Children To Come Unto Me

"Suffer" here is an old word meaning allow or permit.

Jesus is not asking anyone to endure pain.

He is simply saying, let them come, do not block them.

That single command reverses what his disciples had just done.

✅ Suffer means allow, not endure

🚪 Jesus removes the disciples' barrier

🧒 Children are welcomed, not blocked

➡️ One command reverses their mistake

## 🙌 Of Such Is The Kingdom Of God

This does not mean children are automatically saved because they are young.

It means the kingdom belongs to people with a childlike posture.

A child has no status to offer and no case to argue.

A child simply receives what is given, without pretending to deserve it.

🧒 Kingdom belongs to a childlike posture

🚫 Not only about age

🙌 A child simply receives, does not earn

📖 Humble receiving opens the kingdom

## 🤲 Put His Hands Upon Them, And Blessed Them

Jesus does not just allow the children to approach.

He picks them up himself and holds them.

Then he blesses them, speaking good over their lives personally.

What the disciples saw as a waste of time, Jesus treated as worth his own hands.

🤲 Jesus personally picks up the children

🙏 He blesses them by name

⏳ He gives them his own time

📖 What seemed small, Jesus treated as precious

# Mark 10:17-22
# 💰 The Rich Man's One Thing
---
## 🏃 There Came One Running, And Kneeled To Him

This man runs and kneels, an unusual move for someone of his rank.

Other Gospels describe him as young and very wealthy.

His urgency and his posture both show genuine respect, not a trap.

Unlike the Pharisees earlier in this chapter, he is not testing Jesus.

🏃 He runs, an unusual show of urgency

🙇 Kneeling shows real respect

💰 Other Gospels note his wealth

📖 He is sincere, not testing Jesus

## 🙇 Good Master

"Good Master" was a polite, respectful title in that culture.

It did not necessarily mean the man understood who Jesus truly was.

Jesus answers by questioning the word "good" itself.

He pushes the man to think harder about who he is actually speaking to.

🙇 Good Master was a polite title

❓ It did not show full understanding

🤔 Jesus challenges the word itself

➡️ He wants deeper thought, not flattery

## ❓ There Is None Good But One, That Is, God

Jesus is not denying that he himself is good.

He is testing whether the man actually means what he just said.

If no one is good but God, and the man calls Jesus good, what is he really claiming?

The question quietly points toward Jesus's true identity without stating it outright yet.

❓ Jesus questions the man's own words

🙅 Not a denial of his own goodness

🧩 A quiet clue about his identity

📖 The man has not figured this out

## 💸 Defraud Not

"Defraud" means to cheat someone out of what is rightfully theirs.

This specific command does not appear among the original ten commandments.

Jesus may be naming the exact temptation a wealthy man would face.

Dishonest business practice fits this man's situation more than the others listed.

💸 Defraud means cheating someone financially

📜 Not one of the original ten

🎯 It targets his likely temptation

📖 The list fits his situation

## ✅ All These Have I Observed From My Youth

The man is not lying or exaggerating here.

He has genuinely kept these specific commandments since he was young.

His problem was never outward disobedience to the list Jesus named.

Something deeper than rule keeping is still missing from his life.

✅ He genuinely kept these commands

🚫 Outward obedience was never his problem

🕳️ Something deeper is still missing

📖 Rule keeping was not the full answer

## ❤️ Jesus Beholding Him Loved Him

Mark rarely tells us directly that Jesus loved a specific person.

This moment is one of those rare, named exceptions.

What Jesus says next is hard, but it comes from love, not cruelty.

The hardest words in this story are spoken by someone who genuinely cares.

❤️ Mark rarely states this so directly

🔍 One of Mark's clearest examples

💬 Hard words spoken out of love

📖 Love, not cruelty, shapes what comes next

## 🎯 One Thing Thou Lackest

This is not a new commandment added to the list.

It names the one thing standing between this man and total trust in God.

His wealth had quietly become the thing he trusted instead of God.

Jesus names it precisely, not randomly.

🚫 Not a new commandment added

💰 Wealth had replaced his trust in God

🎯 Jesus names the exact obstacle

📖 Precise, not random

## 😔 He Was Sad At That Saying, And Went Away Grieved

The man came running toward Jesus with real excitement.

He leaves slowly, weighed down by grief instead.

Great possessions had quietly become something he could not put down.

The story ends without telling us whether he ever came back.

🏃 He arrived running with excitement

😔 He leaves heavy with grief

💰 His possessions held him back

➡️ The story leaves his ending open

# Mark 10:23-27
# 🐫 Through The Eye Of A Needle
---
## 💰 How Hardly Shall They That Have Riches Enter Into The Kingdom Of God

This is not a blanket condemnation of every wealthy person.

It is a warning about how easily wealth can replace trust in God.

The rich man just walked away as a living example of exactly this.

Jesus speaks this general warning right after watching it happen in real time.

💰 Not a blanket condemnation of wealth

⚠️ A warning about misplaced trust

👤 The rich man just proved the point

📖 Theory followed immediately by example

## 😲 Astonished At His Words

In that culture, wealth was often assumed to be a sign of God's favor.

The disciples expected riches to help someone, not block them.

Jesus's words overturn an assumption most people in that culture shared.

That is exactly why the disciples react with shock.

💵 Wealth was assumed to be God's favor

🙃 Disciples expected riches to help, not hurt

🔄 Jesus overturns a common assumption

📖 Shock makes sense given that belief

## 🎯 Them That Trust In Riches

Jesus restates his point and sharpens it slightly.

The real danger was never money itself.

The danger is trusting riches the way a person should trust God.

Money becomes a problem the moment it becomes someone's security.

🎯 Danger is trust, not money itself

🔁 Jesus restates and sharpens the point

🛡️ Riches can replace God as security

📖 The heart's trust is the real issue

## 🐫 Easier For A Camel To Go Through The Eye Of A Needle

A camel was the largest common animal in that region.

A needle's eye was the smallest common opening anyone could picture.

Jesus deliberately pairs the biggest animal with the tiniest hole.

The image is meant to sound genuinely impossible, not just difficult.

🐫 Camel was the largest common animal

🪡 A needle's eye was the tiniest opening

📏 The contrast is meant to feel impossible

📖 Not just hard, humanly impossible

## 😳 Who Then Can Be Saved

If wealth cannot guarantee salvation, the disciples see no hope left for anyone.

Wealth was the exact thing many assumed would secure a person's standing with God.

Take away that assumption, and panic sets in.

Their question reveals how much they had relied on that same idea themselves.

😨 Disciples see no hope left

💰 Wealth was their assumed guarantee

😳 Panic follows losing that assumption

📖 Their fear reveals a shared blind spot

## 🙏 With Men It Is Impossible, But Not With God

Jesus does not soften the impossible image from verse twenty five.

He agrees that no person can save themselves this way.

Then he shifts the entire weight off of human effort completely.

Salvation was never a human achievement to begin with.

🙅 Jesus does not soften the impossible image

🧍 No person saves themselves this way

🙏 The weight shifts fully onto God

📖 Salvation was never a human achievement

# Mark 10:28-31
# 💯 A Hundredfold Now
---
## 🙋 We Have Left All, And Have Followed Thee

Peter is not boasting out of nowhere.

He just watched a rich man refuse to leave everything behind.

Peter and the other disciples already did what that man could not do.

His comment sounds like a quiet question, what do we get for that?

🙋 Peter points out what they already did

👤 Contrasts directly with the rich man

❓ His comment hints at a real question

📖 What do the disciples get in return

## 🙏 For My Sake, And The Gospel's

Jesus names two reasons together, loyalty to himself and loyalty to the good news.

Leaving family and property for a cause only makes sense if that cause is real.

He treats both reasons as equally valid grounds for sacrifice.

This is not sacrifice for its own sake.

🙏 Loyalty to Jesus himself

📣 Loyalty to the gospel message

🤝 Both named as equally valid

📖 Not sacrifice for its own sake

## 🏠 He Shall Receive An Hundredfold Now In This Time

This is not a promise that giving up one house guarantees a hundred houses.

Jesus is describing the new family and community found within the church.

Believers gain spiritual brothers, sisters, and homes far beyond their birth family.

What looks like loss on paper becomes real gain in relationship.

🚫 Not a literal real estate promise

👪 A new spiritual family and community

🏠 Gain in relationship, not just property

📖 Loss on paper, gain in belonging

## 🔥 With Persecutions

Jesus does not promise an easy trade for what was given up.

The same hundredfold blessing comes bundled together with real suffering.

Following him was never presented as a path with no cost at all.

Honest faith includes both the gain and the hardship together.

⚠️ No promise of an easy trade

🔥 Blessing comes bundled with suffering

🚫 Never presented as cost free

📖 Honest faith holds both together

## 🔄 Many That Are First Shall Be Last, And The Last First

This line reverses how people usually rank themselves and each other.

Status, wealth, and position do not carry the same weight in God's kingdom.

The rich man who walked away looked first by every worldly measure.

In God's kingdom, those rankings do not simply carry over.

🔄 Worldly rank gets reversed

💰 Wealth does not guarantee first place

👤 Echoes the rich man's story

📖 Earthly rankings do not carry over

# Mark 10:32-34
# ✝️ The Third Prediction
---
## 😨 As They Followed, They Were Afraid

Jesus walks ahead of the group with obvious resolve.

The disciples sense something serious is coming, even before he explains it.

Amazement and fear sit side by side in this single verse.

Walking toward Jerusalem now meant walking toward real danger.

🚶 Jesus walks ahead with resolve

😲 Disciples sense something serious coming

😨 Fear and amazement sit together

📖 Jerusalem now meant real danger

## ⚖️ Delivered Unto The Chief Priests, And Unto The Scribes

This is the third time in Mark that Jesus predicts his own death.

Each prediction grows more specific than the one before it.

This time he names the exact groups who will hand him over.

The chief priests and scribes ran the religious courts in Jerusalem.

🔁 Third prediction in Mark, most detailed yet

⚖️ Chief priests and scribes ran religious courts

🎯 Specific names, not vague warning

📖 Detail increases as Jerusalem gets closer

## 🏛️ Deliver Him To The Gentiles

Jewish leaders had no legal power to carry out an execution themselves.

Only Roman authority, represented by Pilate, could issue a death sentence.

Jesus already knew both Jewish and Roman hands would be involved.

This detail would play out exactly this way within days.

⚖️ Jewish leaders lacked execution authority

🏛️ Only Roman authority could sentence to death

🔮 Jesus already knows both sides are coming

📖 This detail will play out exactly

## 🩸 Mock Him, And Scourge Him, And Spit Upon Him

"Scourge" means a brutal whipping, often done before a Roman execution.

Spitting was a deliberate act of public humiliation, not an accident.

Jesus lists each specific cruelty without softening any of it.

He walks toward Jerusalem fully aware of every detail waiting for him.

🩸 Scourge means a brutal whipping

🤮 Spitting meant deliberate humiliation

📋 Jesus names each cruelty plainly

📖 He walks forward fully aware

## 🌅 The Third Day He Shall Rise Again

Every prediction of suffering in Mark ends with this same promise.

Death is never the final word in these predictions.

The resurrection is named in the same breath as the suffering.

Suffering and victory are tied together from the very start.

🌅 The third day promise repeats each time

☠️ Death is never the final word

🎉 Resurrection is named in the same breath

📖 Suffering and victory are tied together

# Mark 10:35-40
# 👑 A Request For Glory
---
## 👑 We Would That Thou Shouldest Do For Us Whatsoever We Shall Desire

This request comes right after Jesus just predicted his own suffering and death.

James and John seem to completely miss what he just said.

They are asking for personal glory at the exact wrong moment.

Timing makes this request land even worse than the words themselves.

⏳ Comes right after his death prediction

🙈 They seem to miss his point entirely

👑 They ask for glory at the wrong time

📖 Timing makes this worse than the words

## 🏛️ Sit, One On Thy Right Hand, And The Other On Thy Left Hand, In Thy Glory

Sitting at a king's right and left hand meant holding the highest honor.

James and John still expect Jesus to set up an earthly throne soon.

They are picturing political power, not a cross.

Their request reveals exactly what they still do not understand.

👑 Right and left hand meant top honor

🏛️ They still expect an earthly throne

❌ They are picturing power, not a cross

📖 The request reveals their misunderstanding

## 🍷 Can Ye Drink Of The Cup That I Drink Of

"Cup" in scripture often symbolizes a person's assigned suffering or fate.

Jesus is not offering a toast or a celebration here.

He is asking if they are ready to share his coming pain.

They answer yes without fully understanding what that will actually cost them.

🍷 Cup symbolizes assigned suffering

🚫 Not a toast or celebration

⚠️ He is asking about shared pain

📖 They answer without understanding the cost

## 🌊 Be Baptized With The Baptism That I Am Baptized With

This "baptism" does not refer to water at all.

It refers to being overwhelmed, the way flood water can overwhelm someone completely.

Jesus is describing the overwhelming suffering waiting for him in Jerusalem.

James would later be martyred, and John would suffer exile for his faith.

🌊 Baptism here means being overwhelmed

🚫 Not about water at all

😖 It points to coming suffering

📖 Both brothers later suffered for their faith

## 🤝 We Can

Jesus confirms that real suffering truly is coming for both brothers.

He does not grant their request for glory.

He grants them something harder and more honest instead.

Following him always included a cost they had not planned for.

✅ Jesus confirms real suffering is coming

🚫 Their glory request is not granted

🎯 He grants something harder instead

📖 Following him always included real cost

## 📋 Given To Them For Whom It Is Prepared

Jesus will not simply hand out the best seats to whoever asks first.

Those positions already belong to God's own plan, not to personal ambition.

Even Jesus submits to his Father's arrangement here.

Status in God's kingdom is never something a person can request their way into.

🙅 Jesus will not simply hand it out

📋 Positions already belong to God's plan

🙏 Even Jesus submits to the Father

📖 Status is never requested into existence

# Mark 10:41-45
# 🧺 Greatness As A Servant
---
## 😠 They Began To Be Much Displeased With James And John

This is not righteous anger over a theological mistake.

The other ten disciples are upset that James and John tried to get ahead of them.

Everyone in this group still wants the same kind of status for themselves.

The whole group shares the same problem, not just two brothers.

😠 Not righteous anger, just jealousy

🏃 They are upset about being outpaced

👥 All twelve share the same ambition

📖 One group's problem, not two men's

## 🏛️ They Which Are Accounted To Rule Over The Gentiles Exercise Lordship

Jesus points to how Roman and Gentile rulers typically used their power.

Those rulers commonly used authority to dominate and control people beneath them.

"Great ones" pressed their weight down on everyone under their command.

Jesus names a familiar pattern before saying something that breaks it.

🏛️ Points to how Gentile rulers behaved

👑 Power there usually meant domination

⚖️ Great ones pressed weight downward

📖 A familiar pattern, about to be broken

## 🧺 Whosoever Will Be Great Among You, Shall Be Your Minister

"Minister" here means a servant, someone who actively serves other people's needs.

Jesus flips the usual order of greatness completely upside down.

In his kingdom, greatness is measured by how much someone serves, not controls.

That standard still sounds backward to most people today.

🧺 Minister means a servant

🔄 Greatness gets flipped upside down

🤲 Measured by serving, not controlling

📖 Still sounds backward today

## ⛓️ Shall Be Servant Of All

"Servant" here is an even stronger word than minister.

It describes someone with the lowest possible social standing, a true slave.

Jesus says the person who wants to be first must willingly take the lowest place.

This is the opposite of what James and John had just asked for.

⛓️ Servant describes the lowest standing

🔽 First place requires taking the lowest spot

❌ Opposite of James and John's request

📖 The kingdom's ladder runs backward

## 💰 To Give His Life A Ransom For Many

A "ransom" was the price paid to free a slave or a captive.

Jesus names his own coming death using that exact economic term.

His life becomes the payment that sets many people free.

Everything he just taught about serving, he is about to do completely.

💰 Ransom means a price paid to free someone

⛓️ Jesus's death frees many people

🎯 He names his own death plainly

📖 He practices what he just taught

# Mark 10:46-52
# 👁️ Blind Bartimaeus Receives Sight
---
## 📛 Blind Bartimaeus, The Son Of Timaeus

Mark names this man directly, which is unusual for a healing story.

"Bartimaeus" literally means son of Timaeus in Aramaic.

Naming him this clearly suggests he was a known figure to early readers.

Begging by the roadside was often the only option left for someone blind in this culture.

📛 Mark names him directly, unusual for Mark

🗣️ Bartimaeus means son of Timaeus

👥 Likely a known figure to early readers

📖 Begging was often his only option

## 👑 Jesus, Thou Son Of David, Have Mercy On Me

"Son of David" was a title pointing directly to the promised Messiah king.

A blind beggar names Jesus's true identity more clearly than most sighted people in this chapter.

James and John had just missed the point of Jesus's mission entirely.

Bartimaeus, who cannot see at all, somehow sees exactly who Jesus is.

👑 Son of David points to the Messiah

👁️ A blind man names it clearly

🙈 Sighted people in this chapter missed it

📖 Physical blindness and spiritual sight differ

## 🤫 Many Charged Him That He Should Hold His Peace

The crowd tries to silence Bartimaeus, treating him as a nuisance.

He had no social standing worth protecting in their eyes.

Instead of quieting down, he cries out even louder than before.

His desperation outweighs the crowd's disapproval.

🤫 Crowd tries to silence him

🙅 They see him as a nuisance

📣 He cries out even louder

📖 Desperation outweighs disapproval

## 🛑 Jesus Stood Still, And Commanded Him To Be Called

Jesus is on his way toward Jerusalem, toward his own suffering and death.

He still stops everything for one blind beggar by the side of the road.

The same man who just taught about serving now lives it out immediately.

Nothing about his coming mission makes him too busy for this one person.

🚶 Jesus was heading toward his own death

🛑 He stops fully for one beggar

🧺 He lives out his own teaching

📖 No mission too big for one person

## 🧥 Casting Away His Garment, Rose, And Came To Jesus

A beggar's outer garment often doubled as his blanket and his only real shelter.

Bartimaeus throws it aside without any hesitation at all.

He leaves behind the one thing that protected him, trusting Jesus completely.

His confidence matches the urgency of his earlier cry.

🧥 His garment doubled as his shelter

🙌 He throws it aside without hesitation

🤲 He trusts Jesus completely

📖 Confidence matches his earlier urgency

## 🙏 Lord, That I Might Receive My Sight

Jesus asks Bartimaeus the exact same question he could have asked the rich young man.

The rich man wanted eternal life but could not let go of his possessions.

Bartimaeus has nothing to let go of, and asks for exactly what he needs.

His simple, honest request stands in sharp contrast to the earlier story.

❓ Same kind of question as the rich man

💰 The rich man could not let go

🙏 Bartimaeus asks simply and honestly

📖 A sharp contrast to that earlier story

## 🌟 Thy Faith Hath Made Thee Whole

"Whole" means complete healing, body and standing restored together.

Jesus credits the man's faith, not his own power alone, for the result.

Bartimaeus immediately uses his new sight to follow Jesus down the road.

He becomes the opposite of the rich man, someone who gained everything by clinging to nothing.

🌟 Whole means complete restoration

🙏 Faith is credited for the healing

👁️ He immediately follows Jesus

📖 The opposite ending to the rich man's story
`.trim();

export const MARK_TEN_PERSONAL_SECTIONS = parseMarkTenRawNotes(MARK_TEN_RAW_NOTES);
