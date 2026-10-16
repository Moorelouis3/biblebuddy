export type FirstTimothyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothyThreeRawNotes(rawText: string): FirstTimothyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 3:${startVerse}` : `1 Timothy 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Timothy 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_THREE_RAW_NOTES = `# 1 Timothy 3:1-3
# 👑 What It Takes To Be An Overseer
---
## 📜 This Is A True Saying

"A true saying" marked a statement Paul wanted Timothy to treat as fully settled.

He uses this same phrase a few more times across his letters to Timothy and Titus.

Think of it like a flag planted in the middle of the text.

It signals the reader to slow down and pay attention.

Paul is not sharing a casual opinion here.

He is handing Timothy something already settled and important.

📜 A true saying marks reliability
🔁 Paul repeats this phrase often
🚩 It flags something worth attention
📖 This chapter carries real weight
---
## 👀 The Office Of A Bishop

A "bishop" here means an overseer, someone responsible for guiding and protecting a local church.

The Greek word behind it, episkopos, literally means one who watches over something closely.

This was not a title tied to a building or a denomination.

It described a working role, teaching, guarding doctrine, and caring for people.

Paul calls wanting this role "a good work," not a grab for status.

Desiring to serve this way is worth honoring, not treating with suspicion.

👀 Bishop means one who oversees
🔍 Episkopos means closely watching over
📚 The role involves teaching and guarding doctrine
📖 Wanting this work is honorable
---
## ⚖️ Blameless, The Husband Of One Wife

"Blameless" does not mean sinless or perfect in every way.

It means no one can point to a real accusation that actually sticks.

"The husband of one wife" has long been debated among careful readers.

Many take it to mean a man faithful to his wife, not involved with others.

It likely also ruled out a man married to more than one woman at once.

It does not forbid a widower from marrying again later.

Character under pressure, not a flawless record, is what Paul asks Timothy to look for.

⚖️ Blameless means no real accusation sticks
💍 Husband of one wife is debated
🤝 It likely means marital faithfulness
📖 Character matters more than a flawless past
---
## 🧠 Vigilant, Sober, Of Good Behaviour

These three words describe a settled, steady kind of character.

"Vigilant" means alert, the kind of person who notices danger before it arrives.

"Sober" here is not only about alcohol, it means clear and level headed judgment.

"Of good behaviour" points to a life that is well ordered, not chaotic or impulsive.

Paul is describing someone whose inner life matches their outer conduct.

A church cannot be led well by someone who is scattered or careless.

👀 Vigilant means alert to danger
🧠 Sober means clear level headed judgment
🧭 Good behaviour means an ordered life
📖 Inner character should match outward conduct
---
## 🚪 Given To Hospitality

"Hospitality" meant far more in Paul's world than having guests over for dinner.

Public inns were often unsafe, costly, or connected to pagan worship.

Traveling believers and traveling teachers depended on homes willing to take them in.

A leader who opened his home gave the whole church a visible example.

This was a real cost of money, space, and safety, not a small gesture.

🚪 Hospitality meant opening your home
🛖 Inns were often unsafe back then
🤝 Travelers depended on willing households
📖 A leader modeled generosity for the church
---
## 📚 Apt To Teach

"Apt to teach" means genuinely skilled at explaining and defending sound teaching.

This was not optional for an overseer, false teachers were already active in Ephesus.

Chapter one already described men twisting the law and chasing empty arguments.

An overseer needed to recognize error and answer it clearly, not just repeat memorized lines.

Teaching ability protected the whole congregation from being pulled off course.

📚 Apt to teach means genuinely skilled
⚠️ False teachers were active in Ephesus
🧭 An overseer had to answer error clearly
📖 Good teaching protects the whole church
---
## 🍷 Not Given To Wine, No Striker, Not Greedy Of Filthy Lucre

These three warnings name ways a leader's body, temper, or wallet can disqualify him.

"Not given to wine" means not controlled by alcohol, not simply abstaining completely.

"No striker" means not a physically violent man, quick to use his hands.

"Not greedy of filthy lucre" means not chasing money gained through dishonest or shameful means.

Paul is naming real temptations that come with any kind of public authority.

Self control in small things proves whether someone can be trusted with bigger responsibility.

🍷 Not given to wine means not controlled
👊 No striker means not violent
💰 Filthy lucre means dishonest gain
📖 Authority tests a person's self control
---
## 🕊️ Patient, Not A Brawler, Not Covetous

These final three words finish the list by naming a leader's temper and his appetite.

"Patient" means gentle under pressure, not quick to snap back.

"Not a brawler" means not someone who picks fights or stirs up conflict.

"Not covetous" means not consumed by wanting more than what is already his.

Paul closes this list the way he opened it, character tested in ordinary moments.

A calm, contented leader is far more trustworthy than an impressive one.

🕊️ Patient means gentle under pressure
⚔️ Not a brawler avoids stirring conflict
🙌 Not covetous means content with enough
📖 Ordinary moments reveal real character

# 1 Timothy 3:4-7
# 🏠 Tested At Home First
---
## 🏠 One That Ruleth Well His Own House

"Ruleth well" means leading a household with real wisdom.

In that world, a household included a wife, children, and servants.

How a man led his home served as a visible preview.

It previewed how he might lead the whole church.

Paul wants proven leadership, not a perfect family record.

🏠 Ruleth well means wise household leadership
👪 A household often included servants too
🔍 Home life previewed church leadership
📖 Proven leadership matters more than perfection
---
## 👶 Having His Children In Subjection With All Gravity

"Subjection" here means children who respect and respond to real authority.

It does not describe fear or harsh control.

"Gravity" means a serious, respectful manner, not stiffness or coldness.

Paul is picturing a home where respect runs in both directions.

Children who are guided well often reflect a father who leads well.

👶 Subjection means respecting real authority
🚫 It does not mean fear or harshness
🎩 Gravity means a serious respectful manner
📖 Respect in the home runs both ways
---
## 💭 How Shall He Take Care Of The Church Of God

Verse five is a parenthetical, a side comment slipped inside parentheses.

Paul pauses his list to explain his own reasoning.

A home and a church are not identical, but they ask for similar skill.

Both need patient attention, fair decisions, and steady care for people.

If a man cannot manage a few people who live with him a whole congregation will be too much.

💭 Verse five is a side comment
🏠 Home and church need similar skill
❤️ Both need patience and fair care
📖 Small leadership proves readiness for more
---
## 🌱 Not A Novice

"Novice" here does not mean someone young in age.

It means someone newly planted in the faith, not yet tested by time.

A brand new believer has not yet faced real pressure as a leader.

Paul wants seasoning, not simply enthusiasm.

Time reveals character that a first impression cannot.

🌱 Novice means newly planted in faith
⏳ Not simply young in age
🔥 New believers have not faced real pressure
📖 Time reveals character enthusiasm cannot show
---
## 🎈 Lest Being Lifted Up With Pride He Fall Into The Condemnation Of The Devil

"Lifted up with pride" pictures someone swelling with self importance.

A sudden promotion can make an untested leader feel more important than he is.

"The condemnation of the devil" points back to how pride caused Satan's own fall.

Paul is warning that the same trap can catch a proud new leader.

Pride is not a small flaw here, it is the specific danger named.

🎈 Pride means swelling with self importance
👑 A sudden promotion can inflate someone fast
😈 Satan's own fall began with pride
📖 The same trap can catch a leader
---
## 🌍 A Good Report Of Them Which Are Without

"Them which are without" means people outside the church, neighbors and strangers.

An overseer's reputation could not stop at the church doors.

How he was known in the wider community mattered too.

A respected life outside the church backed up his witness inside it.

🌍 Without means people outside the church
👀 Reputation mattered beyond church doors
🤝 Outside respect backed up his witness
📖 A leader's life should hold up anywhere
---
## 🪤 The Snare Of The Devil

A "snare" is a trap set to catch something off guard.

Public failure in a leader does real damage beyond just that one person.

It can discourage other believers and hand ammunition to outside critics.

Paul names the devil directly because this failure is not accidental, it is targeted.

Guarding a leader's integrity protects the whole church's witness.

🪤 Snare means a trap set to catch
💥 A leader's fall damages more than himself
😈 The devil targets public failure on purpose
📖 Integrity protects the whole church's witness

# 1 Timothy 3:8-13
# 🤝 Deacons Who Serve Well
---
## 🧺 Likewise Must The Deacons Be Grave

"Deacon" comes from a Greek word meaning servant, someone devoted to practical service.

It names a distinct role from the overseer described earlier in this chapter.

"Grave" here means serious and dignified, not gloomy or joyless.

Deacons were trusted with real responsibility, so their character mattered just as much.

Paul will not lower the bar simply because the title sounds smaller.

🧺 Deacon means a devoted servant
🏛️ It is a distinct church role
🎯 Grave means serious and dignified
📖 Smaller titles still need real character
---
## 👅 Not Doubletongued

"Doubletongued" describes someone who tells one story to one person and a different story to another.

It names a kind of quiet dishonesty that is easy to hide.

A deacon often carried private information between people in the church.

That kind of access made trustworthy speech absolutely essential.

Trust breaks quickly once someone is caught saying two different things.

👅 Doubletongued means saying two different things
🤐 It hides dishonesty quietly
🔑 Deacons carried private information often
📖 Trustworthy speech was absolutely essential
---
## 🔁 Not Given To Much Wine, Not Greedy Of Filthy Lucre

These same two warnings already appeared earlier in this chapter for overseers.

Paul repeats them here on purpose, the standard is not lowered for deacons.

Alcohol and money were two of the easiest ways for any church leader to fall.

A role built on service could not be trusted to someone ruled by either one.

🔁 These warnings already appeared for bishops
⚖️ The standard was not lowered here
🍷 Alcohol tempted leaders at every level
📖 Service cannot be trusted to greed
---
## 🔓 Holding The Mystery Of The Faith In A Pure Conscience

"Mystery" in the New Testament usually means a truth once hidden, now fully revealed.

It does not mean something confusing or impossible to understand.

"The faith" here points to the whole body of Christian teaching, not just personal belief.

A "pure conscience" means living in a way that matches what he teaches.

A deacon's integrity and his doctrine were expected to line up completely.

🔓 Mystery means truth once hidden, now revealed
📜 The faith means the whole gospel message
🧼 Pure conscience means a matching life
📖 Belief and daily life must line up
---
## 🔬 Let These Also First Be Proved

"Proved" means tested over time, not approved after a single interview.

Paul wanted character to be observed in action before any title was given.

A reputation for service had to be earned in the open, not just claimed.

Only after that testing could someone actually serve in the office of deacon.

🔬 Proved means tested over real time
👀 Character had to be observed first
🏷️ Titles came after proof, not before
📖 Service was earned, never simply claimed
---
## ❓ Even So Must Their Wives Be Grave

Scholars genuinely disagree about who "their wives" refers to here.

Some believe it points to the wives of deacons specifically.

Others believe the Greek word can mean women serving as deacons themselves.

The text does not settle the question on its own.

Either reading still calls for the same serious, trustworthy character.

❓ Scholars disagree on who this names
👩 It may mean deacons' wives
🙋 It may mean women serving as deacons
📖 Either way, character still matters
---
## 🗣️ Not Slanderers, Sober, Faithful In All Things

"Slanderers" shares its root with the word devil, one who falsely accuses.

A gossiping tongue could do as much damage as any public sin.

"Sober" again means clear minded, not swept along by impulse or drama.

"Faithful in all things" means consistency, not just getting the big moments right.

🗣️ Slanderers shares its root with devil
💥 Gossip can damage as much as sin
🧠 Sober means clear minded judgment again
📖 Faithfulness means consistency, not big moments only
---
## 🔁 The Husbands Of One Wife, Ruling Their Children

This repeats the same marriage and household standard already given for overseers.

Deacons were not a lower tier with looser rules.

A deacon's own home still had to reflect the character he was asked to serve with.

Consistency between a man's public role and his private home mattered at every level.

🔁 This repeats the overseer standard again
🏠 Deacons needed the same household order
⚖️ No role got a lower bar
📖 Public service and private life must match
---
## 💎 Purchase To Themselves A Good Degree, And Great Boldness

"Purchase" here does not mean buying something with money.

It means earning something valuable through faithful effort over time.

"A good degree" points to real standing and respect within the church.

"Great boldness" describes a growing confidence to speak and act for Christ.

Faithful service in a smaller role built real courage for whatever came next.

💎 Purchase means earning, not buying
📈 Good degree means real standing earned
🦁 Great boldness means growing confidence
📖 Small faithful service builds real courage

# 1 Timothy 3:14-16
# ✝️ The Mystery Of Godliness
---
## ✍️ These Things Write I Unto Thee

Paul shifts here from a list of qualifications to a personal word to Timothy.

"These things" means everything written so far in this letter.

Paul could not simply hand instructions to a stranger and walk away.

He writes as someone who trained Timothy personally and still cares deeply for him.

✍️ These things means the whole letter
🤝 Paul writes as a trusted mentor
❤️ Personal care sits behind these instructions
📖 This was never a cold set of rules
---
## 🚶 Hoping To Come Unto Thee Shortly

Paul hoped to visit Timothy in Ephesus before very long.

Travel in the Roman world was slow, costly, and often dangerous.

A letter could reach Timothy long before Paul's own feet could.

Writing was Paul's way of staying present even while physically far away.

🚶 Paul hoped to visit Timothy soon
🐌 Travel then was slow and risky
✉️ A letter could arrive faster than Paul
📖 Writing kept Paul present from a distance
---
## ⏳ But If I Tarry Long

"Tarry" means to delay or stay away longer than expected.

Paul plans for the possibility that his visit might be postponed.

He does not want Timothy guessing at instructions in the meantime.

This letter was written to work whether Paul arrived soon or much later.

⏳ Tarry means to delay longer
🗺️ Paul planned for a possible delay
📋 Timothy needed clear instructions either way
📖 The letter works with or without Paul
---
## 🏠 How Thou Oughtest To Behave Thyself In The House Of God

"The house of God" is defined in the very next phrase as the church of the living God.

It is not a building, it is the gathered family of believers.

"Behave thyself" points to conduct that fits living inside that family well.

How someone acts changes once they see the church this way, as a household.

🏠 House of God means the church family
👪 Not a building, a gathered family
🎭 Behave fits living inside that family
📖 Seeing church this way changes conduct
---
## 🏛️ The Pillar And Ground Of The Truth

A "pillar" is a structural column that holds up the weight of a building.

"Ground" here means the foundation a building rests on.

Paul pictures the church as what holds truth up in plain view for everyone.

Without the church carrying it faithfully, that truth would have nowhere solid to stand.

🏛️ Pillar means a column holding weight
🧱 Ground means the foundation beneath it
👀 The church displays truth for all
📖 Truth needs a faithful place to stand
---
## ✅ Without Controversy Great Is The Mystery Of Godliness

"Without controversy" means this truth was not disputed among believers at the time.

"The mystery of godliness" names the hidden truth of how God became like us.

"Mystery" again means something once hidden, now fully revealed, not something puzzling.

What follows in this verse is likely an early hymn sung in the first churches.

✅ Without controversy means widely agreed
🌟 Mystery of godliness means God made known
🔓 Mystery means once hidden, now revealed
📖 A hymn about Christ likely follows next
---
## 👁️ God Was Manifest In The Flesh

"Manifest" means made visible, shown openly where it could be seen.

God the Son took on a real human body, real human flesh.

This is the heart of the incarnation, God becoming genuinely human.

The invisible God became someone people could actually see, hear, and touch.

👁️ Manifest means made visible to all
👤 God took on real human flesh
✝️ This is the heart of the incarnation
📖 The invisible God became touchable and near
---
## ⚖️ Justified In The Spirit

"Justified" here does not mean Jesus needed to be forgiven of sin.

It means he was proven right, vindicated before the world.

Many scholars connect this to the resurrection, where the Spirit's power confirmed who Jesus was.

His claims about himself were shown true, not left as an open question.

⚖️ Justified means proven right, not forgiven
🕊️ The Spirit confirmed who Jesus was
🌅 Many scholars connect this to the resurrection
📖 His claims were proven true, not left open
---
## 👼 Seen Of Angels, Preached Unto The Gentiles

Angels witnessed real moments in Christ's life, from his birth to his resurrection.

"Preached unto the Gentiles" marks a major turn in the story of this gospel.

Gentiles means anyone who is not Jewish by birth.

The same good news that angels watched unfold was now reaching the whole world.

👼 Angels witnessed real moments in Christ's life
🌍 Gentiles means people who are not Jewish
📣 The gospel reached far beyond Israel
📖 The whole world was now included
---
## 🌐 Believed On In The World, Received Up Into Glory

People across the known world were coming to trust in Christ.

"Received up into glory" points to the ascension, Christ returning to heaven.

This hymn moves from Christ's birth all the way to his return to glory.

The mystery of godliness is this whole story, God coming near and going home again.

🌐 People across the world believed
⬆️ Received up into glory means the ascension
📜 This hymn spans birth to ascension
📖 God came near, then returned home
`.trim();

export const FIRST_TIMOTHY_THREE_PERSONAL_SECTIONS = parseFirstTimothyThreeRawNotes(FIRST_TIMOTHY_THREE_RAW_NOTES);
