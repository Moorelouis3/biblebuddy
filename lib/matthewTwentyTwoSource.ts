export type MatthewTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyTwoRawNotes(rawText: string): MatthewTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 22:${startVerse}` : `Matthew 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 22 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_TWO_RAW_NOTES = `# Matthew 22:1-7
# 🎉 A King Prepares A Marriage For His Son
---
## 🗣️ Spake Unto Them Again By Parables

Jesus keeps teaching the same leaders from the chapter before.

He answers their silence with yet another story.

Parables let hard truth land without a direct accusation.

The leaders cannot escape this lesson any easier than the last one.

🗣️ Jesus keeps teaching the same leaders
📖 Another parable follows the last one
🎭 Stories let hard truth land softly
➡️ The leaders cannot escape this lesson

## 👑 A Certain King, Which Made A Marriage For His Son

Jewish weddings often lasted for several days of feasting.

A king marrying off his son meant a feast on a massive scale.

The king here pictures God, and the son pictures Jesus.

This whole parable describes an invitation into God's kingdom.

👑 The king pictures God himself
🤵 The son pictures Jesus
🎉 Weddings meant days of feasting
📖 The feast pictures God's kingdom

## 📜 Sent Forth His Servants To Call Them That Were Bidden

Invitations in this culture often went out in two separate stages.

Guests were told well ahead of time, then called again once the feast was ready.

These servants bring that second, final call.

The guests already knew this day was coming.

📜 Invitations went out in two stages
🗣️ This is the second, final call
📅 The guests already knew the date
➡️ No one here is caught by surprise

## 🚫 And They Would Not Come

Refusing a king's invitation was a serious public insult.

These first guests represent Israel's own religious leaders.

They had already been told the feast was coming.

Still, when the moment arrives, they simply refuse.

🚫 Refusing a king was a real insult
🏛️ These guests picture the religious leaders
📅 They already knew the feast was near
➡️ They refuse it anyway

## 🐂 My Oxen And My Fatlings Are Killed

Fatlings means animals specially fed and fattened for a feast.

Killing them meant the food was already prepared and ready to eat.

Nothing is left undone on the king's side of this invitation.

Only the guests themselves are still missing.

🐂 Fatlings means specially fattened animals
🍽️ The meal was already fully ready
✅ Nothing was left undone by the king
➡️ Only the guests are still missing

## 😐 They Made Light Of It

To make light of something means treating it as unimportant.

These guests do not attack the invitation, they simply shrug it off.

Quiet indifference can reject God just as fully as open hostility.

Ignoring an invitation is still a form of refusing it.

😐 Made light means treated as unimportant
🤷 Indifference, not open attack
💔 Quiet rejection still counts as rejection
➡️ Ignoring the invitation refuses it

## 🚜 One To His Farm, Another To His Merchandise

Ordinary daily work pulls these guests away from the feast.

A farm and a business were both normal, respectable things to tend.

Nothing evil distracts them, only the ordinary pull of daily life.

Good things can crowd out the one thing that matters most.

🚜 A farm pulled one guest away
💰 A business pulled the other away
📋 Both distractions were ordinary, not evil
➡️ Ordinary life can crowd out what matters

## ⚔️ Entreated Them Spitefully, And Slew Them

This second group of guests turns from indifference to outright violence.

Spitefully means with cruel, deliberate intent to harm.

These servants picture the prophets God sent to Israel across history.

Rejecting a message can escalate all the way into rejecting the messenger.

⚔️ Spitefully means cruel and deliberate
📜 These servants picture God's prophets
📈 Rejection escalates into violence
➡️ Message rejection becomes messenger rejection

## 😡 He Was Wroth

Wroth means filled with strong, righteous anger.

This is not a king losing his temper over a small thing.

Murdering his own servants demands a serious response.

God's patience is real, but it is not unlimited.

😡 Wroth means strong, righteous anger
👑 A serious crime demands a serious response
⏳ God's patience had already been shown
➡️ Patience is not the same as limitless

## 🔥 Destroyed Those Murderers, And Burned Up Their City

The king sends his own armies to punish the guests who refused him.

Many Bible teachers connect this detail to Jerusalem's destruction in the year 70.

That event happened about 40 years after Jesus told this story.

The parable quietly warns of a judgment still future when Jesus spoke it.

🔥 The king's armies bring judgment
🏙️ Many connect this to Jerusalem's fall
📅 That happened about 40 years later
📖 The parable warns of what was still future

# Matthew 22:8-14
# 👔 Not Having A Wedding Garment
---
## 🎪 The Wedding Is Ready, But They Which Were Bidden Were Not Worthy

The feast itself never stops being ready.

Worthy here is about response, not about personal merit earning a spot.

Refusing the invitation is what made the first guests unworthy.

The problem was never a shortage of food or time.

🎪 The feast was always ready
✅ Worthy means responding, not earning
🚫 Refusal made the first guests unworthy
➡️ The problem was never the feast

## 🛣️ Go Ye Therefore Into The Highways

Highways here means the main roads leading in and out of the city.

These were the natural place to find ordinary travelers and strangers.

The invitation now reaches far beyond the original guest list.

Nobody with the original invitation gets replaced quietly, the door opens wide instead.

🛣️ Highways means the main roads
🚶 Ordinary travelers are found there
📢 The invitation widens
➡️ The door opens wide, not quietly

## ⚖️ As Many As Ye Shall Find, Both Bad And Good

This new invitation does not screen anyone out beforehand.

Bad and good describes everyday people, not a perfect guest list.

The king's house fills up regardless of each guest's reputation.

Entry starts with the invitation, not with a person's own record.

⚖️ No screening happens beforehand
👥 Bad and good means everyday people
🏠 The house fills regardless of reputation
➡️ Entry starts with invitation, not record

## 🎊 The Wedding Was Furnished With Guests

Furnished means filled completely, not merely decorated.

The hall that stood nearly empty now overflows with people.

None of the original invited guests make up this new crowd.

The king's feast still happens, just with a different guest list.

🎊 Furnished means filled completely
🏛️ An empty hall now overflows
🔄 None of the original guests are present
➡️ The feast happens with a new guest list

## 👔 He Saw There A Man Which Had Not On A Wedding Garment

Ancient hosts sometimes provided proper garments for guests at the door.

Showing up without one suggested the guest refused what was freely offered.

This is not a story about being too poor to dress well.

It is a story about refusing a gift that was already available.

👔 Hosts sometimes gave garments at the door
🎁 Going without one meant refusing a gift
💰 This is not about poverty
➡️ It is about refusing what was offered

## 🤐 How Camest Thou In Hither Not Having A Wedding Garment? And He Was Speechless

Friend here is a formal address, not a warm greeting.

The man has no excuse ready, because none actually exists.

Silence here means his guilt is already plain to see.

Being let in the door was never the same as truly belonging.

🤐 Friend here is formal, not warm
🙊 No real excuse exists
👀 Silence shows plain guilt
➡️ Being let in is not belonging

## ⛓️ Bind Him Hand And Foot, And Take Him Away

This punishment matches the seriousness of refusing the king's own provision.

The man is removed from the feast entirely, not merely corrected.

This pictures a final judgment, not a temporary setback.

Being physically present at the feast never guaranteed staying there.

⛓️ A punishment matching the refusal
🚪 Removed entirely, not just corrected
⚖️ This pictures final judgment
➡️ Presence never guaranteed staying

## 🌑 Cast Into Outer Darkness

Outer darkness describes the complete absence of the feast's light and joy.

This phrase appears elsewhere in Matthew describing the same final judgment.

It stands in total contrast to the light and celebration inside.

There is nothing unclear about where this man ends up.

🌑 Total absence of light and joy
🔁 This phrase repeats elsewhere in Matthew
🎉 Contrasts sharply with the feast inside
➡️ The outcome is not unclear

## 😭 There Shall Be Weeping And Gnashing Of Teeth

Weeping pictures deep sorrow over what has been lost.

Gnashing of teeth pictures anger and bitter regret together.

Both reactions describe a lasting consequence, not a brief sting.

Jesus uses this same exact phrase to describe judgment elsewhere too.

😭 Weeping pictures deep sorrow
😬 Gnashing pictures bitter regret
⏳ Both describe lasting consequence
📖 Jesus uses this same phrase for judgment

## 📣 For Many Are Called, But Few Are Chosen

Called describes everyone who hears the invitation go out.

Chosen describes those who actually respond and stay faithful to it.

Hearing the invitation was never the same as truly belonging to the feast.

The parable closes by naming exactly what it has been teaching all along.

📣 Called means everyone who hears
✅ Chosen means those who truly respond
👂 Hearing is not the same as belonging
📖 The parable names its own lesson

# Matthew 22:15-22
# 🪙 Render Unto Caesar
---
## 🤝 Took Counsel How They Might Entangle Him In His Talk

Took counsel means they planned together ahead of time.

Entangle pictures trapping someone in their own words, like a net closing.

This is a calculated political trap, not a sincere question.

The goal was never to learn from Jesus, only to catch him.

🤝 Took counsel means planned together
🪤 Entangle means trapped like in a net
🎯 A calculated trap, not sincere
➡️ The goal was to catch, not learn

## 🤝 Sent Out Their Disciples With The Herodians

Pharisees and Herodians usually stood on opposite sides of nearly every issue.

Pharisees resisted Rome's rule, while Herodians supported Herod's arrangement with Rome.

These two rivals team up only because they share one goal, trapping Jesus.

A shared enemy can unite even the most unlikely allies.

🤝 Pharisees and Herodians rarely agreed
🏛️ Pharisees resisted Rome's rule
👑 Herodians supported Herod's arrangement
➡️ A shared target unites unlikely allies

## 🎭 Master, We Know That Thou Art True

This flattery is meant to lower Jesus's guard before the real question lands.

Every word of praise here is calculated, not sincere.

Regardest not the person of men means Jesus treats everyone the same, no matter their status.

Ironically, that flattering description of Jesus turns out to be exactly true.

🎭 Flattery meant to lower his guard
🎯 Calculated, not sincere praise
⚖️ Regardest not the person means treats all equally
➡️ Their flattery turns out to be true

## 💰 Is It Lawful To Give Tribute Unto Caesar, Or Not?

Tribute was the tax Jews paid directly to Rome, their occupying power.

Saying yes would anger many Jews who hated funding their own oppressor.

Saying no would be treason against Rome, a serious crime.

The question is built with no safe answer on either side.

💰 Tribute was a tax paid to Rome
😠 Saying yes would anger many Jews
⚠️ Saying no would count as treason
➡️ No safe answer seems to exist

## 👁️ Jesus Perceived Their Wickedness

Perceived means Jesus saw straight through their plan immediately.

Wickedness names the trap honestly instead of pretending it is a fair question.

Nothing about their flattery or framing fools him for a moment.

Jesus answers the real motive before he even answers the question.

👁️ Perceived means saw through instantly
🎯 Wickedness names the trap honestly
🚫 Their flattery does not fool him
➡️ He answers the motive first

## 🎭 Why Tempt Ye Me, Ye Hypocrites?

Tempt here means testing him to try to trap him, not simple curiosity.

A hypocrite originally described an actor wearing a mask on a stage.

Jesus calls out the gap between their fake respect and their real intent.

Naming the trap out loud strips away its power immediately.

🎭 Tempt here means testing to trap
🎬 Hypocrite originally meant a masked actor
🔍 Jesus names the gap between mask and intent
➡️ Naming a trap strips its power

## 🪙 Shew Me The Tribute Money. And They Brought Unto Him A Penny

The coin here was a Roman denarius, a common silver coin of that day.

This was about a full day's wage for an average worker.

Asking to see the actual coin turns their own trap into the answer.

Jesus lets the evidence do the work instead of arguing in the abstract.

🪙 The coin was a Roman denarius
💵 Worth about a day's wage
🔍 The coin itself becomes the answer
➡️ Evidence does the work, not argument

## 👑 Whose Is This Image And Superscription?

The denarius carried the emperor's face stamped directly onto it.

Superscription means the written inscription circling the coin's edge.

That inscription often named Caesar as a son of a god, a claim no faithful Jew would accept.

Everyone present already knows exactly whose face and name this is.

👑 The emperor's face was stamped on it
✍️ Superscription means the written inscription
🚫 Its words claimed divine status for Caesar
➡️ Everyone already knows the answer

## ⚖️ Render Therefore Unto Caesar The Things Which Are Caesar's

Render means to give back what rightfully belongs to someone already.

Paying the tax is not betraying God, it is honoring an earthly obligation.

The coin bears Caesar's image, so it belongs in Caesar's sphere.

Jesus refuses to let them trap him inside a false choice.

⚖️ Render means giving back what is owed
🪙 Caesar's image means Caesar's sphere
🚫 Paying tax does not betray God
➡️ Jesus rejects their false choice

## 🙏 And Unto God The Things That Are God's

Humanity itself carries God's image, the same way the coin carries Caesar's.

This second half of the answer matters just as much as the first.

Earthly duty and devotion to God are not actually in competition.

Jesus answers a political trap with a truth bigger than politics.

🙏 People carry God's image too
⚖️ The second half matters just as much
🤝 Earthly duty and devotion do not compete
📖 A political trap meets a bigger truth

## 😲 They Marvelled, And Left Him

Marvelled means they were genuinely astonished, not just mildly impressed.

Their trap has completely failed, and they both know it.

Quiet retreat is the only option left once a trap collapses.

This same shape of a failed trap will show up again before this chapter ends.

😲 Marvelled means genuinely astonished
🪤 Their trap has completely failed
🚶 Quiet retreat is all that is left
➡️ This same pattern repeats again later

# Matthew 22:23-28
# 👰 The Sadducees' Trick Question
---
## 👥 The Sadducees, Which Say That There Is No Resurrection

Sadducees were a religious group who only accepted the five books of Moses as scripture.

They rejected belief in any resurrection or life after death.

This put them at direct odds with the Pharisees on this exact topic.

Their very next question is built around that denial.

👥 Sadducees accepted only the five books of Moses
🚫 They denied any resurrection
⚖️ This put them against the Pharisees
➡️ Their question is built around that denial

## 📜 Moses Said, If A Man Die, Having No Children, His Brother Shall Marry His Wife

This custom is called levirate marriage.

The name comes from the Latin word for a brother of a husband.

It protected a widow and kept a dead man's name inside the family.

Deuteronomy 25 lays out this exact command in full.

📜 Called levirate marriage
🛡️ Protected the widow and the family name
📖 Commanded plainly in Deuteronomy 25
➡️ Their trap starts from a real law

## 👶 Raise Up Seed Unto His Brother

Seed here means offspring, especially a son to continue the family line.

The child born from this marriage would legally count as the dead brother's heir.

This law existed to protect inheritance and a family's name, not romance.

Ancient family identity depended heavily on a continuing bloodline.

👶 Seed means offspring, especially a son
📜 The child counted as the dead brother's heir
🛡️ The law protected inheritance and name
➡️ Family identity depended on bloodline

## 👪 Seven Brethren, And The First Deceased, And Having No Issue

Issue here means children, especially a surviving son.

The Sadducees stretch the law to an extreme, piling up seven brothers in a row.

This exaggerated scenario is built to make resurrection sound absurd.

A math problem is standing in for a sincere question about God.

👪 Issue here means children
🔢 Seven brothers stretches the law to an extreme
🎯 Built to make resurrection sound absurd
➡️ A math trick replaces a real question

## 🔁 Likewise The Second Also, And The Third, Unto The Seventh

Each brother in turn marries the same widow and dies without children.

The repetition itself is part of the trap, piling absurdity on absurdity.

By the seventh brother, the scenario has become almost comic.

The Sadducees expect this pile up to make any answer look foolish.

🔁 Each brother repeats the same outcome
📈 Repetition piles up the absurdity
😄 By the seventh it borders on comic
➡️ They expect any answer to look foolish

## ⚰️ And Last Of All The Woman Died Also

The widow herself finally dies after outliving all seven brothers.

Her death completes the scenario the Sadducees have built.

Every piece of their trap is now finally in place.

The real question is about to be asked directly.

⚰️ The widow dies last of all
🧩 Her death completes the scenario
🪤 Every piece of the trap is in place
➡️ The real question comes next

## ❓ In The Resurrection Whose Wife Shall She Be Of The Seven?

The Sadducees assume resurrected life must work exactly like earthly marriage.

Their question only makes sense if that hidden assumption is actually true.

They expect this question to make resurrection sound impossible.

Jesus is about to challenge the assumption itself, not just the math.

❓ They assume resurrected life matches earthly marriage
🧠 Their question rests on that hidden assumption
🎯 Meant to make resurrection sound impossible
➡️ Jesus will challenge the assumption itself

## 🪞 A Second Trap In One Chapter

This is the second attempt in this same chapter to trap Jesus publicly.

The Pharisees tried politics, now the Sadducees try theology.

Both rival groups walk away from their own failed setup.

Neither group actually wants an answer, only a win.

🪞 The second trap in this chapter
🏛️ Pharisees tried politics, Sadducees try theology
⚖️ Both groups walk away from their own failure
➡️ Neither wants an answer, only a win

## 🎯 A Hypothetical Built To Fail

The whole scenario with seven brothers never actually happened.

It exists purely to force a conclusion that would embarrass the Pharisees too.

Sadducees and Pharisees already disagreed sharply about resurrection itself.

Trapping Jesus here would also score a point in their own internal debate.

🎯 The scenario was never a real event
🏆 Built to embarrass the Pharisees as well
⚖️ Sadducees and Pharisees already disagreed on this
➡️ The trap also serves their internal rivalry

# Matthew 22:29-33
# 💍 No Marriage In The Resurrection
---
## ❌ Ye Do Err, Not Knowing The Scriptures, Nor The Power Of God

Err means to be plainly mistaken, not just to disagree.

Jesus names two separate failures at once, not just one.

They misunderstand what scripture actually teaches about life after death.

They also underestimate what God's power is able to do.

❌ Err means plainly mistaken
📖 First failure is misreading scripture
💪 Second failure is underestimating God's power
➡️ Two separate mistakes, not one

## 💪 Nor The Power Of God

Power here means God's ability to do what seems physically impossible.

Raising the dead requires exactly this kind of power.

Doubting resurrection often starts with underestimating what God can actually do.

Jesus names this blind spot before he even answers their riddle.

💪 Power means ability beyond the physical
⚰️ Raising the dead needs this power
🙈 Doubt often underestimates God's power
➡️ Jesus names this blind spot first

## 👼 Neither Marry, Nor Are Given In Marriage, But Are As The Angels

Jesus corrects the Sadducees' hidden assumption directly.

Resurrected life is not simply earthly life stretched on forever unchanged.

Marriage was designed for this present age, not for the age to come.

This single sentence collapses their entire seven brother riddle at once.

👼 Resurrected life is not earthly life extended
💍 Marriage belongs to this present age
🧩 The riddle depended on that wrong assumption
➡️ One sentence collapses the whole trap

## 🔍 As Touching The Resurrection Of The Dead

Touching here is an old way of saying concerning or about.

Jesus signals he is about to answer their actual question directly.

He already corrected their assumption, now he proves his case from scripture.

Correction and proof work together to fully answer the trap.

🔍 Touching means concerning or about
🎯 He signals a direct answer is coming
📖 He now proves his case from scripture
➡️ Correction and proof together answer the trap

## 📖 Have Ye Not Read That Which Was Spoken Unto You By God

Jesus points the Sadducees back to scripture they already claimed to trust.

This specific line comes from the burning bush passage in Exodus 3.

Jesus chooses this source carefully, since Sadducees accepted the books of Moses.

He answers them using the one scripture they already agreed was authoritative.

📖 Points back to scripture they trusted
🔥 From the burning bush in Exodus 3
🧠 Chosen because Sadducees accepted Moses
➡️ He argues from their own accepted ground

## 🙏 I Am The God Of Abraham, And The God Of Isaac, And The God Of Jacob

God speaks this to Moses long after these three men had already died.

The verb is am, present tense, not was, past tense.

If God is still their God in the present, they must still exist in some real sense.

A small grammatical detail carries the whole weight of the argument.

🙏 Spoken long after all three had died
⏳ The verb is am, not was
💡 Present tense implies they still exist
➡️ A small grammar detail carries the argument

## 💀 God Is Not The God Of The Dead, But Of The Living

This line states the conclusion Jesus has been building toward.

Abraham, Isaac, and Jacob remain alive to God even after their earthly deaths.

Resurrection fits naturally with who God already revealed himself to be.

Denying resurrection means misunderstanding God's own nature, not just one doctrine.

💀 States the conclusion plainly
👴 The patriarchs remain alive to God
🔄 Resurrection fits God's revealed nature
➡️ Denying it misreads who God is

## 😲 The Multitude Were Astonished At His Doctrine

Astonished describes genuine amazement, stronger than simple approval.

Doctrine here means the substance of his actual teaching, not just his cleverness.

The crowd reacts to the content of the answer, not merely its cleverness.

A theological trap ends with the crowd impressed rather than Jesus discredited.

😲 Astonished means genuine amazement
📚 Doctrine means the substance taught
🧠 The crowd reacts to content, not cleverness
➡️ The trap ends in Jesus's favor

# Matthew 22:34-40
# ❤️ The Great Commandment
---
## 🤐 Put The Sadducees To Silence

Silence here means the Sadducees have run out of any further argument.

Their trap is not just unsuccessful, it is now completely finished.

The Pharisees watch their rivals lose this exchange entirely.

That defeat is exactly what draws the Pharisees back in for another attempt.

🤐 Silence means no argument is left
🏁 Their trap is now completely finished
👀 The Pharisees watch the Sadducees lose
➡️ That loss draws the Pharisees back in

## 📚 One Of Them, Which Was A Lawyer

A lawyer in this setting was an expert trained in interpreting Jewish law.

These scholars had already counted over 600 individual commands within the law.

Debating which commandment ranked highest was a genuine, ongoing argument among teachers.

This lawyer brings real expertise, even while bringing a trap along with it.

📚 A lawyer was an expert in Jewish law
🔢 Scholars counted over 600 individual commands
💬 Ranking commands was a real ongoing debate
➡️ Real expertise still arrives with a trap

## 🎯 Asked Him A Question, Tempting Him

Tempting here again means testing him to try to trip him up.

This is now the third separate trap attempt within this one chapter.

Every earlier attempt has already failed completely.

Repetition has not taught these leaders anything new about Jesus.

🎯 Tempting means testing to trip him up
🔢 The third trap attempt in this chapter
🏁 Every earlier attempt already failed
➡️ Repetition has taught them nothing

## ❓ Which Is The Great Commandment In The Law?

This question assumes ranking God's commands is even possible.

A wrong answer here could alienate an entire school of religious thought.

Unlike the coin question, there is no middle path to hide behind.

A direct question finally gets a direct, unhedged answer.

❓ Assumes ranking commands is possible
⚖️ A wrong answer could alienate a whole group
🪙 Unlike the coin, there is no middle path
➡️ A direct question gets a direct answer

## ❤️ Thou Shalt Love The Lord Thy God With All Thy Heart, And With All Thy Soul, And With All Thy Mind

This exact command comes from Deuteronomy 6, a passage faithful Jews recited daily.

Heart, soul, and mind describe the whole person, not three separate parts.

Love here means total, committed devotion, not just a warm feeling.

Jesus answers with the command every listener already knew by heart.

❤️ Quoted from Deuteronomy 6
🗣️ Recited daily by faithful Jews
🧠 Heart, soul, mind describe the whole person
➡️ Love means devotion, not just feeling

## 🥇 This Is The First And Great Commandment

First here means highest in importance, not merely first in a list.

Jesus settles the lawyer's exact question without any hedging at all.

Every other command finds its true meaning underneath this one.

Nothing in the law outranks loving God completely.

🥇 First means highest in importance
✅ Jesus settles the question directly
🔗 Every other command connects to this one
➡️ Nothing outranks loving God

## 🤝 The Second Is Like Unto It, Thou Shalt Love Thy Neighbour As Thyself

This second command comes from Leviticus 19, a separate book of the law.

Like unto it means this command shares the same essential character as the first.

Loving people was never meant to compete with loving God.

Jesus names two commands when the lawyer only asked for one.

🤝 Quoted from Leviticus 19
🔗 Shares the same character as the first
⚖️ Loving people does not compete with loving God
➡️ Jesus answers with two, not one

## ⚖️ On These Two Commandments Hang All The Law And The Prophets

Hang here pictures something suspended from a hook, dependent on it entirely.

The law and the prophets was a common phrase for the whole Old Testament.

Every single command in scripture traces back to one of these two roots.

Jesus gives the lawyer a complete framework, not just one winning answer.

⚖️ Hang pictures hanging from a hook
📖 Law and prophets means the whole Old Testament
🌳 Every command traces to one of these roots
➡️ Jesus gives a framework, not just an answer

# Matthew 22:41-46
# 👑 David's Lord
---
## 🔄 Jesus Asked Them

After answering three separate traps, Jesus now turns and asks his own question.

The one being tested has become the one doing the testing.

This mirrors exactly what he did earlier with the vineyard parable.

The leaders are about to face the same kind of trap they set for him.

🔄 Jesus now asks his own question
🪞 The tested becomes the tester
🔁 Mirrors the earlier vineyard parable
➡️ The leaders face their own kind of trap

## 👑 What Think Ye Of Christ? Whose Son Is He?

Christ is a title meaning the anointed one, the promised king of Israel.

Whose son addresses the Christ's expected family line and ancestry.

This question goes straight to the heart of who Jesus actually is.

Every earlier trap avoided this question, now Jesus asks it directly.

👑 Christ means the anointed, promised king
👪 Whose son addresses his expected ancestry
🎯 This question targets his true identity
➡️ Jesus finally asks it directly

## 🗣️ They Say Unto Him, The Son Of David

This answer was the standard, expected response among Jewish teachers.

Scripture clearly promised that the Christ would come from David's own line.

Their answer is completely correct as far as it goes.

Jesus is about to show that this true answer is still incomplete.

🗣️ The standard, expected answer
📖 Scripture promised a king from David's line
✅ Their answer is correct, but incomplete
➡️ A true answer that is still incomplete

## 📖 How Then Doth David In Spirit Call Him Lord

In spirit means David spoke these words under the Holy Spirit's guidance.

David himself refers to the coming Christ using the title Lord.

A father does not normally address his own descendant as his lord.

Jesus builds his question directly from scripture David wrote himself.

📖 In spirit means under the Spirit's guidance
👑 David calls the coming Christ Lord
👪 A father does not call his descendant lord
➡️ The question comes from David's own words

## 🪑 The LORD Said Unto My Lord, Sit Thou On My Right Hand

This line comes directly from Psalm 110, written by David himself.

The first Lord in all capitals represents God's own covenant name.

The second Lord, in regular case, points to someone else entirely, the Christ.

Sitting at the right hand describes a position of highest honor and authority.

🪑 Quoted directly from Psalm 110
📛 The first LORD is God's covenant name
👑 The second Lord points to the Christ
➡️ The right hand means highest honor

## 👣 Till I Make Thine Enemies Thy Footstool

A footstool pictures total, complete victory over an enemy underfoot.

Ancient kings sometimes pictured defeated enemies this same literal way.

This promise points toward a final triumph still future at that moment.

David describes the Christ's ultimate victory centuries before it happens.

👣 A footstool pictures total victory
👑 Ancient kings pictured enemies this way
⏳ Points to a victory still future then
📖 David foresees it centuries early

## 🧩 If David Then Call Him Lord, How Is He His Son?

This question only makes sense if the Christ is more than an ordinary human descendant.

David would never call his own future grandson his superior under normal custom.

The puzzle resolves only if the Christ is both David's descendant and David's God.

Jesus points straight toward his own identity without stating it outright.

🧩 The puzzle needs more than an ordinary descendant
👪 A grandson was never his king's superior
✅ Only works if Christ is both at once
➡️ Jesus points at his own identity

## 🤐 No Man Was Able To Answer Him A Word

This silence matches exactly how the Sadducees were silenced earlier in the chapter.

Every attempt to trap Jesus in this chapter ends the same way.

From this point forward, the leaders stop questioning him directly in public.

Their last, best questions have run out completely.

🤐 Matches the Sadducees' earlier silence
🔁 Every trap in this chapter ends alike
🚫 Public questioning stops from here on
➡️ Their best questions have run out

## 🛑 Neither Durst Any Man From That Day Forth Ask Him Any More Questions

Durst means dared, an old word for having the courage to try.

This marks a turning point for the rest of Jesus's public ministry.

Public trap questions stop completely from this moment forward.

The leaders now turn toward private plotting instead of public debate.

🛑 Durst means dared
📅 A turning point in his ministry
🚫 Public trap questions stop here
➡️ Plotting moves from public to private
`.trim();

export const MATTHEW_TWENTY_TWO_PERSONAL_SECTIONS = parseMatthewTwentyTwoRawNotes(MATTHEW_TWENTY_TWO_RAW_NOTES);
