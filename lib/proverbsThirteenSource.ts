export type ProverbsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsThirteenRawNotes(rawText: string): ProverbsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 13:${startVerse}` : `Proverbs 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Proverbs 13 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_THIRTEEN_RAW_NOTES = `# Proverbs 13:1-4
# 👂 A Father's Instruction And The Sluggard's Empty Soul
---
## 👂 A Wise Son Heareth His Father's Instruction

"Instruction" here means correction from a parent, not just any lesson.

A wise son actually listens when that correction comes.

This proverb ties real wisdom to a willingness to be taught at home.

The son does not need to enjoy correction, only receive it.

👂 Instruction means correction from a parent

🎓 A wise son actually listens to it

🏠 Wisdom starts with being teachable at home

📖 Willingness to be corrected marks the wise

## 🙄 A Scorner Heareth Not Rebuke

"Scorner" means someone who mocks correction instead of considering it.

"Rebuke" is a stronger word than instruction, a direct confrontation about wrongdoing.

This is the opposite outcome from the wise son just described.

Refusing to be corrected is shown here as a settled attitude, not one bad moment.

🙄 Scorner means someone who mocks correction

⚔️ Rebuke is a direct confrontation about wrong

🔄 This opposes the wise son just named

📖 Refusing correction is a settled attitude

## 🗣️ A Man Shall Eat Good By The Fruit Of His Mouth

"Fruit of his mouth" means the results that come from what a person says.

This proverb pictures honest, careful speech as something that actually feeds a life.

Good words are treated here as a real source of provision, not just manners.

What comes out of the mouth is shown returning good things to its owner.

🗣️ Fruit of his mouth means results from speech

🍞 Careful speech is pictured as feeding a life

✅ Good words are treated as real provision

📖 What a mouth says returns good things

## ⚖️ The Soul Of The Transgressors Shall Eat Violence

"Transgressors" means those who break God's commands on purpose.

"Eat violence" repeats the food picture from the first half of the verse.

This time the food itself is harmful instead of good.

Wrongdoing is pictured here as something that eventually feeds back on the wrongdoer.

⚖️ Transgressors means those who break commands on purpose

🍽️ Eat violence repeats the food picture from before

💥 This time the food is harmful

📖 Wrongdoing feeds back on the wrongdoer

## 🛡️ He That Keepeth His Mouth Keepeth His Life

"Keepeth" means guards carefully, the way someone guards something valuable.

Guarding the mouth means thinking before speaking, holding back careless words.

This proverb ties self control in speech directly to actually staying safe.

A guarded mouth is shown here protecting more than just a reputation.

🛡️ Keepeth means guards carefully

🤐 Guarding the mouth means thinking before speaking

🔗 Self control in speech is tied to safety

📖 A guarded mouth protects more than reputation

## 👄 He That Openeth Wide His Lips Shall Have Destruction

"Openeth wide his lips" pictures speaking without any restraint at all.

This is the direct opposite of the guarded mouth just described.

Careless, unfiltered talk is treated here as genuinely dangerous, not just embarrassing.

Words spoken without thought are shown leading to real ruin.

👄 Openeth wide his lips means speaking without restraint

🔄 This opposes the guarded mouth just named

⚠️ Unfiltered talk is treated as dangerous

📖 Careless words lead to real ruin

## 😴 The Soul Of The Sluggard Desireth, And Hath Nothing

"Sluggard" means a lazy person, someone unwilling to put in effort.

"Desireth" means wanting something badly, wishing for a better outcome.

The sluggard wants results without doing the work those results require.

Wanting is shown here as worthless on its own, without real effort behind it.

😴 Sluggard means a lazy person

🙏 Desireth means wanting something badly

🚫 Wanting results without work gets nothing

📖 Wanting alone is worthless without effort

## 💪 The Soul Of The Diligent Shall Be Made Fat

"Diligent" means hardworking and consistent, the opposite of the sluggard.

"Made fat" is an old way of saying well fed and truly satisfied.

This is a picture of real abundance, not just getting by.

Effort is shown here actually producing the very thing the sluggard only wished for.

💪 Diligent means hardworking and consistent

🍖 Made fat means well fed and satisfied

🌾 This pictures real abundance, not just surviving

📖 Effort produces what the sluggard only wished for

# Proverbs 13:5-9
# 💡 Lies, Riches, And A Lamp Put Out
---
## 😠 A Righteous Man Hateth Lying

"Hateth" here means a strong, settled opposition, not a passing dislike.

This is not a mild preference for honesty over dishonesty.

A righteous life includes a genuine inner resistance to falsehood.

Hatred of lying is shown here as part of righteous character itself.

😠 Hateth means strong settled opposition

🚫 This is not a mild preference

❤️ Righteousness includes real resistance to lies

📖 Hating lies is part of righteous character

## 🤢 A Wicked Man Is Loathsome, And Cometh To Shame

"Loathsome" means disgusting, something people want to keep their distance from.

"Cometh to shame" means public disgrace eventually catches up with a wicked life.

Wickedness here is shown to have real, lasting social consequences.

What a person practices in private eventually becomes obvious to others.

🤢 Loathsome means disgusting to others

😳 Cometh to shame means disgrace catches up

👀 Wickedness has real social consequences

📖 Private wrongdoing eventually becomes obvious

## 🛡️ Righteousness Keepeth Him That Is Upright In The Way

"Keepeth" here means guards and protects over time.

"Upright in the way" means living a consistently honest life, not one good moment.

Righteousness is pictured here as something that actively defends the person who practices it.

A steady, honest life is shown providing real protection.

🛡️ Keepeth means guards and protects

🛤️ Upright in the way means honest living

🔒 Righteousness actively defends the one who practices it

📖 A steady honest life provides real protection

## 💥 Wickedness Overthroweth The Sinner

"Overthroweth" means violently brings down, the same strong word used elsewhere in this book.

This is the opposite outcome from the protection just described for the righteous.

Sin is pictured here as something that eventually turns and destroys the one who practices it.

The same choice that seems to offer freedom actually brings a person down.

💥 Overthroweth means violently brings down

🔄 This opposes the protection just described

⚔️ Sin eventually turns on the sinner

📖 Sin brings down the one who chose it

## 🎭 There Is That Maketh Himself Rich, Yet Hath Nothing

This describes someone who appears wealthy but actually owns very little.

"Maketh himself rich" points to a false front, not real substance.

Appearance and reality are shown here pulling apart from each other.

A person can look successful while genuinely having nothing of real value.

🎭 This describes someone who appears wealthy

🎪 Maketh himself rich points to a false front

⚖️ Appearance and reality pull apart here

📖 A person can look rich and own nothing

## 🙇 There Is That Maketh Himself Poor, Yet Hath Great Riches

This describes the exact opposite situation, someone who appears poor but truly has much.

This person may be humble in how they live or present themselves on purpose.

The proverb refuses to let appearance alone tell the whole story either way.

Real worth is shown here as something appearance often hides rather than reveals.

🎭 This describes the opposite situation

🙇 This person may live humbly on purpose

⚖️ Appearance still does not tell the whole story

📖 Real worth is often hidden, not shown

## 💰 The Ransom Of A Man's Life Are His Riches

"Ransom" means the price paid to free someone from danger or captivity.

This pictures wealth as something that can actually buy real protection in a crisis.

A rich man in this culture could pay his way out of certain threats.

Riches are shown here as genuinely useful, not simply something to enjoy.

💰 Ransom means the price paid to free someone

🛡️ Wealth can buy real protection in a crisis

🏛️ A rich man could pay off certain threats

📖 Riches are shown as genuinely useful

## 🤷 The Poor Heareth Not Rebuke

This likely means a poor man draws little threat from those who prey on wealth.

"Rebuke" here points to threats aimed at squeezing money out of someone.

The poor man is spared this danger simply by having nothing worth taking.

Having little is shown here as its own strange kind of safety.

🤷 The poor draw little threat from predators

💸 Rebuke here means threats meant to extort

🛑 Having nothing removes this particular danger

📖 Having little brings its own strange safety

## 💡 The Light Of The Righteous Rejoiceth

"Light" is a common picture in this book for a good, flourishing life.

Describing light as rejoicing gives it real life, as though a righteous life shines with joy.

This is more than survival, it is a life that visibly glows.

Righteousness is pictured here as something bright and alive, not dim or restrained.

💡 Light pictures a good flourishing life

😊 Rejoiceth gives the light real joy

✨ This is more than survival

📖 Righteousness is pictured as bright and alive

## 🪔 The Lamp Of The Wicked Shall Be Put Out

"Lamp" pictures a smaller, more fragile light than the sun, something that must be tended.

"Put out" means it is deliberately extinguished, not simply fading on its own.

This directly contrasts the rejoicing light of the righteous just described.

A wicked life is shown here as a flame that will not be allowed to keep burning.

🪔 Lamp pictures a smaller fragile light

🕯️ Put out means deliberately extinguished

🔄 This contrasts the righteous light just named

📖 A wicked life will not keep burning

# Proverbs 13:10-14
# 🌳 Pride, Patience, And The Fountain Of Life
---
## ⚔️ Only By Pride Cometh Contention

"Contention" means quarreling and conflict between people.

"Only by pride" is a strong claim, tracing conflict back to one specific root cause.

Pride here means insisting on being right no matter what others say.

Most fights are traced here back to someone refusing to yield.

⚔️ Contention means quarreling and conflict

👑 Only by pride traces conflict to one root

🙅 Pride means insisting on being right

📖 Most fights start with refusing to yield

## 👂 With The Well Advised Is Wisdom

"Well advised" describes someone who actually takes counsel from others seriously.

This is the direct opposite of the proud person just described.

Wisdom here is tied to a willingness to be corrected and to listen.

Humility toward good advice is shown as the doorway into real wisdom.

👂 Well advised means taking counsel seriously

🔄 This opposes the proud person just named

🧠 Wisdom is tied to being willing to listen

📖 Humility is the doorway into wisdom

## 💨 Wealth Gotten By Vanity Shall Be Diminished

"Vanity" here means emptiness, quick or dishonest schemes with no real substance.

"Diminished" means it shrinks away over time instead of lasting.

Wealth gained through shortcuts is pictured here as unstable by nature.

What comes quickly and dishonestly is shown here leaving just as quickly.

💨 Vanity means emptiness or dishonest schemes

📉 Diminished means it shrinks over time

🎲 Quick wealth is pictured as unstable

📖 What comes dishonestly leaves just as fast

## 💪 He That Gathereth By Labour Shall Increase

"Labour" means real, steady work over time.

"Increase" is the opposite outcome from the diminishing wealth just described.

This proverb contrasts a shortcut with the slow, dependable path of honest work.

Patience and effort are shown here as the path that actually grows.

💪 Labour means real steady work

📈 Increase opposes the diminishing wealth just named

⚖️ This contrasts a shortcut with honest work

📖 Patience and effort are the path that grows

## ⏳ Hope Deferred Maketh The Heart Sick

"Deferred" means delayed, pushed off again and again without resolution.

"Maketh the heart sick" pictures a real, wearing kind of emotional pain.

This proverb takes waiting seriously as something that can genuinely hurt a person.

A hope that keeps getting delayed is shown here as a heavy thing to carry.

⏳ Deferred means delayed again and again

💔 Maketh the heart sick pictures real pain

😔 Waiting is taken seriously as genuine hurt

📖 A delayed hope is heavy to carry

## 🌳 When The Desire Cometh, It Is A Tree Of Life

"Tree of life" is a picture used elsewhere in this book for something that brings real flourishing.

This directly answers the sickness of delayed hope just described.

When the long wait finally ends, the relief is pictured as genuinely life giving.

Fulfilled hope is shown here as more than relief, it becomes a source of real life.

🌳 Tree of life pictures real flourishing

🔄 This answers the sickness just described

🌱 A fulfilled hope is life giving

📖 Fulfilled hope becomes a source of real life

## 🙄 Whoso Despiseth The Word Shall Be Destroyed

"Despiseth" means treats with contempt, refuses to take seriously.

"The word" here means instruction or command, likely pointing to God's word specifically.

Dismissing guidance is treated here as a serious, dangerous choice, not a small shrug.

The consequence named here is severe on purpose, matching how serious the choice is.

🙄 Despiseth means treats with contempt

📜 The word likely points to God's word

⚠️ Dismissing guidance is a dangerous choice

📖 The consequence matches the seriousness of the choice

## 🙏 He That Feareth The Commandment Shall Be Rewarded

"Feareth" here means takes seriously with real respect, not terror.

This is the opposite response from the contempt just described.

Respecting instruction is shown here as something that actually pays off over time.

Taking God's word seriously is pictured as a choice with real, lasting benefit.

🙏 Feareth means real respect, not terror

🔄 This opposes the contempt just named

✅ Respecting instruction actually pays off

📖 Taking God's word seriously has lasting benefit

## ⛲ The Law Of The Wise Is A Fountain Of Life

"Fountain of life" pictures a spring of fresh, flowing water in a dry land.

Wise teaching is compared here to water that a thirsty traveler cannot live without.

This is not a decoration, it is described as genuinely life sustaining.

Wisdom is pictured here as something a person actually needs to keep living well.

⛲ Fountain of life pictures a desert spring

💧 Wise teaching is compared to needed water

🌱 This is life sustaining, not decorative

📖 Wisdom is something a person truly needs

## 🪤 To Depart From The Snares Of Death

"Snares" pictures hidden traps set to catch something unaware.

Wise teaching is pictured here as what lets a person spot and avoid those traps.

This closes the fountain picture with its practical purpose, staying alive and free.

The wise are shown here walking safely past dangers a fool would never even see.

🪤 Snares pictures hidden traps

👀 Wisdom helps a person spot the traps

🚶 This closes the fountain picture with its purpose

📖 The wise walk safely past unseen dangers

# Proverbs 13:15-19
# 📜 A Faithful Ambassador And A Fool's Folly
---
## 🧠 Good Understanding Giveth Favour

"Understanding" here means sound judgment, seeing situations clearly.

"Giveth favour" means it earns real goodwill from other people.

Wisdom is shown here as something that actually improves how others treat a person.

Clear thinking is pictured as having genuine social benefit, not just personal benefit.

🧠 Understanding means sound clear judgment

🤝 Giveth favour means it earns real goodwill

👀 Wisdom improves how others treat a person

📖 Clear thinking has real social benefit

## 🪨 The Way Of Transgressors Is Hard

"Hard" here means rough and difficult to travel, like a rocky, wearing path.

This directly contrasts the favor just described for the wise.

Wrongdoing is pictured here as a road that grows harder the longer it is walked.

The transgressor's own choices are shown making their own life more difficult.

🪨 Hard means a rough difficult path

🔄 This contrasts the favor just named

🛤️ Wrongdoing grows harder the longer it is walked

📖 Wrong choices make life more difficult

## 🧠 Every Prudent Man Dealeth With Knowledge

"Prudent" means careful and thoughtful before acting.

"Dealeth with knowledge" means actions are shaped by real information, not guesswork.

This proverb ties wise behavior directly to being informed first.

Careful thought before action is shown here as a habit, not a one time choice.

🧠 Prudent means careful and thoughtful

📚 Dealeth with knowledge means acting on real information

🔗 Wise behavior is tied to being informed

📖 Careful thought before action is a habit

## 📢 A Fool Layeth Open His Folly

"Layeth open" means displays plainly, without meaning to hide it.

"Folly" means foolishness, poor judgment acted out in the open.

This is the opposite of the careful, informed prudent man just described.

A fool cannot help but reveal poor judgment through their own actions.

📢 Layeth open means displays plainly

🤡 Folly means foolishness acted out

🔄 This opposes the prudent man just named

📖 A fool reveals poor judgment through action

## 📨 A Wicked Messenger Falleth Into Mischief

"Messenger" here means someone entrusted to carry news or instructions for another person.

An unreliable messenger was a genuine danger in a world without instant communication.

"Falleth into mischief" means real trouble results from that unfaithfulness.

Trust misused in this role is shown here to have real consequences.

📨 Messenger means someone entrusted to carry news

⚠️ An unreliable messenger was a real danger

💥 Falleth into mischief means real trouble results

📖 Misused trust has real consequences

## 🕊️ A Faithful Ambassador Is Health

"Ambassador" here means a trusted representative sent on another's behalf.

"Health" pictures healing and wellness, the opposite outcome from the mischief just named.

A reliable messenger is treated here as genuinely good for everyone involved.

Trustworthiness in this role is shown bringing benefit rather than harm.

🕊️ Ambassador means a trusted representative

💊 Health pictures healing, opposing the mischief named

🤝 A reliable messenger benefits everyone involved

📖 Trustworthiness brings benefit rather than harm

## 🙅 Poverty And Shame Shall Be To Him That Refuseth Instruction

"Refuseth instruction" means outright rejecting correction, not simply forgetting it.

This proverb pairs two real losses together, both money and reputation.

Refusing to be corrected is shown here to cost more than pride.

The consequences named here reach into a person's whole standing in the community.

🙅 Refuseth instruction means outright rejecting correction

📉 This pairs two real losses together

💸 Refusing correction costs more than pride

📖 The consequences reach a person's whole standing

## 👂 He That Regardeth Reproof Shall Be Honoured

"Regardeth" means pays real attention to and takes to heart.

"Reproof" is the stronger word for correction used earlier in this chapter.

This is the opposite outcome from the poverty and shame just described.

Taking correction seriously is shown here as a path toward real respect.

👂 Regardeth means pays real attention to

⚔️ Reproof is the stronger word for correction

🔄 This opposes the poverty just described

📖 Taking correction seriously earns real respect

## 🎯 The Desire Accomplished Is Sweet To The Soul

"Desire accomplished" means a genuine longing that finally gets fulfilled.

"Sweet to the soul" pictures deep, satisfying pleasure, not a shallow thrill.

This proverb names a simple, honest truth about how good it feels to reach a real goal.

Fulfilled longing is treated here as something genuinely good, not something to be suspicious of.

🎯 Desire accomplished means a longing fulfilled

🍯 Sweet to the soul pictures deep pleasure

😊 This names how good reaching a goal feels

📖 Fulfilled longing is treated as genuinely good

## 🤢 It Is Abomination To Fools To Depart From Evil

"Abomination" repeats the strongest word this book uses for something truly disgusting to someone.

This time the word is turned around, fools find leaving evil disgusting instead.

A fool's desires have become genuinely twisted here.

What should feel obviously right feels wrong to a fool instead.

🤢 Abomination repeats the strongest word for disgust

🔄 This time fools find leaving evil disgusting

🌀 A fool's own desires have grown twisted

📖 What should feel right feels wrong here

# Proverbs 13:20-25
# 🌾 Companions, Inheritance, And The Rod Of Discipline
---
## 🚶 He That Walketh With Wise Men Shall Be Wise

"Walketh with" pictures ongoing companionship, not a single conversation.

This proverb ties personal growth in wisdom to who a person actually spends time with.

Wisdom here is shown as something that rubs off through steady closeness.

Choosing companions well is treated here as a real, practical decision, not a small one.

🚶 Walketh with pictures ongoing companionship

🤝 Growth in wisdom is tied to companionship

🔄 Wisdom rubs off through steady closeness

📖 Choosing companions well is a real decision

## 👥 A Companion Of Fools Shall Be Destroyed

"Companion" repeats the same idea of close, ongoing relationship from the first half of the verse.

This is the sobering opposite outcome for the same kind of closeness.

The verse does not blame one bad conversation, it points to sustained company.

Who a person walks with is shown here shaping their whole future.

👥 Companion repeats the idea of close relationship

🔄 This is the sobering opposite outcome

⏳ The warning points to sustained company

📖 Who a person walks with shapes their future

## 🏃 Evil Pursueth Sinners

"Pursueth" pictures active chasing, not evil simply waiting nearby.

This describes trouble as something that actively follows a sinful life.

Consequences here are not portrayed as random bad luck.

Wrongdoing is shown here to draw its own real trouble after it.

🏃 Pursueth pictures active chasing

⚠️ Trouble actively follows a sinful life

🎲 Consequences are not random bad luck

📖 Wrongdoing draws real trouble after it

## 💰 To The Righteous Good Shall Be Repayed

"Repayed" means paid back, as though goodness were an actual debt owed.

This directly answers the pursuing evil just described for sinners.

The righteous are not simply spared trouble, they are actively rewarded.

This proverb pictures a moral order where good and evil both truly come back around.

💰 Repayed means paid back like a real debt

🔄 This answers the pursuing evil just named

🎁 The righteous are actively rewarded, not just spared

📖 Good and evil both come back around

## 🏡 A Good Man Leaveth An Inheritance To His Children's Children

"Inheritance" here means what a family passes down across generations.

"Children's children" points specifically to grandchildren, not just the next generation.

This proverb pictures wise, good living as something with benefit that reaches far into the future.

A good life is shown here planting something that outlasts the person who lived it.

🏡 Inheritance means what passes down generations

👶 Children's children points to grandchildren specifically

🌳 Good living benefits reach far into the future

📖 A good life outlasts its owner

## 📦 The Wealth Of The Sinner Is Laid Up For The Just

"Laid up" means stored away, kept in reserve for someone else to eventually receive.

This proverb pictures a surprising reversal, wealth built by sin ending up in righteous hands.

This does not describe a guaranteed formula for every single situation.

It states a pattern this book keeps naming, wrongdoing does not ultimately keep what it gathers.

📦 Laid up means stored for someone else

🔄 Sinful wealth ends up in righteous hands

🤷 This is a pattern, not a guaranteed formula

📖 Wrongdoing does not ultimately keep what it gathers

## 🌾 Much Food Is In The Tillage Of The Poor

"Tillage" means land that has been worked and planted by hand.

This pictures even a poor family's small plot producing real, meaningful food.

Hard work on modest land is shown here as genuinely productive.

Poverty here is not treated as the same thing as laziness or worthlessness.

🌾 Tillage means land worked and planted

🍽️ Even a poor family's plot produces food

💪 Hard work on modest land is productive

📖 Poverty is not the same as laziness

## 🧠 There Is That Is Destroyed For Want Of Judgment

"Want of judgment" means a real lack of wisdom, not bad luck.

This proverb names foolishness itself as a second cause of ruin in this book.

Many scholars believe this may point to unjust treatment rather than the poor person's own fault.

Either way, poor judgment somewhere in the picture leads to real loss.

🧠 Want of judgment means a real lack

⚖️ Foolishness is named as a cause of ruin

🤔 Many scholars connect this to unjust treatment

📖 Poor judgment somewhere leads to real loss

## 🪵 He That Spareth His Rod Hateth His Son

"Rod" here means physical discipline, a real corrective tool used in this culture.

"Spareth" means holding back, refusing to use it at all.

This is a hard saying, but the point is about neglecting a child's correction, not cruelty.

Withholding needed correction is described here as a failure of real love, not an act of kindness.

🪵 Rod means physical discipline in this culture

🚫 Spareth means holding back correction entirely

💔 Withholding correction is a failure of love

📖 Neglecting discipline is not real kindness

## ✋ He That Loveth Him Chasteneth Him Betimes

"Chasteneth" means disciplines, corrects with real consequence.

"Betimes" is an old word meaning early, promptly, without long delay.

This proverb pairs real love directly with timely, active correction.

Love here is shown through consistent guidance, not simply through warm feelings.

✋ Chasteneth means disciplines with real consequence

⏰ Betimes means early and without delay

🔗 Real love is paired with timely correction

📖 Love is shown through guidance, not just feelings

## 🍽️ The Righteous Eateth To The Satisfying Of His Soul

"Satisfying of his soul" means real, deep contentment, not just a full stomach.

This proverb pictures the righteous life as one where basic needs are actually met.

This is not a promise of luxury or excess.

A settled, sufficient life is shown here as part of walking with God.

🍽️ Satisfying of his soul means real contentment

✅ Needs are actually met for the righteous

🚫 This is not a promise of luxury

📖 A sufficient life comes from walking with God

## 🕳️ The Belly Of The Wicked Shall Want

"Want" here means to genuinely lack, to go without what is needed.

This closes the chapter with a stark contrast to the satisfied righteous just described.

The picture stays basic and physical on purpose, grounding this chapter's ideas in daily life.

Whatever a wicked life gains, this proverb says it will not be enough in the end.

🕳️ Want means to genuinely lack

🔄 This contrasts the satisfied righteous just named

🍽️ The picture stays basic and physical on purpose

📖 A wicked life will not have enough
`.trim();

export const PROVERBS_THIRTEEN_PERSONAL_SECTIONS = parseProverbsThirteenRawNotes(PROVERBS_THIRTEEN_RAW_NOTES);
