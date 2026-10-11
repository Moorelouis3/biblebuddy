export type ActsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsSixRawNotes(rawText: string): ActsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 6:${startVerse}` : `Acts 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Acts 6 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_SIX_RAW_NOTES = `# Acts 6:1-2
# 👥 A Complaint Among The Believers
---
## 📈 The Number Of The Disciples Was Multiplied

Fast growth was about to expose a real problem.

Acts five already showed thousands of believers added in Jerusalem.

More believers meant more needs within the community.

Every growing group eventually strains at its seams.

The strain in this chapter falls on the widows, the most vulnerable members.

Growth is never only good news.

It also tests how a community treats the people it could easily overlook.

📈 The church was growing fast
⚠️ Growth exposed a real problem
👵 Widows were the most vulnerable members
📖 Growth tests how we treat the overlooked

---
## 🗣️ A Murmuring Of The Grecians Against The Hebrews

The early church was not one single, uniform group.

The Hebrews were Jews who kept Aramaic as their daily language and local customs.

The Grecians were Jews from the wider Greek speaking world, often from outside the land.

Both groups believed in Jesus, but they still carried different backgrounds into the church.

"Murmuring" means a quiet, ongoing complaint, not a single outburst.

Old divisions can resurface inside a new community, even one built on faith.

🗣️ Murmuring means an ongoing complaint
🌍 Hebrews kept the local language and customs
🏛️ Grecians came from the wider Greek world
📖 Old divisions can resurface in new community

---
## 🍞 Their Widows Were Neglected In The Daily Ministration

The early church ran a daily food program for widows with no family support.

Widows in this culture often had no income and no safety net at all.

The word "ministration" means a service of practical care, here a meal distribution.

Something in that system had broken down along the lines of the two groups.

The Grecian widows were apparently being served less, or served last.

A church that preaches grace still has to manage real logistics well.

🍞 A daily meal program served widows
💔 Widows had no income or safety net
📋 Ministration means practical, organized care
📖 Grace still requires good logistics

---
## 🍽️ It Is Not Reason That We Should Leave The Word Of God

The apostles state their priority without apology.

"Reason" here does not mean logic, it means fitting or proper.

It was not proper for the apostles to step away from teaching and prayer.

Someone still had to meet the need, but it could not be them alone.

The apostles are not avoiding the problem.

They are directing it to the right people instead.

🍽️ Reason here means fitting or proper
🙅 Stepping away from preaching was not fitting
📋 Someone still had to meet the need
➡️ The apostles directed it to others

---
## 🥘 Serve Tables

Handling food distribution was a demanding, practical job, not a small errand.

It meant managing food, supplies, and daily accounts for a large group of widows.

In a city the size of Jerusalem, that job took real organization and trust.

The apostles were not calling this work unimportant.

They were simply calling it a different calling than their own.

Every ministry in the church carries equal honor, even the one that serves meals.

🥘 Serving tables meant managing food and accounts
🏙️ Jerusalem was a large city to feed
🤝 Both callings were different, not unequal
📖 Every ministry in the church has honor

# Acts 6:3-4
# 🙏 Choosing Servants For The Work
---
## 🔢 Look Ye Out Among You Seven Men Of Honest Report

The number seven was not random in Jewish tradition.

Seven often signaled completeness or a formally recognized, settled group.

"Honest report" means a reputation the whole community already trusted, not a title to earn later.

The apostles are not inventing new leaders out of nowhere.

They are asking the people to name men they already respected.

Trust had to come first, before any title was given.

🔢 Seven often signaled completeness
🏆 Honest report means an already trusted reputation
👥 The people chose, not just the apostles
📖 Trust came before any title

---
## 🕊️ Full Of The Holy Ghost And Wisdom

Spiritual fullness alone was not the only requirement here.

The Holy Ghost gave character and devotion.

Wisdom gave practical judgment for handling money and people well.

A leader without wisdom can be sincere and still make a mess of things.

A leader without the Spirit can be skilled and still miss what matters most.

The church needed both qualities working together, not one replacing the other.

🕊️ Holy Ghost gave character and devotion
💡 Wisdom gave practical good judgment
⚠️ Sincerity alone is not enough
📖 Both qualities had to work together

---
## 📋 Whom We May Appoint Over This Business

The apostles are not stepping back from leadership.

They are extending it, placing trusted men in charge of a specific need.

"Appoint" means a formal, public assignment, not a casual favor.

"This business" refers to the daily food distribution problem from verse one.

Delegation here is not avoidance.

It is how a growing church multiplies its own leadership.

📋 Appoint means a formal assignment
🍞 Business meant the food distribution problem
🤝 Delegation here was not avoidance
📖 Growth multiplies leadership, not just numbers

---
## 🙏 Give Ourselves Continually To Prayer

The apostles are not abandoning the widows.

They are protecting their own calling so the whole church stays healthy.

"Continually" means without interruption, not occasionally when time allows.

Prayer was not a side activity for the apostles.

It was their main task.

Every leader has to protect certain priorities from being crowded out.

🙏 Continually means without interruption
⚠️ Priorities get crowded out without protection
🛡️ The apostles protected their core calling
📖 Prayer was their main task, not extra

---
## 📖 The Ministry Of The Word

"The word" means the message about Jesus, what we would call the gospel.

"Ministry" here means dedicated service, not a building or a title.

The apostles already had firsthand experience with Jesus to pass on.

That testimony could not be split across kitchen duty and public teaching both.

Keeping teaching and practical service separate protected the quality of both.

The church needed strong preaching and well run tables, not a watered down version of either.

📖 The word means the gospel message
🗣️ Ministry means dedicated service
👀 Apostles carried firsthand testimony
➡️ Separating the tasks protected both

# Acts 6:5-6
# ✋ The Seven Are Set Apart
---
## 🙌 The Saying Pleased The Whole Multitude

This decision did not come from the apostles alone.

The whole community, both Hebrew and Grecian believers, agreed with the plan.

That agreement mattered more than it might seem on the surface.

A solution imposed from the top could have deepened the very division it was meant to fix.

Instead, the people themselves chose who would represent them.

Unity here was not forced.

It was something the community reached together.

🙌 Both groups agreed to the plan
🤝 Leaders did not impose this alone
👥 The people chose their own representatives
📖 Unity was reached together, not forced

---
## ✨ They Chose Stephen, A Man Full Of Faith And Of The Holy Ghost

Stephen is introduced here for the first time in Acts.

He becomes the central figure of the very next chapter.

Being described as full of faith and the Holy Ghost marks him as more than a food organizer.

Luke is already preparing the reader for what Stephen will do next.

A short administrative role is about to open into something much bigger.

Sometimes a small assignment becomes the first step toward a much larger calling.

✨ Stephen appears for the first time here
📚 He becomes the focus of chapter seven
🔥 His description marks him as unusual
📖 A small role became a larger calling

---
## 🌍 Philip, And Prochorus, And Nicanor, And Timon, And Parmenas, And Nicolas A Proselyte Of Antioch

All six men here share one striking detail.

Every one of their names is Greek, not Hebrew.

That detail was almost certainly intentional.

The widows being overlooked were from the Grecian side of the church.

Choosing Grecian leaders put trusted representatives directly inside the group that felt neglected.

"Proselyte" means a Gentile who fully converted to Judaism, including circumcision.

Nicolas was not even born Jewish, yet the church trusted him with this role.

🌍 All seven men had Greek names
🤝 Grecian leaders matched the Grecian complaint
🔄 Proselyte means a full convert to Judaism
📖 Trust crossed ethnic and religious lines

---
## 🤲 They Laid Their Hands On Them

The apostles prayed over the seven men before sending them into this role.

Laying on of hands was a physical act of blessing and public commissioning.

It showed the whole church that these men now carried real, recognized authority.

This was not a private decision made quietly in a back room.

The commissioning happened in front of the entire community.

Public affirmation protected the new leaders from being second guessed later.

🤲 Laying on hands meant blessing and commissioning
👀 The act happened in front of everyone
🛡️ Public affirmation protected the new leaders
📖 Authority was given openly, not quietly

# Acts 6:7
# 📈 Growth After The Crisis
---
## 📣 The Word Of God Increased

Resolving the conflict did not slow the church down.

If anything, removing the distraction let the message spread even faster.

A community distracted by internal complaints struggles to reach anyone outside itself.

Once the widows were cared for, the whole church could focus outward again.

Internal fairness and outward growth were never separate issues here.

Taking care of people inside the church made room for reaching people outside it.

📣 Solving conflict did not slow growth
🎯 Internal care freed the church outward
🔗 Fairness inside and growth outside were linked
📖 Inside care makes room for outside growth

---
## 👳 A Great Company Of The Priests Were Obedient To The Faith

Priests converting to the Christian faith was no small thing.

These priests served in the very temple system built around sacrifices for sin.

Jesus was the fulfillment of exactly what their daily sacrifices pointed toward.

For priests to accept the gospel meant admitting their own system pointed beyond itself.

That kind of change cost them their place within the religious establishment.

The gospel was not reaching only ordinary people.

It was reaching religious insiders too.

👳 Priests served the temple sacrifice system
🎯 Jesus fulfilled what those sacrifices pointed to
💸 Accepting Jesus cost priests their standing
📖 The gospel reached religious insiders too

# Acts 6:8-10
# ⚡ Stephen Stirs Up Opposition
---
## ⚡ Did Great Wonders And Miracles Among The People

Stephen's role was never only about serving food.

He is shown here doing the same kind of miraculous works the apostles themselves performed.

"Wonders" refers to acts that caused people to stop and take notice.

"Miracles" points to acts of real, visible divine power, healing and beyond.

The Holy Ghost was not limited to the twelve apostles alone.

Power for ministry was spreading well beyond the original leaders.

⚡ Stephen did miracles like the apostles
👀 Wonders means acts that caused people to notice
💪 Miracles means visible divine power at work
📖 The Spirit's power spread beyond the apostles

---
## 🏛️ The Synagogue Of The Libertines, And Cyrenians, And Alexandrians

Jerusalem had many synagogues serving Jews from different regions of the world.

This particular synagogue served several diaspora groups together in one place.

"Libertines" likely refers to Jewish freedmen, people once enslaved who had gained their freedom.

Cyrenians came from Cyrene, a major Jewish community in North Africa.

Alexandrians came from Alexandria, Egypt, home to one of the largest Jewish populations outside the land.

These were not simply locals.

They were Jews shaped by the wider Mediterranean world.

🏛️ Jerusalem had many regional synagogues
🔓 Libertines likely means freed former slaves
🌍 These members came from outside the land
📖 Opposition came from the wider Jewish world

---
## 🗺️ Of Them Of Cilicia And Of Asia, Disputing With Stephen

Cilicia was a region in the southeast corner of Asia Minor.

One city in Cilicia, Tarsus, will matter enormously just one chapter later.

Saul of Tarsus, later known as Paul, came from this exact region.

"Asia" here means the Roman province in western Asia Minor, not the modern continent.

Stephen's opposition was already brushing up against the very world Paul came from.

The next chapter's persecutor may well have grown up hearing arguments just like these.

🗺️ Cilicia sat in southeast Asia Minor
📍 Tarsus, Saul's hometown, was in Cilicia
🌐 Asia meant a Roman province, not the continent
📖 Stephen's story already brushes against Paul's world

---
## 🧠 Not Able To Resist The Wisdom And The Spirit

Stephen's opponents expected an easy argument.

Instead they ran into something they could not defeat in argument.

"Wisdom" here means Spirit given insight, not mere cleverness or training.

When the Holy Ghost gives someone understanding, ordinary arguments cannot overturn it.

Losing a debate with Stephen would eventually cost these men more than pride.

They could not beat him with words, so they decided to use lies instead.

🧠 Stephen's opponents could not defeat him
💡 Wisdom here meant Spirit given insight
🛡️ The Spirit's understanding resists ordinary arguments
➡️ Failing with words pushed them toward lies

# Acts 6:11-12
# 🕸️ A Plot Against Stephen
---
## 🤫 Then They Suborned Men

"Suborned" means secretly persuaded or bribed someone to do something wrong, often to lie.

These were not spontaneous witnesses telling the truth as they saw it.

They were coached, paid liars brought in for one purpose.

The plot against Stephen mirrors the plot used against Jesus a few years earlier.

Both relied on false testimony because the truth could not convict either man.

When truth will not produce a guilty verdict, some people turn to lies instead.

🤫 Suborned means secretly bribed to lie
🎭 These witnesses were coached, not honest
🔁 This plot mirrors the one used against Jesus
📖 Lies appear when truth cannot convict

---
## 😤 We Have Heard Him Speak Blasphemous Words Against Moses, And Against God

"Blasphemous" means speaking against God or sacred things with contempt or disrespect.

This exact charge, blasphemy, was also used to convict Jesus before the same council.

Pairing Moses with God in one accusation reveals what mattered most to these accusers.

To this council, questioning Moses' law was the same as questioning God himself.

Stephen likely preached that Jesus fulfilled and reshaped the law, not that he attacked it.

A true message about fulfillment got twisted into a false charge of attack.

😤 Blasphemous means contempt toward God or sacred things
⚖️ This same charge once convicted Jesus
📏 Moses' law and God were one issue
➡️ Fulfillment got twisted into a false attack

---
## 👥 They Stirred Up The People, And The Elders, And The Scribes

This is the exact same strategy used against Jesus in the Gospels.

Stirring up a crowd creates pressure that a formal, careful process would not allow.

Involving elders and scribes added the appearance of legal legitimacy to the plot.

A mob plus official cover gave this accusation force it did not actually deserve.

Luke is deliberately showing the reader a repeating pattern, not a new kind of injustice.

The same playbook that killed Jesus is now being run against his followers.

👥 This mirrors the strategy used against Jesus
📢 Stirring up a crowd created pressure
📜 Elders and scribes added fake legitimacy
📖 The same playbook now targets Jesus' followers

---
## ⚖️ Caught Him, And Brought Him To The Council

The council refers to the Sanhedrin, the supreme Jewish religious court.

It held seventy or more members, including chief priests, elders, and teachers of the law.

This was the same body that had tried and condemned Jesus not long before.

Being brought here was not a minor inconvenience.

It was the most serious legal jeopardy a Jewish man in Jerusalem could face.

Stephen now stood exactly where Jesus once stood.

⚖️ The council meant the Sanhedrin court
👴 Chief priests and elders sat on it
⚠️ This was the most serious legal danger possible
📖 Stephen now stood where Jesus once stood

# Acts 6:13-15
# 😇 The Face Of An Angel
---
## 🏛️ This Man Ceaseth Not To Speak Blasphemous Words Against This Holy Place, And The Law

"Ceaseth" is simply an old spelling of "ceases," meaning he does not stop.

"This holy place" refers to the temple in Jerusalem, the center of Jewish worship.

Pairing the temple with "the law" names the two pillars of Jewish religious life.

Attacking either one, in this council's eyes, was the most serious charge available.

This is almost word for word the same accusation once leveled against Jesus himself.

The accusers recycled a script that had already worked once before.

🏛️ Ceaseth is an old form of ceases
🕍 Holy place refers to the temple
📜 Temple and law were the two pillars named
📖 The same script once used against Jesus returns

---
## 🔨 Shall Destroy This Place, And Shall Change The Customs Which Moses Delivered Us

This is almost certainly a twisted version of something Jesus actually said about the temple.

Jesus spoke of the temple's coming destruction and of himself as a new kind of temple.

The accusers flattened a layered statement into a simple, false charge of attack.

"Customs" means the practices and traditions tied to the law of Moses.

Fear of losing the temple and the law explains why this charge landed so hard.

Twisting a true statement into a flat lie is an old and effective tactic.

🔨 Jesus' words about the temple got twisted
🏛️ Temple and Mosaic law felt threatened
📏 Customs means traditions tied to Moses' law
📖 Twisting truth into lies is an old tactic

---
## 👀 Looking Stedfastly On Him

"Stedfastly" is the old spelling of "steadfastly," meaning with a fixed, unwavering gaze.

The whole council was staring directly at Stephen, waiting for his reaction.

This was not a casual glance from a distracted room.

Every eye in that chamber was locked onto one man.

The intensity of their stare makes what they are about to witness even more striking.

Tension filled the room just before something unexpected happened.

👀 Stedfastly means with a fixed, steady gaze
🏛️ The whole council stared directly at Stephen
🔎 Every eye was locked on one man
📖 Tension built right before something unexpected

---
## 😇 Saw His Face As It Had Been The Face Of An Angel

The council expected to see a guilty, frightened man.

Instead they saw someone who looked calm, clear, even radiant.

In the Bible, a face like an angel often signals God's own presence resting on someone.

Moses' face shone after he spent time directly in God's presence on the mountain.

Stephen's face suggests the same thing.

God was with him in this exact moment of danger.

The most dangerous room Stephen had ever stood in became the place he looked most like heaven.

😇 Stephen looked calm, not guilty or afraid
✨ An angelic face signals God's presence
🏔️ Moses' face once shone the same way
📖 Stephen looked like heaven amid real danger
`.trim();

export const ACTS_SIX_PERSONAL_SECTIONS = parseActsSixRawNotes(ACTS_SIX_RAW_NOTES);
