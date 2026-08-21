export type ProverbsTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyFourRawNotes(rawText: string): ProverbsTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 24:${startVerse}` : `Proverbs 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Proverbs 24 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_FOUR_RAW_NOTES = `# Proverbs 24:1-2
# 😒 Envy Not The Wicked's Company
---
## Be Not Thou Envious Against Evil Men

Envious here means wanting the life or advantages evil men seem to have.

Wicked people in Proverbs sometimes look successful or comfortable in the short term.

That appearance was never the same as being right with God.

Wisdom refuses to trade truth for a shortcut that looks tempting.

😒 Envious means wanting what they have

👑 Wicked men can look successful

🎭 Appearance is not the same as truth

📖 Wisdom will not trade truth for a shortcut

## Neither Desire To Be With Them

Desire to be with them means more than casual contact.

It points to wanting genuine friendship with people who love wrongdoing.

Proverbs treats close company as something that shapes a person over time.

Choosing friends wisely protects a person from slowly becoming like them.

🤝 Desire to be with them means friendship

🔗 It points to close, ongoing company

⏳ Company slowly shapes a person's character

📖 Choosing friends wisely protects your future

## Their Heart Studieth Destruction

Studieth is an old word meaning to plan carefully, not just think idly.

The evil man's heart works actively toward harming other people.

This is planned wrongdoing, not an occasional careless mistake.

Proverbs consistently shows evil as something worked at, not stumbled into.

🧠 Studieth means planning carefully, not idly

🎯 Their heart works actively toward harm

📋 This is planned, not accidental wrongdoing

📖 Evil in Proverbs is often deliberate

## Their Lips Talk Of Mischief

Mischief here means real trouble or harm, not playful pranks like today.

The word covers plotting, deception, or actual damage done to someone else.

Heart and lips work together in this verse, thought becoming speech.

What fills a person's mind eventually comes out through their words.

😈 Mischief means real harm, not pranks

🗣️ Heart and lips work together here

💭 Thought becomes speech in this verse

📖 What fills the mind shapes the words
# Proverbs 24:3-4
# 🏠 Wisdom Builds A House Worth Having
---
## Through Wisdom Is An House Builded

Wisdom here is compared to construction, not decoration added later.

A house needs a real foundation before anything else can stand.

This proverb treats wisdom as the foundation a whole life is built on.

Skipping wisdom is like building a house with no frame underneath it.

🏠 Wisdom is compared to construction here

🧱 A foundation must come before anything else

🏗️ Wisdom is the foundation for a whole life

📖 Skipping wisdom leaves a life with no frame

## By Understanding It Is Established

Established means made stable and lasting, not something built once and forgotten.

Understanding is what keeps the structure standing through pressure over time.

Wisdom starts the build, but understanding is what keeps it standing.

A house that only looks built quickly can still collapse under real weight.

🔧 Established means made stable and lasting

⏳ Understanding keeps the structure standing over time

🏚️ Wisdom starts it, understanding keeps it standing

📖 A quick build can still collapse

## By Knowledge Shall The Chambers Be Filled

Chambers here means the private inner rooms of a house, not just any space.

Ancient homes stored their most valuable possessions in rooms like these.

Knowledge is pictured filling the parts of life that matter most.

A house can look impressive outside and still be empty within.

🚪 Chambers means the private inner rooms

💎 Ancient homes stored value in rooms like these

🧠 Knowledge fills what matters most inside

📖 Looks full outside, can be empty inside

## With All Precious And Pleasant Riches

Precious and pleasant together describe wealth that is both valuable and genuinely enjoyable.

This is not wealth gained through shortcuts or dishonest dealing.

The proverb pictures a wise life as naturally, quietly prosperous over time.

Wisdom does not just protect a person, it also provides for them.

💎 Precious and pleasant means valuable and enjoyable

🚫 Not wealth gained through shortcuts or dishonesty

⏳ A wise life grows prosperous over time

📖 Wisdom protects and provides at once
# Proverbs 24:5-7
# 💪 Wisdom Is Real Strength
---
## A Wise Man Is Strong

This does not describe physical muscle or fighting ability.

Strength here means the real power that comes from clear judgment.

A wise person can accomplish what raw force alone cannot.

Proverbs consistently values a clear mind over brute power.

💪 Strong here is not physical muscle

🧠 Strength comes from clear judgment

🎯 Wisdom accomplishes what force cannot

📖 Proverbs values a clear mind over power

## A Man Of Knowledge Increaseth Strength

This repeats the same idea from the line just before it, with different words.

Increaseth shows that knowledge does not just exist, it actively builds real power.

Repetition in Hebrew poetry usually signals an idea worth remembering.

Learning is treated here as something that compounds over time.

🔁 This repeats the line just before it

📈 Increaseth means knowledge actively builds power

📢 Repetition signals an idea worth remembering

📖 Learning compounds like interest over time

## By Wise Counsel Thou Shalt Make Thy War

Counsel here means careful advice sought out before a major decision.

War in the ancient world meant real, permanent loss if planned poorly.

This proverb applies a battlefield picture to any major decision in life.

Good advice gathered ahead of time can prevent a costly mistake later.

🗣️ Counsel means careful advice sought beforehand

⚔️ War pictures real, permanent loss if planned poorly

🎯 This applies to any major life decision

📖 Advice gathered early prevents costly mistakes

## In Multitude Of Counsellors There Is Safety

Multitude simply means a large number, more than just one or two advisors.

Ancient kings regularly relied on a council of advisors before going to war.

No single person, however wise, sees every angle of a hard decision alone.

Safety here comes from many perspectives working together, not from one clever mind.

👥 Multitude means a large number of advisors

👑 Ancient kings relied on advisory councils

👀 No one person sees every angle alone

📖 Safety comes from many perspectives together

## Wisdom Is Too High For A Fool

Too high pictures wisdom as something out of reach.

Think of a high shelf a fool has not bothered to climb toward.

This does not mean a fool is incapable of ever learning.

It means the fool has not yet done the work to get there.

📏 Too high pictures wisdom out of reach

🚫 This is not about permanent inability

⏳ The fool has not yet done the work

📖 The picture is about distance, not ability

## He Openeth Not His Mouth In The Gate

The gate was the public square at a city's entrance where elders judged disputes and business happened.

A fool has nothing worth saying in that setting of real decisions.

Silence here is not humility, it is simply having nothing valuable to add.

Wisdom earns a person a voice in the places that actually matter.

🚪 The gate was the city's public square

⚖️ Elders judged disputes and business there

🤐 The fool has nothing worth saying

📖 Wisdom earns a voice in that room
# Proverbs 24:8-10
# 🧨 Schemers, Scorners, And Fainting Hearts
---
## He That Deviseth To Do Evil

Deviseth means to plan or scheme, not to stumble into wrongdoing by accident.

This describes evil as something worked out ahead of time, step by step.

Proverbs treats intentional planning of harm as worse than a careless mistake.

The word choice puts the blame on a deliberate decision, not bad luck.

🧠 Deviseth means planning, not stumbling

📋 This describes evil worked out ahead of time

⚠️ Intentional harm is worse than a mistake

📖 The blame lands on a real decision

## Shall Be Called A Mischievous Person

Called here means more than just a casual observation.

It carried real social weight in this ancient culture.

A mischievous person earns a reputation the whole community recognizes.

That reputation follows a person and shapes how others treat him.

🏷️ Being called this carried real social weight

👥 The whole community recognizes this reputation

🔁 Reputation follows a person going forward

📖 Secret character eventually becomes public

## The Thought Of Foolishness Is Sin

This raises the bar from action to something happening only in the mind.

Even a foolish plan that never gets carried out still counts as sin here.

Proverbs treats the inner life as morally real, not just outward behavior.

God is shown caring about what a person considers, not only what they do.

💭 This raises the bar to the mind

🚫 An uncarried plan still counts as sin

👀 The inner life is morally real

📖 God cares what a person considers

## The Scorner Is An Abomination To Men

A scorner is someone who mocks correction and looks down on wisdom itself.

Abomination is a strong word meaning something deeply offensive or disgusting.

Even other people, not only God, recognize how repellent this attitude is.

Mocking wisdom does not just anger God, it damages a person's own reputation.

😤 A scorner mocks correction and wisdom

🤢 Abomination means deeply offensive or disgusting

👥 Other people recognize how repellent this is

📖 Mocking wisdom damages a person's reputation

## If Thou Faint In The Day Of Adversity

Faint here means giving up or losing courage under real pressure.

Adversity points to genuine hardship, not just a minor inconvenience.

This verse names a moment every reader will eventually face in some form.

The question is not whether hardship comes, but how a person responds to it.

😔 Faint means giving up under pressure

⚠️ Adversity means real hardship, not inconvenience

⏳ Everyone faces a moment like this

📖 The response matters more than the hardship

## Thy Strength Is Small

This is blunt, not comforting, on purpose.

Giving up under pressure reveals how little inner strength was actually there.

The verse works like a mirror, showing true character under real stress.

Proverbs values strength that holds up when life gets hard, not just talk.

🪞 This verse works like a mirror

😔 Giving up reveals how little strength existed

💪 Real strength shows under real pressure

📖 Proverbs values strength that holds under stress
# Proverbs 24:11-12
# ⚖️ Do Not Look Away From Injustice
---
## Forbear To Deliver Them That Are Drawn Unto Death

Forbear means to hold back or refuse to act, even when action is possible.

Drawn unto death pictures someone being led away toward an unjust execution.

This command assumes the reader has some real power to help, not none.

Standing by silently is treated here as its own kind of failure.

🛑 Forbear means holding back from acting

⚖️ Drawn unto death pictures unjust execution

💪 This assumes real power to help

📖 Silence here is its own failure

## Those That Are Ready To Be Slain

This repeats the same danger from the line before with a slightly sharper picture.

Ready to be slain means the danger is close, not distant or hypothetical.

Hebrew poetry often restates an idea a second time to press it home.

The urgency of the moment is the whole point of the repetition.

🔁 This repeats the danger, sharper

⏳ Ready to be slain means close danger

📢 Repetition presses the idea home

📖 Urgency is the whole point here

## If Thou Sayest, Behold, We Knew It Not

This pictures someone trying to claim honest ignorance after doing nothing to help.

We knew it not is offered here as an excuse, not a real defense.

The verse anticipates exactly the kind of denial a guilty conscience reaches for.

Claiming ignorance does not automatically make the excuse true.

🙈 This pictures a claim of ignorance

💬 We knew it not sounds like an excuse

🎯 The verse anticipates a guilty denial

📖 Claiming ignorance does not make it true

## Doth Not He That Pondereth The Heart Consider It

Pondereth the heart means God weighs a person's true motives, not just their words.

This is a rhetorical question, and the expected answer is a clear yes.

No excuse offered out loud can hide the real truth from God.

The claim of ignorance from the line before gets answered directly here.

⚖️ Pondereth the heart means God weighs motives

❓ This rhetorical question expects the answer yes

👁️ No excuse can hide truth from God

📖 This directly answers the claim before it

## He That Keepeth Thy Soul, Doth Not He Know It

Keepeth thy soul pictures God as the one who watches over a person's whole life.

The same God who protects also sees clearly what that person actually does.

Protection and awareness are shown here as two sides of the same care.

No one escapes notice simply because God has also been kind to them.

🛡️ Keepeth thy soul means God watches over life

👁️ The same God who protects also sees

🔗 Protection and awareness are linked here

📖 Kindness from God does not mean no notice

## Shall Not He Render To Every Man According To His Works

Render means to repay or give back exactly what is deserved.

This closes the whole passage with a promise of real, final accountability.

Good deeds and failures to act are both included under his works.

No one's choices, including silent ones, disappear without consequence in the end.

⚖️ Render means repaying exactly what is deserved

🔚 This closes the passage with accountability

📋 Both actions and failures count as works

📖 No choice disappears without consequence
# Proverbs 24:13-14
# 🍯 Sweet As Honey, Sweet As Wisdom
---
## My Son, Eat Thou Honey, Because It Is Good

Honey was a genuine treat in the ancient world, not an everyday food.

This command sounds unusually simple compared to the warnings earlier in the chapter.

The teacher briefly shifts from danger to something pleasant before making a comparison.

Wisdom literature often uses an enjoyable image to introduce a deeper lesson.

🍯 Honey was a genuine treat, not everyday food

🔄 This shifts from warning to something pleasant

🎯 A pleasant image sets up a comparison

📖 Wisdom writing often teaches through enjoyment

## The Honeycomb, Which Is Sweet To Thy Taste

The honeycomb was the raw, natural source honey came from before processing.

Its sweetness was immediate and easy for anyone to recognize right away.

The teacher picks a pleasure everyone in the room already understood personally.

That shared, familiar pleasure becomes the bridge into the next verse's real point.

🍯 The honeycomb was honey's raw, natural source

👅 Its sweetness was immediate and easy to recognize

🌉 A familiar pleasure becomes a teaching bridge

📖 Shared experience sets up the real point

## So Shall The Knowledge Of Wisdom Be Unto Thy Soul

So shall signals the turn from the honey picture to its real meaning.

Wisdom is compared directly to something naturally sweet and genuinely satisfying.

This pictures wisdom as pleasure, not as a duty or burden.

The soul, not just the mouth, is where this proverb says satisfaction belongs.

🔄 So shall signals the turn to meaning

🍯 Wisdom is compared to something sweet

😊 This is wisdom as pleasure, not burden

📖 True satisfaction belongs to the soul

## Thy Expectation Shall Not Be Cut Off

Expectation means the hope a wise person holds for their own future.

Cut off pictures that hope ending suddenly and violently before it can happen.

This promises the opposite fate, a hope allowed to reach its end.

Proverbs used this same exact promise one chapter earlier, word for word.

🎯 Expectation means hope for the future

✂️ Cut off pictures that hope ending early

✅ This promises the opposite fate here

📖 The same promise appeared one chapter earlier
# Proverbs 24:15-18
# 🌅 The Righteous Fall And Rise Again
---
## Lay Not Wait, O Wicked Man, Against The Dwelling Of The Righteous

Lay not wait means do not set an ambush or ill intentioned trap.

This addresses the wicked man directly, not as a general observation.

The target is specifically someone's home, the place meant to feel safest.

Proverbs treats an attack on a person's household as an especially serious wrong.

🪤 Lay not wait means do not ambush

🗣️ This addresses the wicked man directly

🏠 The target is someone's home, their safest place

📖 An attack on a household is especially serious

## Spoil Not His Resting Place

Spoil here means to plunder, ruin, or destroy, not simply to inconvenience.

Resting place points to the peace and safety a home is supposed to offer.

This repeats the warning from the line before with a sharper, more physical picture.

The command protects not just property, but a person's basic sense of safety.

🔥 Spoil means to plunder or destroy

🛏️ Resting place means the safety of home

🔁 This repeats the warning, more sharply

📖 This protects safety, not just property

## For A Just Man Falleth Seven Times, And Riseth Up Again

Seven here signals completeness, meaning many times, not a literal exact count.

This does not describe moral failure, it describes hardship and setback.

The righteous life includes real trouble, not constant, easy success.

What defines the just man is that he keeps getting back up.

🔢 Seven signals completeness, many times, not exact

⚠️ This means hardship, not moral failure

🔁 The righteous life includes real setbacks

📖 Getting back up defines the just man

## But The Wicked Shall Fall Into Mischief

This contrasts sharply with the righteous man's repeated recovery just described.

The wicked man's fall is not temporary, it leads into lasting trouble.

Mischief again means real harm and ruin, the same meaning used earlier in the chapter.

The difference is not whether either man falls, it is what happens after.

⚖️ This contrasts with the righteous man's recovery

🕳️ The wicked man's fall leads into ruin

🔗 Mischief means real harm, as used earlier

📖 The difference is what happens after falling

## Rejoice Not When Thine Enemy Falleth

This warns against a very human, very tempting reaction to someone else's downfall.

Even a real enemy's suffering is not something a wise person celebrates.

Proverbs sets a standard here higher than simple fairness or revenge.

The command targets the heart's private reaction, not just outward behavior.

😊 This warns against celebrating someone's downfall

👤 Even an enemy's suffering is not celebrated

⚖️ This standard goes beyond simple fairness

📖 The command targets private, inward reaction

## Lest The LORD See It, And It Displease Him

This gives the actual reason behind the command just given.

God is shown personally watching how a person reacts to an enemy's pain.

Displease means this reaction genuinely offends God, not just breaks a rule.

The next line reveals an even sharper consequence for that same reaction.

🎯 This gives the reason for the command

👁️ God personally watches this reaction

😠 Displease means this genuinely offends God

📖 The next line adds a sharper consequence

## He Turn Away His Wrath From Him

This is a surprising warning in the whole chapter.

Gloating over an enemy's fall can make God ease off that enemy instead.

The reason is not mercy for the enemy.

It is displeasure with the one who gloated over him.

😮 This warning surprises many first time readers

🔄 Gloating can make God ease off the enemy

😠 The reason is displeasure with the one gloating

📖 Ugly satisfaction can backfire unexpectedly
# Proverbs 24:19-22
# 👑 Fear The LORD, Not The Wicked's Rise
---
## Fret Not Thyself Because Of Evil Men

Fret means to worry anxiously or grow bitter over something outside your control.

This repeats almost the exact warning that opened the whole chapter.

Proverbs returns to this theme because envy of evil men is a recurring temptation.

The repetition itself argues that this struggle deserves repeated attention.

😟 Fret means worrying anxiously or growing bitter

🔁 This repeats the chapter's opening warning

🎯 Envy of evil men is a recurring temptation

📖 Repetition argues this struggle needs attention

## Neither Be Thou Envious At The Wicked

This pairs the same warning against envy with the warning against fretting.

Fretting and envy are shown here as two sides of the same failure.

Both reactions treat the wicked as though they actually have something worth wanting.

The rest of this short section explains exactly why that view is wrong.

🔗 This pairs with the warning against fretting

⚖️ Fretting and envy share the same root

👀 Both treat the wicked as worth envying

📖 The next verses explain why that is wrong

## For There Shall Be No Reward To The Evil Man

Reward here means lasting gain, not a short term advantage that quickly fades.

Whatever the wicked seem to gain now is shown as temporary at best.

This directly answers the temptation to envy raised earlier in the chapter.

Real reward belongs to patient wisdom, not to evil.

🏆 Reward here means lasting gain, not short term

⏳ Any gain now is shown as temporary

🔁 This answers the earlier temptation to envy

📖 Real reward belongs to patient wisdom

## The Candle Of The Wicked Shall Be Put Out

Candle in this era meant a small oil lamp, not a wax candle like today.

A lit lamp pictured an ongoing household, family line, and daily life.

Putting the lamp out pictures that household's future coming to a final end.

This is the concrete picture behind the promise that there is no lasting reward.

🕯️ Candle meant a small oil lamp, not wax

🏠 A lit lamp pictured an ongoing household

🚫 Putting it out pictures a final end

📖 This is the picture behind no reward

## My Son, Fear Thou The LORD And The King

This pairs two very different kinds of authority in a single command.

Fearing the LORD means genuine reverence for the highest, ultimate authority.

Fearing the king means respecting the real authority ruling daily life.

Ancient wisdom writing often taught loyalty to both together, not one instead of the other.

🙏 Fear the LORD means ultimate reverence

👑 Fear the king means respecting real authority

🔗 The verse pairs both kinds of authority

📖 Ancient wisdom taught loyalty to both

## Meddle Not With Them That Are Given To Change

Meddle means getting mixed up in something risky that is not your business.

Given to change describes people plotting rebellion or working to overthrow authority.

Joining a rebellion looked appealing to some, but Proverbs warns it was a trap.

Loyalty here is treated as wisdom, not simply as blind obedience.

🚫 Meddle means getting mixed up in risk

⚔️ Given to change means plotting rebellion

🪤 Rebellion looked appealing but was a trap

📖 Loyalty here is treated as wisdom

## For Their Calamity Shall Rise Suddenly

Calamity means sudden disaster or ruin, not a slow, predictable decline.

This warns that judgment on rebels could arrive without warning.

The suddenness itself is part of the warning, not just the outcome.

A wise reader stays loyal precisely because that danger cannot be timed.

💥 Calamity means sudden disaster, not slow decline

⚠️ Judgment on rebels could arrive without warning

⏰ Suddenness itself is part of the warning

📖 Wise loyalty accounts for danger, not timing

## And Who Knoweth The Ruin Of Them Both

Them both points back to both the LORD and the king from two verses earlier.

This closing question leaves the exact danger deliberately vague and unpredictable.

No one can fully calculate how severe that judgment might turn out to be.

The uncertainty itself becomes part of the reason for staying loyal in the first place.

🔗 Them both means the LORD and the king

❓ This question leaves the danger vague on purpose

🔮 No one can fully calculate the judgment

📖 Uncertainty itself supports staying loyal
# Proverbs 24:23-26
# 🗣️ Honest Judgment, Honest Answers
---
## These Things Also Belong To The Wise

This line marks a structural shift within the book of Proverbs.

An earlier collection called the words of the wise began in chapter twenty two.

These also signals a second, shorter collection starting right here.

Recognizing this shift explains why some sayings feel more compressed from here on.

🔖 This marks a structural shift in Proverbs

📚 That earlier collection began in chapter twenty two

🔗 These also signals a second, shorter collection

📖 Noticing this explains a slight change in tone

## It Is Not Good To Have Respect Of Persons In Judgment

Respect of persons means favoring someone unfairly because of status, wealth, or relationship.

A judge in this culture was expected to treat every case purely on its facts.

Bias in judgment corrupted the whole system meant to protect ordinary people.

This second collection opens with the same demand for justice found throughout Proverbs.

⚖️ Respect of persons means unfair favoritism

👨‍⚖️ Judges were expected to judge only facts

🚫 Bias corrupted the whole justice system

📖 Justice is this collection's opening demand

## He That Saith Unto The Wicked, Thou Art Righteous

This describes a judge or witness declaring a guilty person innocent.

This kind of lie does not just fail one person, it damages public trust.

Calling evil good was treated in scripture as a serious kind of corruption.

The consequence for this exact failure comes immediately in the next line.

⚖️ This describes declaring a guilty person innocent

🔓 This lie damages public trust broadly

🚫 Calling evil good is serious corruption

📖 The consequence follows in the next line

## Him Shall The People Curse, Nations Shall Abhor Him

This escalates from one community's anger to something even wider.

Abhor means a deep, visceral disgust, stronger than simple disapproval.

A corrupt judge's reputation does not stay contained within one town.

Injustice in judgment earns a response as strong as the crime it protected.

📈 This escalates to something wider than one town

🤢 Abhor means deep, visceral disgust

🌍 A corrupt reputation does not stay contained

📖 Injustice earns a response matching its harm

## But To Them That Rebuke Him Shall Be Delight

Rebuke means to correct someone honestly, even when it is unwelcome.

This contrasts sharply with the corrupt judge condemned just before it.

Honest correction is shown bringing genuine delight, not resentment, to those who hear it.

Proverbs consistently treats honest correction as a gift, not an insult.

🗣️ Rebuke means honest correction, even unwelcome

⚖️ This contrasts with the corrupt judge before it

😊 Honest correction brings genuine delight here

📖 Correction is treated as a gift

## Every Man Shall Kiss His Lips That Giveth A Right Answer

Kissing on the lips was a customary greeting of respect and honor in this culture.

This is not a literal instruction, it pictures genuine appreciation and honor.

A right answer, honest and true, earns real respect from those who hear it.

Honesty is shown paying off socially, not just morally, in this proverb.

💋 Kissing was a customary greeting of honor

🎭 This pictures appreciation, not a literal act

✅ A right answer earns real respect

📖 Honesty pays off socially, not just morally
# Proverbs 24:27-29
# 🌾 Build In The Right Order
---
## Prepare Thy Work Without

Without here means outdoors, in the fields, not inside near the home.

This tells a young farmer to secure his income source first.

Establishing a working farm came before investing in a permanent house.

Practical wisdom here protects against building comfort before building a stable future.

🌾 Without here means outdoors in the fields

🎯 Secure your income source first

🏠 Farming came before building a house

📖 Comfort should not come before stability

## And Make It Fit For Thyself In The Field

Make it fit means putting in the real, patient work required.

This is not a one time task but an ongoing responsibility over a season.

Wisdom here is shown as practical, not just something to think about.

A field made ready produces reliable food for the years that follow.

🌱 Make it fit means real, patient work

⏳ This is ongoing, not a one time task

🧠 Wisdom here is practical, not just mental

📖 A ready field produces reliable food

## And Afterwards Build Thine House

Afterwards is the key word carrying the whole verse's real point.

Building a house before securing an income risked real, lasting hardship.

This is practical order, not a rule against ever building a home.

Wisdom often means doing things in the right order, not skipping ahead.

🔑 Afterwards is the key word here

⚠️ Building first risked real hardship

✅ This is order, not a ban on homes

📖 Wisdom often means the right order

## Be Not A Witness Against Thy Neighbour Without Cause

A witness in this culture could determine someone's guilt, property, or even their life.

Without cause points to testimony offered out of spite, not honest evidence.

False or careless testimony could destroy an innocent neighbor's reputation permanently.

This command protects a whole community's trust in its own legal system.

👨‍⚖️ A witness could determine guilt or property

😠 Without cause means testimony from spite

💔 False testimony could destroy an innocent neighbor

📖 This protects trust in the legal system

## And Deceive Not With Thy Lips

This pairs with the warning just before it about careless testimony.

Deceive means intentionally misleading someone, not simply being mistaken.

Words carried real legal and social weight in this close knit community.

A lie spoken casually could still cause permanent, serious damage to someone else.

🔗 This pairs with the warning before it

🎭 Deceive means intentionally misleading, not mistaken

🗣️ Words carried real legal weight here

📖 Casual lies still cause serious damage

## I Will Do So To Him As He Hath Done To Me

This describes a revenge mindset, matching harm with equal harm.

It sounds fair on the surface, an even trade for an even wrong.

Proverbs elsewhere consistently warns against this exact kind of private payback.

Fairness on the surface can still hide a heart bent on revenge.

⚖️ This describes a revenge mindset

🤔 It sounds fair, an even trade

🚫 Proverbs warns against private payback elsewhere

📖 Surface fairness can still hide revenge

## I Will Render To The Man According To His Work

This is the proverb's own answer to the revenge mindset just described.

Render here means leaving repayment to a proper authority, not personal vengeance.

God and just human courts are shown as the correct place for that judgment.

The chapter ends this short section by trusting real justice over personal payback.

⚖️ This answers the revenge mindset directly

🏛️ Render means leaving repayment to real authority

🙏 God and just courts handle real judgment

📖 Real justice is trusted over payback
# Proverbs 24:30-34
# 🌿 A Field That Told The Whole Story
---
## I Went By The Field Of The Slothful

This opens a short personal story the teacher uses to make his point.

Slothful means lazy, someone unwilling to put in consistent effort.

Wisdom literature often teaches through observation, not just direct command.

The teacher becomes an eyewitness, not just someone repeating a rule.

🌾 This opens a short personal story

😴 Slothful means lazy, avoiding consistent effort

👀 Wisdom often teaches through observation

📖 The teacher speaks as an eyewitness

## And By The Vineyard Of The Man Void Of Understanding

A vineyard required steady, patient care across an entire growing season.

Void of understanding describes someone who never grasps what real effort requires.

Pairing a field and a vineyard shows the same neglect repeated in two places.

This is a pattern of neglect, not one unlucky season.

🍇 A vineyard required steady, patient care

🧠 Void of understanding means missing what effort requires

🔁 Field and vineyard show a repeated pattern

📖 This is a pattern, not one bad season

## And, Lo, It Was All Grown Over With Thorns

Lo is an old word meant to grab the reader's attention suddenly.

Thorns growing freely show a field that received no ongoing care at all.

In this culture a thorn choked field signaled real, visible shame to any neighbor passing by.

Neglect here becomes something the whole community could plainly see.

👀 Lo grabs the reader's attention suddenly

🌿 Thorns show a field with no care

😬 A thorn choked field signaled visible shame

📖 Neglect became visible to the whole community

## And The Stone Wall Thereof Was Broken Down

A stone wall protected a field or vineyard from animals and thieves.

A broken wall left everything inside exposed and unprotected.

This detail shows neglect had gone on for a long, unaddressed stretch of time.

One small unrepaired problem had grown into a much larger, visible failure.

🧱 A stone wall protected against animals and thieves

🕳️ A broken wall left everything exposed

⏳ This shows neglect over a long stretch

📖 One small problem grew into a bigger one

## Then I Saw, And Considered It Well

The teacher does not just glance and move on quickly.

Considered it well means he stopped and thought carefully about what he saw.

Real wisdom often comes from paying close attention to ordinary, everyday scenes.

This moment of careful looking sets up the lesson still to come.

👀 The teacher does not glance and move on

🧠 Considered it well means thinking carefully

🎯 Wisdom often comes from close attention

📖 This careful looking sets up the lesson

## I Looked Upon It, And Received Instruction

The ruined field itself becomes the teacher's own source of instruction.

This models exactly what a wise person is supposed to do with a hard lesson.

Even a lazy neighbor's failure could still produce something valuable for someone paying attention.

Wisdom is shown here as available anywhere a person is willing to look for it.

🌾 The ruined field becomes a real teacher

🎯 This models how to learn from failure

💡 Even failure can produce something valuable

📖 Wisdom is available to anyone paying attention

## Yet A Little Sleep, A Little Slumber, A Little Folding Of The Hands To Sleep

This repeats the exact same warning used earlier in Proverbs about laziness.

Each small phrase pictures a tiny, seemingly harmless request for just a bit more rest.

Folding of the hands pictures someone who has simply stopped working altogether.

No single small choice looks dangerous, which is exactly what makes the pattern so easy to miss.

🔁 This repeats an earlier warning about laziness

😴 Each phrase pictures a small request for rest

🙌 Folding of the hands means stopped working

📖 Small choices form a pattern easy to miss

## So Shall Thy Poverty Come As One That Travelleth

Travelleth here does not mean poverty walks in slowly like a casual visitor.

It pictures a persistent traveler steadily approaching, closer with every single day.

This directly answers the earlier picture of piling up small, careless choices.

Small delays add up until the outcome finally, quietly arrives.

🚶 Travelleth pictures a persistent, approaching traveler

⏳ Poverty comes closer with every small delay

🔗 This answers the earlier small choices picture

📖 Small delays add up to a real outcome

## And Thy Want As An Armed Man

Armed man pictures a robber who strikes suddenly, not a threat that creeps in slowly.

This final image contrasts sharply with the slow travel picture from the line before it.

Poverty from laziness can look gradual, right up until it does not.

The chapter closes on a sharp warning instead of a gentle summary.

⚔️ Armed man pictures a sudden robber

⚡ This contrasts with the slow travel image

😳 Poverty can look gradual until it is not

📖 The chapter closes on a sharp warning
`.trim();

export const PROVERBS_TWENTY_FOUR_PERSONAL_SECTIONS = parseProverbsTwentyFourRawNotes(PROVERBS_TWENTY_FOUR_RAW_NOTES);
