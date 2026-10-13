export type FirstCorinthiansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansOneRawNotes(rawText: string): FirstCorinthiansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 1:${startVerse}` : `1 Corinthians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Corinthians 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_ONE_RAW_NOTES = `# FirstCorinthians 1:1-3
# ✉️ Paul Opens The Letter
---
## 📨 Called To Be An Apostle

Apostle means someone sent out with full authority to represent the one who sent them.

Paul did not choose this title for himself.

He says his calling came through the will of God.

Later chapters show people in Corinth doubting that very authority.

📨 Apostle means someone sent with authority
🙅 Paul did not choose this himself
🙏 His calling came through God's will
➡️ Corinth later challenges this very authority

## 🤝 And Sosthenes Our Brother

Sosthenes appears earlier in the Bible as a synagogue ruler in Corinth.

Acts 18 describes him dragged before the Roman governor Gallio and beaten by an angry mob.

That same man now stands beside Paul as a brother in Christ.

A violent opponent of the gospel became one of its own messengers.

📜 Sosthenes once opposed the church in Corinth
⚖️ Acts 18 shows him beaten before Gallio
🔄 He now stands with Paul as family
📖 A former enemy became a true brother

## 🙏 Sanctified In Christ Jesus, Called To Be Saints

Sanctified means set apart for God's own special purpose.

Saints simply means everyone who trusts in Christ.

It does not point to an elite few super spiritual people.

Every believer in this troubled, divided church already counted as a saint.

🙌 Sanctified means set apart for God
👥 Saints means every believer, not a few
🚫 Not an elite class of super Christians
📖 Even this divided church counted as holy

## 🕊️ Grace Be Unto You, And Peace

This greeting blends two different cultures into one line.

Grace was the normal greeting in Greek letters of this time.

Peace echoes the Hebrew word shalom, the standard Jewish greeting.

Paul puts both worlds together to greet a church made of Jews and Greeks.

✨ Grace was the normal Greek greeting
📯 Peace echoes the Hebrew word shalom
🌍 Paul blends two whole cultures here
📖 Grace and peace flow from God

# FirstCorinthians 1:4-9
# 🙏 Giving Thanks For Grace Already Given
---
## 🙏 I Thank My God Always On Your Behalf

Paul opens almost every letter with thanks, even to a troubled church.

He has not even mentioned the divisions yet.

Thanking God first sets the whole tone before any correction begins.

Paul leads with grace before he ever leads with rebuke.

🙏 Paul gives thanks before any correction
📬 This letter will soon address real problems
⏳ Thanks comes first, correction comes later
📖 Grace leads, rebuke follows after it

## 📚 Enriched In All Utterance, And In All Knowledge

Utterance means the ability to speak God's truth clearly out loud.

This same gift later becomes a problem when it turns into empty showmanship.

Corinth prized clever speech more than almost any other city in the empire.

Paul credits this skill to God's grace, not to Corinth's own cleverness.

🗣️ Utterance means speaking God's truth clearly
⚠️ This gift later becomes a problem
🏛️ Corinth prized clever speech highly
📖 God gave the gift, not Corinth's pride

## ✅ The Testimony Of Christ Was Confirmed In You

Testimony means the message about Christ that Paul first preached there.

Confirmed pictures a legal case proven true by solid evidence.

The Corinthians' own changed lives became proof the gospel was real.

Their transformed community served as living evidence for the message Paul brought.

📜 Testimony means the message about Christ
⚖️ Confirmed pictures proof in a legal case
👥 Changed lives became the real evidence
📖 Their new lives proved the gospel true

## 🎁 Ye Come Behind In No Gift

Paul says plainly that the Corinthians lack no spiritual gift at all.

Gift refers to abilities the Holy Spirit gives for building up the church.

Chapters twelve through fourteen will return to this exact topic in detail.

A church this gifted will still need real correction in how it behaves.

🎁 No spiritual gift is missing here
🕊️ Gifts come from the Holy Spirit
📚 Chapters twelve to fourteen return to this
📖 Gifted people still need real correction

## ⏳ Waiting For The Coming Of Our Lord Jesus Christ

Early believers lived with real, daily expectation that Christ could return soon.

Waiting here means active watching, not passive killing of time.

That expectation shaped how seriously they treated daily choices and conflicts.

A church expecting Christ's return still managed to argue over almost everything.

⏳ Early believers expected Christ's soon return
👀 Waiting meant active watching, not boredom
⚖️ That hope shaped daily choices
📖 Even hopeful believers still argued often

## 👑 Blameless In The Day Of Our Lord Jesus Christ

That day points to a future day of judgment for every believer.

Blameless does not mean sinless performance earns a passing grade.

It means God will find them secure in Christ on that day.

The same Christ who called them will also keep them until the end.

📅 That day means a future judgment
🚫 Blameless is not sinless performance earned
🛡️ It means secure standing in Christ
📖 The one who called them will keep them

## 🤲 Called Unto The Fellowship Of His Son

Fellowship means a real, shared life together, not just friendly meetings.

The word pictures partners bound together in one shared purpose.

Every believer gets pulled into shared life with Jesus himself, not just with each other.

That shared bond with God explains why division among them makes no sense.

🤝 Fellowship means a real shared life
🧭 It means partnership toward one purpose
🙌 Believers share life with Jesus himself
📖 That shared bond makes division senseless

# FirstCorinthians 1:10-13
# ⚔️ A Church Pulling Itself Apart
---
## 🙏 Now I Beseech You, Brethren

Beseech means an urgent, personal plea, not a polite suggestion.

Paul is not giving friendly advice here.

He is pleading as a father would plead with his own children.

The force of this word shows how seriously he takes what comes next.

🙏 Beseech means an urgent personal plea
🚫 This is not a polite suggestion
👨‍👧 Paul pleads like a father here
📖 The urgency shows how serious this is

## 🧩 That There Be No Divisions Among You

Divisions translates a word that pictures tearing or splitting something whole.

Corinth's culture already prized rival teachers who competed for loyal followers.

Believers had carried that same competitive habit straight into their own church.

A church copying the world's rivalry stops looking like Christ's own body.

🧩 Divisions means something torn or split
🏛️ Corinth's culture prized competing teachers
🔁 Believers copied that habit into church
📖 Rivalry makes the church unlike Christ

## 👩 Them Which Are Of The House Of Chloe

Chloe appears nowhere else in the New Testament by name.

Her household likely included servants who traveled and reported news to Paul.

A single named woman's household became the source behind this entire letter's concerns.

An ordinary household gave Paul the information he needed to help the church.

👤 Chloe is named only this once
🏠 Her household likely reported this news
✉️ One household shaped this whole letter
📖 Ordinary people carried news that mattered

## 🗣️ I Am Of Paul, And I Of Apollos

Four different loyalty groups split this one church into rival camps.

Paul represented the founding missionary, Apollos the eloquent Alexandrian teacher.

Cephas was Peter's Aramaic name, favored by believers with a Jewish background.

A fourth group claimed Christ alone as their own banner.

That claim ignored that every group already belonged to him too.

👥 Four rival loyalty groups split the church
📢 Paul founded it, Apollos taught it well
🕊️ Cephas was Peter's Aramaic name
📖 Every single group already belonged to Christ

## ❓ Is Christ Divided?

This is a rhetorical question with an obvious answer, no.

Christ cannot be split into competing factions the way a vote splits a room.

Dividing loyalty to his followers accidentally divides loyalty to him.

The question exposes how absurd the whole argument in Corinth really was.

❓ A question with an obvious answer
🚫 Christ cannot be split into factions
🔗 Dividing his followers divides him too
📖 The question exposes a real absurdity

## 💧 Were Ye Baptized In The Name Of Paul?

Baptism marks who a person now belongs to, not which teacher taught them.

Nobody in Corinth was baptized into Paul's own name or authority.

Attaching loyalty to the person who baptized them misses the entire point of baptism.

This question sets up Paul's own point in the very next verses.

💧 Baptism marks ownership, not the teacher
🚫 No one was baptized into Paul's name
🎯 Loyalty to a baptizer misses the point
➡️ This sets up what Paul says next

# FirstCorinthians 1:14-17
# 💧 Paul And The Question Of Baptism
---
## 👤 I Baptized None Of You, But Crispus And Gaius

Crispus was the ruler of the synagogue in Corinth before he believed.

His conversion recorded in Acts 18 would have shocked the whole city.

Gaius likely hosted Paul and the whole church in his own large home.

Paul remembers both men by name even years after that first visit.

🕍 Crispus ruled Corinth's synagogue before believing
😲 His conversion in Acts 18 shocked many
🏠 Gaius hosted Paul and the church
📖 Paul still remembers both men by name

## 🙅 Lest Any Should Say That I Had Baptized In Mine Own Name

Paul worried his own popularity could turn into its own faction.

Baptizing too many people himself risked building a following around his own name.

He deliberately avoided creating the very problem he now has to correct.

Even good leaders can accidentally build loyalty to themselves instead of to Christ.

😟 Paul worried about his own popularity
⚠️ Baptizing many could build a faction
🙅 He avoided creating that exact problem
📖 Leaders can accidentally pull loyalty to themselves

## 🏠 The Household Of Stephanas

Stephanas led a household baptized together as a complete family unit.

Chapter sixteen later calls this same household the firstfruits of Achaia.

Baptizing an entire household at once was a common practice in this culture.

One family's early yes to the gospel echoes again later in this letter.

👨‍👩‍👧 Stephanas led a household baptized together
🥇 Chapter sixteen calls them Achaia's firstfruits
🏛️ Household baptisms were common in this culture
📖 One family's choice echoes later in this letter

## 🗣️ Not With Wisdom Of Words

Wisdom of words describes the polished, persuasive style prized by Greek speakers.

Corinth loved clever public speakers the way some cities love famous performers.

Paul refused to dress up the gospel in that kind of showmanship.

A plain message carried more weight to him than an impressive performance.

🎭 Wisdom of words means polished speech
🏛️ Corinth loved clever public speakers
🚫 Paul refused that kind of showmanship
📖 A plain message mattered more to him

## 💥 Lest The Cross Of Christ Should Be Made Of None Effect

Of none effect means emptied of its real power.

Fancy rhetoric can distract people from the actual message being preached.

Paul feared impressive speech could overshadow what the cross alone accomplished.

The method of preaching could never be allowed to outshine its content.

🕳️ Of none effect means emptied of power
🎪 Fancy rhetoric can distract from the message
✝️ The cross itself holds the real power
📖 Style must never outshine the message

# FirstCorinthians 1:18-21
# ⚡ Foolishness Or Power
---
## ☠️ To Them That Perish Foolishness

Perish describes a path heading toward final, lasting ruin, not instant death.

Foolishness translates a word close to our word moron, something laughably absurd.

A crucified man claimed as a savior sounded ridiculous to the wider world.

The same message lands completely differently depending on who is hearing it.

⏳ Perish means heading toward lasting ruin
🤡 Foolishness is close to our word moron
🙄 A crucified savior sounded absurd to many
📖 The same message lands differently on different hearts

## ⚡ Unto Us Which Are Saved It Is The Power Of God

Power here translates the same word behind our word dynamite.

The cross looked like weakness, yet it carried real, saving force.

Believers see the same event the world mocks as God's actual strength.

What looks foolish from outside looks powerful from inside real faith.

💣 Power shares its root with dynamite
💪 The cross looked weak but carried force
👀 Believers see strength where others see mockery
📖 Faith changes how the same event looks

## 📜 I Will Destroy The Wisdom Of The Wise

Paul quotes directly from the prophet Isaiah here.

Isaiah originally warned Judah's own wise advisors about trusting human strategy over God.

God had already proven centuries earlier that human cleverness cannot outsmart him.

Paul applies that same old warning directly to Corinth's own clever reputation.

📖 This quotes the prophet Isaiah directly
⚔️ Isaiah warned Judah about trusting strategy
🏆 Human cleverness never outsmarts God
➡️ Paul applies that old warning to Corinth

## ❓ Where Is The Wise? Where Is The Scribe?

Paul lists three types of people Corinth deeply respected.

The wise represented Greek philosophers, admired for their reasoned arguments.

The scribe represented Jewish experts trained in careful study of the law.

Naming all three together shows that no human expert actually found God through their own wisdom.

🏛️ Paul names three respected kinds of people
🧠 The wise meant admired Greek philosophers
📚 The scribe meant trained Jewish law experts
📖 None of them found God through wisdom

## 🌍 The World By Wisdom Knew Not God

Human philosophy, at its very best, still never arrived at knowing God.

Centuries of brilliant thinkers in Greece never reached this one conclusion on their own.

God chose a completely different path to make himself known instead.

What education could not finish, a crucified man accomplished.

🧠 Even the best philosophy missed God
📚 Centuries of thinkers never got there
✝️ God chose a different path instead
📖 A crucified man succeeded where study failed

## 📣 The Foolishness Of Preaching To Save Them That Believe

The foolishness of preaching does not mean the message itself is actually foolish.

It means the method looked foolish to people expecting polished philosophy instead.

God chose a plain, spoken message as his method on purpose.

What looked like the weakest possible tool became the one that actually worked.

📢 This foolishness describes the method, not the truth
🎯 Preaching looked weak compared to philosophy
🛠️ God chose this plain tool on purpose
📖 The weakest tool turned out to work

# FirstCorinthians 1:22-25
# 🪧 Signs For Jews, Wisdom For Greeks
---
## ✋ The Jews Require A Sign

A sign meant a visible miracle proving a message came from God.

This was not an unreasonable request on its own.

God himself had used signs before, from the exodus to the prophets.

The problem came later, when a sign was demanded instead of trusted faith.

✋ A sign meant visible proof from God
🙏 This request was not unreasonable alone
📜 God had used signs many times before
📖 Demanding signs can crowd out real trust

## 🧠 The Greeks Seek After Wisdom

Greek culture prized reasoned argument above almost anything else in life.

Public debate and clever philosophy carried real social status in that world.

A message that could not be argued into logical shape held little appeal to them.

The gospel would need to win hearts without winning a formal debate first.

🏛️ Greek culture prized reasoned argument highly
🎤 Public debate carried real social status
🚫 The gospel could not be argued into shape
📖 It won hearts, not formal debates

## 🪵 Christ Crucified, Unto The Jews A Stumblingblock

Stumblingblock means an object that trips a person walking confidently forward.

Jewish expectation pictured a conquering king, not a condemned criminal on a cross.

A crucified messiah directly contradicted centuries of expected triumph.

The very point meant to prove Jesus was not the Messiah became the heart of the message.

🚧 Stumblingblock means something that trips someone up
👑 Jews expected a conquering king, not a cross
🤔 A crucified messiah contradicted their expectation
📖 The obstacle became the actual message

## 🙃 Unto The Greeks Foolishness

Greek thought pictured the divine as powerful, distant, and untouched by suffering.

A god who could be beaten, mocked, and killed broke that entire picture.

To Greek ears, this idea sounded philosophically absurd, not merely unpopular.

What seemed impossible to imagine became the very center of the Christian message.

🏛️ Greeks pictured gods as distant and untouched
💔 A suffering, dying god broke that picture
🤷 The idea sounded absurd, not just unpopular
📖 The impossible idea became the center of faith

## 💎 The Foolishness Of God Is Wiser Than Men

This line is a deliberate, striking paradox.

Even God's apparent weakness still outranks the greatest human strength.

Corinth measured everything by status, polish, and strength.

God's chosen path through the cross cancels that entire measuring system.

💎 This line is a deliberate paradox
💪 Even God's weakness outranks human strength
📏 Corinth measured people by status and polish
📖 The cross cancels that whole measuring system

# FirstCorinthians 1:26-31
# 🙌 Boasting Only In The Lord
---
## 👥 Not Many Wise Men After The Flesh

Paul describes the Corinthians' own backgrounds honestly, not flatteringly.

Most of this church came from ordinary, unimpressive social standing.

Very few members held real wealth, education, or political power.

God built his church mostly from people the world tended to overlook.

🪞 Paul describes their backgrounds honestly
👤 Most members had ordinary social standing
💰 Few held wealth, education, or power
📖 God built his church from overlooked people

## 🧩 God Hath Chosen The Foolish Things To Confound The Wise

Confound means to put to shame by proving someone completely wrong.

God deliberately picked the unimpressive to expose the impressive.

This was not an accident or a backup plan.

It was God's actual strategy from the very start.

😳 Confound means proving someone wrong, shaming them
🎯 God deliberately chose the unimpressive
📋 This was never an accidental backup plan
📖 It was God's actual strategy from the start

## 🚫 Things Which Are Not, To Bring To Nought Things That Are

Things which are not describes people society treated as nobodies.

Bring to nought means to empty something of its power or importance.

God used the people everyone overlooked to undo the status everyone else protected.

The nobodies of Corinth became the proof of God's real power.

👻 Things which are not means treated as nobodies
📉 Bring to nought means emptied of importance
🔄 Overlooked people undid protected social status
📖 The nobodies became proof of God's power

## 🙊 That No Flesh Should Glory In His Presence

Glory here means to boast, to take personal credit for success.

Paul names the exact purpose behind choosing such an unimpressive church.

Nobody in Corinth could stand before God claiming they earned their place.

Removing any ground for boasting protects the credit that belongs only to God.

🗣️ Glory means to boast or take credit
🎯 This was the whole purpose of God's choice
🙅 No one could claim they earned their place
📖 Removing boasting protects God's own credit

## ✨ Made Unto Us Wisdom, And Righteousness, And Sanctification, And Redemption

Paul lists four separate gifts Christ becomes for every believer.

Wisdom answers the whole argument this chapter already made about human wisdom failing.

Righteousness means a right standing with God believers could never earn themselves.

Sanctification means being set apart for God's own use.

Redemption means being bought back out of slavery to sin.

🎁 Christ becomes four separate gifts at once
🧠 Wisdom answers this chapter's whole argument
⚖️ Righteousness means standing right before God
📖 Sanctification sets apart, redemption buys back

## 📣 He That Glorieth, Let Him Glory In The Lord

This line quotes the prophet Jeremiah almost word for word.

Jeremiah originally told Israel to boast only in knowing God, not in wealth or strength.

Paul closes the whole chapter's argument by pointing back to that old command.

Every argument in this chapter leads to the same single destination.

📜 This quotes the prophet Jeremiah directly
⚖️ Jeremiah said boast only in knowing God
🧵 Paul ties the chapter back to that command
📖 Every argument lands on the same point
`.trim();

export const FIRST_CORINTHIANS_ONE_PERSONAL_SECTIONS = parseFirstCorinthiansOneRawNotes(FIRST_CORINTHIANS_ONE_RAW_NOTES);
