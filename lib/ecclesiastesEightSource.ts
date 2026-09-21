export type EcclesiastesEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesEightRawNotes(rawText: string): EcclesiastesEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 8:${startVerse}` : `Ecclesiastes 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Ecclesiastes 8 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_EIGHT_RAW_NOTES = `# Ecclesiastes 8:1-2
# 😊 A Wise Man's Shining Face
---
## Who Is As The Wise Man

This question expects one honest answer, no one compares.

A wise person reads a situation and actually understands what it means.

Most people only notice the surface of an event.

Wisdom sees the deeper pattern underneath it.

That kind of clarity sets a wise person apart from everyone else.

❓ This question expects one honest answer
🧠 Wisdom reads situations clearly
👀 Most people only see the surface
📖 Clarity sets the wise apart

## A Man's Wisdom Maketh His Face To Shine

"Shine" here pictures a face that looks calm, open, and at peace.

Wisdom does not just change what a person thinks.

It visibly changes how a person looks to everyone watching.

A troubled mind usually shows on the face first.

A settled mind shows there too.

✨ Shine means a calm, open expression
🧠 Wisdom changes more than thoughts
👁️ A troubled mind often shows on the face
📖 A settled mind shows there too

## The Boldness Of His Face Shall Be Changed

"Boldness" here means a hard, defiant expression.

Wisdom softens that harsh look into something more pleasant.

A hard face often hides confusion or fear underneath it.

Wisdom removes the need for that mask.

The change described here is visible, not just internal.

😠 Boldness means a hard, defiant look
🕊️ Wisdom softens that harsh expression
🎭 A hard face can hide real fear
📖 Wisdom's change shows on the outside

## I Counsel Thee To Keep The King's Commandment

The Preacher shifts here from wisdom in general to advice about power.

"Counsel" means strong, careful guidance, not a casual suggestion.

Ancient kings held near total authority over the people under them.

Following a king's command was often a matter of survival.

It was not just about respect.

👑 The Preacher shifts to advice about power
📢 Counsel means careful, serious guidance
⚔️ Ancient kings held near total authority
📖 Wisdom includes living carefully under power

## In Regard Of The Oath Of God

Officials in this culture often swore a formal oath of loyalty to their king.

That oath was made in God's name, not just the king's.

Breaking loyalty to the king meant breaking a promise made to God.

This raised the stakes of obedience far beyond simple politics.

Respecting the king also meant keeping a promise to God.

📜 Oaths of loyalty were sworn to kings
🙏 That oath was made in God's name
⚠️ Breaking it meant breaking a promise to God
📖 Obeying the king kept a promise to God

# Ecclesiastes 8:3-4
# 👑 The Word Of A King Is Power
---
## Be Not Hasty To Go Out Of His Sight

"Hasty" here means acting rashly, without thinking a decision through.

This warns against storming out of a king's presence in anger.

In this culture, abandoning a king's court could look like open rebellion.

A calm exit protected a person far better than an impulsive one.

Wisdom includes knowing how to leave a difficult moment carefully.

⚡ Hasty means acting rashly, without thought
🚪 This warns against storming out in anger
⚔️ Leaving abruptly could look like rebellion
📖 Wisdom leaves carefully, even under pressure

## Stand Not In An Evil Thing

This does not mean avoiding evil in general.

It means do not stubbornly oppose the king's decision in public.

Arguing openly with a king's ruling was a genuinely dangerous position.

The wise choice was often to yield, not to make a stand.

Picking that fight rarely ended well for the one who picked it.

🚫 This is not a general warning against evil
🧍 It means do not oppose the king's ruling
⚠️ Arguing publicly was genuinely dangerous
📖 Yielding was often the wiser choice

## For He Doeth Whatsoever Pleaseth Him

This states the blunt reality of ancient royal power plainly.

A king in this era answered to no earthly authority above him.

His decisions did not require anyone else's approval.

That reality shaped how carefully a wise person had to move around him.

Recognizing real power clearly is itself a form of wisdom.

👑 This states royal power bluntly
🚫 A king answered to no one above him
🧩 His decisions needed no one's approval
📖 Recognizing real power is itself wisdom

## Where The Word Of A King Is, There Is Power

A king's spoken word carried the same weight as a written law.

No separate process was needed to make it binding.

The moment he spoke, that word already had force behind it.

This is a plain statement about how absolute monarchy actually worked.

Understanding that system explains why caution around a king mattered so much.

🗣️ A king's spoken word carried legal weight
⚡ No extra process was needed to enforce it
📜 The word had force the moment spoken
📖 This explains why caution mattered so much

## Who May Say Unto Him, What Doest Thou

This is a rhetorical question expecting one answer, no one.

No official or citizen could demand an explanation from the king.

That absence of accountability is what made his presence risky to be near.

The lack of anyone to question him is the real point being made.

Wisdom respects power honestly instead of pretending it works differently.

❓ The expected answer is no one
🚫 No one could demand an explanation from him
⚠️ That is what made his presence risky
📖 Wisdom respects power honestly

# Ecclesiastes 8:5-7
# ⏳ Time And Judgment
---
## Whoso Keepeth The Commandment Shall Feel No Evil Thing

This continues the advice about living carefully under a king's authority.

Someone who obeys wisely avoids a great deal of unnecessary trouble.

This is not a promise that obedience prevents every hardship in life.

It means careful, submissive living sidesteps a lot of self made trouble.

Wisdom often looks like simply not picking unnecessary fights.

✅ This continues advice about living under authority
🧠 Wise obedience avoids a lot of trouble
🚫 It is not a promise against all hardship
📖 Wisdom often avoids unnecessary fights

## A Wise Man's Heart Discerneth Both Time And Judgment

"Discerneth" means recognizing something correctly, not just guessing at it.

A wise person senses both the right moment and the right way to act.

"Time" refers to timing, and "judgment" refers to the correct decision itself.

Good timing without good judgment still fails.

Wisdom means knowing when to move, not only what to do.

🧠 Discerneth means recognizing something correctly
⏰ Time means the right moment to act
⚖️ Judgment means the right decision itself
📖 Wisdom knows when to move, not just what

## Because To Every Purpose There Is Time And Judgment

"Purpose" here means any given task, plan, or event in life.

Every one of them has both a right moment and a right response.

Most people only think about what to do.

They forget to also ask when to do it.

Wisdom always considers both halves together.

🎯 Purpose means any task, plan, or event
⏳ Every one has a right time and response
🚫 Most people ignore timing, not just action
📖 Wisdom considers both halves together

## Therefore The Misery Of Man Is Great Upon Him

This names the cost of ignoring time and judgment honestly.

Acting at the wrong moment still causes real pain.

Good intentions do not cancel out bad timing.

The Preacher is describing a common, repeated human failure.

Misery often comes from bad timing, not only bad choices.

😣 This names the cost of ignoring timing
⚠️ Wrong timing causes real pain
🔁 This is common, not rare bad luck
📖 Misery often comes from bad timing

## For He Knoweth Not That Which Shall Be

No human being can reliably predict what tomorrow actually holds.

This limit applies to everyone, wise or foolish, powerful or weak.

Uncertainty about the future is simply part of being human.

That is a repeated theme throughout this entire book.

Accepting this limit is itself a mark of wisdom.

🔮 No one can reliably predict tomorrow
🌍 This limit applies to everyone equally
🔁 It is a repeated theme in this book
📖 Accepting this limit is wisdom

## For Who Can Tell Him When It Shall Be

This rhetorical question expects the same answer as before, no one.

Knowing something will eventually happen does not reveal exactly when.

That gap between knowing and knowing when is where anxiety usually lives.

The Preacher names that gap honestly instead of pretending it can close.

Peace comes from accepting the gap, not from trying to erase it.

❓ This expects the same answer, no one
⏳ Knowing something will happen is not knowing when
😟 That gap is where anxiety usually lives
📖 Peace accepts the gap instead of erasing it

# Ecclesiastes 8:8
# ⚔️ No Discharge In That War
---
## There Is No Man That Hath Power Over The Spirit To Retain The Spirit

"The spirit" here means the breath of life inside a person.

"Retain" means holding onto something so it cannot leave.

No one, however powerful, can keep their own life from ending.

This includes the same king described just a few verses earlier.

Human power always runs out at exactly this same wall.

💨 Spirit means the breath of life
✋ Retain means holding on so it cannot leave
🚫 No one can keep their life from ending
📖 Even kings hit this same wall

## Neither Hath He Power In The Day Of Death

"The day of death" means the specific moment life actually ends.

No amount of wealth, wisdom, or authority can push that moment back.

This is the same limit named earlier about the future being unknown.

Here it becomes personal and physical instead of abstract.

Death is the one appointment no one can reschedule.

⏰ Day of death means the moment life ends
💰 No wealth or power can delay it
🔁 This echoes the earlier unknown future point
📖 Death cannot be rescheduled

## There Is No Discharge In That War

"Discharge" is a military term for an official release from duty.

Soldiers could sometimes be released early from a battle or campaign.

Life is pictured here as a war with no such early release.

Everyone stays enlisted in it until the natural end.

There is no early retirement from being alive.

🎖️ Discharge means an official release from duty
⚔️ Life is pictured here as a war
🚫 No early release from it exists
📖 No one retires early from being alive

## Neither Shall Wickedness Deliver Those That Are Given To It

This closes the verse by removing one common escape people imagine.

Some assume enough power or cunning could cheat this final limit.

"Given to it" means someone fully committed to a wicked way of living.

Wickedness cannot buy anyone extra time.

Every person, good or evil, meets this same wall eventually.

🚫 This removes a common imagined escape
🧠 Some assume wrongdoing could cheat this limit
😈 Given to it means fully committed to evil
📖 Everyone meets this wall eventually

# Ecclesiastes 8:9-10
# ⚰️ The Wicked Buried And Forgotten
---
## All This Have I Seen, And Applied My Heart Unto Every Work

The Preacher again grounds his claim in real, careful observation.

"Applied my heart" means giving focused, deliberate attention.

"Under the sun" is his repeated phrase for life here on earth.

What follows is a firsthand report, not a secondhand theory.

This next hard observation comes from something he actually watched happen.

👀 The Preacher grounds this in real observation
🎯 Applied my heart means focused attention
☀️ Under the sun means life on earth
📖 This is firsthand, not theory

## There Is A Time Wherein One Man Ruleth Over Another To His Own Hurt

"To his own hurt" means the ruler's own power actually damages him.

Sometimes authority corrupts the very person holding it.

Other times a ruler's poor choices cause harm that circles back on him.

Power is not automatically good for the one who holds it.

Ruling over others can quietly ruin the ruler.

👑 To his own hurt means power damages him
⚠️ Authority can corrupt the one holding it
🔄 Poor choices can circle back on a ruler
📖 Power is not automatically good for anyone

## And So I Saw The Wicked Buried

The Preacher shifts from ruling over others to a scene at a funeral.

He watched wicked people receive a normal, respectful burial like anyone else.

There was no visible difference in how their deaths were treated.

This challenges the assumption that wrongdoing gets an obviously different ending.

Death often treats the wicked and the just the same way outwardly.

⚰️ The scene shifts to a funeral
😕 Wicked people got a normal burial
🚫 There was no visible difference at death
📖 Death often looks the same for everyone

## Who Had Come And Gone From The Place Of The Holy

"The place of the holy" refers to the temple or a sacred worship site.

These same wicked people had once walked in and out of that holy place.

Their outward religious activity did not match their actual character.

Appearing religious and living wickedly are not the same thing.

Showing up at a holy place does not make someone holy.

🕍 The holy place means a sacred site
🚶 These wicked people once walked in and out
🎭 Outward religion did not match their character
📖 Showing up does not make someone holy

## They Were Forgotten In The City Where They Had So Done

This describes how quickly a wicked reputation faded once the person died.

The very city that saw their wrongdoing simply moved on without them.

No lasting punishment or public memory followed their evil deeds.

That silence itself troubled the Preacher deeply.

Being forgotten instead of remembered was its own quiet injustice.

🏙️ Their city simply moved on after they died
🤐 No lasting punishment or memory followed them
😟 This silence troubled the Preacher
📖 Being forgotten was its own quiet injustice

## This Is Also Vanity

The Preacher names his conclusion plainly, right after the scene he just described.

"Vanity" is his repeated word for something that feels empty or unresolved.

A wicked life ending in a normal burial settles nothing.

It leaves the moral scales looking uneven to anyone watching closely.

Some injustices simply never get evened out in this life.

💨 Vanity means something empty or unresolved
⚖️ This burial and forgetting settles nothing
😕 The moral scales look uneven here
📖 Some injustices never get evened out

# Ecclesiastes 8:11-13
# ⚖️ Sentence Delayed, Justice Not Forgotten
---
## Because Sentence Against An Evil Work Is Not Executed Speedily

"Sentence" here means the punishment that should follow a wrongdoing.

"Executed speedily" means carried out quickly, without delay.

The Preacher notices that punishment for evil often takes a long time.

That delay is exactly what the burial scene in the verse before showed.

Slow justice can look, from a distance, like no justice at all.

⚖️ Sentence means the punishment that should follow
⏳ Executed speedily means carried out quickly
🐢 Punishment for evil often arrives slowly
📖 Slow justice can look like no justice

## Therefore The Heart Of The Sons Of Men Is Fully Set In Them To Do Evil

This names a direct, troubling cause and effect.

When punishment is slow, people grow bolder in doing wrong.

"Fully set" means a settled, confident decision, not a passing temptation.

Delayed consequences do not just fail to stop evil.

They can actually encourage more of it.

🔗 This names a direct cause and effect
😈 Slow punishment makes people bolder in wrong
🔒 Fully set means a settled, confident choice
📖 Unpunished evil can encourage more evil

## Though A Sinner Do Evil An Hundred Times, And His Days Be Prolonged

"An hundred times" is not a literal count, it pictures ongoing wrongdoing.

"His days be prolonged" means the person keeps living a long, easy life.

The Preacher admits plainly that this actually happens in real life.

He does not pretend wrongdoing always gets cut short quickly.

Honesty about this pattern is what makes his next point trustworthy.

💯 An hundred times pictures repeated wrongdoing
🕰️ His days prolonged means a long, easy life
👁️ The Preacher admits this really happens
📖 Honesty here makes his next point trustworthy

## Yet Surely I Know That It Shall Be Well With Them That Fear God

Despite everything just admitted, the Preacher states a firm conviction.

"Surely I know" signals confidence, not a guess or a hope.

"Fear God" means living with deep respect and awe toward Him.

That reverence eventually leads somewhere good, even when it is not visible yet.

This confidence rests on who God is, not on what can currently be seen.

💪 Surely I know signals real confidence
🙏 Fear God means deep respect and awe
🌱 That reverence eventually leads somewhere good
📖 Confidence here rests on God, not on evidence

## But It Shall Not Be Well With The Wicked, Neither Shall He Prolong His Days

This states the opposite side of the same confident conviction.

The Preacher is not contradicting the earlier verse about a wicked man living long.

He is speaking about a final outcome, not every single case along the way.

Some wicked lives look prolonged and untroubled for a season.

The Preacher trusts they do not stay that way forever.

⚖️ This states the opposite side of the conviction
🔁 It does not contradict the earlier verse
⏳ This is about a final outcome
📖 A prolonged wicked life stays temporary

## Which Are As A Shadow, Because He Feareth Not Before God

"As a shadow" pictures something that looks solid but has no real substance.

A shadow can stretch long across the ground, yet it holds nothing up.

A wicked life may look impressive or lasting from the outside.

Underneath, it stays genuinely empty of what actually matters.

A life without reverence for God is a shadow no matter how far it stretches.

🌑 As a shadow means looking solid, holding nothing
📏 A shadow can stretch long but supports nothing
🎭 A wicked life can look impressive outwardly
📖 Without reverence for God, it stays a shadow

# Ecclesiastes 8:14
# 🌀 A Vanity Upon The Earth
---
## There Be Just Men, Unto Whom It Happeneth According To The Work Of The Wicked

This describes good people who suffer the same consequences wicked people deserve.

"Just men" means those who genuinely try to live rightly before God.

Sometimes their circumstances look exactly like a punishment they never earned.

This is the same troubling pattern the Preacher named back in chapter seven.

Life does not always sort consequences the way fairness would expect.

⚖️ Just men means people trying to live rightly
😕 Sometimes they suffer as if they had sinned
🔁 This echoes the pattern from chapter seven
📖 Life does not sort consequences evenly

## There Be Wicked Men, To Whom It Happeneth According To The Work Of The Righteous

This describes the exact opposite unfairness happening just as often.

Some genuinely wicked people receive blessings that look like a reward.

The Preacher places both unfair patterns side by side on purpose.

Neither pattern makes moral sense on its own.

Together they show how little outward circumstances prove about a person.

⚖️ This describes the opposite unfairness
🎁 Wicked people sometimes receive reward like blessings
🔗 Both patterns sit side by side on purpose
📖 Circumstances prove little about character

## I Said That This Also Is Vanity

The Preacher again names his own reaction plainly and honestly.

"Vanity" here means something that makes no sense and settles nothing.

He does not pretend to have a tidy explanation for this unfairness.

Naming confusion honestly is different from losing faith entirely.

Some patterns in life are allowed to simply stay unresolved.

💨 Vanity means something unresolved and confusing
🙅 The Preacher offers no tidy explanation
🙏 Naming confusion is not losing faith
📖 Some patterns stay unresolved on purpose

# Ecclesiastes 8:15
# 🍽️ Then I Commended Mirth
---
## Then I Commended Mirth

"Commended" means approved of or spoke well of, not merely tolerated.

"Mirth" here means ordinary, honest enjoyment, not reckless partying.

After naming so much unfairness, the Preacher turns toward a real comfort.

This is not resignation, it is a genuine recommendation.

Enjoying an ordinary life is presented here as wise, not shallow.

👍 Commended means genuinely approved of
😊 Mirth means honest, ordinary enjoyment
🔄 This follows a long list of real unfairness
📖 Enjoying life here is wise, not shallow

## A Man Hath No Better Thing Under The Sun, Than To Eat, And To Drink, And To Be Merry

"Under the sun" again means life as it is lived here on earth.

Eating, drinking, and simple gladness are named as real, legitimate goods.

This is not an argument for excess or careless living.

It is a case for enjoying the ordinary gifts already available.

Contentment with ordinary things is treated here as genuine wisdom.

☀️ Under the sun means life on earth
🍞 Eating, drinking, gladness are named real goods
🚫 This is not an argument for excess
📖 Contentment with the ordinary is wisdom

## That Shall Abide With Him Of His Labour The Days Of His Life

"Abide" means stay or remain, something that actually lasts.

The enjoyment of daily life is what stays with a person through hard work.

Wealth and outcomes can be unpredictable and unfair, as just described.

Simple daily contentment is one thing that stays reliably available.

That reliability is exactly why the Preacher recommends it so plainly.

🏠 Abide means something that actually stays
💪 Daily enjoyment stays through hard labor
🎲 Wealth and outcomes stay unpredictable
📖 Reliable contentment is why he recommends it

# Ecclesiastes 8:16-17
# 🔍 The Work Of God Cannot Be Found Out
---
## When I Applied Mine Heart To Know Wisdom, And To See The Business That Is Done Upon The Earth

"Applied mine heart" again signals deep, deliberate, ongoing effort.

"The business that is done upon the earth" means the full range of human activity.

The Preacher is describing a wide, careful, lifelong study.

This sets up the humble conclusion that follows in the next verse.

Real wisdom starts with paying close attention, not with quick answers.

🎯 Applied mine heart means deliberate, ongoing effort
🌍 Business done on earth means human activity broadly
📆 This describes a lifelong study
📖 Wisdom starts with close attention

## For Also There Is That Neither Day Nor Night Seeth Sleep With His Eyes

This describes someone so absorbed in this search that rest barely comes.

It pictures relentless mental effort, day and night without pause.

The Preacher is emphasizing just how seriously he pursued this question.

This was not a lazy or casual inquiry.

Some questions cost a person real sleep to chase seriously.

😴 This pictures someone barely resting
🌙 Effort continued day and night without pause
🔍 The Preacher pursued this seriously
📖 Some questions cost real sleep to chase

## Then I Beheld All The Work Of God

"Beheld" means looked at closely and thoughtfully, not a quick glance.

"The work of God" means everything He does in running the world.

After all that searching, the Preacher finally reaches his honest conclusion.

What comes next is the result of that whole lifelong effort.

This conclusion carries weight because of how hard he worked to reach it.

👀 Beheld means looking closely and thoughtfully
🌍 The work of God means how He rules
🏁 This is the conclusion of a long search
📖 It carries weight because of that effort

## A Man Cannot Find Out The Work That Is Done Under The Sun

This states plainly that full understanding of God's ways is out of reach.

This is not laziness or a lack of trying on humanity's part.

It is a genuine limit built into being human at all.

The same conclusion appeared earlier in chapter three about God's timing.

Some things about God's plan will always stay beyond human understanding.

🚫 Full understanding is out of human reach
😓 This is not laziness or low effort
🧩 It is a real, built in limit
📖 Some things stay beyond human understanding

## Though A Man Labour To Seek It Out, Yet He Shall Not Find It

"Labour" here means serious, sustained effort, not a light attempt.

Even a determined, hardworking search does not guarantee the answer.

Effort alone cannot force open a door that was never meant to open.

This is a hard truth, but it is stated honestly.

Trying hard enough does not always mean succeeding.

💪 Labour means serious, sustained effort
🚪 Effort alone cannot force this door open
😔 This truth is stated honestly, not hidden
📖 Trying hard does not guarantee success

## Yea Farther, Though A Wise Man Think To Know It, Yet Shall He Not Be Able To Find It

"Yea farther" pushes the point even further than before.

Even someone genuinely wise can feel confident and still be wrong here.

Wisdom improves understanding, but it does not grant complete access to God's plans.

This closes the chapter with honest humility instead of false confidence.

Real wisdom includes knowing exactly where its own limits are.

➡️ Yea farther pushes the point further
🧠 Even wise confidence can still be wrong
🔑 Wisdom does not grant full access
📖 Real wisdom knows its own limits
`.trim();

export const ECCLESIASTES_EIGHT_PERSONAL_SECTIONS = parseEcclesiastesEightRawNotes(ECCLESIASTES_EIGHT_RAW_NOTES);
