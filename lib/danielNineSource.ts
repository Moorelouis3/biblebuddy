export type DanielNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielNineRawNotes(rawText: string): DanielNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 9:${startVerse}` : `Daniel 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Daniel 9 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_NINE_RAW_NOTES = `# Daniel 9:1-3
# 👑 Daniel Turns To Prayer
---
## 👑 Darius The Son Of Ahasuerus

This is the same Darius the Mede already met back in chapter six.

He is not the later, more famous Persian king who shares his name.

Naming his father here gives this vision one exact point in time.

Daniel already survived a night in the lions' den under this same king.

👑 Darius ruled as a Mede, not a Persian

🦁 The same king from the lions' den

📅 His name anchors this to a real year

📖 Real history frames the whole prayer that follows

## 🏛️ Made King Over The Realm Of The Chaldeans

The Chaldeans were the ruling people of the old Babylonian empire.

Babylon had only recently fallen to the Medes and the Persians.

Daniel is living through a complete change of world power.

The city stayed the same even though the empire did not.

🏛️ Chaldeans means Babylon's former ruling people

🔄 Babylon had just fallen to a new empire

🏙️ Daniel still lived inside the same city

📖 Empires changed but Daniel's calling did not

## 📜 I Daniel Understood By Books

"Books" here means actual written scrolls, not just stories he remembered.

One of those scrolls held the words of Jeremiah the prophet.

Daniel was reading a promise that was already written down.

He was not guessing about God's plan from a feeling or a dream.

📜 Books means real written scrolls

✍️ Jeremiah's words were already recorded

🔍 Daniel studied scripture, not a guess

📖 A written promise shaped his understanding

## ⏳ Seventy Years In The Desolations Of Jerusalem

Jeremiah had promised that Jerusalem's ruin would last exactly seventy years.

That promise appears earlier in Jeremiah's own writing to the exiles.

Daniel does the math and realizes the seventy years are almost finished.

A promise made decades earlier is about to come true in his own lifetime.

🔢 Seventy years was Jeremiah's exact promise

📜 Found earlier in Jeremiah's own writing

⏳ Daniel realizes the time is almost up

📖 Fulfillment ahead drives him to pray

## 🙏 I Set My Face Unto The Lord God

This phrase means Daniel turned his full attention toward God.

It describes total focus, not a quick or casual request.

Nothing else was allowed to compete for his attention here.

A promise close to fulfillment did not make Daniel relax and simply wait.

🙏 Set his face means full attention

🚫 No distractions allowed in this moment

⏳ A promise did not replace prayer

➡️ Daniel met prophecy with real action

## 😢 Fasting, And Sackcloth, And Ashes

Mourning in this culture involved specific, visible actions.

Fasting meant going without food for a set time.

Sackcloth was rough, humble clothing worn instead of normal dress.

Ashes meant sitting in dust as a sign of deep humility.

😢 Fasting meant going without food

🧵 Sackcloth meant rough, humble clothing

🌫️ Ashes meant sitting in dust

📖 Daniel shared the weight of Jerusalem's sin

# Daniel 9:4-10
# 🙇 Daniel Confesses The Nation's Sin
---
## 😨 The Great And Dreadful God

"Dreadful" here does not mean scary in a bad way.

It means a God worthy of deep reverence and awe.

Daniel opens his prayer by naming exactly who he is speaking to.

He does not rush into his request without first honoring God.

👑 Great describes God's total authority

😨 Dreadful means worthy of deep awe

🙏 Daniel honors God before asking anything

📖 Right worship comes before any request

## 🤝 Keeping The Covenant And Mercy

A covenant is a binding promise between two parties.

God keeps His side of that promise toward everyone who loves Him.

Daniel names this trait before confessing Israel's failure to do the same.

God's faithfulness becomes the backdrop for the whole confession that follows.

🤝 Covenant means a binding promise

❤️ God keeps mercy toward those who love Him

⚖️ Israel's failure contrasts with God's faithfulness

📖 God's faithfulness frames this whole prayer

## 💔 We Have Sinned, And Have Committed Iniquity

"Iniquity" means a deep, twisted kind of wrongdoing.

Daniel does not soften the confession with excuses.

He lists sin, iniquity, wickedness, and rebellion back to back.

Daniel includes himself in "we," even though he personally stayed faithful.

💔 Iniquity means deep, twisted wrongdoing

📝 Four different words describe one failure

🙇 Daniel includes himself in the confession

📖 Honest confession never minimizes the problem

## 📜 Departing From Thy Precepts And From Thy Judgments

"Precepts" means specific commands God gave His people to follow.

"Judgments" means the rulings and standards God set for how to live.

Israel did not just forget these rules by accident.

The word "departing" means the people deliberately walked away from them.

📜 Precepts means specific commands given

⚖️ Judgments means God's set standards

🚶 Departing means walking away on purpose

📖 This was deliberate drift, not forgetting

## 👂 Neither Have We Hearkened Unto Thy Servants The Prophets

"Hearkened" means listened closely enough to actually obey.

God kept sending prophets like Jeremiah to warn the people.

Those warnings were ignored again and again over many generations.

The problem was never a lack of warning.

👂 Hearkened means listening to obey

📣 Prophets carried repeated warnings from God

🙉 The warnings were ignored for generations

📖 Israel was warned long before judgment came

## 👑 Our Kings, Our Princes, And Our Fathers

Daniel names three separate layers of leadership together.

Kings ruled the nation, and princes helped govern under them.

"Fathers" here means the older generations who passed down the faith.

Every level of leadership shared in the same failure.

👑 Kings led the whole nation

🏛️ Princes governed under the kings

👴 Fathers means past generations of leaders

📖 Failure reached every level of leadership

## ⚖️ Righteousness Belongeth Unto Thee

Daniel states plainly that God has done nothing wrong here.

Whatever judgment follows, God's own character stays spotless.

This is the opposite of blaming God for Jerusalem's ruin.

Daniel protects God's reputation even while confessing his own people's guilt.

⚖️ Righteousness means God did nothing wrong

🛡️ God's character stays spotless here

🙅 No blame is placed on God

📖 Confession and God's innocence stand together

## 😳 Confusion Of Faces

This phrase means a deep, public sense of shame.

"As at this day" means that shame was visible right then, not just in theory.

Exile had made Israel's failure obvious to every surrounding nation.

Daniel names the shame instead of hiding from it.

😳 Confusion of faces means public shame

👀 As at this day means visible right now

🌍 Exile made the shame obvious to everyone

📖 Naming shame is part of honest prayer

## 🌍 Driven Them, Because Of Their Trespass

"Driven" describes Israel being forced out of their own land.

This happened to people near Jerusalem and to people scattered far away.

"Trespass" means the same sin already confessed earlier in the prayer.

Scattering was not random, it followed directly from that sin.

🌍 Driven means forced out by force

📏 This reached both near and far exile

💔 Trespass repeats the sin already named

📖 Scattering followed directly from sin

## 🏛️ To Our Kings, To Our Princes, And To Our Fathers

Shame does not fall only on the common people here.

Daniel names the nation's own leaders directly in this verse.

Kings, princes, and past generations of fathers all share the same guilt.

No level of leadership gets to claim this was someone else's failure.

🏛️ Leaders are named here specifically

👑 Kings and princes share full blame

👴 Fathers means earlier generations too

📖 Shame reached the very top of leadership

## ❤️ Mercies And Forgivenesses

Daniel pairs God's mercy with something even bigger.

"Forgivenesses" is plural, suggesting repeated, ongoing pardon rather than a single act.

God's willingness to forgive remains true even in the middle of judgment.

Daniel leans on that character instead of any excuse for Israel.

❤️ Mercies describes God's compassion

🔁 Forgivenesses suggests repeated pardon

⚖️ True even during real judgment

📖 Daniel leans on mercy, not excuses

## 🔁 Neither Have We Obeyed The Voice Of The Lord

This repeats the same charge from verse six in different words.

"Walk in his laws" describes a whole way of living, not one single rule.

God set these laws out plainly through the prophets.

The confession closes this section by circling back to where it began.

🔁 This repeats verse six's charge

🚶 Walking in laws means a whole lifestyle

📣 Laws came through the prophets plainly

📖 The confession circles back to its start

# Daniel 9:11-14
# ⚖️ The Curse Of The Law Lands
---
## 🚧 All Israel Have Transgressed Thy Law

"Transgressed" means crossing a line that was clearly marked.

Daniel widens the confession from leaders to the entire nation.

Nobody gets left out of this statement, rich or poor.

The whole nation shared the same guilt together.

🚧 Transgressed means crossing a clear line

🌍 All Israel includes every single person

⚖️ Guilt was shared, not selective

📖 A whole nation stood guilty together

## 💧 The Curse Is Poured Upon Us

"The curse" refers to specific warnings written in the law of Moses.

Those warnings promised exile if Israel broke the covenant.

"Poured" pictures judgment falling like water, covering everything at once.

Daniel sees Jerusalem's ruin as that exact warning finally landing.

📜 The curse was written in Moses' law

💧 Poured pictures judgment covering everything

🔗 Exile was the warned consequence

📖 A written warning finally landed

## 📝 The Oath That Is Written In The Law Of Moses

An oath here is a solemn promise sealed with real weight.

Israel agreed to this oath generations earlier, before ever entering the land.

The law of Moses lists both the blessings and the curses tied to it.

Breaking the oath meant accepting the curse side of that same agreement.

📝 Oath means a solemn, binding promise

🤝 Israel agreed to it generations earlier

⚖️ Breaking it meant accepting its curse

📖 Moses' law lists both blessings and curses

## 🏛️ Our Judges That Judged Us

"Judges" here means Israel's own leaders and rulers.

God's warning was not aimed only at ordinary people.

Leadership itself came under the same confirmed judgment.

Nobody in authority was shielded from the consequences.

⚖️ Judges means Israel's own rulers

👑 Leaders were included in the warning

🚫 No one in authority was shielded

📖 Judgment reached every level of rule

## 🌍 Under The Whole Heaven Hath Not Been Done

Daniel says Jerusalem's destruction was uniquely severe.

No other nation anywhere had suffered this kind of judgment.

This is not exaggeration, it reflects Jerusalem's unique calling as God's own city.

A city given more light received a heavier judgment for rejecting it.

🌍 No other nation suffered this way

🏙️ Jerusalem held a unique calling

⚖️ Greater light brought greater responsibility

📖 Rejected calling brought heavier judgment

## 🙏 Yet Made We Not Our Prayer

Even after everything written in Moses' law came true, Israel still did not pray.

Judgment alone did not turn the nation back toward God.

Daniel is doing now what the nation failed to do for years.

His prayer finally answers a call that went unanswered for generations.

🙏 Prayer did not follow judgment for years

⏳ Years passed without turning back to God

🧍 Daniel steps in to do it now

📖 One man's prayer answers years of silence

## 👁️ The LORD Watched Upon The Evil

"Watched" here does not mean God passively observed from a distance.

It means God actively made sure the warned judgment actually happened.

God's words were never empty threats.

What He promised, through Moses and the prophets, He carried out.

👁️ Watched means actively carried out

📣 God's words were never empty

📜 Moses and the prophets both warned

📖 Promised judgment was never a bluff

## ⚖️ The LORD Our God Is Righteous In All His Works

Daniel ends this section exactly where he started, defending God's character.

Judgment does not make God unfair or cruel.

"We obeyed not his voice" places the blame back where it belongs.

Righteous judgment and real love can come from the very same God.

⚖️ Righteous means completely fair and just

🙅 Judgment does not make God cruel

👂 Blame rests on Israel's disobedience

📖 Fair judgment and real love fit together

# Daniel 9:15-19
# 🙏 Daniel's Plea For Mercy
---
## 🐑 Brought Thy People Forth Out Of The Land Of Egypt

Daniel reaches back to the exodus, Israel's first great rescue.

"A mighty hand" describes God's unmistakable power in that rescue.

Daniel is reminding God, and himself, of a track record of saving His people.

If God rescued them once from total helplessness, He can do it again.

🐑 The exodus was Israel's first great rescue

💪 A mighty hand means unmistakable power

📜 Daniel recalls God's own track record

📖 Past rescue gives hope for rescue now

## 🌍 Gotten Thee Renown, As At This Day

"Renown" means a lasting, well known reputation.

God's name became famous through what He did at the exodus.

That reputation was still remembered generations later, in Daniel's own time.

Daniel appeals to God's own reputation, not just to Israel's need.

🌍 Renown means a lasting reputation

📢 The exodus made God's name famous

⏳ That fame lasted for generations

📖 Daniel appeals to God's own reputation

## 😟 I Beseech Thee

"Beseech" means to beg with real urgency, not a casual ask.

Daniel is not making a polite suggestion here.

Anger and fury refer to the judgment Jerusalem was still under.

Daniel pleads for that judgment to finally lift.

🙏 Beseech means urgent, desperate begging

😟 This is no casual request

⚖️ Anger and fury describe ongoing judgment

📖 Daniel pleads for judgment to lift

## ⛰️ Thy Holy Mountain

This refers to Mount Zion, the hill where the temple stood.

Calling it holy names the mountain as set apart for God alone.

Daniel is not pleading for a political city.

He is pleading for the place where God's own presence once dwelled.

⛰️ Holy mountain means Mount Zion

🏛️ The temple once stood there

🙏 This is not a political plea

📖 Daniel pleads for God's dwelling place

## 😬 Jerusalem And Thy People Are Become A Reproach

"Reproach" means a public object of scorn or mockery.

Surrounding nations now looked at Jerusalem's ruin and laughed or sneered.

Daniel names this shame as a direct result of real sin.

He does not dodge responsibility while asking for mercy.

😬 Reproach means public scorn

🌍 Neighboring nations mocked the ruin

💔 Sin caused this exact shame

📖 Honesty and mercy can be asked together

## 😊 Cause Thy Face To Shine Upon Thy Sanctuary

A shining face is an old picture of favor and attention turned toward someone.

"Sanctuary" means the temple, the one true center of worship.

That temple sat in ruins while Daniel prayed this very prayer.

Daniel is asking God's attention to return to His own ruined house.

😊 A shining face pictures favor

🏛️ Sanctuary means the temple itself

🏗️ The temple sat in ruins

📖 Daniel asks God's attention to return

## 🙏 For The Lord's Sake

Daniel grounds his final plea in God's own reputation, not Israel's worth.

This phrase repeats on purpose throughout the closing verses.

It keeps the focus off of what Israel deserves.

God's own name becomes the real reason to act.

🙏 Daniel grounds this in God's name

🔁 This phrase repeats on purpose

🚫 Focus stays off Israel's worth

📖 God's reputation becomes the real reason

## 🙅 Not For Our Righteousnesses, But For Thy Great Mercies

Daniel states plainly that Israel has no good standing to offer.

He does not pretend any recent obedience earned this request.

Mercy, by definition, is given to those who do not deserve it.

Daniel's whole plea rests on God's character, not on Israel's record.

🙅 No good standing is being claimed

📜 No recent obedience is pointed to

❤️ Mercy is never earned, only given

📖 God's character carries the whole plea

## 🔁 O Lord, Hear, O Lord, Forgive

Daniel repeats "O Lord" four times in this one verse alone.

Each short request builds urgency on top of the last one.

"Hearken and do" asks for more than listening, it asks for real action.

"Defer not" means do not delay, act now.

🔁 O Lord repeats four times here

📈 Each request builds real urgency

🎯 Hearken and do asks for action

📖 Defer not means act now, not later

## 🏙️ Called By Thy Name

Daniel closes by repeating the same reason one final time.

Jerusalem and its people carry God's own name on them.

That connection ties God's reputation directly to their fate.

The whole prayer ends exactly where Daniel's confidence actually rests.

🏙️ The city carries God's own name

👥 The people carry it too

🔗 God's reputation ties to their fate

📖 The prayer ends where confidence rests

# Daniel 9:20-23
# 👼 Gabriel Arrives With An Answer
---
## 🙇 Confessing My Sin And The Sin Of My People

Daniel includes his own sin, not only the nation's sin.

He never positions himself as the one righteous exception.

Scripture elsewhere calls Daniel a man of unusual integrity.

Even so, he links himself fully to his people's guilt.

🙇 Daniel confesses his own sin too

🚫 He claims no special exception

⭐ Scripture elsewhere praises his integrity

📖 He links himself fully to his people

## 👼 The Man Gabriel

Gabriel appears here by name, something unusual in the Old Testament.

He is called "the man" because he appeared in human form.

Gabriel later appears again in the New Testament, announcing two births.

He tells Mary about Jesus and Zacharias about John the Baptist.

👼 Gabriel is named directly here

🧍 He appeared in human form

📖 He reappears centuries later in Luke

➡️ He announces both Jesus and John's births

## 🔁 Whom I Had Seen In The Vision At The Beginning

Daniel recognizes Gabriel from an earlier vision in chapter eight.

That earlier vision explained the ram and the goat.

The same messenger now returns for an even deeper explanation.

God is building Daniel's understanding one vision at a time.

🔁 Gabriel appeared earlier in chapter eight

🐏 That vision explained the ram and goat

📈 Understanding builds across multiple visions

📖 God reveals truth gradually, not all at once

## 💨 Caused To Fly Swiftly

This phrase pictures Gabriel's movement as sudden and urgent.

Angels in scripture do not wander casually toward their assignment.

God sends an immediate answer the moment Daniel begins praying.

Daniel barely finishes speaking before help is already on its way.

💨 Fly swiftly pictures sudden, urgent movement

👼 Angels move with real purpose

⚡ The answer comes almost immediately

📖 Prayer and answer happen close together

## 🕯️ The Time Of The Evening Oblation

"Oblation" means a sacrifice offered to God at a set time of day.

Jews once offered this sacrifice every evening at the temple.

The temple itself was already in ruins during Daniel's exile.

Daniel still kept this sacred time in his heart, even without a temple.

🕯️ Oblation means a timed sacrifice

🏛️ This custom was tied to the temple

🏗️ The temple itself sat in ruins

📖 Daniel honored sacred time without a temple

## 🧠 Skill And Understanding

Gabriel states his purpose plainly before saying anything else.

"Skill" here means real insight, not a hidden trick.

Daniel is about to receive an actual explanation, not another riddle.

God wants Daniel to understand, not just to wonder.

🧠 Skill means genuine insight here

🚫 Not a trick or a riddle

🎯 A real explanation is coming

📖 God wants understanding, not confusion

## ⏱️ The Commandment Came Forth

Gabriel reveals that God answered before Daniel even finished praying.

The response was already in motion at the very beginning of his request.

This does not mean God was slow to listen in other moments.

It means this particular answer was ready the instant Daniel asked.

⏱️ The answer began right away

🙏 It started at the beginning of his prayer

🚫 God was never slow here

📖 Some answers are ready the instant we ask

## ❤️ Thou Art Greatly Beloved

Gabriel tells Daniel plainly how God sees him.

This is not flattery, it explains why such a deep vision is given to him.

Daniel's years of faithfulness in a foreign land are not forgotten.

God entrusts the deepest truths to those who have stayed faithful.

❤️ Beloved describes how God sees Daniel

🚫 This is not empty flattery

📆 Years of faithfulness are remembered

📖 Deep truth is entrusted to the faithful

# Daniel 9:24-27
# 🔢 The Seventy Weeks
---
## 🔢 Seventy Weeks Are Determined

"Weeks" here is better understood as sets of seven years, not seven days.

Seventy weeks of years adds up to four hundred ninety years total.

This directly answers the seventy years Daniel was already thinking about in verse two.

Gabriel reveals a much longer timeline than Daniel expected.

🔢 A week here means seven years

➗ Seventy weeks totals four hundred ninety years

🔁 This answers Daniel's seventy year question

📖 God had already fixed this timeline

## 🛑 To Finish The Transgression, And To Make An End Of Sins

Gabriel lists six specific goals for this entire timeline.

"Finish the transgression" means bringing Israel's long pattern of rebellion to a close.

"Make an end of sins" points to sin itself being dealt with completely.

These are not vague hopes, they describe a real and final outcome.

📋 Six goals are listed for this timeline

🛑 Finish the transgression means ending rebellion

💔 Make an end of sins goes even deeper

📖 These describe a final outcome, not a hope

## 🤝 To Make Reconciliation For Iniquity, And To Bring In Everlasting Righteousness

"Reconciliation" means restoring a broken relationship, usually through a payment or sacrifice.

This goes beyond punishing sin, it describes actually fixing what sin broke.

"Everlasting righteousness" describes a permanent, lasting right standing.

That is a far bigger promise than Jerusalem's temple being rebuilt.

🤝 Reconciliation means restoring what was broken

💰 It usually involves payment or sacrifice

♾️ Everlasting righteousness means permanent right standing

📖 This points past Jerusalem's own rebuilding

## 🔏 To Seal Up The Vision And Prophecy, And To Anoint The Most Holy

"Seal up" means confirming something as finished and true.

It pictures closing a document the way a wax seal closes a letter.

"Anoint the most Holy" likely points to a person or place set apart for God.

Many scholars connect this phrase to the Messiah's own anointing.

🔏 Seal up means confirming something finished

✉️ It pictures closing a sealed letter

👑 Anoint the most Holy names one set apart

📖 Many connect this to the Messiah

## 🏁 The Going Forth Of The Commandment To Restore And Build Jerusalem

This marks the starting point of the whole seventy week countdown.

It points to a real decree allowing Jerusalem's walls to be rebuilt.

The books of Ezra and Nehemiah record decrees like this from Persian kings.

Gabriel gives Daniel an actual historical starting line, not a vague future date.

🏁 This marks the countdown's starting point

📜 It points to a real Persian decree

🧱 A historical event, not a vague date

📖 Ezra and Nehemiah record decrees like it

## 📆 Unto The Messiah The Prince Shall Be Seven Weeks, And Threescore And Two Weeks

"Threescore and two" is an old way of saying sixty two.

Seven weeks plus sixty two weeks adds up to sixty nine weeks of years.

That equals four hundred eighty three years from the decree to the Messiah.

"The Messiah the Prince" names a specific coming ruler and anointed one.

🔢 Threescore and two means sixty two

➕ Seven plus sixty two equals sixty nine weeks

📆 That totals four hundred eighty three years

📖 The countdown ends at the Messiah

## 🧱 The Street Shall Be Built Again, And The Wall, Even In Troublous Times

This describes the actual physical rebuilding of Jerusalem.

"Troublous times" means the rebuilding happened under real opposition and hardship.

Nehemiah's own account describes exactly this kind of resistance.

The prophecy and the historical record line up with each other.

🧱 This describes Jerusalem's physical rebuilding

⚔️ Troublous times means real opposition

📜 Nehemiah records this same resistance

📖 Prophecy and history line up here

## ⚔️ Messiah Be Cut Off, But Not For Himself

"Cut off" is an old phrase meaning a violent, early death.

"Not for himself" means this death was not a punishment for his own guilt.

Many Christians read this as pointing directly to Jesus's death on behalf of others.

The text presents this death as happening for someone else's benefit.

⚔️ Cut off means a violent, early death

🙅 Not for himself means not his own guilt

✝️ Many read this as pointing to Jesus

📖 His death served someone else's benefit

## 🏛️ The People Of The Prince That Shall Come Shall Destroy The City And The Sanctuary

This verse shifts to a second figure, a different prince entirely.

Many scholars connect this to Rome, which destroyed Jerusalem's temple in a later century.

"Flood" here is a picture of overwhelming, unstoppable destruction.

The city and the sanctuary both suffer this same devastating end.

👥 A second prince appears here

🏛️ Many connect this to Rome's later destruction

🌊 Flood pictures overwhelming destruction

📖 City and sanctuary share this end

## 🤝 He Shall Confirm The Covenant With Many For One Week

"He" here most likely refers back to the coming prince, not the Messiah.

"One week" means one final set of seven years in this timeline.

"Confirm the covenant" describes entering a binding agreement with many people.

Scholars disagree on exactly when this final week takes place in history.

🤝 He likely means the coming prince

🔟 One week means a final seven years

📜 Confirm the covenant means a binding deal

📖 Scholars hold differing views on its timing

## ⏳ In The Midst Of The Week He Shall Cause The Sacrifice And The Oblation To Cease

"In the midst" means right in the middle of that final seven year span.

Temple sacrifices stop being offered at that exact midpoint.

"Abominations" describes something defiling placed where it does not belong.

The chapter ends with judgment, not despair, since an end point is already fixed by God.

⏳ In the midst means the halfway point

🛑 Temple sacrifice stops at that point

🚫 Abominations means defiling what is sacred

📖 An end point is already fixed by God
`.trim();

export const DANIEL_NINE_PERSONAL_SECTIONS = parseDanielNineRawNotes(DANIEL_NINE_RAW_NOTES);
