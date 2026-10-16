export type FirstTimothyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothyFourRawNotes(rawText: string): FirstTimothyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 4:${startVerse}` : `1 Timothy 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Timothy 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_FOUR_RAW_NOTES = `# 1 Timothy 4:1-5
# 😈 Doctrines Of Devils
---
## 📣 The Spirit Speaketh Expressly

"Expressly" means stated clearly and plainly, not hinted at.

Paul says the Holy Spirit gave this warning directly.

This was not simply Paul's personal opinion about the future.

He presents it as a message that came straight from God.

📣 Expressly means clearly and plainly stated
🗣️ The Holy Spirit gave this warning
🙅 Not simply Paul's personal opinion
📖 This message came straight from God
---
## 🚪 Some Shall Depart From The Faith

This warns that some believers would walk away from true faith later.

"Depart" does not describe someone who slips up by accident.

It describes a willful turning away from what they once believed.

Paul wanted Timothy ready for this moment before it ever arrived.

🚪 Depart means a willful turning away
🙅 Not an accidental slip or mistake
🧭 Paul wanted Timothy ready beforehand
📖 A warned church is a protected church
---
## 😈 Seducing Spirits And Doctrines Of Devils

"Seducing spirits" means evil spiritual influences that pull people from the truth.

This is not describing ordinary human mistakes or confusion.

"Doctrines of devils" means teaching that actually originates from demonic sources.

It often arrives dressed up as deep or advanced spiritual insight.

😈 Seducing spirits means evil spiritual pull
🧠 Not ordinary human mistakes or confusion
📚 Doctrines of devils means demonic teaching
📖 False teaching often looks deeply spiritual
---
## 🎭 Speaking Lies In Hypocrisy

"Hypocrisy" means saying one thing while secretly believing another.

These false teachers were not simply mistaken about the truth.

They were telling lies they personally knew were false.

A sincere error and a deliberate lie are not the same problem.

🎭 Hypocrisy means pretending sincerity you lack
🤥 These teachers knowingly spoke false words
🧩 Not a sincere mistake about truth
📖 Deliberate lies demand a different response
---
## 🔥 Conscience Seared With A Hot Iron

A conscience is the inner sense that warns a person right from wrong.

"Seared" pictures a hot iron burning flesh until the nerves stop feeling pain.

Think of a scar so deep it can no longer feel a fresh wound.

These teachers had silenced their own conscience through repeated, deliberate sin.

🔥 Seared pictures a branding iron burning
🩹 A scar that no longer feels pain
🙉 Their conscience stopped warning them at all
📖 Repeated sin can silence an inner warning
---
## 💍 Forbidding To Marry

This does not mean the Bible teaches marriage is spiritually inferior.

Some false teachers in Ephesus taught that true holiness required staying unmarried.

Paul elsewhere calls marriage honorable and a gift from God.

These teachers were adding a rule Scripture never actually gives.

💍 Marriage is not spiritually inferior
🙅 False teachers banned marriage as impure
📜 Paul calls marriage honorable elsewhere
📖 This rule was never from Scripture
---
## 🍽️ Commanding To Abstain From Meats

This does not mean every Christian must avoid certain foods to be holy.

Some false teachers taught that avoiding meat made a person more spiritual.

Paul calls this a man made restriction, not a command from God.

Food itself was never the real spiritual issue being described here.

🍽️ Avoiding meat does not create holiness
🙅 False teachers invented this restriction
👤 This rule was man made, not God's
📖 Food was never the real issue
---
## 🙏 Sanctified By The Word Of God And Prayer

"Sanctified" means set apart and made holy for a right use.

Verse four says every creature God made is good.

Food becomes rightly used when it is received with real thanksgiving.

"The word of God and prayer" grounds that thanksgiving in truth.

A grateful heart honors God here.

It is not about following a strict food list.

🙏 Sanctified means set apart as holy
🍲 Every creature God made is good
🙌 Real thanksgiving is what rightly uses it
📖 A grateful heart honors God here

# 1 Timothy 4:6-10
# 💪 A Good Minister Of Jesus Christ
---
## 🛠️ A Good Minister Of Jesus Christ

"Minister" here simply means a servant, not a special title or office.

Timothy earns this by teaching the brethren what Paul has just said.

Being "nourished" means these truths have become part of how he lives.

A good minister feeds others only after he has first been fed himself.

🛠️ Minister means a servant, not a title
🍽️ Teaching these truths earns the name
🌱 Nourished means truth has shaped his life
📖 Feed others only after being fed
---
## 🍞 Nourished Up In The Words Of Faith

Think of food that slowly builds strength in a growing body.

"The words of faith and of good doctrine" work the same way in a believer.

Timothy had been steadily fed on these truths since his youth.

A minister cannot give out teaching he has never personally taken in.

🍞 Nourished pictures food building real strength
📚 Words of faith and doctrine feed the soul
⏳ Timothy was fed on this since youth
📖 No one gives out what they never received
---
## 🚫 Profane And Old Wives' Fables

"Profane" does not mean cursing or foul language here.

It means something that treats holy things as common or ordinary.

"Old wives' fables" means legends and superstitions passed down without real truth.

These stories were popular in Ephesus.

They were dressed up as deep spiritual wisdom.

Paul tells Timothy to flatly refuse giving them any attention.

🚫 Profane means treating holy things as common
📜 Old wives' fables means baseless legends
🏛️ These stories were popular in Ephesus
📖 Timothy must refuse to entertain them
---
## 🏋️ Exercise Thyself Rather Unto Godliness

"Exercise thyself" pictures the steady training an athlete puts into his body.

Paul points that same discipline toward godliness instead of physical training alone.

Spiritual growth takes practiced effort, not a single moment of decision.

Prayer, Scripture, and obedience work like daily training for the soul.

🏋️ Exercise pictures steady athletic training
🙏 Paul aims that training at godliness
📅 Growth takes practiced daily effort
📖 Prayer and Scripture train the soul
---
## 💪 Bodily Exercise Profiteth Little

Paul is not condemning physical exercise as wrong or useless.

He is simply comparing its limited value to something greater.

Bodily training only helps for this present life.

Godliness reaches further than the body ever can.

💪 Bodily exercise is not condemned
⚖️ Paul compares its value to godliness
⏳ Physical training helps for this life only
📖 Godliness reaches further than the body
---
## 🌅 Profitable Unto All Things

Godliness carries a promise that stretches across this life and the next.

"The life that now is" means every present day a believer lives.

"That which is to come" points to eternal life after death.

No earthly discipline can offer a promise reaching that far.

🌅 Godliness promises benefit now and later
📆 Life that now is means present days
♾️ Life to come means eternity
📖 No other discipline reaches that far
---
## 📜 A Faithful Saying

Paul uses this phrase to flag a truth he wants fully trusted.

He used this same marker back in chapter three of this letter.

"Worthy of all acceptation" means it deserves to be fully received, not questioned.

Many scholars believe it points back to what was just said about godliness.

📜 A faithful saying flags full trust
🔁 Paul used this same marker before
✅ Acceptation means fully received, not doubted
📖 Many scholars tie it to godliness just named
---
## ✝️ The Saviour Of All Men, Specially Of Those That Believe

This does not teach that every person will automatically be saved.

"Saviour of all men" means Christ offers life to the whole world without exception.

"Specially of those that believe" narrows who actually receives that gift.

Offered to everyone, but only received through genuine faith.

✝️ Christ offers salvation to the whole world
🚪 The offer excludes no one by itself
🙏 Only faith actually receives that gift
📖 Offered to all, received by believers

# 1 Timothy 4:11-13
# 👦 Let No Man Despise Thy Youth
---
## 📋 These Things Command And Teach

"These things" points back to everything Paul has written in this chapter so far.

"Command" carries real authority, not a gentle suggestion Timothy could skip.

"Teach" means laying the truth out so people actually understand it.

Timothy's youth did not lower his authority to say this plainly.

📋 These things means the whole chapter so far
🛡️ Command carries real authority
📚 Teach means truth people understand
📖 Youth does not lower that authority
---
## 👦 Let No Man Despise Thy Youth

Timothy was likely in his thirties, young for a respected leader in that culture.

"Despise" means to look down on someone as lesser or unqualified.

Paul is not telling Timothy to demand respect through force or title.

He tells him to earn it through how he actually lives.

👦 Timothy was young for a leader then
👀 Despise means looking down on someone
🙅 Respect was not demanded by title
📖 Respect is earned through how he lives
---
## 🌟 An Example Of The Believers

Paul names six specific areas where a young leader should set an example.

"Word" means how Timothy spoke in everyday conversation.

"Conversation" here means his overall conduct, not just his speech.

The remaining four are charity, spirit, faith, and purity.

They cover love, attitude, trust, and clean living.

A young leader teaches as much through how he lives as through what he says.

🌟 Paul names six example categories
🗣️ Word means everyday speech
🤝 Conversation means overall conduct
📖 A leader teaches through life not just words
---
## 📖 Give Attendance To Reading

"Give attendance" means to devote focused, consistent effort to something.

In the early church, "reading" meant reading Scripture aloud during public gatherings.

Most believers could not own or read a copy themselves.

Timothy's public reading was often how the congregation heard Scripture at all.

📖 Give attendance means steady devoted effort
🗞️ Reading meant public Scripture reading aloud
👥 Most believers owned no copy themselves
➡️ This was often their only access
---
## 💬 To Exhortation, To Doctrine

"Exhortation" means practical encouragement, urging people to live out what they know.

"Doctrine" means solid teaching about what is actually true.

Timothy's public ministry needed to supply both encouragement and correct instruction.

One without the other leaves a congregation either uninformed or unmoved.

💬 Exhortation means practical encouragement
📘 Doctrine means solid true teaching
⚖️ Ministry needs both together
📖 Either alone leaves a church incomplete

# 1 Timothy 4:14-16
# 🔥 Neglect Not The Gift That Is In Thee
---
## 🎁 Neglect Not The Gift That Is In Thee

"Neglect" means letting something valuable sit unused through simple carelessness.

The "gift" refers to a specific spiritual ability God had given Timothy for ministry.

This was not a vague encouragement but a real, identifiable calling.

A gift left unused slowly weakens, even when it was genuinely given by God.

🎁 Neglect means letting something go unused
🔥 The gift was a real ministry ability
🎯 It was specific, not vague encouragement
📖 Unused gifts weaken over time
---
## 🗣️ Given Thee By Prophecy

A "prophecy" here was likely a Spirit guided word spoken over Timothy.

It may have come during a church gathering, naming him for this specific calling.

This was not Timothy choosing ministry on his own initiative.

Other voices had recognized and confirmed what God was already doing in him.

🗣️ Prophecy means a Spirit guided word
⛪ It likely came during a gathering
🙌 Others recognized God's call in him
📖 Confirmation came before Timothy acted
---
## ✋ The Laying On Of The Hands Of The Presbytery

A "presbytery" was a council of elders who led and guided the church.

"Laying on of hands" was a physical act marking someone set apart for ministry.

Think of it like a formal handoff of responsibility in front of witnesses.

Timothy's calling was recognized publicly, not claimed privately on his own.

👥 Presbytery means a council of elders
✋ Laying on hands marked him set apart
🤝 It worked like a public handoff
📖 His calling was recognized publicly
---
## 🧠 Meditate Upon These Things

"Meditate" means to turn something over in the mind again and again.

It is not a single reading but a slow, repeated dwelling on truth.

"These things" points back to Timothy's gift and calling just described.

Real conviction grows through time spent thinking, not a single glance.

🧠 Meditate means repeated careful thinking
🔁 Not a single reading but slow dwelling
🎯 These things means his gift and calling
📖 Conviction grows through time spent thinking
---
## 💯 Give Thyself Wholly To Them

"Wholly" means complete, undivided devotion, not a partial or occasional effort.

Paul wants Timothy fully invested in this calling, not juggling it as one option among many.

A divided heart rarely produces work anyone can see clearly.

Full devotion is what actually makes growth visible to others.

💯 Wholly means complete undivided devotion
🎯 Not one option among many
💔 A divided heart produces little
📖 Full devotion makes growth visible
---
## 📈 Thy Profiting May Appear To All

"Profiting" means visible spiritual growth and progress over time.

Paul wants this growth to be obvious, not hidden or merely private.

A congregation needed to see their leader actually growing, not just teaching.

Visible growth builds trust in ways words alone cannot.

📈 Profiting means visible spiritual growth
👀 Growth should be obvious, not hidden
👥 A church needed to see him grow
📖 Visible growth builds real trust
---
## 🛡️ Take Heed Unto Thyself, And Unto The Doctrine

Paul closes with two things Timothy must guard at once.

"Take heed unto thyself" means watching his own character and daily life closely.

"Unto the doctrine" means guarding the truth he teaches just as closely.

A leader can fail by neglecting either one of these alone.

🛡️ Guard two things at the same time
👤 Watch his own character closely
📘 Guard the truth he teaches too
📖 Neglecting either one leads to failure
---
## 🛟 Thou Shalt Both Save Thyself, And Them That Hear Thee

This does not mean Timothy earns his own salvation through personal effort.

Continuing faithfully protects him from the very errors this chapter has warned about.

His perseverance also protects every person who hears him teach.

A leader's faithfulness carries real weight far beyond himself alone.

🛟 Not earning salvation through personal effort
🧭 Faithfulness protects him from these errors
👂 It protects everyone who hears him
📖 A leader's faithfulness reaches beyond himself
`.trim();

export const FIRST_TIMOTHY_FOUR_PERSONAL_SECTIONS = parseFirstTimothyFourRawNotes(FIRST_TIMOTHY_FOUR_RAW_NOTES);
