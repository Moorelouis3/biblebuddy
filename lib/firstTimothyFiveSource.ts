export type FirstTimothyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothyFiveRawNotes(rawText: string): FirstTimothyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 5:${startVerse}` : `1 Timothy 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Timothy 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_FIVE_RAW_NOTES = `# 1 Timothy 5:1-5
# 👪 Family Language For The Church
---
## 👴 Rebuke Not An Elder
"Elder" here means an older man in age, not only a formal church office.

Paul tells Timothy not to scold an older man the way he might correct a peer.

Instead Timothy should "intreat" him, an older spelling of entreat.

That word means a gentle appeal, not a harsh command.

👴 Elder here means an older man
🙅 Not a harsh public scolding
🙏 Intreat means a gentle appeal
📖 Age changes how correction is given
---
## 🤝 The Younger Men As Brethren
Timothy was likely still a younger man at this point in his ministry.

Paul tells him to treat men his own age like actual brothers.

"Brethren" means blood brothers, a tie stronger than ordinary friendship.

That family bond should shape how Timothy spoke to them.

👦 Timothy was a younger leader
🤝 Treat peers like real brothers
👨‍👩‍👧 Brethren pictures a blood tie
📖 Family love shaped his correction
---
## 👵 The Elder Women As Mothers
Paul extends the same family language to older women in the church.

Timothy was to honor them the way he would honor his own mother.

That respect ruled out any tone of superiority or impatience.

Age earned a certain kind of deference inside the church family.

👵 Older women deserve a mother's honor
🙇 No tone of superiority allowed
⏳ Age earned real deference here
📖 The church functions like one family
---
## 👧 The Younger As Sisters With All Purity
Paul adds a careful phrase here that the other comparisons did not need.

Timothy was close in age to these younger women, which created real risk.

"With all purity" is a built in guardrail against any romantic or improper tone.

Family language protected people only when purity was never set aside.

👧 Younger women are sisters here
⚠️ Closeness in age created risk
🛡️ Purity guards the family language
📖 Protection required purity, not just titles
---
## 👵 Honour Widows
This command names a group the ancient world often overlooked or exploited.

A widow with no husband and no children had no built in means of support.

The church was to step in and treat her care as a real duty.

Honor here included both respect and practical financial help.

👵 Widows often had no protection
🏛️ The ancient world easily overlooked them
⛪ The church was told to step in
📖 Honor meant respect plus real support
---
## 👶 If Any Widow Have Children Or Nephews
"Nephews" is an old word here and does not mean what it means today.

In this context it refers to grandchildren, not a sibling's children.

Paul expects a widow's own family to care for her before the church does.

Family responsibility comes first, and the church fills the gap behind it.

👶 Nephews here means grandchildren
👪 Family support comes first
⛪ The church helps after family does
📖 Responsibility starts at home
---
## 🏠 Learn First To Shew Piety At Home
"Shew" is simply an older spelling of show.

"Piety" here means devoted, practical care toward family members.

Children and grandchildren were expected to practice their faith inside their own household first.

Caring for an aging parent was treated as an act of worship.

📝 Shew is an old spelling of show
🏠 Piety means practical family care
👨‍👩‍👧 Faith was practiced at home first
📖 Caring for parents honors God
---
## 💰 To Requite Their Parents
"Requite" means to pay back a debt that was owed.

Paul pictures grown children repaying the care their parents once gave them.

Verse four calls this kind of care acceptable before God.

Caring for a parent is never wasted time in God's eyes.

💰 Requite means paying back a debt
👨‍👩‍👧 Children repay the care received
✅ God calls this acceptable care
📖 Caring for parents is never wasted
---
## 😔 A Widow And Desolate
"Desolate" describes someone left genuinely alone, with no family to lean on.

This widow has no children or grandchildren able to provide for her.

Her only remaining option is to depend fully on God.

She continues in prayer night and day instead of growing bitter.

😔 Desolate means truly alone
🚫 No family left to help her
🙏 She depends fully on God
📖 Prayer replaces bitterness here

# 1 Timothy 5:6-10
# 📋 Qualifying For The Widows List
---
## 💀 Dead While She Liveth
Paul contrasts this widow with one who chases constant pleasure instead.

"Liveth in pleasure" describes a life centered on self indulgence.

Physically she is alive, but spiritually she has already gone numb.

A life built only around pleasure can quietly become a kind of death.

💀 Spiritually dead though physically alive
🎉 Pleasure here means self indulgence
🥀 The soul can go numb slowly
📖 A wasted life still looks alive
---
## 📢 Give In Charge That They May Be Blameless
"Give in charge" means to command something with real authority.

Timothy was to teach these family duties plainly, not just suggest them.

"Blameless" means no one could rightly accuse a believer of neglecting this.

Clear teaching protected the whole church's reputation in the community.

📢 Give in charge means command plainly
🗣️ Timothy was to teach this directly
🙅 Blameless means no valid accusation
📖 Clear teaching protects the church's name
---
## 🏠 Worse Than An Infidel
Paul describes someone who refuses to provide for their own family.

"His own house" points to his closest relatives living under his roof.

"Denied the faith" means his actions openly contradict what he claims to believe.

Even an unbeliever usually cares for their own family without being told.

🏠 Refusing family support denies the faith
👪 His own house means closest relatives
🗣️ Actions can contradict claimed belief
📖 Even unbelievers care for their own
---
## 🔢 Taken Into The Number Under Threescore Years Old
"Threescore" is an old way of counting by twenties, three times twenty.

That puts the minimum age for this list at sixty years old.

This created an official, supported list of widows inside the early church.

Age here was treated as a sign of real, tested faithfulness.

🔢 Threescore means three times twenty
🎂 The minimum age was sixty
📋 This was an official church list
📖 Age reflected tested faithfulness
---
## 💍 The Wife Of One Man
This phrase does not describe a woman who was never widowed before.

It points to a woman who stayed faithful within one marriage.

She never pursued other relationships while her husband was alive.

Her track record of faithfulness mattered as much as her age.

💍 Not about being widowed only once
❤️ She stayed faithful in one marriage
🚫 No wandering while her husband lived
📖 A track record carried real weight
---
## 📋 Well Reported Of For Good Works
Paul lists concrete proof before any widow could join this official list.

A good reputation here was not based on feelings or rumor.

"If she have brought up children" names raising the next generation well.

Practical actions mattered more than mere claims of faith.

📋 Proof came from real actions
🗣️ Reputation here was not rumor
👶 Raising children counted as proof
📖 Faith shows itself in deeds
---
## 🦶 If She Have Washed The Saints' Feet
Roads in this region were dusty, and most people walked in open sandals.

Washing a guest's feet was a basic act of hospitality in that culture.

It was usually a task left to the lowest servant in the house.

A widow doing this herself showed genuine humility toward other believers.

🦶 Feet got dusty from travel
🧺 Washing feet welcomed a guest
🧎 Normally a servant's lowest task
📖 She served out of humility
---
## 🏠 If She Have Lodged Strangers
Traveling believers in this era often had nowhere safe to sleep.

Inns were scarce, and many were not considered safe for respected guests.

Opening her home to a stranger carried real personal risk.

Hospitality here meant real sacrifice, not a passing kindness.

🏠 Travelers often had nowhere to stay
🛏️ Inns were scarce and risky
🚪 She opened her home anyway
📖 Hospitality here demanded real sacrifice
---
## 🤲 If She Have Relieved The Afflicted
"Relieved" means she gave real, practical help to people in distress.

"The afflicted" could mean the sick, the poor, or anyone in crisis.

Paul closes the list with "every good work," refusing to limit it further.

A widow like this had already lived out years of quiet service.

🤲 Relieved means practical real help
🆘 The afflicted means anyone in crisis
♾️ Every good work left the list open
📖 Her life already proved her faith

# 1 Timothy 5:11-16
# ⚠️ Why Younger Widows Are Refused
---
## 🙅 The Younger Widows Refuse
Paul now adds an exception to the sixty and older rule just given.

Younger widows were not placed on this official supported list.

"Refuse" here means Timothy should decline to enroll them, not shun them personally.

The reason follows immediately in the next verse.

🙅 Younger widows were not enrolled
📋 This is about the official list
🚫 Refuse means decline enrollment, not reject
📖 A reason follows right after
---
## 📈 Wax Wanton Against Christ
"Wax" is an old word meaning to grow or become over time.

"Wanton" describes a desire that pulls someone away from devoted commitment.

Paul pictures a widow who had promised special service, then wanted to remarry.

That desire itself was not sin, but the broken vow created a real problem.

📈 Wax means grow over time
💔 Wanton means a pulling desire
💍 She had promised special service
📖 A broken vow caused the problem
---
## ⚖️ Cast Off Their First Faith
"Damnation" here is a strong word for judgment, not necessarily eternal hell.

Many scholars believe it describes serious spiritual consequences for breaking a pledge.

"Their first faith" points to a vow of service made when they joined this list.

Breaking a promise to God was treated as a serious, not casual, matter.

⚖️ Damnation here means serious judgment
📜 Breaking a vow carries real weight
🤝 First faith means her original pledge
📖 Promises to God are not casual
---
## 🛋️ Wandering About From House To House
"Idle" here does not just mean resting or taking a break.

Paul describes a habit of avoiding real responsibility altogether.

Going house to house without purpose often led to gossip and meddling.

Free time without purpose can quietly turn into trouble for others.

🛋️ Idle means avoiding real responsibility
🚪 Wandering led to constant gossip
👀 Purposeless time breeds meddling
📖 Free time needs real direction
---
## 🗣️ Tattlers Also And Busybodies
"Tattlers" means people who spread gossip and private information around.

"Busybodies" means people who meddle constantly in affairs that are not their own.

Paul pairs these because idle time often produces both habits together.

Speaking "things which they ought not" shows real, careless harm to others.

🗣️ Tattlers means spreading gossip around
👃 Busybodies means meddling in others' lives
🔗 Idle time bred both together
📖 Careless words really harm people
---
## 💍 I Will Therefore That The Younger Women Marry
Paul's solution for younger widows is remarriage, not idle church support.

"Guide the house" means managing a household's daily responsibilities well.

A full, purposeful life left little room for gossip or scandal.

This instruction answers the exact problem just described in verses eleven through thirteen.

💍 Remarriage was the solution given
🏠 Guide the house means managing it
⏳ A full life crowds out idleness
📖 This answers the problem just named
---
## 🚪 Give None Occasion To The Adversary
"The adversary" most likely refers to Satan, though it could include hostile critics.

"Occasion" means a chance or opening to attack.

"Reproachfully" means in a way meant to shame or discredit someone.

A believer's careless choices could hand outsiders real ammunition against the church.

😈 Adversary likely means Satan himself
🚪 Occasion means a chance to attack
🗯️ Reproachfully means meant to shame
📖 Small choices can damage a church's witness
---
## ⚠️ Some Are Already Turned Aside After Satan
Paul is not speaking hypothetically or about a distant possible danger.

This had already happened to real widows Timothy likely knew personally.

"Turned aside" pictures someone leaving the right path for a different one.

A real, specific failure stands behind this entire section of instructions.

⚠️ This had already really happened
👥 Timothy likely knew these women
🛤️ Turned aside means leaving the path
📖 A real failure shaped this teaching
---
## 💰 Let Not The Church Be Charged
"Charged" here means placed under a financial burden or expense.

Paul repeats the family first principle one final time in this chapter.

A believing relative should support her own widow before the church ever does.

That frees the church's limited resources for widows with no family left at all.

💰 Charged means a financial burden
👪 Family support still comes first
⛪ This frees up church resources
📖 True need gets the help

# 1 Timothy 5:17-20
# 👴 Honouring And Correcting Elders
---
## 👴 Elders That Rule Well
"Rule" here means to lead and oversee, not control harshly.

Not every elder served in exactly the same role within the church.

Some focused more on leadership, others more on teaching and preaching.

Paul already expects elders to manage their own households well in chapter three.

👴 Rule means lead and oversee
🧭 Elders served different specific roles
🏠 Household management showed readiness
📖 Good leadership deserved real honor
---
## 🙇 Worthy Of Double Honour
"Honour" here very likely includes both deep respect and real financial support.

"Double" suggests more than the ordinary respect given to any older believer.

Elders who taught and led carried extra weight and extra responsibility.

Churches were expected to support this work in practical, tangible ways.

🙇 Honour likely meant respect and pay
➕ Double means more than ordinary respect
📚 Teaching elders carried extra weight
📖 Churches supported this work practically
---
## 💪 Labour In The Word And Doctrine
This phrase singles out elders who preached and taught as their main work.

"Labour" pictures hard, ongoing effort, not a casual occasional task.

"The word and doctrine" means faithfully teaching scripture and sound belief.

This specific labor earned specific recognition beyond general church leadership.

💪 Labour means hard ongoing effort
📜 Word and doctrine means faithful teaching
🎯 This role was singled out
📖 Specific work earned specific honor
---
## 🐂 Thou Shalt Not Muzzle The Ox That Treadeth Out The Corn
Paul quotes an old law from Deuteronomy about working oxen.

Oxen walked in circles over grain to separate it from the husk.

A muzzled ox could smell food the whole time but never eat any of it.

Paul applies this picture directly to elders who labor for the church.

🐂 Oxen trampled grain to thresh it
🚫 A muzzle blocked the ox from eating
😤 Working that close to food was cruel
📖 Workers deserve to share in the harvest
---
## 📜 The Labourer Is Worthy Of His Reward
Paul pairs an Old Testament law with a saying from Jesus himself.

This phrase closely echoes words Jesus spoke in Luke's gospel.

Fair payment for real work was already expected before Paul wrote this.

Calling it "scripture" suggests Paul already viewed these words with full authority.

📜 Paired with an Old Testament law
✝️ It echoes words Jesus spoke
💰 Fair payment was already expected
📖 Paul treated this saying as scripture
---
## 🎯 Against An Elder Receive Not An Accusation
Public leaders make easy, convenient targets for a single false accusation.

Paul borrows a legal safeguard already found in the Old Testament law.

One single accuser was never enough to formally charge an elder.

This protected faithful leaders from being damaged by rumor alone.

🎯 Leaders were easy accusation targets
📜 This safeguard echoes Old Testament law
🙅 One accuser alone was not enough
📖 This protected leaders from rumor
---
## 👥 Before Two Or Three Witnesses
This legal standard comes directly from the law given through Moses.

Multiple independent witnesses had to confirm the same accusation.

This guarded against one person's grudge destroying a leader's reputation.

A serious charge needed serious, verified evidence before anyone acted.

📜 This rule echoes the law of Moses
👥 Multiple witnesses had to agree
😠 This guarded against personal grudges
📖 Serious charges needed verified evidence
---
## ⚖️ Them That Sin Rebuke Before All
Once an accusation against an elder was properly confirmed, correction followed publicly.

This was not about public humiliation for its own sake.

A public rebuke warned the rest of the church away from the same sin.

Clear consequences protected the whole congregation, not just the one elder.

⚖️ Confirmed sin faced public correction
🙅 Not humiliation for its own sake
👀 Others were warned by watching
📖 Clear consequences protected the church

# 1 Timothy 5:21-25
# ⚖️ A Solemn Charge To Timothy
---
## ⚖️ I Charge Thee Before God
Paul uses the most solemn language available to him in this entire letter.

This charge calls on God the Father and Jesus Christ as direct witnesses.

Naming them both shows how seriously Paul wants Timothy to treat this instruction.

What follows next was not a casual suggestion Timothy could set aside.

⚖️ Paul uses his most solemn language
🙏 God and Christ stand as witnesses
🎯 This shows real, total seriousness
📖 What follows demands real obedience
---
## 👼 And The Elect Angels
"Elect angels" refers to angels who never joined Satan's rebellion against God.

Paul adds them as a third witness alongside God and Christ.

This pictures Timothy's leadership decisions as watched by the unseen heavenly realm.

Even private choices about elders carried weight beyond human eyes.

👼 Elect angels stayed loyal to God
👀 They witness Timothy's leadership too
🌌 Heaven watches unseen decisions
📖 Private choices still carry real weight
---
## ❤️ Without Preferring One Before Another
This instruction connects directly back to judging elders without bias in the verses before.

Timothy could not treat a favorite elder more gently than one he disliked.

"Partiality" means letting personal feelings shape a supposedly fair decision.

Fair process mattered more than Timothy's personal friendships or grudges.

⚖️ Fairness applied to judging elders
❤️ Favorites could not get special treatment
🙅 Partiality means letting feelings decide
📖 Fair process outweighed friendship
---
## ✋ Lay Hands Suddenly On No Man
"Laying on of hands" here refers to publicly appointing someone to church leadership.

"Suddenly" means too quickly, without enough time to see a person's real character.

Paul already warned in chapter three against promoting a new convert too fast.

Patience in appointing leaders protected the whole church from a costly mistake.

✋ Laying on hands meant appointing leaders
⏳ Suddenly means rushed, without real testing
🌱 New converts needed time to mature
📖 Patience protected the church from harm
---
## 🤝 Neither Be Partaker Of Other Men's Sins
Ordaining someone too quickly made Timothy share responsibility for their later failures.

"Partaker" means taking a real share in something, here a share in guilt.

Timothy's own reputation was now tied to the leaders he approved.

Careful selection protected both the church and Timothy's own integrity.

🤝 Partaker means sharing real responsibility
⚠️ A bad choice became Timothy's guilt
🔗 His name was tied to theirs
📖 Careful choices protected everyone involved
---
## 🧼 Keep Thyself Pure
This short command closes out Paul's entire warning about hasty ordination.

"Pure" here points to Timothy staying personally free from others' moral failures.

Guarding his own integrity mattered as much as guarding the church's standards.

A leader's judgment is only as trustworthy as his own character.

🧼 Pure means free from others' failures
🛡️ Integrity mattered as much as standards
⚖️ Judgment depends on real character
📖 A leader must guard himself too
---
## 🍷 Use A Little Wine For Thy Stomach's Sake
This verse suddenly shifts to a personal, practical health instruction for Timothy.

Water in this region was often unsafe to drink without treatment.

A small amount of wine likely helped settle frequent stomach trouble.

This was medicinal advice, not a license for excess or drunkenness.

💧 Local water was often unsafe
🍷 Wine here served a medicinal purpose
🏥 It addressed frequent stomach trouble
📖 This was medicine, not excess
---
## 👀 Some Men's Sins Are Open Beforehand
Paul returns to the topic of carefully judging a potential elder's character.

Some people's sins are obvious right away, long before any formal judgment.

"Going before to judgment" means their guilt is already clear in advance.

Other people's sins only surface much later, after real trust has been given.

👀 Some sins are obvious right away
⚖️ Their guilt is already clear
⏳ Other sins surface only later
📖 Character takes real time to see
---
## 🌟 The Good Works Of Some Are Manifest Beforehand
Paul applies the same timing principle to good works, not only to sin.

"Manifest" means clearly visible and easy to recognize.

Some good character shows itself plainly before anyone even asks about it.

Even hidden goodness, Paul says, eventually cannot stay hidden forever.

🌟 The same principle applies to good
👁️ Manifest means clearly visible
🙋 Good character often shows itself early
📖 Hidden goodness surfaces eventually too
`.trim();

export const FIRST_TIMOTHY_FIVE_PERSONAL_SECTIONS = parseFirstTimothyFiveRawNotes(FIRST_TIMOTHY_FIVE_RAW_NOTES);
