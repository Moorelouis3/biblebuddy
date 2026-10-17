export type TitusOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseTitusOneRawNotes(rawText: string): TitusOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: TitusOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Titus\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Titus 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Titus\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Titus\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Titus 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Titus 1:${startVerse}` : `Titus 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Titus 1 sections, received " + sections.length);
  }

  return sections;
}

const TITUS_ONE_RAW_NOTES = `# Titus 1:1-4
# 📜 Paul Greets His Son In The Faith
---
## 🗝️ A Servant Of God

"Servant" here means far more than a hired worker.

It describes someone who belongs completely to a master, the way a bondservant belonged to the one who owned him.

Paul opens many of his letters this exact way.

He wants Titus to know his authority comes from belonging to God, not from himself.

🗝️ Servant means belonging to a master
👑 Paul belongs to God completely
📜 He opens several letters this way
📖 Belonging to God grounds his authority

---
## 👐 An Apostle Of Jesus Christ

An "apostle" is someone sent out with direct authority from the one who sent him.

Paul is not claiming an ordinary job title here.

He is claiming a commission straight from Jesus Christ himself.

That claim backs up everything Paul is about to tell Titus to do.

👐 Apostle means sent with authority
🎯 Not a title Paul gave himself
✝️ Jesus Christ sent him directly
📖 His commission backs every instruction ahead

---
## ✅ The Faith Of God's Elect

"Elect" means those God has chosen for himself.

Paul is writing for every believer who shares that same chosen faith.

This faith is not something people earned on their own.

It is something God chose to give.

✅ Elect means chosen by God
🌍 Written for every believer, not one man
🎁 Faith is a gift, not an earned prize
📖 God's choice stands behind this letter

---
## 🙏 The Acknowledging Of The Truth

"Acknowledging the truth" means more than hearing facts about God.

It means recognizing them as real and letting them change how a person lives.

Paul ties this truth directly to "godliness," a life that reflects God's own character.

Knowing facts about God is not the same as living in light of them.

🙏 Acknowledging means recognizing truth as real
🔄 Truth is meant to change a life
👑 Godliness means reflecting God's character
📖 Knowing is not the same as living it

---
## ⏳ In Hope Of Eternal Life

"Hope" in the Bible rarely means wishing for something uncertain.

It means a confident expectation of something God has already promised.

Eternal life is not a maybe.

Paul calls it a sure hope resting on God's own word.

⏳ Hope means confident expectation, not a guess
✅ Eternal life is a sure promise
🙌 Resting on God's own word
📖 Confidence replaces uncertainty for believers

---
## 🚫 God, That Cannot Lie

Paul pauses mid sentence to name something about God's own character.

God is not simply truthful most of the time.

Lying is not even a possibility for him.

Every promise he makes is already guaranteed before anything else is said.

🚫 God cannot lie, ever
💯 Truthfulness is part of who he is
🔒 His promises are already guaranteed
📖 Trustworthiness is built into God's nature

---
## 🗣️ Manifested His Word Through Preaching

"Manifested" means made visible or clearly known.

God's plan did not stay hidden in secret.

He brought it out into the open through ordinary preaching.

Preaching is the method God chose to reveal his own eternal plan.

🗣️ Manifested means made clearly known
🙈 The plan did not stay hidden
📢 Preaching made it public
📖 God chose ordinary preaching to reveal it

---
## 👨‍👦 Mine Own Son After The Common Faith

Titus was not Paul's biological son.

Paul calls him "son" because he led Titus to faith and trained him in ministry.

"Common faith" means the same faith shared by every believer, not something unique to Titus alone.

That shared faith is what makes Titus a true son in the gospel.

👨‍👦 Son here means spiritual, not biological
🌱 Paul led Titus to faith
🤝 Common faith is shared by all believers
📖 Shared faith makes Titus a true son

---
## 🕊️ Grace, Mercy, And Peace

Paul closes his greeting with three distinct gifts, not one vague blessing.

"Grace" means favor Titus did not earn.

"Mercy" means kindness in the face of real wrongdoing.

"Peace" means the settled rest that follows both.

🕊️ Three distinct gifts named together
🎁 Grace means unearned favor
❤️ Mercy means kindness despite wrongdoing
📖 Peace follows grace and mercy

# Titus 1:5-9
# ⛪ Choosing Elders In Crete
---
## 🏝️ For This Cause Left I Thee In Crete

Crete was a large island, and its young churches needed more structure after Paul moved on.

Titus was not visiting as a guest.

Paul left him there with a specific job to finish.

That job becomes the whole subject of this chapter.

🏝️ Crete was a large island church
📋 Titus had a specific job
🧭 Paul sent him with a purpose
📖 That job shapes the rest of the chapter

---
## 🧩 Set In Order The Things That Are Wanting

"Wanting" here means missing or unfinished, not desired.

The young churches in Crete still lacked proper leadership and structure.

Titus had to finish organizing what Paul had only started.

Unfinished work left alone tends to drift into confusion.

🧩 Wanting means missing, not desired
🏗️ The churches still lacked structure
🔧 Titus finished what Paul started
📖 Unfinished work drifts without attention

---
## 👴 Ordain Elders In Every City

"Ordain" means formally appoint someone to a recognized role.

"Elders" were mature believers trusted to lead and teach a local church.

Crete had many towns, so every city needed its own qualified leaders.

One traveling apostle could not personally oversee every church forever.

👴 Ordain means formally appoint someone
📚 Elders led and taught locally
🏙️ Every city needed its own leaders
📖 Local leadership outlasts a visiting apostle

---
## 💍 Blameless, The Husband Of One Wife

"Blameless" does not mean sinless.

It means having no open accusation that would damage his witness.

"Husband of one wife" points to committed faithfulness in marriage.

An elder's home life counted as a real test of his character.

💍 Blameless means no open accusation
💑 One wife means committed faithfulness
🏠 Home life revealed real character
📖 Private faithfulness backed public ministry

---
## 👶 Faithful Children Not Accused Of Riot Or Unruly

This does not mean an elder's children had to be flawless.

It means his own household could not be openly known for rebellion or wild living.

A man who could not lead his own children credibly was not ready to lead a church.

Family and church leadership were linked, not separate skills.

👶 Not flawless children, just not rebellious
🏠 His household reflected his leadership
🔗 Family and church leadership connect
📖 Credibility starts close to home

---
## 🛡️ A Bishop Must Be Blameless, As The Steward Of God

"Bishop" and "elder" describe the same role here, just with different emphasis.

A "steward" manages something that belongs to someone else, not to himself.

An elder manages God's church, not his own personal project.

That ownership changes how seriously the role must be taken.

🛡️ Bishop and elder are the same role
🏦 Steward manages what belongs to another
⛪ The church belongs to God, not him
📖 Ownership shapes how seriously he leads

---
## 😤 Not Selfwilled, Not Soon Angry, Not Given To Wine, No Striker

"Selfwilled" means stubbornly insisting on having his own way regardless of others.

"Soon angry" describes a quick, uncontrolled temper.

"Given to wine" points to a pattern of drunkenness, not a single drink.

"No striker" rules out a man with a habit of physical violence.

Public credibility depended on controlling all four of these.

😤 Selfwilled means stubborn insistence
🌪️ Soon angry means a quick temper
🍷 Wine and violence both forbidden
📖 Self control was required everywhere

---
## 💰 Not Given To Filthy Lucre

"Filthy lucre" is an old way of saying money gained through greed or dishonest gain.

This was not a ban on having money.

It ruled out a leader who used ministry as a way to get rich.

Greed and spiritual leadership could not share the same hands.

💰 Filthy lucre means dishonest gain
🚫 Not a ban on having money
⚠️ Ministry could not be a money scheme
📖 Greed and leadership do not mix

---
## 🤝 A Lover Of Hospitality, A Lover Of Good Men

Paul lists two separate kinds of love here, not one idea repeated.

"Hospitality" meant welcoming strangers and traveling believers into his own home.

"A lover of good men" meant genuinely enjoying the company of people living right.

Both qualities pointed outward, toward other people, not inward toward himself.

🤝 Two distinct kinds of love listed
🏠 Hospitality means welcoming strangers in
👥 Loving good men means valuing godly company
📖 Both qualities pointed toward others

---
## ⚖️ Sober, Just, Holy, Temperate

Paul lists four more qualities together instead of one summary word.

"Sober" means clear minded and serious, not reckless.

"Just" means fair in dealing with others.

"Holy" and "temperate" together describe a life set apart and under control.

⚖️ Four distinct qualities, not one
🧠 Sober means clear minded and serious
🤲 Just means fair with others
📖 Holy and temperate mean set apart and controlled

---
## 🔒 Holding Fast The Faithful Word

"Holding fast" means gripping something tightly so it cannot slip away.

An elder was expected to know sound teaching well enough to keep it, not just repeat it.

Teaching that can be shaken by every new idea is not holding fast to anything.

Stability in doctrine was part of the job description.

🔒 Holding fast means gripping tightly
🧠 He had to truly know the teaching
🌊 Shaky teaching cannot anchor anyone
➡️ Stability in doctrine was required

---
## 💬 To Convince The Gainsayers

"Gainsayers" means people who argue against the truth on purpose.

An elder needed real skill in using scripture to answer objections.

Good intentions alone were not enough for this role.

This protected the church from being talked out of sound teaching.

💬 Gainsayers argue against truth on purpose
🛡️ Real skill in scripture was required
❌ Good intentions alone were not enough
📖 This protected the church's teaching

# Titus 1:10-13
# 🗣️ Unruly And Vain Talkers
---
## 🗯️ Many Unruly And Vain Talkers And Deceivers

Paul is not describing a few troublemakers.

He says "many," meaning this problem was already widespread in Crete.

"Vain talkers" means people who talk a great deal while saying nothing of real substance.

"Deceivers" means they knew their teaching was false and spread it anyway.

🗯️ Many means a widespread problem
💨 Vain talkers say little of substance
🎭 Deceivers knew their teaching was false
📖 This was not a small issue

---
## ✂️ Specially They Of The Circumcision

This phrase points to Jewish false teachers pushing Old Testament law requirements onto new Gentile believers.

"Circumcision" here stands for the whole system of Jewish ritual law, not the act alone.

Paul fought this same battle in several other letters, including Galatians.

False teaching often wraps itself in something that sounds respectable.

✂️ Circumcision stands for Jewish ritual law
📜 These teachers pushed law onto Gentiles
🔁 Paul fought this same fight elsewhere
📖 False teaching often sounds respectable

---
## 🤐 Whose Mouths Must Be Stopped

This is a strong command, not a gentle suggestion.

These teachers could not be allowed to simply keep talking in the church.

Silencing false teaching protected people who did not yet know better.

Leaders sometimes have to act firmly, not just patiently.

🤐 A strong command, not a suggestion
🛑 False teachers could not keep talking
🛡️ Silence protected the uninformed
📖 Firm action was sometimes required

---
## 🏚️ Subvert Whole Houses

"Subvert" means to secretly undermine and overturn something from the inside.

This was not one person losing their faith quietly.

Entire families and households were being pulled away from the truth together.

False teaching rarely stays contained to just one person.

🏚️ Subvert means secretly overturning from inside
👪 Whole families were affected, not one
🌊 False teaching spreads through a household
📖 It rarely stays contained to one person

---
## 💰 Teaching Things Which They Ought Not, For Filthy Lucre's Sake

These teachers were not simply mistaken about doctrine.

They knew their teaching was wrong and kept doing it anyway for personal profit.

"Filthy lucre" appears again, this time directly tied to false teaching for money.

Greed can corrupt teaching just as easily as it corrupts leadership.

💰 They taught falsely on purpose, for profit
🔁 Filthy lucre appears again here
⚠️ Greed corrupted their actual teaching
📖 Money can twist doctrine itself

---
## 🗿 One Of Themselves, Even A Prophet Of Their Own

Paul quotes a Cretan writer, not a Hebrew prophet, to make his point.

Ancient tradition credits this line to Epimenides, a widely read Cretan poet.

Paul uses the Cretans' own respected voice against their reputation.

Sometimes the sharpest correction comes from inside a group, not outside it.

🗿 Paul quotes a Cretan source
📜 Likely the poet Epimenides
🔄 Their own voice makes the point
📖 Correction often lands harder from inside

---
## 🦁 The Cretians Are Alway Liars, Evil Beasts, Slow Bellies

This blunt saying was already a well known stereotype about the island of Crete.

"Slow bellies" is an old way of describing people who were lazy and only cared about eating.

Paul is not inventing an insult.

He is quoting a reputation the Cretans themselves already admitted was true.

🦁 Already a well known stereotype
🍽️ Slow bellies means lazy and gluttonous
🗣️ Paul quotes it, does not invent it
📖 The Cretans admitted this themselves

---
## ✅ This Witness Is True

Paul agrees with the harsh quote instead of softening it.

He is not being unkind for no reason.

Naming a real problem honestly is the first step toward fixing it.

A leader who hides from hard truths cannot lead well.

✅ Paul agrees, does not soften it
🎯 Honesty was not unkindness here
🔧 Naming the problem comes first
📖 Hard truths require honest leaders

---
## 🗣️ Rebuke Them Sharply, That They May Be Sound In The Faith

"Rebuke sharply" means a firm, direct correction, not a cruel one.

The goal was never to simply embarrass or punish anyone.

"Sound in the faith" means healthy and whole, not sick with false teaching.

Correction here aimed at healing, not humiliation.

🗣️ Sharply means firm, not cruel
🎯 The goal was never humiliation
💊 Sound means healthy, not sick
📖 Correction aimed at healing people

# Titus 1:14-16
# 🪞 Pure In Word, Corrupt In Deed
---
## 📚 Not Giving Heed To Jewish Fables

"Fables" means made up stories treated as if they were true teaching.

These were not stories from the Old Testament itself.

They were extra traditions and legends added on top of scripture.

Paul warns against trading solid truth for invented extras.

📚 Fables means invented stories
➕ Not Old Testament scripture itself
🧱 Extra traditions were added on top
📖 Solid truth beats invented extras

---
## 📏 Commandments Of Men, That Turn From The Truth

These were human made rules dressed up to look like God's own law.

They were not harmless traditions.

Paul says plainly that they lead people away from the truth, not toward it.

A rule can sound religious and still be wrong.

📏 Human rules dressed up as God's law
🚪 Not harmless, these led people away
⚠️ Religious sounding is not the same as true
📖 Direction matters more than appearance

---
## 🪞 Unto The Pure All Things Are Pure

This does not mean nothing is ever wrong for anyone.

Paul is describing a clean conscience and heart before God.

For someone whose heart is right, ordinary things are not a trap or a sin.

A clear conscience changes how a person experiences everyday life.

🪞 About a clean heart, not rules
💭 Describes conscience, not permission to sin
🌤️ Ordinary things are not automatically a trap
📖 A clear conscience changes everyday life

---
## 🌫️ Unto Them That Are Defiled And Unbelieving Is Nothing Pure

"Defiled" means morally corrupted, stained on the inside.

For a corrupted heart, even good things get twisted into something unclean.

The problem was never the object itself.

The problem was always the condition of the heart looking at it.

🌫️ Defiled means corrupted on the inside
🔄 A corrupted heart twists good things
🎯 The object was never the real problem
📖 The heart decides how things are seen

---
## 🎭 They Profess That They Know God, But In Works They Deny Him

"Profess" means to openly claim or declare something.

These teachers said all the right words about knowing God.

Their actual behavior told a completely different story.

Words and actions were never meant to contradict each other this way.

🎭 Profess means openly claiming something
🗣️ Their words claimed to know God
🙅 Their actions said otherwise
📖 Words and actions must not contradict

---
## 🚫 Abominable, And Disobedient, And Unto Every Good Work Reprobate

"Abominable" means something God finds deeply disgraceful.

"Reprobate" means failing the test, like metal rejected for being worthless.

These three words together describe a complete failure, not one small flaw.

Paul ends the chapter naming exactly what empty religious talk leads to without real obedience.

🚫 Abominable means deeply disgraceful to God
⚖️ Reprobate means failing the test
📉 A complete failure, not one flaw
📖 Empty talk without obedience fails fully
`.trim();

export const TITUS_ONE_PERSONAL_SECTIONS = parseTitusOneRawNotes(TITUS_ONE_RAW_NOTES);
