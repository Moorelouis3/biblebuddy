export type PhilippiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePhilippiansFourRawNotes(rawText: string): PhilippiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PhilippiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Philippians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Philippians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Philippians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Philippians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Philippians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Philippians 4:${startVerse}` : `Philippians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Philippians 4 sections, received " + sections.length);
  }

  return sections;
}

const PHILIPPIANS_FOUR_RAW_NOTES = `# Philippians 4:1-3
# 🏆 Standing Firm Together
---
## 🏆 My Joy And Crown

Crown here means a winner's wreath, not a king's crown.

Greek athletes received that wreath after finishing a race.

Paul says the Philippians themselves are that reward for him.

Their faithfulness is the prize his whole ministry was running for.

🏆 Crown means a winner's wreath

🏃 Like a wreath given after a race

❤️ The Philippians are Paul's prize

📖 Their faithfulness rewards his ministry

## 🛡️ So Stand Fast In The Lord

Stand fast means to hold a position firmly under pressure.

It is picture language from the battlefield, not a stroll through a garden.

Paul uses it right after reminding them he loves them deeply.

Love and courage show up together in this one short line.

🛡️ Stand fast means hold your ground

⚔️ The picture comes from a battlefield

❤️ Paul pairs it with deep love

📖 Courage and love belong together

## 👩 I Beseech Euodias, And Beseech Syntyche

Euodias and Syntyche were two women leading in the Philippian church.

Paul names them personally, which was unusual for how he wrote.

They had worked hard for the gospel but were now in a dispute.

Paul does not take a side, he asks them to agree in the Lord.

👩 Two named women led this church

🗣️ Naming them shows real respect

⚡ They were caught in a dispute

📖 Paul calls them to agree, not win

## 🐂 True Yokefellow

Yokefellow means a partner joined to Paul in the same hard work.

A yoke ties two oxen together so they pull in the same direction.

No one knows for certain who this person was.

The name may be a private joke lost to history.

🐂 Yokefellow pictures two oxen paired together

🤝 It names a true ministry partner

❓ The person's identity is unknown

📖 Some mysteries stay hidden in scripture

## 📜 Whose Names Are In The Book Of Life

The book of life was pictured as a heavenly registry of citizens.

Ancient cities kept written rolls listing who belonged there.

Paul says these believers already belong to heaven's own city.

Their citizenship was never in doubt, no matter how hard they argued.

📜 The book of life is a registry

🏛️ Ancient cities kept rolls like this

🏙️ These believers belong to heaven's city

📖 Their citizenship was never in doubt

## 🙌 With Clement Also, And With Other My Fellowlabourers

Fellowlabourers means people who worked alongside Paul in real ministry.

Clement is named, but many others are left unnamed here.

Paul did not build this church by himself.

A whole team of ordinary believers carried the work with him.

👥 Fellowlabourers means coworkers in ministry

📛 Clement is named, others are not

🙌 Paul never worked completely alone

📖 Ordinary believers carried real ministry weight

# Philippians 4:4-7
# 🕊️ Rejoice Without Anxiety
---
## 😊 Rejoice In The Lord Alway

Alway is an old spelling of always, not a typo.

Paul is not describing a feeling that depends on good circumstances.

He is in prison while he writes this letter.

Joy in the Lord can exist even inside a jail cell.

😊 Alway is an old spelling of always

⛓️ Paul writes this while in prison

🔒 His joy did not depend on freedom

📖 Joy in the Lord outlasts circumstances

## 🔁 And Again I Say, Rejoice

Paul repeats the same command on purpose.

Repetition in his letters usually signals something urgent or important.

He wants this command to be impossible to miss or forget.

Some commands are worth saying more than once.

🔁 Paul repeats rejoice on purpose

❗ Repetition signals real urgency

👂 He wants this impossible to miss

📖 Some truths deserve saying twice

## 🕊️ Let Your Moderation Be Known Unto All Men

Moderation here does not mean eating or drinking in small amounts.

It means a gentle, yielding spirit that does not demand its own way.

This kind of gentleness is meant to be visible to everyone, not hidden.

A calm, generous spirit stands out in a world that fights for itself.

🕊️ Moderation means a gentle, yielding spirit

👀 This gentleness should be visible to all

⚖️ It does not demand its own way

📖 Gentleness stands out in a selfish world

## ⏳ The Lord Is At Hand

This does not only mean Christ's return is coming soon.

It also means the Lord is near right now, in this moment.

Paul links that nearness directly to not being anxious.

A present God is the real cure for worry.

⏳ It points to Christ's soon return

🤲 It also means the Lord is near now

💭 Nearness is linked to not worrying

📖 A present God cures real worry

## 😟 Be Careful For Nothing

Careful in the King James English means anxious, not cautious.

Paul is not telling anyone to stop planning or thinking ahead.

He is telling them to stop letting worry control their mind.

That is a command most readers today desperately need to hear.

😟 Careful here means anxious, not cautious

🧠 Paul is not against planning ahead

🚫 He is against worry controlling the mind

📖 This command still fits today's readers

## 🙏 By Prayer And Supplication With Thanksgiving

Supplication means a specific, detailed request, not a vague prayer.

Paul pairs that request with thanksgiving every single time.

Gratitude keeps a request from turning into pure complaint.

God wants to hear exactly what is needed, said with a thankful heart.

🙏 Supplication means a specific request

🎁 It is always paired with thanksgiving

😤 Gratitude keeps requests from becoming complaints

📖 God wants specific, thankful prayers

## 🧩 Which Passeth All Understanding

Passeth all understanding means this peace cannot be fully explained by logic.

It does not arrive because every problem got solved first.

It arrives even while the hard circumstances are still there.

Human reasoning alone could never produce peace like this.

🧩 Passeth understanding means logic cannot explain it

🌧️ It arrives without the problem being fixed

✝️ The peace comes from God, not logic

📖 Human reasoning cannot produce this peace

## 🛡️ Shall Keep Your Hearts And Minds

Keep here is a military word, like a soldier guarding a city gate.

Through Christ Jesus names the only way this guard actually works.

Hearts and minds together cover both feelings and thoughts.

God's peace stands guard over the whole inner life.

🛡️ Keep pictures a soldier guarding a gate

✝️ Through Christ Jesus is how it works

💓 Hearts and minds cover feelings and thoughts

📖 God's peace guards the whole inner life

# Philippians 4:8-9
# 💭 Think On These Things
---
## 🧠 Whatsoever Things Are True

Paul lists six different qualities to think about, one after another.

These words were common in Greek philosophy, not just church teaching.

True, honest, just, and pure all describe plain moral integrity.

Lovely and of good report describe how that integrity looks to others.

🧠 Paul lists six different qualities

📚 The words come from Greek philosophy

⚖️ True, honest, just, pure mean integrity

📖 Lovely and of good report show to others

## 📏 If There Be Any Virtue, And If There Be Any Praise

Virtue and praise summarize the whole list in two words.

Paul is not asking for occasional good thoughts.

He is describing a steady habit of mind.

What a person dwells on quietly shapes who they become.

📏 Virtue and praise summarize the list

🔁 This is a steady habit, not occasional

🧠 It shapes the mind over time

📖 What we dwell on shapes who we become

## 🔄 Think On These Things

Think here means to dwell on something, turning it over again and again.

It is the opposite of letting worry replay in a loop instead.

Paul already told them not to be anxious a few verses earlier.

Now he gives their mind something better to run on instead.

🔄 Think means to dwell on something

🚫 It replaces anxious, looping thoughts

🔙 Paul already addressed worry earlier

📖 The mind needs something good to run on

## 📚 Learned, And Received, And Heard, And Seen In Me

Paul lists four ways the Philippians took in his teaching.

Learned and received point to formal instruction he gave them.

Heard and seen point to his example, not just his words.

Paul is comfortable pointing to his own life as proof.

📚 Four ways they took in his teaching

🎓 Learned and received mean formal instruction

👀 Heard and seen mean watching his life

📖 Paul points to his own example

## 🕊️ The God Of Peace Shall Be With You

Earlier Paul promised the peace of God guarding their hearts.

Now he promises the God of peace himself, present with them.

A feeling of peace is good, but a present God is more.

Paul moves from the gift to the giver in one line.

🕊️ Earlier verse promised peace from God

✝️ Now Paul promises God himself, present

💛 A feeling is good, a presence is more

📖 Paul moves from gift to giver

# Philippians 4:10-13
# 💪 Learning To Be Content
---
## 🙏 I Rejoiced In The Lord Greatly

Paul is thanking the Philippians for a gift they just sent him.

His joy is real, not just polite manners.

He frames the thanks in terms of the Lord, not just friendship.

Gratitude and worship sit together in this one short sentence.

🙏 Paul thanks them for a real gift

😊 His joy here is genuine, not polite

✝️ He frames thanks around the Lord

📖 Gratitude and worship sit together here

## 🌱 Your Care Of Me Hath Flourished Again

This does not mean the Philippians had stopped caring about Paul.

Flourished again pictures a plant blooming once conditions allow it.

Ye lacked opportunity means they simply had no way to send help.

Paul protects their reputation instead of guilting them for the gap.

🌱 Flourished again pictures a blooming plant

🚫 Paul does not accuse them of neglect

🚪 They lacked opportunity, not willingness

📖 Paul protects their reputation, not shame

## 🙅 Not That I Speak In Respect Of Want

Paul quickly clarifies he is not complaining about being poor.

He does not want the gift mistaken for a guilt trip.

His thanks stands on its own, without a hidden complaint underneath.

A gracious thank you never doubles as a quiet accusation.

🙅 Paul is not complaining about poverty

🎯 He will not let thanks sound like guilt

💬 His thanks stands without a hidden complaint

📖 Real thanks never hides an accusation

## 😌 Therewith To Be Content

Content here means a settled peace that does not depend on circumstances.

Learned shows this was not natural to Paul, it was trained over time.

Greek writers of his day valued this same kind of self sufficiency.

Paul takes that idea and roots it in Christ instead of willpower.

😌 Content means settled peace, not circumstances

📈 Learned means trained over time

📚 Greek writers valued this same idea

📖 Paul roots it in Christ, not willpower

## ⬇️ Both How To Be Abased, And How To Abound

Abased means brought low, having little and going without.

Abound means having plenty and more than enough.

Paul says he has genuinely lived through both extremes.

Contentment was tested in real poverty, not just imagined in theory.

⬇️ Abased means brought low, having little

⬆️ Abound means having plenty, more than enough

🧪 Paul lived through both extremes himself

📖 His contentment was tested, not theoretical

## 🔑 Instructed Both To Be Full And To Be Hungry

Instructed here carries the sense of being let in on a secret.

It is the word used for someone initiated into hidden knowledge.

Paul says contentment is a secret he was let in on.

Being full or being hungry no longer controlled how he felt inside.

🔑 Instructed means let in on a secret

🧩 It pictures being initiated into knowledge

🍞 Full or hungry no longer controlled him

📖 Contentment became a secret Paul learned

## 💪 I Can Do All Things Through Christ

This verse is not a promise about winning every goal in life.

Paul just finished talking about being hungry, poor, and in need.

All things here means every one of those hard circumstances, not success.

Christ's strength is what let Paul stay content inside real hardship.

🏋️ This is not a promise about success

🍽️ Paul just described hunger and need

💪 All things means hard circumstances, not wins

📖 Christ's strength produced contentment, not achievement

# Philippians 4:14-18
# 🎁 A Gift Like A Sacrifice
---
## 🤝 Ye Did Communicate With My Affliction

Communicate here does not mean sending a letter or a message.

It means sharing directly in Paul's hardship, almost like a partnership.

The Philippians felt his trouble as partly their own trouble too.

Paul praises that shared burden as a genuinely good thing they did.

🤝 Communicate means sharing in his hardship

💔 They felt his trouble as their own

👏 Paul calls this a genuinely good act

📖 Shared burden is real partnership

## 🗺️ When I Departed From Macedonia

This points back to when Paul first left Philippi, a city in Macedonia.

He had just planted that church before moving on to new cities.

That early season is when this partnership with Paul began.

Their support was not a new habit, it went back to the very start.

🗺️ Macedonia was the region around Philippi

🌱 Paul had just planted that church

⏳ Their partnership began in that early season

📖 Their support went back to the very start

## 🏆 But Ye Only

Of every church Paul started, only the Philippians sent financial support.

Giving and receiving describes a two way exchange, not a one time gift.

Paul names that loyalty specifically instead of letting it pass unnoticed.

One church's faithfulness stood out clearly against everyone else's silence.

🏆 Only the Philippians sent real support

🔄 Giving and receiving means a two way exchange

🙌 Paul names their loyalty specifically

📖 One church stood out from all the rest

## 🏙️ In Thessalonica Ye Sent Once And Again

Thessalonica was the next city Paul reached after leaving Philippi.

Once and again means they sent help more than one time.

Necessity means Paul's basic needs, not luxuries or extras.

Their giving was not a single gesture, it kept on repeating.

🏙️ Thessalonica was the city Paul reached next

🔁 Once and again means more than once

🍞 Necessity means basic needs, not extras

📖 Their giving kept on repeating

## 🙅 Not Because I Desire A Gift

Paul again stops to clarify this is not about wanting more money.

He already said his contentment does not depend on gifts at all.

He is careful never to sound like he is asking for anything.

His focus stays on what the gift means for them, not for him.

🙅 Paul is not asking for more

😌 His contentment never depended on gifts

🎯 He avoids sounding like he wants more

📖 His focus stays on them, not himself

## 📒 Fruit That May Abound To Your Account

Account here pictures a ledger, like a record of deposits.

Fruit means a lasting spiritual reward, not just a kind feeling.

Paul says their giving is being recorded toward something eternal.

What they gave to him is being credited back to them by God.

📒 Account pictures a ledger of deposits

🌳 Fruit means a lasting spiritual reward

⏳ Their giving is recorded toward eternity

📖 God credits their gift back to them

## 📦 Having Received Of Epaphroditus

Epaphroditus was the Philippians' messenger, sent to deliver this gift.

Paul already described him earlier in this letter as a true brother.

He risked his own health making this trip to reach Paul.

This gift reached Paul through a real, costly act of friendship.

📦 Epaphroditus delivered this gift in person

✝️ Paul already called him a true brother

🤒 He risked his health making the trip

📖 The gift came through real friendship

## 📜 An Odour Of A Sweet Smell

This exact language comes straight from Old Testament offering instructions.

A sweet smelling offering was one God described as pleasing to him.

Paul calls their gift of money that same kind of offering.

Giving to support Paul's ministry counted to God as an act of worship.

📜 This language echoes Old Testament offerings

🔥 A sweet smell meant pleasing to God

💰 Their money counted as that offering

📖 Giving to Paul was an act of worship

# Philippians 4:19-23
# 🙏 Final Grace And Greetings
---
## 🙏 My God Shall Supply All Your Need

Paul shifts from thanking them to promising God will provide for them.

Need here means what is necessary, not every want they might have.

The same God who moved them to give will not leave them empty.

Generosity does not create a shortage for the generous giver.

🙏 Paul promises God will provide for them

🎯 Need means necessities, not every want

🔄 The giving God will not leave them empty

📖 Generosity never creates a real shortage

## 💰 According To His Riches In Glory

This does not mean God gives out of his riches like spare change.

It means God gives according to how rich he actually is.

That is a much bigger promise than simply getting leftovers.

Christ Jesus is named as the means through which that supply comes.

💰 Not spare change, but according to riches

📏 God's supply matches how rich he is

🎁 This promise is bigger than leftovers

📖 Christ Jesus is how that supply comes

## 🙌 Be Glory For Ever And Ever

This short line is called a doxology, a burst of praise to God.

Paul moves straight from a promise into worship, without any transition.

For ever and ever stretches the praise beyond any limit of time.

Amen simply means let it be so, a confirming word at the end.

🙌 A doxology is a burst of praise

🔀 Promise and praise flow together here

♾️ For ever and ever means no limit

📖 Amen means let it be so

## 👋 Salute Every Saint In Christ Jesus

Salute means to greet someone warmly, more than a quick hello.

Saint simply means someone set apart for God, not a perfect person.

Paul asks the whole church to be greeted, not just its leaders.

Every ordinary believer mattered enough to be named in this greeting.

👋 Salute means a warm greeting

✨ Saint means set apart for God

👥 The whole church gets greeted, not leaders

📖 Every ordinary believer mattered to Paul

## 👥 The Brethren Which Are With Me Greet You

These brethren are Paul's companions there with him during imprisonment.

They are not named here, unlike Epaphroditus earlier in the letter.

Paul was never completely alone, even while under guard in Rome.

A small circle of friends stayed near him through the hardship.

👥 These are Paul's companions in Rome

❓ They are left unnamed here

⛓️ Paul was never alone in his imprisonment

📖 Friends stayed near him through hardship

## 🏛️ All The Saints Salute You

This greeting comes from the larger church in Rome, not just Paul's inner circle.

Every believer there wanted the Philippians to know they were remembered.

A greeting like this traveled slowly, carried by a real letter and a real messenger.

Distance never fully separated these churches from each other.

🏛️ This greeting comes from the whole Roman church

💌 They wanted the Philippians to feel remembered

🚶 The greeting traveled by letter and messenger

📖 Distance never fully separated these churches

## ⛓️ Chiefly They That Are Of Caesar's Household

Caesar's household meant the staff and servants running the emperor's palace.

Some of them were slaves, others were officials with real influence.

The gospel had quietly reached deep inside the heart of Roman power.

Believers were working right under Caesar's own roof without him knowing it.

🏛️ Caesar's household meant the emperor's own staff

⛓️ Some were slaves, some were officials

🌍 The gospel reached deep into Roman power

📖 Believers served right under Caesar's roof

## ✍️ The Grace Of Our Lord Jesus Christ

Paul closes almost every letter with this same kind of blessing.

Grace means God's favor given freely, not something anyone earned.

All makes sure no one reading this letter feels left out.

A letter about joy and contentment ends exactly where it should, on grace.

✍️ Paul closes nearly every letter this way

🎁 Grace means favor that is never earned

👥 All means no reader is left out

📖 A letter on joy ends on grace
`.trim();

export const PHILIPPIANS_FOUR_PERSONAL_SECTIONS = parsePhilippiansFourRawNotes(PHILIPPIANS_FOUR_RAW_NOTES);
