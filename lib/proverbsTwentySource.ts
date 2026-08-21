export type ProverbsTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyRawNotes(rawText: string): ProverbsTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 20:${startVerse}` : `Proverbs 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 20 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_RAW_NOTES = `# Proverbs 20:1-4
# 🍷 Mockers, Fools, And A Lazy Farmer
---
## 🍷 Wine Is A Mocker, Strong Drink Is Raging

"Mocker" means something that fools a person into false confidence.

Wine can feel like comfort at first taste.

"Strong drink" means a harder, more powerful drink than wine.

"Raging" pictures a drink that stirs up anger and chaos.

🍷 Mocker means it fools a person

😊 Wine feels like comfort at first

🥃 Strong drink means a harder liquor

📖 Raging pictures anger and chaos

## 😵 Whosoever Is Deceived Thereby Is Not Wise

"Deceived thereby" means fooled by what the drink promises.

A drunk person often believes they are thinking clearly when they are not.

Proverbs treats that blindness as a failure of wisdom.

Trusting a clouded mind is the real danger.

😵 Deceived thereby means fooled by it

🌀 Judgment feels clear when it is not

📉 Proverbs treats this as a wisdom failure

📖 Trusting a clouded mind is the danger

## 🦁 The Fear Of A King Is As The Roaring Of A Lion

A king in this culture held power that could feel overwhelming.

"Fear" here means the dread his anger could cause, not simple respect.

A lion's roar was the most frightening sound people in this region knew.

Proverbs nineteen already used this same image for a king's wrath.

🦁 Fear means dread, not simple respect

👑 Kings held nearly unchecked power

🔁 This image repeats from Proverbs nineteen

📖 Real danger justified repeating the image

## 😤 Whoso Provoketh Him To Anger Sinneth Against His Own Soul

"Provoketh" means deliberately stirring someone up.

Provoking a king with that much power was not just risky.

Proverbs calls it sin against the provoker's own soul.

Their careless choice endangers themselves, not just their target.

😤 Provoketh means deliberately stirring someone

⚠️ Provoking this king was truly risky

💔 Proverbs calls this sin against oneself

📖 Careless anger endangers the provoker too

## 🕊️ It Is An Honour For A Man To Cease From Strife

"Strife" means ongoing conflict or quarreling.

"Cease" means choosing to stop, even when a fight is available.

Proverbs treats walking away as honourable, not weak.

This echoes the same idea from chapter nineteen, passing over an offense as glory.

🕊️ Strife means ongoing conflict

🛑 Cease means choosing to stop

🏆 Walking away is called honourable

📖 This echoes chapter nineteen's teaching

## 🙄 But Every Fool Will Be Meddling

"Meddling" means inserting yourself into a conflict that is not yours.

A fool cannot resist stirring into other people's fights.

This contrasts directly with the wise person named in the line before it.

Restraint takes wisdom that a fool simply does not have.

🙄 Meddling means inserting into other fights

😠 A fool cannot resist stirring conflict

⚖️ Contrasts with the wise person before

📖 Restraint takes wisdom a fool lacks

## 🥶 The Sluggard Will Not Plow By Reason Of The Cold

"Sluggard" is an old word for someone habitually lazy.

"By reason of the cold" means using bad weather as an excuse.

Plowing had a narrow window each season to be done at all.

A sluggard lets a small discomfort cost him the whole season.

🥶 Sluggard means someone habitually lazy

❄️ By reason of the cold means an excuse

🌾 Plowing had a narrow yearly window

📖 A small discomfort costs the whole season

## 🍂 Therefore Shall He Beg In Harvest, And Have Nothing

Harvest was the one season that paid for an entire year.

Missing the plowing season meant missing out on the harvest completely.

"Beg" pictures the sluggard now depending on others for basic food.

His own excuse becomes the cause of his own hunger.

🍂 Harvest paid for the whole year

🚫 Missing plowing meant missing harvest

🙏 Beg means depending on others now

📖 His excuse became his own hunger
# Proverbs 20:5-8
# 💧 Deep Counsel And Rare Faithfulness
---
## 💧 Counsel In The Heart Of Man Is Like Deep Water

"Counsel" here means a person's true intentions and plans.

Deep water hides what is under its surface from a casual glance.

A person's real motives often stay hidden the same way.

Most people cannot see past the surface of what someone shows them.

💧 Counsel means someone's true intentions

🌊 Deep water hides what is under it

👤 Real motives often stay hidden

📖 Most people miss what is beneath

## 🪣 But A Man Of Understanding Will Draw It Out

"Draw it out" pictures lowering a bucket into a deep well.

A wise person asks the right questions instead of guessing.

Understanding here is treated as a skill, something a person can grow in.

Patience uncovers what a quick glance never will.

🪣 Draw it out pictures lowering a bucket

❓ A wise person asks the right questions

🌱 Understanding is a skill that grows

📖 Patience uncovers what a glance misses

## 📢 Most Men Will Proclaim Every One His Own Goodness

"Proclaim" means announcing something loudly and publicly.

Most people are quick to talk about their own good qualities.

Proverbs states this as an observed pattern in people generally.

Self praise is common and easy to offer.

📢 Proclaim means announcing loudly

👤 Most people talk up their own good

👁️ Proverbs simply observes this pattern

📖 Self praise is easy and common

## 🔍 But A Faithful Man Who Can Find?

This is a rhetorical question, not a real search for an answer.

"Faithful" means someone reliable and true to their word over time.

Talking about goodness is easy, but proving it consistently is rare.

The question exposes the gap between claiming loyalty and actually living it.

🔍 A rhetorical question, no real search

🤝 Faithful means reliable over time

📉 Consistent proof is rarer than talk

📖 The gap between claim and living it

## 🧭 The Just Man Walketh In His Integrity

"Integrity" means the same honest life whether or not anyone is watching.

Chapter nineteen already praised this exact same quality in the poor man.

Here it is named again, this time without any mention of wealth.

Integrity stands on its own as the point being praised.

🧭 Integrity means honesty when unwatched

🔁 Chapter nineteen praised this same quality

💰 No mention of wealth is needed here

📖 Integrity stands on its own value

## 👨‍👧‍👦 His Children Are Blessed After Him

A parent's reputation was closely tied to the whole family in this culture.

An honest life left behind more than memory.

It left behind a kind of inheritance that outlasted the man himself.

Children carried the benefit of a father's integrity long after he was gone.

👨‍👧‍👦 A father's reputation shaped his whole family

🎁 Integrity left behind more than memory

⏳ Its benefit outlasted the man himself

📖 Children carried that inheritance forward

## 👑 A King That Sitteth In The Throne Of Judgment

"Throne of judgment" means the seat where a king personally heard legal cases.

Kings in the ancient Near East often served as the final court of appeal.

Sitting there meant taking direct responsibility for justice in the kingdom.

This was not a symbolic role.

👑 Throne of judgment means hearing legal cases

⚖️ Kings often served as the final court

🛡️ Sitting there meant owning justice directly

📖 This role was not symbolic

## 👁️ Scattereth Away All Evil With His Eyes

This pictures a king whose careful attention exposes wrongdoing on sight.

"Scattereth" suggests wrongdoers fleeing the moment they are noticed.

A discerning ruler did not need long investigations to sense guilt.

His presence alone could make dishonesty harder to hide.

👁️ A careful gaze exposes wrongdoing

🏃 Scattereth pictures wrongdoers fleeing notice

🧠 A discerning king senses guilt quickly

📖 His presence made dishonesty harder to hide
# Proverbs 20:9-12
# ⚖️ Clean Hearts And Honest Scales
---
## ❓ Who Can Say, I Have Made My Heart Clean, I Am Pure From My Sin?

This is another rhetorical question expecting the answer nobody.

"Made my heart clean" means claiming complete freedom from sin by one's own effort.

No person in this book is ever shown reaching that on their own.

The verse quietly confronts anyone tempted toward self righteousness.

❓ A rhetorical question expecting nobody

🧼 Made my heart clean means self claimed purity

🚫 No one reaches that alone

📖 The verse confronts self righteousness

## ⚖️ Divers Weights, And Divers Measures

"Divers" is an old word meaning different or mismatched.

Merchants sometimes kept two sets of weights.

One weight was heavier for buying, the other lighter for selling.

That trick let them cheat both sides of a trade.

⚖️ Divers means different or mismatched

💰 Merchants kept two sets of weights

🔀 One heavier, one lighter for cheating

📖 The scale itself became the lie

## 🚫 Both Of Them Are Alike Abomination To The LORD

"Abomination" is one of the strongest words in this book, meaning something God finds truly disgusting.

Both the heavy weight and the light weight are condemned equally.

This was not a small technicality to God.

Cheating in trade was treated as a moral failure, not just a business one.

🚫 Abomination means truly disgusting to God

⚖️ Both weights condemned equally

📉 Not a small technicality to God

📖 Trade dishonesty was a moral failure

## 🧒 Even A Child Is Known By His Doings

"Doings" means a person's actual actions and behavior.

Character shows up early in life, not just in adulthood.

A child's true nature is visible long before anyone gives them a formal test.

Actions reveal a person faster than words ever could.

🧒 Doings means actual actions

🌱 Character shows up early in life

👀 A child's nature is visible young

📖 Actions reveal a person fastest

## ✔️ Whether His Work Be Pure, And Whether It Be Right

This names two separate tests, not one.

"Pure" points to the motive behind an action.

"Right" points to whether the action itself matches the standard.

A deed can look right on the outside and still come from a wrong heart.

✔️ Two separate tests are named here

💛 Pure points to the motive

📏 Right points to the action itself

📖 A right act can hide a wrong heart

## 👂 The Hearing Ear, And The Seeing Eye

These name two of the most basic human senses.

Nothing about them feels remarkable on its own.

The next line is about to make a much bigger claim about where they came from.

Naming them first sets up that surprising claim.

👂 Hearing names a basic sense

👁️ Seeing names another basic sense

🤔 Neither feels remarkable alone

📖 The next line reveals their source

## 🙏 The LORD Hath Made Even Both Of Them

This line makes the point flat, without any image or metaphor.

Even something as ordinary as perception is credited directly to God.

"Even both" stresses that neither sense was an accident of nature.

A God who made perception can also see through deception.

🙏 God is credited with ordinary senses

👀 Even both stresses this was no accident

🧠 Perception itself is a gift from God

📖 A God who made sight sees through lies
# Proverbs 20:13-16
# 😴 Sleep, Bargains, And Broken Pledges
---
## 😴 Love Not Sleep, Lest Thou Come To Poverty

"Lest" means so that something bad does not happen.

This is a direct warning, not a suggestion.

Chapter nineteen already connected laziness with hunger.

This chapter connects the same laziness directly to poverty.

😴 Lest means so that this is avoided

⚠️ A direct warning, not a suggestion

🔁 Chapter nineteen linked laziness with hunger

📖 This verse links it to poverty

## 👀 Open Thine Eyes, And Thou Shalt Be Satisfied With Bread

"Open thine eyes" pictures simply waking up and getting to work.

This is the plain opposite instruction from the line before it.

Basic effort is shown producing basic provision.

The promise here is modest, enough bread, not sudden riches.

👀 Open thine eyes means getting to work

🔄 The plain opposite of loving sleep

🍞 Effort produces basic provision

📖 The promise is enough, not riches

## 🗣️ It Is Naught, It Is Naught, Saith The Buyer

"Naught" means worthless.

This repeats a buyer's complaint twice on purpose, the way real haggling actually sounded.

A buyer talked down an item's value to get a lower price.

This was a common bargaining trick in ancient marketplaces.

🗣️ Naught means worthless

🔁 Repeated twice like real haggling

💸 Buyers talked down value to save money

📖 A common ancient marketplace trick

## 😏 But When He Is Gone His Way, Then He Boasteth

The same buyer who complained now brags about the deal once he is gone.

His public complaint was never honest to begin with.

Proverbs exposes the two faced nature of that kind of bargaining.

Words used to gain an advantage were not meant to be true.

😏 The same buyer now brags privately

🎭 His complaint was never honest

👥 Proverbs exposes two faced bargaining

📖 His words served advantage, not truth

## 💎 There Is Gold, And A Multitude Of Rubies

Gold and rubies were among the most valuable things known in this world.

"Multitude" means a large quantity.

This line sets up a comparison with something even more valuable.

Naming wealth first makes the coming contrast land harder.

💎 Rubies were among the most valuable things

🪙 Multitude means a large quantity

⚖️ This sets up a comparison

📖 Naming wealth makes the contrast land harder

## 📚 But The Lips Of Knowledge Are A Precious Jewel

"Lips of knowledge" means wise, informed speech.

Wise words are ranked above even gold and rubies here.

A person can lose wealth quickly, but wisdom stays with them.

This is the same ranking of wisdom over riches seen throughout this book.

📚 Lips of knowledge means wise speech

💰 Ranked above gold and rubies

🧠 Wisdom stays after wealth is gone

📖 This book ranks wisdom over riches

## 👕 Take His Garment That Is Surety For A Stranger

"Surety" means collateral, something held as a guarantee for a loan.

In this culture, a man's outer garment doubled as security for a debt.

This line describes taking that collateral from someone who foolishly guaranteed a stranger's loan.

The Law required returning a poor man's cloak by nightfall, showing how serious this risk was.

👕 Surety means collateral for a loan

🧥 A garment could secure a debt

⚠️ This describes a foolish guarantee

📖 The Law treated this risk seriously

## 🚨 And Take A Pledge Of Him For A Strange Woman

"Strange woman" is this book's repeated warning label for a woman offering forbidden temptation.

"Pledge" again means collateral held as a guarantee.

Guaranteeing debt for a stranger was risky enough.

Proverbs treats guaranteeing anything tied to this temptation as even more foolish.

🚨 Strange woman means forbidden temptation

🤝 Pledge means collateral again

⚠️ Guaranteeing a stranger was already risky

📖 This temptation made it even worse
# Proverbs 20:17-19
# 🍞 Deceitful Bread And Loose Lips
---
## 🍞 Bread Of Deceit Is Sweet To A Man

"Bread of deceit" means food or gain that was obtained by lying or cheating.

It tastes sweet at first, exactly like anything else stolen or won dishonestly.

The appeal is real, not imagined.

That is what makes dishonest gain so tempting in the first place.

🍞 Bread of deceit means dishonest gain

😋 It tastes sweet at first

✅ The appeal here is real

📖 That is what makes it tempting

## 🪨 But Afterwards His Mouth Shall Be Filled With Gravel

This flips the picture completely from sweet to painful.

"Gravel" pictures biting down on something that damages the teeth instead of feeding them.

Dishonest gain eventually turns painful, even if the first taste was pleasant.

The full cost always arrives later, not up front.

🪨 Gravel pictures biting something damaging

🔄 Flips from sweet to painful

⏳ The cost always arrives later

📖 Dishonest gain eventually turns painful

## 🤝 Every Purpose Is Established By Counsel

"Purpose" here means a plan someone intends to carry out.

"Established" means made solid and reliable.

A plan tested by other people's advice tends to hold up better than one made alone.

This applies to ordinary decisions, not just major ones.

🤝 Purpose means an intended plan

🏗️ Established means made solid

👂 Outside advice makes plans hold up

📖 This applies to ordinary decisions too

## ⚔️ And With Good Advice Make War

This raises the stakes to the highest decision a king could face.

War carried consequences for an entire nation, not just one person.

If counsel mattered for daily choices, it mattered even more here.

No wise king acted alone on something this serious.

⚔️ War was the highest stakes decision

🌍 Consequences reached a whole nation

📈 Counsel mattered even more here

📖 No wise king acted alone on this

## 🤫 He That Goeth About As A Talebearer Revealeth Secrets

"Talebearer" means someone who spreads gossip from person to person.

"Revealeth secrets" means exposing what was meant to stay private.

A talebearer treats someone else's trust as something to trade for attention.

That betrayal usually costs more than the gossip is worth.

🤫 Talebearer means a person who gossips

🔓 Revealeth secrets means exposing private trust

💔 Trust gets traded for attention

📖 Betrayal costs more than gossip is worth

## 😐 Therefore Meddle Not With Him That Flattereth With His Lips

"Flattereth" means offering false praise to gain someone's favor.

A person who flatters easily will also gossip easily.

Both habits come from the same loose, untrustworthy tongue.

Proverbs advises staying away from that kind of person entirely.

😐 Flattereth means false praise for favor

🔗 Flattery and gossip share one cause

👅 Both come from a loose tongue

📖 Proverbs advises staying away entirely
# Proverbs 20:20-22
# 🕯️ Cursing Parents And Waiting On The LORD
---
## 🚫 Whoso Curseth His Father Or His Mother

"Curseth" here means treating a parent with open contempt, not casual complaining.

The Law of Moses treated this as an offense with the most serious possible penalty.

Honoring parents held a central place in this culture's whole moral structure.

This was never treated as a minor family dispute.

🚫 Curseth means open contempt for parents

📜 The Law treated this with grave seriousness

👪 Honoring parents was central to this culture

📖 Never treated as a minor dispute

## 🕯️ His Lamp Shall Be Put Out In Obscure Darkness

A lamp in this culture pictured a person's life, family line, and legacy continuing on.

"Put out" means that light being extinguished completely.

"Obscure darkness" means a darkness so complete that nothing can be found in it.

Losing that lamp meant losing everything a family's future depended on.

🕯️ A lamp pictures a family's legacy

🌑 Put out means that light extinguished

⚫ Obscure darkness means total darkness

📖 Losing it meant losing the future

## ⏩ An Inheritance May Be Gotten Hastily At The Beginning

"Hastily" means rushed, grabbed quickly instead of earned over time.

This could describe cheating an heir out of their rightful share early.

It could also describe any wealth gained through a shortcut instead of patient work.

Either way, speed itself is the warning sign here.

⏩ Hastily means rushed instead of earned

💰 Could mean cheating an heir early

🏃 Or any wealth gained by shortcut

📖 Speed itself is the warning sign

## 📉 But The End Thereof Shall Not Be Blessed

"The end thereof" means how the whole situation eventually turns out.

Quick gain is shown lacking the lasting blessing that patient, honest gain carries.

This is not a promise that dishonest wealth vanishes overnight.

It is a warning that it never truly settles into something good.

📉 The end thereof means the outcome

⏳ Quick gain lacks lasting blessing

🚫 Not a promise it vanishes overnight

📖 It never settles into something good

## 😤 Say Not Thou, I Will Recompense Evil

"Recompense" means paying someone back, here specifically for a wrong they did.

This instruction speaks directly to the reader's own private plans for revenge.

Proverbs is not saying the wrong does not matter.

It is saying personal revenge is not the reader's job to carry out.

😤 Recompense means paying someone back

🗣️ This addresses private revenge plans

✅ The wrong still matters

📖 Revenge is not the reader's job

## ⏳ But Wait On The LORD, And He Shall Save Thee

"Wait on" means trusting God's timing instead of acting on impulse.

This hands the responsibility for justice to God directly.

That trust takes patience, especially when the wrong feels urgent.

Proverbs treats that patience as strength, not passivity.

⏳ Wait on means trusting God's timing

🙏 Justice is handed to God directly

💪 This kind of patience takes strength

📖 Proverbs treats it as strength
# Proverbs 20:23-25
# ⚖️ False Balances And Hasty Vows
---
## ⚖️ Divers Weights Are An Abomination Unto The LORD

This repeats the exact warning from verse ten in this same chapter.

Hebrew writers often repeated an idea to press its importance further.

Dishonest scales clearly troubled God enough to name twice in one chapter.

Repetition here is emphasis, not accident.

⚖️ Repeats the warning from verse ten

🔁 Repetition presses an idea further

😠 Dishonest scales troubled God deeply

📖 This repetition is emphasis, not accident

## 📊 And A False Balance Is Not Good

"Balance" here means a scale used to weigh out goods for trade.

"Not good" sounds mild next to the word abomination used just before it.

This is understatement used on purpose for effect.

That mild wording makes the real problem land harder.

📊 Balance means a trade scale

😐 Not good sounds mild by contrast

🎭 This understatement is used on purpose

📖 The mildness makes the point sharper

## 🧭 Man's Goings Are Of The LORD

"Goings" means a person's steps, choices, and direction in life.

This states plainly that God is involved in guiding even ordinary decisions.

That claim is bigger than it first sounds.

It means no choice happens fully outside of God's awareness.

🧭 Goings means a person's steps

🙏 God guides even ordinary decisions

🌍 The claim is bigger than it sounds

📖 No choice is outside God's awareness

## ❓ How Can A Man Then Understand His Own Way?

This question follows naturally from the line just before it.

If God guides a person's steps, that person's own view of their path is limited.

This is not a call to stop planning or thinking.

It is an honest admission that self understanding has real limits.

❓ Follows naturally from the line before

🌫️ Human view of one's own path is limited

🚫 Not a call to stop planning

📖 Self understanding has real limits

## 🕳️ It Is A Snare To The Man Who Devoureth That Which Is Holy

"Snare" means a trap, something that looks safe until it closes.

"Devoureth that which is holy" means treating something dedicated to God carelessly, as if it were ordinary.

In this culture, a person could speak a vow dedicating something to God on impulse.

Doing that without thinking set a trap for the person who spoke it.

🕳️ Snare means a hidden trap

🙏 Devoureth holy things means treating them carelessly

🗣️ A vow could be spoken on impulse

📖 Careless words became a real trap

## 🤔 And After Vows To Make Enquiry

"Enquiry" means asking questions or reconsidering afterward.

This pictures someone making a vow first, then only later thinking through what it will actually cost.

That backward order is exactly the trap named in the line before it.

Proverbs elsewhere warns that a promise to God should be paid, not renegotiated later.

🤔 Enquiry means reconsidering afterward

🔄 The vow came before the thought

🕳️ That backward order is the trap

📖 A vow to God should be kept
# Proverbs 20:26-30
# 👑 A King's Justice And Life's Seasons
---
## 👑 A Wise King Scattereth The Wicked

This repeats the same verb used for the king's eyes back in verse eight.

Scattering pictures wrongdoers being exposed and driven apart from their scheme.

A wise king actively pursued justice instead of waiting for problems to solve themselves.

That active pursuit protected the whole kingdom.

👑 Repeats the verb from verse eight

🏃 Scattering means exposing and dividing wrongdoers

⚖️ A wise king pursued justice actively

📖 That pursuit protected the whole kingdom

## 🌾 And Bringeth The Wheel Over Them

"The wheel" refers to a heavy threshing wheel dragged over grain to separate it from the husk.

Applying that image to punishing the wicked pictures a harsh, thorough judgment.

This is a farming image turned into a picture of justice.

The punishment matches the seriousness of organized wrongdoing.

🌾 The wheel means a threshing wheel

🌀 Threshing separated grain from husk

⚖️ This pictures harsh, thorough judgment

📖 It matches the seriousness of the wrong

## 🕯️ The Spirit Of Man Is The Candle Of The LORD

"Candle" here means a lamp, something that gives light to see by.

This pictures human conscience as a light that God Himself placed inside a person.

That inner light was never something people gave themselves.

It was placed there to help a person see their own heart clearly.

🕯️ Candle means a lamp for light

🧠 This pictures human conscience

🎁 God placed that light inside a person

📖 It helps a person see their heart

## 🔦 Searching All The Inward Parts Of The Belly

"Inward parts of the belly" is an old way of naming a person's deepest thoughts and motives.

This pictures that inner light reaching places a person might try to hide even from themselves.

Nothing about a person's motives stays fully hidden from this searching.

That searching light leaves no corner unexamined.

🔦 Inward parts means deepest thoughts

🔍 The light reaches hidden motives

🙈 Nothing stays hidden from it

📖 No inner corner goes unexamined

## 🤲 Mercy And Truth Preserve The King

"Preserve" means keeping something safe and intact over time.

Mercy and truth are named as the two qualities that actually protect a ruler.

Raw power alone was not enough to hold a kingdom together.

A king's own character became part of his kingdom's safety.

🤲 Preserve means keeping something safe

❤️ Mercy and truth protect a ruler

💪 Raw power alone was not enough

📖 Character became part of the kingdom's safety

## 🪑 And His Throne Is Upholden By Mercy

"Upholden" means held up and supported.

Of the two qualities named just before, mercy specifically gets singled out here.

A throne resting on fear alone tends to crack under pressure.

A throne resting on mercy earns loyalty that lasts.

🪑 Upholden means held up and supported

❤️ Mercy specifically is singled out

💔 Fear alone tends to crack

📖 Mercy earns loyalty that lasts

## 💪 The Glory Of Young Men Is Their Strength

Each stage of life is shown having its own particular honor.

Physical strength was the young man's obvious and visible gift.

This is not a claim that strength is the only thing worth having.

It is simply naming what stands out about that season of life.

💪 Strength was youth's visible gift

🏋️ Each life stage has its own honor

🚫 Not a claim strength is all that matters

📖 It names what stands out at that age

## 👴 And The Beauty Of Old Men Is The Grey Head

"Grey head" means a full head of grey hair, earned only through long life.

Age itself is honored here as a visible achievement.

Proverbs elsewhere ties grey hair to a life of wisdom and experience.

Old age gains something youth simply does not have yet.

👴 Grey head means hair earned by age

🏆 Age is honored as an achievement

📚 Experience is what age uniquely offers

📖 Youth cannot yet have what age gains

## 🩹 The Blueness Of A Wound Cleanseth Away Evil

"Blueness of a wound" means the bruise left behind by a physical blow or beating.

Corporal punishment was a normal part of correction in this culture.

This proverb claims that kind of painful correction can actually clean out wrongdoing.

The pain is treated as purposeful, not senseless.

🩹 Blueness of a wound means a bruise

⚖️ Physical correction was normal in this culture

🧼 Painful correction can clean out wrong

📖 The pain here is purposeful

## 🎯 So Do Stripes The Inward Parts Of The Belly

"Stripes" means the marks left by a physical beating.

This claims the effect of that correction reaches deeper than the skin.

The same phrase inward parts of the belly appeared two verses earlier for conscience.

Correction is pictured reaching all the way to a person's deepest motives.

🎯 Stripes means marks from a beating

🔁 Repeats the inward parts phrase

🕳️ The effect reaches deeper than skin

📖 Correction reaches a person's deepest motives
`.trim();

export const PROVERBS_TWENTY_PERSONAL_SECTIONS = parseProverbsTwentyRawNotes(PROVERBS_TWENTY_RAW_NOTES);
