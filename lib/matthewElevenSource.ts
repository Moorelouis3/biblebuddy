export type MatthewElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewElevenRawNotes(rawText: string): MatthewElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 11:${startVerse}` : `Matthew 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Matthew 11 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_ELEVEN_RAW_NOTES = `# Matthew 11:1-6
# ❓ Art Thou He That Should Come, Or Do We Look For Another
---
## 🚶 He Departed Thence To Teach And To Preach In Their Cities

Jesus does not simply send the twelve away and stop working himself.

He goes right back to teaching and preaching in city after city.

Sending workers out never becomes an excuse to disappear from the work.

The mission always has two movements, him and them, working side by side.

That partnership keeps the whole message spreading at the same time.

🚶 Jesus keeps preaching himself
🧍 Sending them is not retreating
🔁 Two movements work side by side
📖 The mission spreads through both

---

## ⛓️ John Had Heard In The Prison The Works Of Christ

John here is John the Baptist, now sitting in a prison cell.

Herod locked him up for publicly condemning his unlawful marriage.

Even in prison, reports of what Jesus was doing kept reaching him.

News of real power can travel through walls that keep a man inside.

John sends two of his own followers to go find out more.

⛓️ John sits in Herod's prison
🗣️ He condemned Herod's unlawful marriage
📰 Reports of Jesus still reach him
📖 He sends his own followers to ask

---

## ❓ Art Thou He That Should Come, Or Do We Look For Another

He that should come was a known title for the promised Messiah.

John is not asking because he suddenly doubts everything he once preached.

Prison and delay can shake even a faithful man's certainty for a moment.

The question comes from a real man under real pressure, not from unbelief.

Jesus never rebukes John for asking it.

👑 He that should come names the Messiah
😟 Even John's faith faces pressure here
🙅 Doubt is not the same as unbelief
📖 Jesus never rebukes him for asking

---

## 👀 Go And Shew John Again Those Things Which Ye Do Hear And See

Jesus answers a hard question with proof instead of a simple yes.

He sends John's own followers back to report what they hear and see.

The miracles themselves carry more weight than any single sentence could.

Seeing and hearing settle a doubt that words alone might not reach.

👀 Proof answers the question, not words alone
📨 The followers report what they witness
💪 Miracles carry more weight than speech
📖 Seeing settles doubt words cannot reach

---

## 🩺 The Blind Receive Their Sight, And The Lame Walk

This list of healings is not a random summary of recent miracles.

Each item echoes specific promises the prophet Isaiah made about the Messiah's age.

Blind eyes opened and lame limbs healed were signs tied to that exact hope.

Jesus is quietly answering John's question with fulfilled prophecy, not just activity.

The evidence was always meant to point somewhere specific.

🩺 This list is not random activity
📜 Isaiah's prophecies described this exact hope
👁️ Blind and lame signs match that hope
📖 Fulfilled prophecy answers John's question

---

## 🧱 Blessed Is He, Whosoever Shall Not Be Offended In Me

"Offended" here means far more than feeling a little hurt or annoyed.

It means stumbling over Jesus instead of simply trusting him.

Jesus healed strangers all over the region during this very season.

He still left John sitting in prison without any rescue.

That gap confused people who expected a very different kind of Messiah.

Blessing belongs to the one who keeps trusting him anyway.

🧱 Offended means stumbling, not mere hurt
🩹 Jesus healed people all over the region
⛓️ John still waited in prison unrescued
📖 Blessing belongs to those who keep trusting

# Matthew 11:7-11
# 🏜️ What Went Ye Out Into The Wilderness To See
---
## 🎋 What Went Ye Out Into The Wilderness To See? A Reed Shaken With The Wind

A reed shaken with the wind pictures someone who bends with every pressure.

Jesus asks the crowds what they expected to find out in that desert.

They did not travel that far to see someone soft or easily swayed.

John never softened his message no matter who stood in front of him.

The question itself defends John's character before Jesus even states it outright.

🎋 A reed pictures someone easily swayed
🏜️ Crowds traveled far into the wilderness
🗣️ John never softened his message
📖 The question defends John's character

---

## 👘 A Man Clothed In Soft Raiment

"Soft raiment" means fine, comfortable clothing worn by the wealthy and powerful.

People who dress that way usually live inside kings' houses, not the desert.

John wore rough clothing and lived far from any comfort like that.

Jesus rules out the idea that John was ever chasing comfort or status.

The wilderness itself already answered this question before Jesus spoke a word.

👘 Soft raiment means fine, costly clothing
👑 That clothing belongs inside kings' houses
🏜️ John chose rough clothing instead
📖 The wilderness already answered this question

---

## 📯 Yea, I Say Unto You, And More Than A Prophet

A prophet speaks for God and tells people what God wants them to hear.

John was that, yet Jesus says he was something even larger than that role.

John himself was the subject of other prophets' words, not just a messenger.

No prophet before him had ever been promised by name in advance like this.

That makes John a hinge point, not simply one more voice in a long line.

📯 A prophet speaks for God to people
📜 Other prophets had already spoken about John
🔑 No prophet before him was named in advance
📖 John becomes a hinge, not just a voice

---

## 📜 Behold, I Send My Messenger Before Thy Face

This exact line is a direct quote from the prophet Malachi.

Malachi promised a messenger who would prepare the way before the Lord arrived.

Jesus applies that centuries old promise directly onto John the Baptist.

John was not simply a good preacher who happened to show up.

He was the specific person an old prophecy had already named in advance.

📜 Malachi promised a coming messenger
🛣️ That messenger would prepare the way
🔗 Jesus applies that promise directly to John
📖 John fulfills a named promise

---

## 🔑 He That Is Least In The Kingdom Of Heaven Is Greater Than He

This is not an insult aimed at John's character or faithfulness.

John stood at the very top of the old era before Jesus came.

Even the smallest person living inside the new kingdom holds a greater position.

The difference is about timing and access, not about personal worth.

Being born into a new reality grants privileges the old one never offered.

🔑 This is not an insult to John
🏆 John topped the entire old era
🚪 New kingdom access outranks the old one
📖 Timing grants privilege, not personal worth

# Matthew 11:12-15
# ⚔️ The Kingdom Of Heaven Suffereth Violence
---
## ⚔️ The Kingdom Of Heaven Suffereth Violence, And The Violent Take It By Force

This is one of the hardest verses in the whole chapter to pin down.

Many scholars read it as violent opposition already rising against John and Jesus.

Others read it as eager crowds pressing in with urgent, forceful hunger for the kingdom.

The text itself does not settle which reading is the right one.

Either way, something about this kingdom provokes a strong human response.

⚔️ A genuinely hard verse to pin down
😠 Some read it as violent opposition rising
🙌 Others read it as eager, forceful crowds
📖 This kingdom provokes a strong response

---

## 📚 All The Prophets And The Law Prophesied Until John

The law and the prophets stood as the full voice of God for centuries.

John marks the exact point where that long chapter of history closes.

Everything written before him was pointing forward, waiting for what comes next.

He stands as the last voice of the old arrangement, not the first of the new.

That makes him a hinge between two eras, not simply one more name.

📚 Law and prophets spoke for centuries
🚪 John marks where that era closes
➡️ Everything before him pointed forward
📖 John hinges two eras together

---

## 🔥 This Is Elias, Which Was For To Come

Elias is simply the Greek form of the name Elijah.

Malachi had promised that Elijah would return before the great and terrible day.

This does not mean John was literally the ancient prophet reborn.

Luke's Gospel already described John coming in the spirit and power of Elijah.

Jesus is naming a role John fulfills, not announcing a reincarnation.

🔥 Elias is the Greek name for Elijah
📜 Malachi promised Elijah's return beforehand
🙅 John is not Elijah reborn
📖 John fulfills Elijah's role, not his identity

---

## 👂 He That Hath Ears To Hear, Let Him Hear

Everyone listening already had working, physical ears in that crowd.

Jesus is not talking about simple physical hearing at all.

This phrase calls for a deeper kind of listening, one that actually accepts the truth.

Many people can hear words and still refuse what those words demand.

This short line becomes an invitation, not just a passing comment.

👂 Everyone already had physical ears
🧠 Jesus means a deeper kind of listening
🙅 Hearing is not the same as accepting
📖 This line invites a real response

# Matthew 11:16-19
# 🎭 Whereunto Shall I Liken This Generation
---
## 🎭 Children Sitting In The Markets, Calling Unto Their Fellows

Jesus pictures a children's game played out loud in the public marketplace.

One group of children plays a happy tune meant for a wedding.

The other group refuses to dance along no matter how it plays.

Then the first group switches to a sad song meant for a funeral.

That group refuses to mourn either, unwilling to join in either mood.

This generation acts the same way toward both John and Jesus.

🎭 Children play a game in the marketplace
🎉 One song mimics a wedding
😢 Another song mimics a funeral
📖 This generation refuses to join either mood

---

## 🚫 John Came Neither Eating Nor Drinking, And They Say He Hath A Devil

John lived an unusually strict life, fasting often and avoiding normal comforts.

Instead of respecting that discipline, people called it proof of a demon.

People twisted his serious discipline into an accusation instead of praise.

No version of John's lifestyle was ever going to satisfy this crowd.

Criticism here says more about the critics than about John himself.

🚫 John fasted and avoided comforts
👹 His discipline was twisted into an accusation
😤 No version of John satisfied this crowd
📖 Criticism reveals more about the critics

---

## 🍷 The Son Of Man Came Eating And Drinking

Jesus lived the opposite lifestyle from John, eating and drinking freely with people.

The same crowd that called John demon possessed called Jesus a glutton instead.

Publicans and sinners means tax collectors and other people seen as morally unacceptable.

Neither extreme lifestyle actually satisfied people determined to find fault either way.

Wisdom is justified of her children means the results eventually prove who was right.

🍷 Jesus ate and drank freely with people
🏷️ The crowd called him a glutton instead
👥 Publicans and sinners means social outcasts
📖 Results eventually prove who was right

# Matthew 11:20-24
# 🔥 Woe Unto Thee, Chorazin
---
## 😔 Then Began He To Upbraid The Cities Wherein Most Of His Mighty Works Were Done

"Upbraid" means to scold someone sharply for something they clearly should have done.

These cities had a front row seat to more miracles than almost anywhere else.

Front row access to real power did not translate into real repentance.

Seeing is not the same as turning away from sin and toward God.

Proximity to Jesus never guarantees a changed life.

😔 Upbraid means a sharp, deserved scolding
👀 These cities saw the most miracles
🙅 Seeing miracles did not bring repentance
📖 Proximity never guarantees a changed life

---

## ⚠️ Woe Unto Thee, Chorazin! Woe Unto Thee, Bethsaida!

"Woe" is a cry of real grief, not simply a word of anger.

Chorazin and Bethsaida were small fishing towns near Capernaum in Galilee.

Jesus based much of his ministry in this exact area for a long stretch.

These towns watched him teach and heal again and again, up close.

Grief, not fury, sits underneath this warning.

⚠️ Woe expresses grief, not just anger
🎣 Chorazin and Bethsaida were Galilean fishing towns
🏠 Jesus based his ministry in that area
📖 Grief sits underneath this warning

---

## ⚖️ It Shall Be More Tolerable For Tyre And Sidon At The Day Of Judgment

Tyre and Sidon were old pagan cities known for their hostility toward Israel.

Those cities never saw a single miracle that Chorazin and Bethsaida witnessed firsthand.

Jesus says even those outsiders would have repented if given the same evidence.

More revelation always carries more responsibility, never less.

Judgment measures what a person actually saw and still refused.

⚖️ Tyre and Sidon were old pagan enemies
👀 They never saw what these towns saw
🔄 Outsiders would have repented with that evidence
📖 More revelation brings more responsibility

---

## 🏘️ And Thou, Capernaum, Which Art Exalted Unto Heaven

Capernaum served as Jesus's own home base through much of his ministry.

No other town received more teaching or more miracles than this one did.

Being exalted unto heaven describes that high level of privilege and access.

Jesus says this same town will be brought down to hell instead.

Sodom becomes the comparison again, the worst byword for judgment Israel knew.

Privilege that is wasted becomes the heaviest judgment of all.

🏘️ Capernaum was Jesus's own home base
📈 No town saw more teaching or miracles
📉 That high privilege now faces a low judgment
📖 Wasted privilege becomes the heaviest judgment

# Matthew 11:25-30
# 🕊️ Come Unto Me, All Ye That Labour And Are Heavy Laden
---
## 🙏 Thou Hast Hid These Things From The Wise And Prudent

This is not an insult aimed at intelligence or education itself.

"Wise and prudent" here points to people confident in their own understanding.

Self reliance can actually block a person from receiving what God offers freely.

"Babes" pictures someone with no pretended expertise, simply willing to receive help.

God's truth was never hidden from anyone humble enough to ask for it.

🙏 Not an insult to intelligence
🧠 Wise and prudent means self confident people
👶 Babes pictures someone willing to receive help
📖 Humility, not status, opens this truth

---

## 👑 Even So, Father, For So It Seemed Good In Thy Sight

Jesus repeats the same idea here, this time as simple agreement.

"Seemed good in thy sight" means this was the Father's own deliberate choice.

Nothing about who receives this truth happens by accident or luck.

God's pleasure, not human merit, decides who gets to understand it.

That should bring real comfort, not confusion, to anyone who feels unqualified.

👑 Jesus agrees with the Father's plan here
🎯 This was a deliberate choice, not luck
❤️ God's pleasure decides who understands
📖 Feeling unqualified is not disqualifying

---

## 🔗 All Things Are Delivered Unto Me Of My Father

Jesus claims a level of authority no ordinary teacher would ever claim.

"All things" leaves nothing outside of what the Father has placed in his hands.

No man truly knows the Son except the Father, and the reverse is also true.

Only Jesus can reveal the Father, because only he fully knows him.

This verse quietly explains why his invitation in the next line carries real weight.

🔗 Jesus claims authority over all things
🤝 Father and Son know each other fully
🚪 Jesus alone can reveal the Father
📖 This authority backs his next invitation

---

## 🤲 Come Unto Me, All Ye That Labour And Are Heavy Laden

"Labour" and "heavy laden" both describe people worn out from carrying a weight.

Some of that weight came from trying to keep every religious rule perfectly.

Jesus is not offering a vacation from effort or responsibility itself.

He is offering relief from a burden no one was ever meant to carry alone.

This invitation goes out to everyone exhausted, not to a select few.

🤲 Labour and heavy laden mean exhaustion
📏 Some weight came from religious rule keeping
🙅 This is not a vacation from effort
📖 Relief, not escape, is being offered

---

## 🐂 Take My Yoke Upon You, And Learn Of Me

A "yoke" in that culture often meant a teacher's specific set of teachings and demands.

Other religious teachers offered yokes loaded down with endless added rules.

Jesus offers his own yoke instead, shaped by being meek and lowly in heart.

"Meek and lowly" describes humility, not weakness or a lack of real strength.

Learning from him means taking on his teaching, not just admiring it from a distance.

🐂 A yoke meant a teacher's set of demands
📏 Other teachers loaded on endless rules
🕊️ Jesus offers meekness instead of weight
📖 Learning means taking on his teaching

---

## 🪶 For My Yoke Is Easy, And My Burden Is Light

"Easy" here does not mean effortless or free from any real demand.

It describes something that fits well, the way a good yoke sits on an ox.

A poorly fitted yoke rubs and injures the animal wearing it.

A well fitted yoke barely slows the work at all.

Jesus promises his demands will fit a person instead of grinding them down.

This gentle promise closes a chapter that opened with doubt in a prison cell.

🪶 Easy means well fitted, not effortless
🐂 A poorly fitted yoke injures the animal
✅ Jesus promises a yoke that truly fits
📖 This promise answers the doubt from verse two
`.trim();

export const MATTHEW_ELEVEN_PERSONAL_SECTIONS = parseMatthewElevenRawNotes(MATTHEW_ELEVEN_RAW_NOTES);
