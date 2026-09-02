export type JobThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyOneRawNotes(rawText: string): JobThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 31:${startVerse}` : `Job 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Job 31 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_ONE_RAW_NOTES = `# Job 31:1-4
# 🙏 A Covenant With Mine Eyes
---
## 🤝 I Made A Covenant With Mine Eyes

A covenant is a solemn promise made on purpose, not a passing feeling.

Job says he set this promise with his own eyes, the place temptation usually starts.

He made this vow long before this crisis, as a settled way of life.

This opens the whole chapter as a list of promises Job kept, not just claims he now makes.

🤝 A covenant is a solemn promise

👀 Job aimed this vow at his eyes

📅 He made it long before this crisis

📖 The chapter lists promises he actually kept

## ❓ Why Then Should I Think Upon A Maid

This is a rhetorical question, not a real one.

Job means that because of his vow, lustful thoughts about a young woman have no place in him.

Thinking here goes beyond a passing glance, it points to dwelling on desire.

Job ties his inner thought life to the same standard as his outward actions.

❓ This is a rhetorical question

🚫 Lustful thoughts have no place now

👁️ Thinking here means dwelling, not glancing

➡️ Inner thoughts must match outward actions

## 🎁 What Portion Of God Is There From Above

Portion here means a person's assigned share or reward from God.

Job asks what share the wicked really get, despite any short term gain.

This begins a section where Job reasons about consequences before listing his own conduct.

The question sets up the answer he gives himself in the next line.

🎁 Portion means an assigned share or reward

❓ Job asks what the wicked truly gain

⏳ Any gain from wickedness is short lived

📖 The question sets up his own answer

## 🏛️ What Inheritance Of The Almighty From On High

Inheritance means a lasting share passed down over time.

Job repeats portion and inheritance to ask the same question twice.

He wants to know what wicked people truly inherit from God.

The implied answer is nothing lasting, only ruin.

🏛️ Inheritance means a lasting share over time

🔁 Job repeats the question for emphasis

❓ What do wicked people truly inherit

📖 The implied answer is ruin, not reward

## ❓ Is Not Destruction To The Wicked

Job answers his own question here.

Destruction describes real ruin, not simply bad luck.

Job states plainly that judgment does eventually reach wicked people.

This sets the standard he will now hold his own life against.

❓ Job answers his own question

💥 Destruction means real, lasting ruin

⚖️ Judgment eventually reaches wicked people

📖 This sets Job's own standard

## ⚠️ A Strange Punishment To The Workers Of Iniquity

Strange here means unexpected or severe, not simply unusual.

Workers of iniquity means people who make a practice of doing wrong.

Job says their punishment fits how seriously God takes sin.

He is building the case he will use to test his own conduct.

⚠️ Strange means unexpected and severe

👥 Workers of iniquity means habitual sinners

⚖️ Their punishment matches the sin

📖 Job builds his own test case

## 🔄 Doth Not He See My Ways

Job shifts from talking about the wicked to talking about himself.

He states that God watches every path he walks, not just his public life.

This is the belief that makes Job's entire oath meaningful.

A promise means nothing if nobody is watching.

🔄 Job shifts to speaking of himself

👁️ God watches every path he walks

🙏 This belief anchors his whole oath

➡️ A promise needs a witness to matter

## 🦶 And Count All My Steps

Counting steps pictures God tracking every single movement Job makes.

Nothing in Job's life happens outside of God's notice.

This is not a frightening idea to Job, it is the reason he can make his case.

He is confident because he has nothing to hide.

🦶 Counting steps means tracking every movement

👀 Nothing in Job's life goes unseen

💪 Job is not afraid of this

📖 Confidence comes from having nothing to hide

# Job 31:5-8
# ⚖️ Weighed In An Honest Balance
---
## 💨 If I Have Walked With Vanity

Vanity here means emptiness, living for things that turn out to be worthless.

Job is asking whether his life has been built on anything false or hollow.

This opens a long list of if statements that make up Job's oath.

Each one names a specific sin and invites judgment if it is true.

💨 Vanity means emptiness or worthlessness

❓ Job asks if his life was hollow

📜 This begins his long list of oaths

📖 Each line invites judgment if true

## 🏃 My Foot Hath Hasted To Deceit

Hasted means rushed toward, moving quickly and eagerly.

Job pictures deceit as a direction his feet could have run toward.

He is asking whether he has actively pursued dishonest gain.

The image makes sin an action, not just a passing thought.

🏃 Hasted means rushed toward eagerly

🦶 Deceit is pictured as a direction

❓ Did Job pursue dishonest gain

➡️ Sin here means action, not just thought

## ⚖️ Let Me Be Weighed In An Even Balance

A balance was a scale used in ancient markets to measure fair weight.

An even balance means one that has not been tampered with or tipped unjustly.

Job asks God to weigh his whole life the same honest way.

He is confident enough to invite the most exact kind of judgment.

⚖️ A balance was a market scale

✅ Even means honest, not tipped unjustly

🙏 Job asks God to weigh his life

📖 He invites the most exact judgment

## 🧱 That God May Know Mine Integrity

Integrity means being whole and consistent, the same person in every situation.

Job wants God himself to confirm this, not just other people.

He is not asking to be declared perfect, only honest.

This word sets the standard for everything he lists after this.

🧱 Integrity means being whole and consistent

🙏 Job wants God to confirm it

✅ He asks to be honest, not perfect

📖 This word sets his whole standard

## 🔗 Mine Heart Walked After Mine Eyes

This continues the same picture from the start of the chapter.

Job asks whether his heart followed his eyes toward something forbidden.

The phrase links the step that turned aside with the desire that led it.

Wandering eyes and a wandering heart move together in this picture.

🔗 This continues the chapter's opening image

👀 Did his heart follow his eyes

🚶 A wandering step follows a wandering heart

➡️ Eyes and heart move together in sin

## 🖐️ Any Blot Hath Cleaved To Mine Hands

A blot pictures a stain, something visible left behind by wrongdoing.

Cleaved means stuck fast, not easily removed.

Job asks whether guilt has attached itself to anything he has done with his hands.

Hands represent his actions, the visible proof of what a person has actually done.

🖐️ A blot pictures a visible stain

🔒 Cleaved means stuck fast

❓ Has guilt attached to his actions

📖 Hands represent visible proof of deeds

## 🌾 Then Let Me Sow, And Let Another Eat

Sowing and eating describes the normal cycle of planting and enjoying the harvest.

Job says that if he is guilty, let that cycle break for him completely.

He is willing to lose the reward of his own labor.

This is a serious legal sounding oath, not a casual wish.

🌾 Sowing and eating pictures a normal harvest

🚫 Job asks for that cycle to break

💪 He risks losing his own labor's reward

📖 This is a formal, legal sounding oath

## 🌳 Let My Offspring Be Rooted Out

Offspring here means Job's own children and future family line.

Rooted out pictures a plant torn completely out of the ground.

This was one of the heaviest curses a person could call down on themselves.

Job stakes his own family's future on the truth of his claim.

🌳 Offspring means his children and family line

🌱 Rooted out pictures total removal

⚠️ This was among the heaviest curses

📖 Job stakes his family on this truth

# Job 31:9-12
# 🔥 The Weight Of Adultery
---
## 💔 If Mine Heart Have Been Deceived By A Woman

Deceived here means led astray by desire, not tricked by lies.

Job asks whether his heart was ever drawn toward another man's wife.

This follows the same inner to outer pattern used earlier in the chapter.

He starts with the heart before naming any actual deed.

💔 Deceived means led astray by desire

❓ Was Job drawn toward another's wife

🔁 This follows the chapter's inner to outer pattern

📖 He starts with the heart, not the deed

## 🚪 If I Have Laid Wait At My Neighbour's Door

Laid wait means watching secretly for an opportunity.

Job pictures himself lurking outside a neighbor's house with adultery in mind.

This moves from a hidden desire to an actual planned action.

Job denies both the feeling and the plan, not just the final act.

🚪 Laid wait means secretly watching

🏠 He pictures lurking near a neighbor's home

📈 This moves from desire to planning

📖 Job denies the plan, not just the act

## 🌾 Then Let My Wife Grind Unto Another

Grinding grain was daily, humble household work usually done by a wife or servant.

Some scholars believe this phrase may also picture a wife serving another man entirely.

Job says if he is guilty, let his own wife suffer that shame instead.

He puts his most personal relationship on the line as part of his oath.

🌾 Grinding grain was humble daily work

👀 It may picture deeper shame here

💔 Job risks his own wife's honor

📖 His most personal bond is on the line

## 🙇 Let Others Bow Down Upon Her

This continues the same painful picture from the line before it.

Bowing down here pictures submission to another man, not simple respect.

Job is naming the worst possible consequence he can imagine for himself.

The severity of the wish shows how seriously he takes this sin.

🔗 This continues the previous painful picture

🙇 Bowing down pictures submission to another man

😔 Job names the worst consequence he can imagine

📖 The severity shows how seriously he treats it

## 😨 For This Is An Heinous Crime

Heinous means shockingly evil, far worse than an ordinary mistake.

Job is not describing a small lapse in judgment.

He calls adultery by its true weight instead of softening it.

This word choice matches how seriously the rest of the Bible treats this sin.

😨 Heinous means shockingly evil

🚫 Not a small lapse in judgment

📢 Job names the sin's true weight

📖 The Bible treats this sin just as seriously

## ⚖️ Punished By The Judges

This crime was not just a private matter between two people.

Ancient Israel treated adultery as a crime the whole community had to address.

Judges here means the official leaders responsible for public justice.

Job places this sin under real legal consequence, not just personal shame.

⚖️ This was not only a private matter

🏛️ The whole community had to address it

👨‍⚖️ Judges means official leaders of justice

📖 Job places this under real legal weight

## 🔥 A Fire That Consumeth To Destruction

Fire here pictures something that spreads and destroys everything in its path.

Job is not describing a single mistake but an ongoing, consuming force.

This kind of sin does not stay contained to one moment or one person.

It burns through relationships, trust, and everything built around them.

🔥 Fire pictures spreading, total destruction

🚫 Not a single, contained mistake

💥 This sin does not stay contained

📖 It burns through trust and relationships

## 🌾 Would Root Out All Mine Increase

Increase here means everything Job had gained, family, flocks, and land together.

Rooted out again pictures total removal, nothing left standing.

Job says this sin would have destroyed everything he worked for, not just his marriage.

The picture ties back to the rooted out offspring from the section before.

🌾 Increase means everything Job had gained

🌳 Rooted out means total removal

💔 This sin threatens everything he built

➡️ It echoes the earlier rooted out image

# Job 31:13-15
# 🤝 Justice For His Servants
---
## 👥 If I Did Despise The Cause Of My Manservant Or Maidservant

Manservant and maidservant were household servants, often lower in social status than a free landowner.

Despise here means treating someone's complaint as unworthy of real attention.

Job asks whether he ever dismissed a servant's grievance simply because of their low position.

This is a striking claim for someone as wealthy and powerful as Job.

👥 Manservant and maidservant were household servants

🙄 Despise means dismissing a complaint unjustly

❓ Did Job ignore a servant's grievance

📖 This is striking for a man this powerful

## ⚖️ When They Contended With Me

Contended means bringing a formal complaint or disagreement.

Job pictures his own servants arguing a case directly against him.

He is asking whether he silenced them simply because he held more power.

Treating servants justly, even in conflict, becomes part of his claim to integrity.

⚖️ Contended means bringing a formal complaint

🗣️ Servants argued their case against him

🚫 Did Job silence them by force

📖 Fair treatment includes moments of real conflict

## 🔄 What Then Shall I Do When God Riseth Up

Job shifts from the servant's complaint to his own accountability before God.

Riseth up pictures God standing to act as judge.

Job asks himself what defense he could possibly offer if he had mistreated a servant.

The question exposes how seriously he takes his responsibility toward those under him.

🔄 Job shifts to his own accountability

⚖️ Riseth up pictures God acting as judge

❓ What defense could Job possibly offer

📖 He takes responsibility toward servants seriously

## 🔎 When He Visiteth, What Shall I Answer Him

Visiteth here means God coming to examine or judge a person's conduct.

Job doubles the question from the line before for emphasis.

He knows that wealth and status would offer no excuse before God.

Every answer he could give would fail if he had wronged a servant.

🔎 Visiteth means God examining conduct

🔁 Job repeats the question for emphasis

🚫 Wealth offers no excuse before God

📖 No answer would excuse wronging a servant

## 🤰 Did Not He That Made Me In The Womb Make Him

Job now gives the actual reason servants deserve fair treatment.

The same God who formed Job also formed his servant before birth.

This removes any idea that one person is naturally worth more than another.

Shared origin becomes the foundation for shared dignity.

🤰 God formed both master and servant

🟰 This removes any claim to natural rank

🙏 Shared origin grounds shared dignity

📖 Job's reasoning starts with creation, not custom

## 🛠️ Did Not One Fashion Us In The Womb

Fashion means to shape or form with careful intention, like a craftsman at work.

Job repeats the idea a second time to make sure the point lands.

Master and servant were shaped by the very same careful hand.

This is one of the clearest statements of human equality anywhere in the Old Testament.

🛠️ Fashion means shaping with careful intention

🔁 Job repeats the point for emphasis

🤝 Master and servant share the same maker

📖 This is a clear statement of human equality

# Job 31:16-18
# 🍞 A Table Open To The Needy
---
## ✋ If I Have Withheld The Poor From Their Desire

Withheld means holding back something someone genuinely needed.

Job asks whether he refused a reasonable request from someone poor.

This begins a new section focused on how Job treated the most vulnerable people around him.

He is willing to be judged on generosity, not only on honesty.

✋ Withheld means holding back something needed

❓ Did Job refuse a reasonable request

🔄 This section focuses on the vulnerable

📖 Job invites judgment on his generosity

## 👀 Caused The Eyes Of The Widow To Fail

Eyes failing pictures someone straining to see help arrive that never comes.

Widows in this culture had little legal protection and depended heavily on community support.

Job asks whether he ever let a widow wait in vain for his help.

The image makes neglect feel as real and painful as active harm.

👀 Failing eyes pictures hope wearing out

🏘️ Widows depended heavily on community support

❓ Did Job let a widow wait in vain

📖 Neglect can feel as painful as harm

## 🍞 Eaten My Morsel Myself Alone

Morsel means a portion of food, often a simple daily meal.

Eating alone here does not describe privacy, it describes selfishness.

Job asks whether he ever kept his food to himself while others went hungry nearby.

Hospitality was expected in this culture, not simply admired.

🍞 Morsel means a simple portion of food

🙅 Eating alone here means selfishness

❓ Did Job hoard food from others

📖 Hospitality was expected, not just admired

## 👶 The Fatherless Hath Not Eaten Thereof

Fatherless describes orphans, among the most vulnerable people in this society.

Job asks whether any orphan went hungry while he had food to share.

This verse pairs directly with the one before it as one complete thought.

Job's table was meant to be open, not closed.

👶 Fatherless means orphans, deeply vulnerable

❓ Did an orphan go hungry near him

🔗 This pairs directly with the line before

📖 Job's table stayed open to others

## 📅 From My Youth He Was Brought Up With Me, As With A Father

Job now defends his lifelong record, not just one moment.

He says he raised orphans in his household from his own youth onward.

Acting as a father to a fatherless child was a real, ongoing commitment.

This was not a single act of charity but a whole way of life.

📅 Job defends his lifelong record

👨‍👧 He acted as a father to orphans

🤝 This was ongoing commitment, not one act

📖 Generosity shaped his whole way of life

## 🧭 I Have Guided Her From My Mother's Womb

Some scholars believe this line describes Job's care for a specific widow from the moment his own life began.

Guided pictures ongoing protection and provision over many years.

The switch to a specific woman shows this was not an abstract claim.

Job is naming a real, lasting relationship of care.

🧭 Guided pictures ongoing protection over years

👩 This may describe a specific widow

📖 Job names a real relationship of care

➡️ His claim was specific, not abstract

# Job 31:19-23
# 🧥 Clothing The Poor, Protecting The Fatherless
---
## 💀 If I Have Seen Any Perish For Want Of Clothing

Perish here means dying or suffering severely, not simply feeling uncomfortable.

Want of clothing points to real poverty, not a minor inconvenience.

Job asks whether he ever watched someone suffer this way and did nothing.

This begins a section built entirely around Job's care for the poor.

💀 Perish means dying or severe suffering

🧥 Want of clothing points to real poverty

❓ Did Job watch and do nothing

📖 This section centers on care for the poor

## 🔁 Any Poor Without Covering

Covering repeats the same idea as clothing for emphasis.

In this climate, lacking proper covering could mean real danger, not just embarrassment.

Job widens the question from one person to anyone in this situation.

He is claiming a consistent pattern, not a single act of kindness.

🔁 Covering repeats clothing for emphasis

🥶 Lacking covering could mean real danger

🌍 Job widens the claim to anyone

📖 He claims a consistent pattern of care

## 🧍 If His Loins Have Not Blessed Me

Loins here stands for the poor person's whole body, kept warm by Job's gift.

Blessed me means the person genuinely thanked Job for real help received.

Job is asking whether the poor he helped ever had reason to be grateful.

This ties his generosity to a real, remembered result.

🧍 Loins stands for the poor person's body

🙏 Blessed me means real, spoken gratitude

❓ Did the poor have reason to thank him

📖 His generosity produced a real result

## 🐑 Warmed With The Fleece Of My Sheep

Fleece means the wool sheared from Job's own flocks.

Wool clothing was a basic, practical way to survive cold nights in this region.

Job gave away wool from his own herds, not leftover scraps.

His wealth became a direct source of warmth for people who had none.

🐑 Fleece means wool sheared from his flocks

🧣 Wool clothing helped people survive cold nights

🎁 Job gave from his own herds directly

📖 His wealth became warmth for the needy

## 🔄 If I Have Lifted Up My Hand Against The Fatherless

This shifts from generosity to the opposite question, active harm.

Lifted up my hand pictures a real threat or act of violence.

Job asks whether he ever used his power against a child with no protector.

The fatherless had almost no one else to defend them in this culture.

🔄 This shifts to the question of harm

✊ Lifted up my hand pictures real violence

❓ Did Job threaten a child with no protector

📖 Orphans had almost no one to defend them

## 🚪 When I Saw My Help In The Gate

The gate was the place where legal cases and public decisions were made in a city.

Having help in the gate meant Job held real influence over local justice.

Job asks whether he used that influence to crush a defenseless child instead of protecting one.

Power used against the powerless is the sin being named here.

🚪 The gate was where legal cases were judged

⚖️ Having help there meant real influence

❓ Did he use it against a child

📖 Power against the powerless is the sin here

## ⚡ Then Let Mine Arm Fall From My Shoulder Blade

This is Job calling down a physical curse on himself if the charge is true.

The arm represents strength and the ability to act, especially to harm someone.

Job is willing to lose that strength entirely as the price of guilt.

The punishment fits the crime, a violent hand paid for with a broken arm.

⚡ Job calls a physical curse on himself

💪 The arm represents strength to act or harm

🚫 He risks losing that strength completely

📖 The punishment matches the crime exactly

## 🦴 Mine Arm Be Broken From The Bone

This repeats and intensifies the curse from the line before it.

Breaking from the bone pictures total, permanent disability, not a temporary injury.

Job is not exaggerating for effect, this was a genuine legal style oath.

He stakes his own body on the truth of his claim.

🔁 This intensifies the previous curse

🦴 Broken from the bone means permanent disability

⚖️ This was a real, legal style oath

📖 Job stakes his body on this truth

## 🎯 Destruction From God Was A Terror To Me

Job now explains his motive for all these promises at once.

Terror here means a deep, reverent fear of facing God's judgment.

This fear was not about losing wealth, it was about standing before God guilty.

That fear shaped every choice Job claims to have made.

🎯 Job now explains his motive

😨 Terror means reverent fear of judgment

🙏 The fear was about standing guilty before God

📖 This fear shaped every choice he made

## 👑 By Reason Of His Highness I Could Not Endure

Highness here means God's overwhelming greatness and authority.

Job says he could not bear the thought of facing that greatness while guilty.

This line closes the section by returning to the fear of God introduced earlier.

Job's ethics are rooted in who God is, not simply in social rules.

👑 Highness means God's overwhelming greatness

😔 Job could not bear facing it guilty

🔗 This returns to Job's earlier fear of God

📖 His ethics are rooted in who God is

# Job 31:24-28
# ✨ Trusting Gold, Sun, And Moon
---
## 🎯 If I Have Made Gold My Hope

Hope here means the thing a person trusts to secure their future.

Job asks whether he ever looked to wealth instead of God for real security.

This begins a new section about where Job placed his ultimate trust.

Money itself is not the sin, trusting in it completely is.

🎯 Hope means what a person trusts for security

❓ Did Job trust wealth instead of God

🔄 This section is about ultimate trust

📖 Trusting money completely is the real sin

## ✨ Said To The Fine Gold, Thou Art My Confidence

Fine gold means gold refined to its purest, most valuable form.

Job pictures himself speaking directly to his wealth as if it could answer him.

Confidence here means the thing a person leans on when everything else is uncertain.

Talking to gold this way would mean treating it almost like a god.

✨ Fine gold means gold in its purest form

🗣️ Job pictures speaking directly to his wealth

🦺 Confidence means what a person leans on

📖 This treats gold almost like a god

## 🎉 If I Rejoiced Because My Wealth Was Great

Rejoiced here does not mean simple gratitude for what he had.

Job is asking about a deeper kind of pride, finding his identity in how much he owned.

There is a real difference between thanking God for provision and boasting in riches.

Job wants that difference examined honestly.

🎉 Rejoiced here means prideful boasting

🆔 Did wealth become his identity

🙏 Gratitude and pride are not the same

📖 Job wants this difference examined honestly

## ✋ Because Mine Hand Had Gotten Much

Mine hand had gotten pictures wealth as something Job personally earned by his own effort.

Job asks whether he ever forgot that his ability to gain wealth came from God in the first place.

Crediting only himself for success would be its own quiet form of pride.

This card exposes a subtle sin, not an obvious one.

✋ His hand pictures wealth he personally earned

🙏 Did he forget God gave that ability

🤫 Taking credit alone breeds quiet pride

📖 This exposes a subtle, easy to miss sin

## 👁️ If I Beheld The Sun When It Shined

Beheld here means looking with reverence, almost worship, not just noticing.

Sun worship was common among many of Job's neighboring nations in the ancient world.

Job asks whether he ever gave the sun the kind of honor that belongs only to God.

This moves the chapter from money to a different kind of idolatry.

👁️ Beheld here means looking with reverence

☀️ Sun worship was common among neighboring nations

❓ Did Job honor the sun like a god

📖 This shifts to a different kind of idolatry

## 🌙 Or The Moon Walking In Brightness

Walking in brightness pictures the moon moving steadily and gloriously across the night sky.

Moon worship was also widespread in the ancient Near East alongside sun worship.

Job denies giving either heavenly body the devotion that belongs to its Creator.

Even beautiful, impressive things can quietly pull worship away from God.

🌙 Walking in brightness pictures the moon's steady glow

🌍 Moon worship was also common nearby

🚫 Job denies devotion to either one

📖 Beautiful things can quietly steal worship

## 🎣 My Heart Hath Been Secretly Enticed

Enticed means drawn in or tempted toward something forbidden.

Secretly matters here because this is about private devotion, not public ritual.

Job is claiming that even his hidden heart never turned toward these false gods.

Real integrity includes the thoughts nobody else can see.

🎣 Enticed means drawn toward something forbidden

🤫 Secretly points to private, hidden devotion

🙏 Job's hidden heart stayed faithful too

📖 Real integrity includes unseen thoughts

## 💋 My Mouth Hath Kissed My Hand

This describes an actual ancient gesture of worship, blowing a kiss toward an idol or the sky.

The gesture was a small, physical act, not just an inner feeling.

Job denies performing even this brief, private ritual toward the sun or moon.

He rules out both the inward temptation and the outward act.

💋 This describes an ancient worship gesture

👋 It was small but still a real act

🚫 Job denies performing it privately

📖 He rules out both temptation and action

## ⚖️ This Also Were An Iniquity To Be Punished By The Judge

Job names idolatry using the same legal language he used for adultery earlier.

Iniquity here means a serious moral crime, not a small mistake.

The judge refers to the official responsible for punishing crimes under Israelite style law.

Job treats secret idolatry as seriously as any public offense.

⚖️ Job uses the same legal language again

🚫 Iniquity means a serious moral crime

👨‍⚖️ The judge punished crimes under this law

📖 Secret idolatry gets treated like any offense

## 🚫 For I Should Have Denied The God That Is Above

Denied here means rejecting God's rightful place, even without saying so out loud.

Job explains exactly why idolatry is so serious, it replaces God with something else.

Worship given to the sun or moon is worship taken away from the Creator.

This line names the true stakes behind everything in this section.

🚫 Denied means rejecting God's rightful place

🔄 Idolatry replaces God with something else

☀️ Worship given elsewhere is worship stolen from God

📖 This names the true stakes of the section

# Job 31:29-32
# 🚪 Mercy For Enemies And Strangers
---
## 🔄 If I Rejoiced At The Destruction Of Him That Hated Me

Job now turns to how he treated his enemies, not just his friends.

Rejoicing at someone's downfall is a very human, very tempting reaction.

Job asks whether he ever celebrated when someone who hated him suffered real ruin.

This is one of the harder standards in the entire chapter to actually keep.

🔄 Job turns to how he treated enemies

😈 Rejoicing at downfall is a tempting reaction

❓ Did he celebrate an enemy's ruin

📖 This is one of the chapter's hardest standards

## 📈 Lifted Up Myself When Evil Found Him

Lifted up myself pictures pride, feeling superior when someone else fails.

Job pairs open rejoicing with this quieter, more private kind of satisfaction.

Even silent pride over another person's downfall counts as the same sin.

Job holds his private reactions to the same standard as his public words.

📈 Lifted up myself pictures quiet pride

🤫 This pairs with the open rejoicing before it

😔 Silent pride still counts as the same sin

📖 Private reactions get the same standard too

## ✅ Neither Have I Suffered My Mouth To Sin

Suffered here means allowed or permitted, not experienced pain.

Job is claiming he kept careful control over his own speech.

This continues the theme of controlling reactions toward people who hurt him.

Words spoken in anger were treated as sin, not just careless talk.

✅ Suffered here means allowed or permitted

🗣️ Job claims control over his own speech

🔗 This continues the theme of self control

📖 Angry words counted as real sin here

## 😠 By Wishing A Curse To His Soul

Wishing a curse means hoping for someone's eternal ruin, not just their bad day.

Soul here points to the deepest part of a person, beyond just their body or reputation.

Job denies ever wanting that level of destruction for even his worst enemy.

This sets an extremely high bar for how to treat people who hate you.

😠 Wishing a curse means hoping for ruin

🕯️ Soul points to a person's deepest part

🚫 Job denies wanting this even for enemies

📖 This sets an extremely high standard

## 🏕️ If The Men Of My Tabernacle Said Not, Oh That We Had Of His Flesh

The men of my tabernacle means Job's own household and servants.

This strange sounding line pictures how well fed and satisfied Job's whole household was.

It was a kind of joking overstatement, not a literal complaint about hunger.

Job used his household's own testimony as proof of his generosity.

🏕️ The tabernacle here means Job's household

🍖 The line pictures how well fed they were

😄 It was exaggeration, not a literal complaint

📖 Job's own household testified to his generosity

## 🍽️ We Cannot Be Satisfied

This continues the household's joking complaint from the verse before.

It means Job fed guests and workers so well there was always food to spare.

The joke actually proves the opposite of hunger, constant abundance.

Job's hospitality left even his own servants with nothing to complain about honestly.

🔗 This continues the household's joking complaint

🍽️ It proves constant abundance, not hunger

😄 The joke shows the opposite of want

📖 His hospitality left nothing honest to complain about

## 🌙 The Stranger Did Not Lodge In The Street

Lodging in the street meant having nowhere safe to sleep at night.

Hospitality to strangers was considered a serious moral duty across the ancient Near East.

Job says no traveler was ever left without shelter because of him.

This claim connects back to his earlier care for the poor and fatherless.

🌙 Lodging in the street meant no safe shelter

🏘️ Hospitality was a serious ancient duty

🚫 No traveler went without shelter near him

📖 This connects to his care for the poor

## 🚪 I Opened My Doors To The Traveller

Opening doors pictures Job actively welcoming strangers rather than simply not turning them away.

A traveller in this world had almost no protection outside of someone's hospitality.

Job made his own home part of the safety net for people passing through.

This closes the section with action, not just the absence of cruelty.

🚪 Opening doors pictures active welcome

🧳 Travellers had little protection otherwise

🏠 His home became part of their safety

📖 The section closes on action, not just restraint

# Job 31:33-34
# 🙈 Hiding Sin Like Adam
---
## 📜 If I Covered My Transgressions As Adam

This is the only place in the whole book of Job where Adam is named directly.

Job compares hiding sin to Adam and Eve hiding from God after eating the forbidden fruit.

Covered here means concealing something on purpose, not simply staying quiet about it.

Job asks whether he ever hid his own wrongdoing the same way Adam did.

📜 This is the only direct mention of Adam

🍎 Job compares hiding sin to the garden

🙈 Covered means concealing something on purpose

📖 Did he hide wrongdoing the same way

## 🫀 By Hiding Mine Iniquity In My Bosom

Bosom means the chest, pictured here as a hiding place close to the heart.

Job pictures guilt tucked away somewhere private instead of confessed openly.

This is about secret sin, the kind nobody else would ever discover on their own.

Job claims he never kept that kind of hidden guilt.

🫀 Bosom pictures the chest, close to the heart

🙈 Guilt is pictured as hidden away

🤫 This is about undiscoverable secret sin

📖 Job claims he never carried hidden guilt

## 👥 Did I Fear A Great Multitude

Multitude means a large crowd of people, in this case public opinion at large.

Job asks whether fear of what many people thought ever kept him from being honest.

This introduces a new reason people hide sin, worry about their public reputation.

Job claims his honesty did not depend on how many people were watching.

👥 Multitude means a large crowd of people

😨 Did fear of opinion keep him silent

📢 This names fear of reputation as a motive

📖 His honesty did not depend on an audience

## 😤 The Contempt Of Families Terrify Me

Contempt means open scorn or disrespect from other households in the community.

Terrify shows this fear could be personal and specific, not just a vague worry.

Job asks whether fear of one family's judgment ever silenced him about his own sin.

Even smaller scale social pressure gets named here alongside the larger crowd.

😤 Contempt means open scorn from others

😨 Terrify shows this fear was personal

👪 Did one family's judgment silence him

📖 Small scale pressure is named alongside the crowd

## 🚪 That I Kept Silence, And Went Not Out Of The Door

Keeping silence and staying indoors both picture someone hiding from public view out of shame.

Job asks whether guilt ever kept him shut away from his own community.

He is claiming that his conscience was clear enough to face anyone, anytime.

This closes the section by tying public confidence to private honesty.

🚪 Staying indoors pictures hiding from shame

🤐 Silence pictures avoiding public view

✅ His conscience let him face anyone

📖 Public confidence came from private honesty

# Job 31:35-37
# 📜 Longing For God To Answer
---
## 😢 Oh That One Would Hear Me

This is a sudden, emotional outburst in the middle of Job's formal oath.

Job has spent this whole chapter defending himself with nobody actually answering him.

He longs for someone, anyone, to finally respond to everything he has said.

The frustration of being unheard is its own kind of suffering.

😢 This is a sudden emotional outburst

🗣️ Job has defended himself with no answer

🙏 He longs for someone to respond

📖 Being unheard is its own suffering

## 🎯 That The Almighty Would Answer Me

Job names exactly who he wants to hear from, God himself, not just other people.

This is bold, Job is asking the Creator to respond directly to his case.

He has said hard things about God's silence earlier in the book.

Here that longing turns into an actual formal request.

🎯 Job names exactly who he wants

🙏 He asks the Creator to respond directly

😔 This builds on his earlier complaints

📖 Longing becomes a formal request here

## ⚖️ That Mine Adversary Had Written A Book

Adversary here likely means God himself, acting as the opposing party in a legal case.

A written book pictures a formal, official list of charges against Job.

Job wants his accuser to put every accusation in writing instead of leaving it vague.

He would rather face clear charges than endure unexplained suffering.

⚖️ Adversary here likely means God as accuser

📜 A written book pictures formal charges

❓ Job wants clear charges, not vague suffering

📖 He prefers a real case to silence

## 💪 I Would Take It Upon My Shoulder, And Bind It As A Crown

Job says he would carry the list of charges proudly rather than in shame.

Binding something as a crown pictures wearing it in plain public view.

This shows Job's confidence, he believes he could answer every single charge honestly.

He is not afraid of scrutiny, only of never getting the chance to answer it.

💪 Job would carry the charges proudly

👑 A crown means wearing it in public

✅ This shows his confidence in his own honesty

📖 He fears silence more than scrutiny

## 🦶 I Would Declare Unto Him The Number Of My Steps

Declaring the number of his steps means Job would account for his entire life in detail.

This echoes the earlier line where Job said God already counts every step he takes.

Job is offering to give his own account instead of waiting to be accused.

He trusts that his record would hold up under that kind of close examination.

🦶 Declaring his steps means a full life account

🔗 This echoes God counting his steps earlier

🙋 Job offers his own account voluntarily

📖 He trusts his record to hold up

## 👑 As A Prince Would I Go Near Unto Him

A prince approached a king with confidence, not with fear or groveling.

Job pictures himself approaching God the same bold way, not as a beggar.

This is not arrogance, it comes from Job's confidence that he has nothing to hide.

The chapter's whole oath has been building toward this moment of bold confidence.

👑 A prince approached with confidence, not fear

🚶 Job pictures approaching God boldly

✅ This comes from having nothing to hide

📖 The chapter builds toward this confidence

# Job 31:38-40
# 🌾 The Land As A Witness
---
## 🌾 If My Land Cry Against Me

Job pictures his own farmland as a witness that could testify against him.

Crying out here means the land itself bearing evidence of wrongdoing.

This begins Job's final oath, this time about how he treated his property and workers.

Even something as ordinary as farmland gets pulled into his search for honesty.

🌾 The land is pictured as a witness

📢 Crying out means bearing evidence

🔄 This begins his final area of oath

📖 Even ordinary property gets examined honestly

## 🟤 The Furrows Likewise Thereof Complain

Furrows are the long grooves cut into soil for planting seed.

Complaining furrows continues the same picture of land testifying against a dishonest owner.

Job imagines the very ground remembering how it was treated and by whom.

This poetic image raises the stakes of honesty to include the land itself.

🟤 Furrows are grooves cut for planting

🔗 This continues the land as witness image

🌱 The ground is pictured as remembering

📖 Honesty here extends even to the land

## 🍇 If I Have Eaten The Fruits Thereof Without Money

Eating fruit without money pictures taking a harvest without ever paying the person who grew it.

This points to exploiting workers or tenant farmers instead of paying them justly.

Job asks whether he ever profited from land while cheating the people working it.

Economic honesty gets tied directly to Job's larger claim of integrity.

🍇 Eating without paying means exploiting workers

👨‍🌾 This points to unfair treatment of tenants

❓ Did Job profit while cheating workers

📖 Economic honesty is part of his integrity

## ⚠️ Caused The Owners Thereof To Lose Their Life

This is a serious accusation Job denies, having someone killed to seize their land.

Losing their life here means Job is ruling out the worst possible form of land theft.

This kind of crime does appear elsewhere in the Old Testament as a real danger for the powerful.

Job holds himself to the highest possible standard, not just an average one.

⚠️ This denies the worst kind of land theft

💀 Losing their life means actual killing

📜 Similar crimes appear elsewhere in the Old Testament

📖 Job holds himself to the highest standard

## 🌾 Let Thistles Grow Instead Of Wheat, And Cockle Instead Of Barley

Thistles and cockle were both useless weeds that choked out real crops.

Wheat and barley were the two staple grains that fed Job's entire household.

Job asks for his own land to become worthless if any of his oath is false.

This final curse ties his fate directly back to the land he just defended.

🌾 Thistles and cockle were useless weeds

🍞 Wheat and barley were his staple crops

🚫 Job risks his own land becoming worthless

📖 His fate ties directly to the land itself

## 🔚 The Words Of Job Are Ended

This short line closes not just the chapter but Job's entire speech that began several chapters earlier.

Job has finished the longest, most detailed defense of his own character in the whole book.

He has nothing left to add, having already covered his thoughts, words, and actions completely.

The silence that follows sets up whatever answer comes next in the story.

🔚 This closes Job's entire long speech

📜 It is the longest defense in the book

✅ He has nothing left to add

📖 His silence sets up what comes next
`.trim();

export const JOB_THIRTY_ONE_PERSONAL_SECTIONS = parseJobThirtyOneRawNotes(JOB_THIRTY_ONE_RAW_NOTES);
