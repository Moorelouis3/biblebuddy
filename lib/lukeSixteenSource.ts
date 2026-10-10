export type LukeSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeSixteenRawNotes(rawText: string): LukeSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 16:${startVerse}` : `Luke 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Luke 16 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_SIXTEEN_RAW_NOTES = `# Luke 16:1-3
# 📋 An Accused Steward
---
## 💼 Which Had A Steward

A steward managed an entire household's money and property for its owner.

He was not a hired hand doing small chores.

He had full authority to buy, sell, and settle debts in his master's name.

Think of a modern manager running a business while the owner stays away.

Everything the steward did carried his master's name and risk.

💼 Steward means household manager

🏦 He handled money and property

✍️ He acted with his master's authority

📖 His choices carried his master's risk

## 📉 Accused Unto Him That He Had Wasted His Goods

"Wasted" means he managed the estate carelessly, not necessarily that he stole it outright.

The text never says exactly how he wasted it.

Someone close enough to see the books reported him to the master.

A servant's reputation in this culture rested entirely on trust, not performance reviews.

Losing that trust put his entire future at risk.

📉 Wasted means careless management

❓ The text never says how

🗣️ Someone reported him to the master

📖 Trust was his whole career

## 📊 Give An Account Of Thy Stewardship

To give an account meant producing the full financial records for inspection.

This was not a casual conversation.

It was a formal demand to see every transaction the steward had made.

The master's question carries real anger underneath it.

He already suspects what the books will show.

📊 Give an account means a full audit

📜 Every transaction would be checked

😠 The master's anger is already clear

➡️ The steward's time was running out

## ⛏️ I Cannot Dig To Beg I Am Ashamed

Digging meant manual field labor, the lowest paid work available to an unskilled man.

A steward's soft hands and office skills were useless on a farm.

Begging meant public shame, since it announced he had nothing left.

He is not weighing two jobs.

He is weighing two different kinds of humiliation.

⛏️ Digging meant hard manual labor

🙅 His skills did not fit that work

😳 Begging meant public shame

➡️ Both options meant losing his status

## ❗ What Shall I Do

This question marks the turning point of the whole story.

Everything the steward does next grows out of this one moment of panic.

He is not asking for advice from someone else.

He is thinking out loud, searching for a way to survive.

The plan he comes up with next will be clever, not honest.

❗ A question that turns the whole story

😨 Panic forces him to think fast

🧠 He searches for his own way out

📖 His plan ahead will be clever, not honest

# Luke 16:4-9
# 🧾 The Debtors Settle Their Bills
---
## 💡 I Am Resolved What To Do

The steward moves from panic straight into a plan.

Being "resolved" means his mind is fully made up, not just hopeful.

Whatever comes next, he will not hesitate or second guess himself.

Confidence replaces the fear that gripped him only moments earlier.

Desperation can produce surprisingly fast thinking.

💡 Resolved means his mind is made up

🏃 Fear turns into fast action

🧠 He stops hesitating completely

📖 Desperation can sharpen thinking quickly

## 🏠 They May Receive Me Into Their Houses

This is the actual goal behind the steward's whole scheme.

He is not trying to clear his conscience or fix the damage he caused.

He wants grateful debtors willing to open their own homes to him later.

Kindness shown now is really an investment in his own future comfort.

Even his generosity serves his own self interest.

🎯 This reveals his real goal

🏠 He wants future shelter from grateful debtors

💭 His kindness is really self interest

📖 Even generosity can serve selfish ends

## ❓ How Much Owest Thou Unto My Lord

These debtors were likely tenant farmers or merchants who rented land or supplies from the rich man.

They owed him produce, not cash, since large debts in this economy were often paid in goods.

The steward already knows these numbers from the account books he manages.

Asking the question out loud is part of his performance, not real curiosity.

He needs each debtor to hear the new deal directly from his own mouth.

🌾 Debtors likely rented land or supplies

📦 Debts were paid in goods, not cash

🗣️ He needed them to hear it firsthand

📖 He already knew these numbers

## 🏺 An Hundred Measures Of Oil

A measure of oil in this culture held close to nine gallons.

A hundred measures was an enormous debt, enough oil to supply a household for years.

The steward tells this man to cut his own bill in half.

Many scholars believe this cut was removing a hidden interest charge the steward had added for the master's profit.

Jewish law technically forbid charging interest to a fellow Israelite.

Erasing it here may have been covering up the master's own quiet rule breaking.

🏺 A measure of oil held about nine gallons

✂️ The steward cut this bill in half

⚖️ This may have hidden an illegal interest charge

📖 He may be erasing the master's own sin

## 🌿 An Hundred Measures Of Wheat

A measure of wheat was a much larger unit than a measure of oil.

A hundred measures of wheat was a massive amount of grain.

This time the steward only cuts the bill by a fifth, not by half.

Grain and oil carried different profit margins, so the hidden interest on each was not the same percentage.

Every number here was chosen on purpose, not randomly.

🌿 Wheat measures were far larger than oil

✂️ Only a fifth gets cut this time

🧮 Different goods carried different hidden interest

📖 Nothing about these numbers was random

## 👏 The Lord Commended The Unjust Steward

The master is impressed despite being the victim of this scheme.

"Commended" means he openly praised the steward's cleverness.

He never says the dishonesty itself was acceptable.

What he praises is the shrewd thinking behind the plan.

Admiring someone's cleverness is not the same as approving what they did with it.

👏 Commended means openly praised

🧠 He praises the clever thinking, not the dishonesty

🚫 Admiration is not the same as approval

➡️ Jesus wants that same cleverness aimed rightly

## 🕯️ Wiser Than The Children Of Light

"Children of this world" means people focused entirely on earthly success and security.

"Children of light" means people who belong to God and know his truth.

Jesus points out an uncomfortable pattern.

Worldly people often plan harder for their future than God's own people do.

This is not a compliment to dishonesty.

It is a challenge for believers to plan with just as much urgency.

🌍 Children of this world means worldly planners

🕯️ Children of light means God's own people

😳 Worldly people often plan harder than believers

📖 Believers should plan with equal urgency

## 💰 Make To Yourselves Friends Of The Mammon Of Unrighteousness

"Mammon" is an old word for money, property, and wealth in general.

Jesus is not telling anyone to use stolen money.

He is saying money itself can still be used to build real relationships while there is time.

The steward used dishonest money to secure friends.

Jesus says believers should use their honest money the same intentional way.

💰 Mammon means money and wealth

🚫 This is not approval of theft

🤝 Money can still build real relationships

📖 Use money with that same intention

## 🏠 Everlasting Habitations

"When ye fail" is a gentle way of saying when you die.

"Everlasting habitations" means a permanent home in heaven, not a temporary lodging.

The steward used generosity now to secure a temporary home later.

Jesus says generosity now can point toward a home that never ends.

Money spent wisely on others outlives the money itself.

⏳ Ye fail means when you die

🏠 Everlasting habitations means a permanent heavenly home

🔁 The steward's trick only bought a temporary fix

📖 Generosity now can point toward eternity

# Luke 16:10-13
# ⚖️ Serving Two Masters
---
## 🔍 Faithful In That Which Is Least Is Faithful Also In Much

Character does not change size depending on how much is at stake.

A person who cuts corners with a small amount will cut corners with a large amount too.

Small, unseen choices are the real test of a person's honesty.

Nobody becomes trustworthy overnight just because the stakes get bigger.

Small faithfulness is practice for bigger faithfulness.

🔍 Character stays the same at any size

🧪 Small choices are the real test

📈 Trust is built before the stakes rise

📖 Small faithfulness prepares for bigger faithfulness

## 🏆 Who Will Commit To Your Trust The True Riches

"Unrighteous mammon" does not mean money itself is sinful.

It means earthly wealth is unreliable and temporary compared to what truly lasts.

"True riches" refers to spiritual trust, eternal reward, and real responsibility in God's kingdom.

How a person handles ordinary money becomes the test for whether God can trust them with more.

Money here is practice, not the main prize.

💵 Unrighteous mammon means unreliable, not evil

🏆 True riches means lasting spiritual reward

🧪 Money handling becomes the real test

📖 Money is practice, not the prize

## 🏦 That Which Is Another Man's

"Another man's" means the money a person manages was never truly their own.

Everything on earth ultimately belongs to God, not to the one holding it for a while.

"Your own" means the eternal reward promised to those who were faithful.

This flips how most people think about ownership.

Earthly wealth is borrowed.

Eternal reward is the only thing that becomes truly yours.

🏦 Another man's means borrowed, not owned

🌍 Everything on earth belongs to God first

🏆 Your own means the eternal reward

📖 Only eternal reward is truly yours

## 🏠 No Servant Can Serve Two Masters

A servant in this culture belonged fully to one household, not several.

Working for two masters at once was not even realistic in daily life.

Splitting loyalty always produces one master who gets real devotion and one who gets leftovers.

Jesus uses this everyday fact to make a much bigger spiritual point.

Nobody can give full devotion to two different loves at the same time.

🏠 A servant belonged fully to one house

⚖️ Split loyalty always favors one master

💔 One master always gets leftovers

📖 Full devotion cannot go two directions

## 🎯 Ye Cannot Serve God And Mammon

This is the plain point behind the whole parable.

Money itself is not condemned here.

Divided loyalty is what gets condemned.

A person can use money without being owned by it.

The moment money becomes the master, God gets whatever loyalty is left over.

🎯 This is the parable's plain point

💰 Money is not condemned here

💔 Divided loyalty is what gets condemned

📖 Whoever owns your loyalty owns you

# Luke 16:14-18
# 😏 The Pharisees Mock Him
---
## 💰 The Pharisees Also, Who Were Covetous

"Covetous" means a deep, constant craving for more money and possessions.

The Pharisees prided themselves on keeping God's law in public.

This parable about mammon exposed a private love of money hiding underneath that image.

Jesus was not guessing at a weakness.

He was naming something true about the men standing in front of him.

💰 Covetous means craving more wealth

🎭 Their image hid a love of money

🎯 Jesus named a real, not guessed, weakness

📖 The parable landed exactly where it hurt

## 😏 They Derided Him

"Derided" means they laughed at him with open scorn, not quiet disagreement.

This was mockery meant to be seen and heard by others nearby.

Jesus had just told a story that exposed exactly what they loved most.

Mocking him was easier than admitting the story was true.

Laughing it off let them avoid actually answering it.

😏 Derided means open, scornful mockery

👀 Meant to be seen by others

🙈 Easier than admitting the truth

➡️ Mockery avoided an honest answer

## 🎭 Ye Are They Which Justify Yourselves Before Men

Jesus answers their mockery by naming exactly what they were doing.

They built a reputation for holiness that other people could see and admire.

God was never fooled by that performance, because he sees the heart behind it.

A reputation built for an audience can still hide real sin underneath.

Jesus is not impressed by what impresses a crowd.

🎭 They built holiness for an audience

👁️ God sees past the performance

💔 A good reputation can still hide sin

📖 Jesus is not impressed by crowds

## ⚠️ That Which Is Highly Esteemed Among Men Is Abomination In The Sight Of God

This does not mean everything people respect is automatically evil.

It means the specific mix the Pharisees were praised for, public holiness covering private greed, disgusted God.

"Abomination" is a strong word, usually reserved for things God finds deeply offensive.

Jesus uses that strong word on purpose here.

What wins applause on earth can still be the very thing God rejects.

👏 Not everything admired by people is evil

🎭 Public holiness hid private greed here

⚠️ Abomination is a deliberately strong word

📖 Applause on earth is not God's verdict

## 📚 The Law And The Prophets Were Until John

"The law and the prophets" is shorthand for the entire Old Testament.

John the Baptist marks the hinge point where that long era turns into something new.

After John, the message shifts from pointing forward to a coming kingdom to announcing it has arrived.

This is not Jesus rejecting the Old Testament.

It is Jesus saying what it was pointing toward has now begun.

📚 Law and prophets means the whole Old Testament

🚪 John the Baptist marks the turning point

📣 The message shifts to the kingdom has come

📖 The Old Testament pointed toward this moment

## 🚪 Every Man Presseth Into It

"Presseth" means pushing forward with real effort and urgency, not a casual stroll.

People were responding to the kingdom message with eager determination.

This pictures a crowd pushing toward something they do not want to miss.

The kingdom of God was never meant to be entered passively.

Urgency, not comfort, was the right response to Jesus.

🚪 Presseth means pushing forward with urgency

🏃 People responded with real determination

🚫 Nobody enters this passively

📖 Urgency was the right response

## ✒️ One Tittle Of The Law To Fail

A "tittle" was the smallest mark possible in Hebrew writing, smaller than one letter.

Jesus is saying even the tiniest detail of God's law still matters completely.

Heaven and earth passing away sounds impossible to a listener.

Jesus says the law outlasts even that.

God's word was never careless about small details.

✒️ Tittle means the smallest written mark

🌍 Heaven and earth passing sounds impossible

📏 The law outlasts even that

📖 God is not careless about small details

## 📜 Whosoever Putteth Away His Wife, And Marrieth Another, Committeth Adultery

Some religious teachers at this time allowed divorce for almost any small complaint.

A formal certificate was required to end a marriage.

That process had grown loose and easy to abuse.

Jesus says ending a marriage to marry someone else is not a clean legal exit.

He calls it adultery regardless of the paperwork.

This sits right after a story about loving money for a reason.

Both verses expose the same pattern, using a technicality to get what you want anyway.

📜 Divorce then required a formal certificate

🔓 That process had grown easy to abuse

💔 Jesus closes the loophole, calling it adultery

📖 Money love and marriage love share one pattern

# Luke 16:19-26
# 🔥 The Rich Man And Lazarus
---
## 🟣 Clothed In Purple, And Fine Linen

Purple dye was extremely expensive in the ancient world, made from crushed sea snails.

Only the wealthiest people and royalty could afford clothing dyed that color.

Fine linen was imported, smooth cloth, nothing like the rough wool most people wore.

Luke is not just saying this man had money.

He is describing someone living at the very top of society.

🟣 Purple dye was extremely expensive

👑 Usually worn only by the wealthy or royal

🧵 Fine linen was smooth, imported cloth

📖 This man lived at society's very top

## 🍽️ Fared Sumptuously Every Day

"Sumptuously" means lavish, expensive feasting, not an occasional treat.

"Every day" is the detail that matters most here.

This was not a special celebration happening once.

It was his normal, constant way of life.

Luxury had become routine for him.

🍽️ Sumptuously means lavish, expensive feasting

📆 Every day means this was constant

🔁 Luxury was his normal routine

📖 Comfort never interrupted his life

## 📛 A Certain Beggar Named Lazarus

Jesus gives this beggar an actual name, Lazarus.

No other character in any parable Jesus told is ever given a personal name.

The rich man in this same story never gets one.

Society forgot this beggar's name while he lived at the gate.

God remembered it the whole time.

📛 Lazarus is named, uniquely in any parable

🚫 The rich man is never named

😔 Society forgot Lazarus while he lived

📖 God remembered his name all along

## 🚪 Laid At His Gate, Full Of Sores

The gate was the entrance to the rich man's own house.

Lazarus was placed there daily, likely by others, since his sores suggest he could not move well on his own.

This was not a stranger the rich man never noticed.

He had to pass this suffering man every single day.

Proximity did not produce compassion here.

🚪 The gate was the rich man's own entrance

😣 Sores suggest he could barely move

👀 The rich man passed him daily

📖 Nearness did not create compassion

## 🍞 Desiring To Be Fed With The Crumbs

Crumbs that fell from the table were the scraps wealthy households threw away.

Lazarus was not even asking for a seat at the table, only for what was discarded.

The dogs here were not pets.

They were wild scavengers that roamed the streets.

Even animals considered unclean came closer to Lazarus than the rich man ever did.

His suffering was public and completely unanswered.

🍞 Crumbs meant discarded table scraps

🙏 Lazarus asked for scraps, not a seat

🐕 These dogs were unclean street scavengers

📖 Animals came closer than the rich man did

## 🤗 Carried By The Angels Into Abraham's Bosom

"Abraham's bosom" was a Jewish way of picturing the place of honor given to the righteous dead.

It pictured being seated right next to Abraham at a great feast, like the closest guest at the table.

Angels, not strangers, carry Lazarus there personally.

The man nobody noticed in life receives a personal escort in death.

Status completely reverses here.

🤗 Abraham's bosom means a place of honor

👼 Angels personally carried him there

🔄 His status reverses completely

📖 The ignored man receives an honor guard

## ⚰️ The Rich Man Also Died, And Was Buried

Notice what is missing here compared to Lazarus.

No angels are mentioned carrying the rich man anywhere.

He simply dies and gets a burial, likely an elaborate one given his wealth.

A grand funeral on earth did not determine what happened to him next.

Wealth could buy an impressive service but not a destination.

⚰️ No angels are mentioned for him

🪦 He simply gets buried

💰 Wealth likely paid for an elaborate funeral

📖 A funeral cannot buy a destination

## 👁️ In Hell He Lift Up His Eyes, Being In Torments

This "hell" is Hades, the realm of the dead before final judgment.

It is not the same as the final lake of fire described later in the Bible.

The rich man is conscious, aware, and in real torment immediately after death.

"Lift up his eyes" pictures him looking around, fully alert to where he now is.

This is not a symbolic sleep or a vague afterlife.

Jesus describes it as sharply real.

🔥 This hell means Hades, not the final judgment

👁️ He is fully conscious and aware

😖 He is in real, immediate torment

📖 Jesus describes this as sharply real

## 👀 Seeth Abraham Afar Off, And Lazarus In His Bosom

The rich man can see exactly where Lazarus ended up.

He recognizes Lazarus by name, the same man he ignored at his own gate.

Distance here is not about miles.

It is about a separation that nothing on his side can cross anymore.

Seeing comfort from a place of torment is its own kind of suffering.

👁️ He sees Lazarus clearly from a distance

📛 He recognizes the man he once ignored

🚧 The separation is total, not physical

📖 Watching comfort from torment adds pain

## 💧 Dip The Tip Of His Finger In Water

The rich man is not asking for rescue anymore.

He is asking for the smallest possible relief, one wet fingertip on his tongue.

This is the same man who once ignored a beggar begging for table scraps at his own gate.

Now he is the one begging, and nobody with the power to help is close enough.

The roles from earlier in the story have completely reversed.

💧 He now begs for the smallest relief

🔁 The beggar and the rich man trade roles

🙏 He once ignored this same kind of request

📖 His own past has caught up with him

## ⚖️ Thou In Thy Lifetime Receivedst Thy Good Things

Abraham is not saying wealth itself was the rich man's sin.

He is saying the rich man already received his comfort in full, while he was alive.

Lazarus received almost nothing good in his life on earth.

Now, after death, both men's situations are finally balanced out.

This life is not the only measure of what is fair.

💰 Wealth was not itself the sin

📊 The rich man's comfort already happened

⚖️ Death brings a final balancing

📖 This life is not the whole measure

## 🚧 Between Us And You There Is A Great Gulf Fixed

"Fixed" means permanently set in place, not temporary or negotiable.

This gulf cannot be crossed in either direction, not by the rich man and not by Lazarus.

Whatever choices decided a person's side happened before death, not after it.

There is no later chance mentioned anywhere in this story.

The time to choose was always now, while still alive.

🚧 Fixed means permanently set, not temporary

↔️ Nobody crosses it, in either direction

⏳ The choice happens before death, not after

📖 Now is the only time that counts

# Luke 16:27-31
# 📖 Moses And The Prophets
---
## 🙏 Send Him To My Father's House

The rich man uses polite, respectful language even now.

He is still speaking to Abraham with the manners of someone used to being heard.

Old habits of status do not disappear even in torment.

He is asking for one specific favor, a messenger sent to warn his own family.

This is the only request in the entire story aimed at helping someone else.

🙏 He still speaks with polite, formal manners

👑 Old habits of status do not disappear

✉️ He asks for a messenger to be sent

📖 His only unselfish request comes too late

## 👨‍👩‍👧‍👦 For I Have Five Brethren

Five brothers suggests a household just as wealthy and comfortable as his own once was.

"Testify" means to warn them plainly about what actually happens after death.

He finally believes in a coming judgment, now that it is too late for himself.

His fear for his brothers is genuine.

Genuine fear still cannot undo a choice already made.

👨‍👩‍👧‍👦 Five brothers suggests a wealthy household

📢 Testify means to warn them plainly

😨 He now believes judgment is real

📖 Genuine fear cannot undo his own choice

## 📚 They Have Moses And The Prophets

"Moses and the prophets" again means the whole Old Testament, available to anyone who wanted to read or hear it.

Abraham's answer is simple.

The warning his brothers need already exists.

They do not need a ghost to tell them something new.

They need to actually listen to what God already said.

Scripture was never the problem.

Attention to it was.

📚 Moses and the prophets means the Scriptures

📖 The warning already exists for them

👂 They need to actually listen

➡️ Scripture was never the missing piece

## 👻 If One Went Unto Them From The Dead, They Will Repent

The rich man assumes a dramatic miracle would convince his brothers when ordinary Scripture could not.

This sounds reasonable on the surface.

A ghost returning from the dead does seem more convincing than an old familiar text.

Abraham's answer in the next verse corrects that assumption directly.

The real problem was never a lack of evidence.

👻 He assumes a miracle would work better

🤔 This sounds reasonable at first

📜 Abraham is about to correct that idea

📖 The problem was never a lack of evidence

## ✝️ Though One Rose From The Dead

A heart unwilling to listen will reject even the most dramatic proof available.

Jesus himself would rise from the dead not long after telling this story.

Many religious leaders who already rejected Moses and the prophets rejected that resurrection too, exactly as this verse predicts.

The problem was never a shortage of evidence.

It was always a shortage of willingness.

🚫 An unwilling heart rejects any proof

✝️ Jesus's own resurrection later proved this true

👥 Many rejected it exactly as predicted

📖 The real shortage was willingness, not evidence
`.trim();

export const LUKE_SIXTEEN_PERSONAL_SECTIONS = parseLukeSixteenRawNotes(LUKE_SIXTEEN_RAW_NOTES);
