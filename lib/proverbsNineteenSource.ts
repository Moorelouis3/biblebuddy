export type ProverbsNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsNineteenRawNotes(rawText: string): ProverbsNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 19:${startVerse}` : `Proverbs 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 19 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_NINETEEN_RAW_NOTES = `# Proverbs 19:1-4
# 🧭 Integrity Outranks Cleverness
---
## 🧭 Better Is The Poor That Walketh In His Integrity

"Integrity" means living the same honest way whether anyone is watching or not.

This proverb ranks that above money entirely.

The poor man here is not praised in spite of being poor.

He is praised because honesty is what actually defines him.

Character outranks circumstance in this book, every time.

🧭 Integrity means the same honesty always

💰 Ranked above wealth in this proverb

👤 Character defines this poor man

📖 Honest character outranks circumstance

## 😈 Than He That Is Perverse In His Lips, And Is A Fool

"Perverse" means twisted away from what is honest and right.

This person's lips do the twisting, not just their actions.

A "fool" in Proverbs means someone who rejects wisdom on purpose.

Clever speech cannot cover for a crooked heart.

😈 Perverse means twisted away from honest

🗣️ The twisting shows up in speech

🙄 Fool means rejecting wisdom on purpose

📖 Clever words cannot cover dishonesty

## 🧠 That The Soul Be Without Knowledge, It Is Not Good

This line states its point directly instead of using an image.

A soul without knowledge means a person moving through life with no real understanding.

Proverbs treats ignorance as dangerous, not innocent.

Not knowing something is not automatically a harmless excuse.

🧠 Soul without knowledge means no real understanding

⚠️ Proverbs treats ignorance as dangerous

🚫 Not knowing is not automatically innocent

📖 Understanding is treated as necessary

## 🏃 He That Hasteth With His Feet Sinneth

"Hasteth" means rushing ahead without thinking a decision through.

Moving fast on feet pictures moving fast on choices.

This pairs with the line before it, no knowledge and no patience together.

Both together make a dangerous combination.

🏃 Hasteth means rushing without thinking

🦶 Feet picture rushed decisions

🔗 Pairs with the lack of knowledge

📖 Speed without thought leads to sin

## 😤 The Foolishness Of Man Perverteth His Way

"Perverteth" means bends something away from its right direction.

A person's own foolish choices are shown steering him wrong, not fate or bad luck.

Proverbs keeps placing responsibility on the person making the choice.

😤 Perverteth means bends away from right

🧭 His own choices steer him wrong

🚫 Not fate or bad luck

📖 Responsibility stays with the chooser

## 😠 His Heart Fretteth Against The LORD

"Fretteth" means grows angry and restless.

This person blames God for trouble his own foolishness actually caused.

The pattern is familiar, a person makes a bad choice and resents the consequence anyway.

😠 Fretteth means grows angry and restless

👉 He blames God for his own fault

🔁 A familiar pattern of misplaced blame

📖 Consequences get blamed on God

## 💰 Wealth Maketh Many Friends

This line simply observes how the world tends to work.

Money attracts company, whether or not that company is loyal.

Proverbs is not praising this pattern.

It is naming it so the reader can see it clearly.

💰 Wealth tends to attract company

👥 Money brings friends, loyal or not

👁️ Proverbs observes this, does not praise it

➡️ Naming a pattern is not approving it

## 🚶 The Poor Is Separated From His Neighbour

"Separated" here means left without the same social connections wealth buys.

Even a neighbour, someone physically close, can pull away once money is gone.

This is not a moral rule about who deserves friends.

It is an honest look at how people actually treat the poor.

🚶 Separated means losing social connection

🏘️ Even a neighbour can pull away

🚫 Not a rule about who deserves friends

📖 Poverty exposes fair weather friends
# Proverbs 19:5-7
# ⚖️ False Witnesses And Fair Weather Friends
---
## ⚖️ A False Witness Shall Not Be Unpunished, And He That Speaketh Lies Shall Not Escape

In ancient Israel, court cases often rested entirely on what witnesses said out loud.

There was no forensic evidence to fall back on.

The Law itself required a false witness to receive the punishment the accused would have faced.

Lying under oath was never treated as a small offense.

⚖️ Court cases relied on witnesses speaking

🚫 No forensic evidence to fall back on

📜 The Law punished false witnesses directly

📖 Lying under oath was a serious offense

## 👑 Many Will Intreat The Favour Of The Prince

"Intreat" means to ask earnestly, almost plead.

People naturally crowd around someone with power to grant favors.

This is not really about loyalty to the prince himself.

It is about what he can give.

👑 Intreat means to ask earnestly

🎯 People crowd around power for favors

🚫 Not true loyalty to the person

➡️ Access to power draws a crowd

## 🎁 Every Man Is A Friend To Him That Giveth Gifts

This continues the same idea from the line before it.

Gift giving in this culture often bought social connections, not just kindness.

Proverbs is being honest, not cynical, about how easily friendship can be purchased.

🎁 Gifts could buy social connections

🔗 Continues the idea from the line before

😐 Honest, not cynical, about human nature

📖 Some friendship is bought, not earned

## 👨‍👩‍👦 All The Brethren Of The Poor Do Hate Him

Even family connections are shown weakening once poverty enters the picture.

"Brethren" here means blood relatives, not just acquaintances.

That makes this line especially painful, not just socially true.

👨‍👩‍👦 Brethren means blood relatives

💔 Even family can turn away

😔 Poverty is shown straining close ties

📖 Blood ties are not automatically loyal

## 🏃 How Much More Do His Friends Go Far From Him

This builds on the line before it with a comparison.

If even family distances itself, weaker friendships fade even faster.

Proverbs is describing what tends to happen, sadly, not prescribing it as right.

🏃 Friends drift even faster than family

📈 Builds on the family comparison before it

😔 Describes what tends to happen

➡️ Weak ties fade fastest under pressure

## 🗣️ He Pursueth Them With Words, Yet They Are Wanting To Him

"Pursueth" means chasing after someone, trying to win them back with talk.

The poor man in this picture keeps reaching out anyway.

"Wanting" here means his friends are still missing, still absent, despite his effort.

Words alone cannot rebuild what poverty already broke.

🗣️ Pursueth means chasing after with words

🙏 He keeps trying to reconnect

🚫 Wanting means they stay absent anyway

📖 Words alone cannot rebuild broken ties
# Proverbs 19:8-10
# 📚 Wisdom, A Repeated Warning, And A Servant's Place
---
## 💛 He That Getteth Wisdom Loveth His Own Soul

"Getteth" means actively acquiring something, not stumbling into it.

Proverbs frames pursuing wisdom as an act of self love, in the good sense.

Caring for your own soul means caring enough to seek understanding.

💛 Getteth means actively acquiring wisdom

🙏 Seeking wisdom is a form of self care

🧠 Understanding protects the whole person

📖 Wisdom benefits the one who seeks it

## ✅ He That Keepeth Understanding Shall Find Good

"Keepeth" means holding onto something and living by it, not just hearing it once.

Understanding here is not just information stored away.

It has to be kept, practiced, returned to.

That practice is what actually produces good results.

✅ Keepeth means holding onto and living by it

🧠 Understanding is more than stored facts

🔁 It has to be practiced, not just heard

📖 Practiced understanding produces good results

## ⚠️ And He That Speaketh Lies Shall Perish

This repeats the warning from verse five in stronger language.

"Perish" is a heavier word than the earlier "shall not escape."

Hebrew poetry often repeats an idea while raising its intensity the second time.

The warning against lying grows more serious, not less, on repeat.

⚠️ Perish is stronger than escape

🔁 Repeats verse five with more weight

✍️ Hebrew poetry often intensifies on repeat

📖 The warning grows more serious here

## 😐 Delight Is Not Seemly For A Fool

"Seemly" means fitting or appropriate.

A fool enjoying comfort and ease looks wrong, out of place.

Proverbs is not saying fools cannot feel happy.

It is saying that ease sits oddly on someone who refuses wisdom.

😐 Seemly means fitting or appropriate

🙄 Comfort looks out of place on a fool

🚫 Not a claim fools cannot feel happy

📖 Ease sits oddly on refused wisdom

## 👑 Much Less For A Servant To Have Rule Over Princes

This uses a comparison to push the point further.

In this culture, social order placed servants clearly beneath rulers.

A servant suddenly ruling over princes flips that order upside down.

Proverbs treats that reversal as unsettling, not just unusual.

👑 Servants sat clearly beneath rulers here

🔄 Rule over princes flips the order

😬 Proverbs treats this as unsettling

📖 Sudden reversals unsettle a stable order
# Proverbs 19:11-14
# 👑 A King's Wrath And A Wife From The LORD
---
## 🕊️ The Discretion Of A Man Deferreth His Anger

"Discretion" means careful, wise judgment before acting.

"Deferreth" means delays or holds something back.

A discreet person does not let anger control the very next moment.

🕊️ Discretion means careful, wise judgment

⏳ Deferreth means delaying, holding back

😤 A discreet person controls the next moment

📖 Wisdom slows anger down

## 🏆 It Is His Glory To Pass Over A Transgression

"Transgression" means a wrong done against someone.

"Pass over" means choosing not to retaliate for it.

Proverbs calls that choice glory, not weakness.

Letting an offense go can take more strength than punishing it.

🏆 Passing over an offense is called glory

🚫 Not the same as weakness

💪 Letting go can take more strength

📖 Restraint is honored here, not retaliation

## 🦁 The King's Wrath Is As The Roaring Of A Lion

A lion's roar was one of the most fearsome sounds known in the ancient world.

A king held enormous, often unchecked power in this culture.

His anger could end a person's life or livelihood with a single word.

This image is meant to feel genuinely frightening.

🦁 A lion's roar was a fearsome sound

👑 Kings held nearly unchecked power

⚔️ His anger could end a life or career

📖 The image is meant to feel frightening

## 🌿 But His Favour Is As Dew Upon The Grass

Dew in this dry region was a quiet, welcome relief for crops each morning.

This pictures the exact opposite extreme from a lion's roar.

A king's kindness could refresh a whole household overnight.

The same person could be a threat or a blessing, depending on his mood.

🌿 Dew brought quiet relief to dry land

🔄 The opposite image from the lion's roar

🏠 Kindness could refresh a household overnight

📖 The same king could threaten or bless

## 😔 A Foolish Son Is The Calamity Of His Father

"Calamity" means a serious disaster, not a minor disappointment.

A father's reputation and legacy were tied closely to his children in this culture.

A foolish son was not just a private sadness.

It could damage the whole family's standing.

😔 Calamity means a serious disaster

👨‍👦 A father's legacy was tied to his sons

📉 A foolish son damaged the family's standing

📖 Family reputation carried real weight

## 💧 And The Contentions Of A Wife Are A Continual Dropping

This pictures a leaking roof, a slow drip that never stops.

"Contentions" means constant arguing or quarreling.

The comparison is about the wearing effect of nonstop conflict, not the person.

A small irritation repeated endlessly becomes exhausting.

💧 Continual dropping pictures a leaking roof

🗣️ Contentions means constant arguing

😩 Repeated conflict wears a person down

📖 Small irritations add up over time

## 🏠 House And Riches Are The Inheritance Of Fathers

This names something ordinary and expected.

Property and wealth normally passed down within a family line.

Nothing about that required any special wisdom or blessing.

🏠 House and riches were normal inheritance

👨‍👧 Property passed down within the family

🚫 No special wisdom required for this

➡️ Some things simply pass down naturally

## 💍 And A Prudent Wife Is From The LORD

"Prudent" means wise and sensible in daily decisions.

This draws a sharp contrast with the line just before it.

Land and money come from family.

A genuinely wise spouse is credited directly to God.

💍 Prudent means wise and sensible

⚖️ Contrasts with ordinary family inheritance

🙏 A wise spouse is credited to God

📖 Some blessings come straight from the LORD
# Proverbs 19:15-17
# 😴 Laziness, Obedience, And Lending To God
---
## 😴 Slothfulness Casteth Into A Deep Sleep

"Slothfulness" means habitual laziness, avoiding work on purpose.

"Casteth into a deep sleep" pictures laziness dragging a person down further and further.

It is not one lazy afternoon.

It becomes a pattern that swallows a person's days.

😴 Slothfulness means habitual laziness

⬇️ Deep sleep pictures being dragged down

🔁 Laziness becomes a repeating pattern

📖 A pattern can swallow someone's days

## 🍽️ And An Idle Soul Shall Suffer Hunger

"Idle" means doing nothing productive.

The consequence named here is plain and physical, real hunger.

Proverbs regularly connects laziness to real world loss, not just a character flaw.

🍽️ Idle means doing nothing productive

😣 Hunger is a plain, physical consequence

🔗 Laziness connects to real world loss

📖 Consequences here are not abstract

## ✅ He That Keepeth The Commandment Keepeth His Own Soul

This repeats a pattern seen earlier in the chapter, obedience protecting the person who practices it.

"Keepeth" appears twice here on purpose, holding the command and being held safe by it.

Obedience is pictured as self protection, not restriction.

✅ Keepeth appears twice on purpose

🛡️ Obedience is pictured as self protection

🔁 A pattern repeated from earlier verses

📖 Following the command guards the person

## 💀 But He That Despiseth His Ways Shall Die

"Despiseth" means treats with open contempt, not just ignores.

"His ways" refers to God's commanded path, not just personal habits.

Rejecting that path is treated with the most serious consequence Proverbs uses, death.

💀 Despiseth means treats with open contempt

🧭 His ways means God's commanded path

⚠️ Rejection carries the most serious consequence

📖 This warning is not softened here

## 🙏 He That Hath Pity Upon The Poor Lendeth Unto The LORD

"Pity" here means genuine compassion that leads to action, not just a feeling.

Giving to someone in need is described as a loan made directly to God.

That reframes an ordinary act of charity as something God personally receives.

🙏 Pity means compassion that leads to action

💰 Giving to the poor is lending God

🔄 Charity is reframed as a gift to God

📖 God treats generosity as given to Him

## 💵 And That Which He Hath Given Will He Pay Him Again

This completes the loan picture from the line before it.

A loan implies repayment, and God is the one making that promise here.

This is not a guarantee of getting rich.

It is a promise that generosity toward the poor never actually goes unnoticed.

💵 Completes the loan picture from before

🤝 God personally promises repayment

🚫 Not a promise of getting rich

📖 Generosity toward the poor is never unnoticed
# Proverbs 19:18-21
# 🧒 Discipline Now, Counsel That Stands
---
## 🧒 Chasten Thy Son While There Is Hope

"Chasten" means to correct firmly, often through discipline.

The phrase points to a real window of time, not an unlimited one.

The assumption is that character can still be shaped while a child is young.

That window does not stay open forever.

🧒 Chasten means correcting firmly

⏳ Points to a real window of time

🌱 Character can still be shaped while young

📖 That window does not stay open forever

## 😢 And Let Not Thy Soul Spare For His Crying

"Spare" here means holding back out of pity.

A parent is warned against letting tears alone cancel needed correction.

This is not a call to be harsh.

It is a warning against letting emotion override responsibility.

😢 Spare means holding back out of pity

🚫 Tears alone should not cancel correction

⚖️ Not a call to be harsh

📖 Emotion should not override responsibility

## 😡 A Man Of Great Wrath Shall Suffer Punishment

"Wrath" here means uncontrolled, explosive anger, not ordinary frustration.

Proverbs treats that kind of anger as something that eventually catches up with a person.

This is stated as an observed pattern, not a threat aimed at anyone specific.

😡 Wrath means uncontrolled, explosive anger

⏳ It eventually catches up with a person

👁️ Stated as an observed pattern

📖 Uncontrolled anger has real consequences

## 🔁 For If Thou Deliver Him, Yet Thou Must Do It Again

"Deliver" here means rescuing someone from the consequence of their own anger.

Rescuing a person from consequences without addressing the anger itself only delays the problem.

The same rescue will likely be needed again and again.

🔁 Deliver means rescuing from a consequence

🩹 Rescue without change only delays trouble

⏳ The same problem tends to return

📖 Real change matters more than one rescue

## 👂 Hear Counsel, And Receive Instruction

"Counsel" means advice offered by someone wiser or more experienced.

"Receive" means actually accepting it, not just hearing it politely.

Both verbs matter here, hearing is not the same as taking it in.

👂 Counsel means advice from someone wiser

🤲 Receive means actually accepting it

🎧 Hearing differs from taking it in

📖 Both listening and accepting matter

## 🧓 That Thou Mayest Be Wise In Thy Latter End

"Latter end" means the later years of a person's life, looking back on it as a whole.

This proverb takes a long view instead of an immediate one.

Wisdom accepted young pays off decades later.

🧓 Latter end means one's later years

🔭 This proverb takes a long view

🌱 Wisdom accepted young pays off later

➡️ Some wisdom only proves itself over time

## 🧠 There Are Many Devices In A Man's Heart

"Devices" means plans or schemes a person comes up with on their own.

People make countless private plans throughout their lives.

This line simply names how common that is.

🧠 Devices means personal plans or schemes

📋 People make countless private plans

👤 This names something common to everyone

➡️ Human planning happens constantly

## 🙏 Nevertheless The Counsel Of The LORD, That Shall Stand

"Nevertheless" signals a sharp turn against everything said just before it.

Human plans are many and often change.

God's purpose is described as the one thing that actually holds.

This is meant to be reassuring, not discouraging.

🙏 Nevertheless signals a sharp turn

📋 Human plans are many and often change

🗿 God's purpose is what actually holds

📖 This truth is meant to reassure
# Proverbs 19:22-25
# ❤️ Kindness, Fear Of The LORD, And Correction
---
## ❤️ The Desire Of A Man Is His Kindness

This line states plainly what people most want to find in someone else.

"Desire" here means what a person genuinely hopes for from others.

Kindness is named as the quality people actually value most, more than wealth or status.

❤️ Desire means what a person hopes for

👤 Kindness is valued above wealth or status

🙏 This names a genuine human hope

📖 What people want most is kindness

## 🤥 And A Poor Man Is Better Than A Liar

This repeats a theme from the start of the chapter, character over circumstance.

Poverty is not the shameful condition here.

Dishonesty is.

🤥 Liar is the shameful condition here

🔁 Repeats a theme from earlier in the chapter

💰 Poverty is not treated as shameful

📖 Character still outranks circumstance

## 🙏 The Fear Of The LORD Tendeth To Life

"Fear of the LORD" means deep reverence and respect for God, not being scared of Him.

"Tendeth" means leads toward, like a path leading somewhere.

This reverence is described as the road toward real life, not a burden to avoid.

🙏 Fear of the LORD means deep reverence

🛤️ Tendeth means leads toward something

🌱 This reverence leads toward real life

📖 Reverence is a road, not a burden

## 😌 He That Hath It Shall Abide Satisfied

"Abide" means to remain or stay steadily in one place.

This describes a settled contentment, not a passing good mood.

That kind of satisfaction is shown as lasting, not temporary.

😌 Abide means remaining steadily

🕊️ This describes settled contentment

⏳ The satisfaction is lasting, not passing

📖 Reverence produces steady peace

## 🛡️ He Shall Not Be Visited With Evil

"Visited with evil" is an old way of describing trouble or disaster arriving.

This is not a promise that nothing bad will ever happen.

It points to a deeper protection under God's care over the course of a life.

🛡️ Visited with evil means trouble arriving

🚫 Not a promise nothing bad happens

🙏 Points to deeper protection under God

📖 God's care covers the whole of life

## 🙈 A Slothful Man Hideth His Hand In His Bosom

"Bosom" here means the fold of clothing near the chest, used like a pocket.

This is a vivid picture, a man too lazy to even use his own hand.

It repeats the laziness theme from earlier in the chapter with a sharper image.

🙈 Bosom means the fold near the chest

🖐️ Pictures a hand too lazy to move

🔁 Repeats the laziness theme sharply

📖 Laziness can look almost comical

## 🍽️ And Will Not So Much As Bring It To His Mouth Again

This exaggerates the point on purpose for effect.

Even feeding himself becomes too much effort for this man.

Proverbs uses humor here to make laziness look as absurd as it actually is.

🍽️ Even feeding himself feels like effort

😅 The exaggeration is intentional

🎭 Humor makes laziness look absurd

➡️ Sometimes a picture teaches better than a warning

## 👊 Smite A Scorner, And The Simple Will Beware

"Scorner" means someone who mocks wisdom and correction outright.

"The simple" means someone untrained, easily influenced, not yet foolish or wise.

Correcting a defiant scorner in public can still teach a watching bystander something.

👊 Scorner means someone who mocks wisdom

👀 Simple means untrained, easily influenced

📢 Public correction can still teach onlookers

📖 One person's consequence can instruct another

## 🧠 Reprove One That Hath Understanding, And He Will Understand Knowledge

"Reprove" means to correct someone directly, pointing out a fault.

This contrasts sharply with the scorner in the line before it.

A person who already values wisdom actually learns from correction instead of resenting it.

🧠 Reprove means correcting directly

⚖️ Contrasts with the defiant scorner

🌱 A wise person learns from correction

📖 Openness to correction is itself wisdom
# Proverbs 19:26-29
# 😳 Shameful Sons And Scornful Witnesses
---
## 😞 He That Wasteth His Father, And Chaseth Away His Mother

"Wasteth" means recklessly using up someone's resources or wellbeing.

"Chaseth away" pictures actively driving a parent out, not just neglecting them.

This describes real cruelty toward the very people who raised him.

😞 Wasteth means recklessly using up resources

🚪 Chaseth away pictures driving someone out

💔 This describes real cruelty toward parents

📖 The people who raised him are targeted

## 😳 Is A Son That Causeth Shame, And Bringeth Reproach

"Shame" and "reproach" both describe public disgrace, not private embarrassment.

In this culture, a child's behavior reflected directly on the whole family's honor.

This son's actions damage more than just himself.

😳 Shame and reproach mean public disgrace

👪 A child's behavior reflected on the family

📉 His actions damage more than himself

📖 Honor here was a shared family matter

## 🙉 Cease, My Son, To Hear The Instruction That Causeth To Err

This verse is written with irony, not sincere advice.

It sounds like permission to stop listening to wisdom.

Read alongside the rest of Proverbs, it is actually a warning dressed as an instruction.

The son who takes this literally walks straight into everything this book warns against.

🙉 This verse uses irony, not sincere advice

🎭 It sounds like permission to stop listening

⚠️ It is really a warning in disguise

📖 Taking it literally leads to error

## ⚖️ An Ungodly Witness Scorneth Judgment

"Ungodly" means without regard for God or His standards.

This witness treats the whole legal process with contempt.

The court system depended on people taking their testimony seriously.

⚖️ Ungodly means without regard for God

🙄 This witness treats the court with contempt

📜 Legal process depended on honest testimony

📖 Contempt for justice undermines the whole system

## 🍽️ And The Mouth Of The Wicked Devoureth Iniquity

"Devoureth" pictures eating something eagerly, without hesitation.

"Iniquity" here means wrongdoing or sin.

This person consumes wrongdoing the way someone else might enjoy a meal.

🍽️ Devoureth pictures eating eagerly

😈 Iniquity means wrongdoing or sin

😋 Wrongdoing is consumed like a meal

📖 Sin can become an appetite

## ⚖️ Judgments Are Prepared For Scorners

"Prepared" means already set in place, waiting.

This is not a threat invented on the spot.

Consequences for mocking wisdom are described as already established ahead of time.

⚖️ Prepared means already set in place

⏳ Not a threat invented on the spot

📜 Consequences were established ahead of time

📖 Justice here is not random

## 🩹 And Stripes For The Back Of Fools

"Stripes" means the marks left by a physical beating, a real punishment in this culture.

This closes the chapter the same way it opened, contrasting wisdom and foolishness.

The whole chapter traces that same line from the very first verse to this last one.

🩹 Stripes means marks from physical punishment

🔁 Closes the chapter echoing its opening

⚖️ Wisdom and foolishness framed the chapter

📖 One contrast runs through the chapter
`.trim();

export const PROVERBS_NINETEEN_PERSONAL_SECTIONS = parseProverbsNineteenRawNotes(PROVERBS_NINETEEN_RAW_NOTES);
