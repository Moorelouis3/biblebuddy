export type ProverbsThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsThirtyRawNotes(rawText: string): ProverbsThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 30:${startVerse}` : `Proverbs 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Proverbs 30 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_THIRTY_RAW_NOTES = `# Proverbs 30:1-3
# 🙇 Agur Confesses His Own Ignorance
---
## 📜 Even The Prophecy

"Prophecy" here does not mean a prediction about the future.

It translates a word that also means a burden, a weighty message someone feels compelled to speak.

Agur is not naming himself a prophet in the usual sense of the word.

He is introducing a saying he clearly feels the weight of.

Nothing else in the Bible tells us who Agur or his father Jakeh were.

📜 Prophecy here means a weighty burden or message
🗣️ Agur is not claiming to be a prophet
❓ Agur and Jakeh are otherwise unknown
📖 A weighty saying is about to follow

## ❓ Unto Ithiel And Ucal

The names Ithiel and Ucal appear nowhere else in the Bible.

Many scholars believe they were Agur's own sons or students, addressed directly.

Others read the same Hebrew letters as part of Agur's confession instead of as names at all.

The text itself does not tell us which reading is correct.

What stays clear either way is that Agur is speaking to real listeners, not just to himself.

❓ Ithiel and Ucal appear only in this verse
👨‍👦 They were likely sons or students
📚 Scholars read the Hebrew two different ways
📖 Agur is speaking to real listeners

## 🐴 More Brutish Than Any Man

"Brutish" means acting more like an animal than a reasoning person.

Agur is not describing a mental condition.

He is confessing that he feels he lacks basic human understanding.

This kind of opening is unusual for a wisdom teacher.

Most teachers in Proverbs open by claiming insight, not by denying it.

🐴 Brutish means acting like an unreasoning animal
😳 Agur claims to lack basic understanding
🎓 Wisdom teachers usually open the opposite way
📖 Real wisdom can start with honest humility

## 🕊️ Nor Have The Knowledge Of The Holy

"The Holy" here refers to knowledge of God and sacred things.

Agur says plainly that he has not attained it.

This follows directly from his claim to be brutish in the line just before it.

A person cannot fully grasp God through effort alone.

Agur's honesty here sets up the hard questions he is about to ask.

🕊️ The Holy means knowledge of God himself
🙇 Agur admits he has not reached it
🔗 This builds on the line before it
📖 Honest limits open the door to real questions

# Proverbs 30:4-6
# 🌌 Questions Only God Can Answer
---
## ☁️ Who Hath Ascended Up Into Heaven Or Descended

This does not ask whether a person could physically travel to heaven.

It asks who has ever fully grasped God's realm and returned able to explain it.

No human being has done this, not even the wisest king.

The question is meant to humble the reader before it is ever answered.

Only God himself truly knows the answer to what these questions ask.

☁️ This asks about grasping God's realm fully
🚫 No human has ever done this
👑 Not even the wisest king qualifies
📖 The question humbles before it teaches

## 🌬️ Who Hath Bound The Waters In A Garment

This pictures gathering the entire sea the way cloth wraps around a bundle.

No person controls the wind, the sea, or the boundaries of the land like this.

Only God holds creation together in this way.

Agur is listing things every reader already knows no human being can do.

Each impossible picture builds toward one obvious answer.

🌬️ Gathering wind in fists is impossible for people
🌊 Binding waters in a garment pictures full control
🏔️ Only God holds creation together this way
📖 Each impossible picture points to one answer

## ❓ What Is His Name And What Is His Son's Name

This question asks the reader to try naming the one who can do all of this.

"His son" is genuinely difficult to place within Agur's own time.

Many scholars believe it simply presses the question further, with no separate figure in view.

Others hear an early hint of something the Old Testament has not yet revealed.

The text itself does not settle which reading is correct.

❓ The question dares the reader to answer
👶 His son is hard to place historically
📚 Scholars read this more than one way
📖 The mystery stays open in this verse

## 🔥 Every Word Of God Is Pure

"Pure" here means refined, the way fire removes impurity from metal.

God's words have already passed through that kind of testing.

Nothing false or wasted remains in what he has spoken.

That is why Agur can trust it even without full understanding.

A pure word can be trusted before every question about it gets answered.

🔥 Pure means refined like tested metal
🚫 No falseness remains in God's word
🛡️ It shields those who trust it
📖 Trust does not require full understanding

## 🚫 Add Thou Not Unto His Words

This is a direct warning against adding anything to what God has spoken.

Anyone who does risks being corrected and shown to be a liar.

The book of Revelation closes with this same warning stated almost word for word.

Scripture is meant to be received, not edited to fit a person's own ideas.

Guarding God's words matters as much as reading them.

🚫 Adding to God's words is forbidden
⚠️ Doing so risks being shown a liar
🛡️ Scripture is received, not edited
📖 Revelation repeats this same warning

# Proverbs 30:7-9
# 🙏 Agur's One Prayer Request
---
## 🙏 Two Things Have I Required Of Thee

Agur now shifts from asking questions about God to making a request of God.

"Required" means genuinely asked for, not casually mentioned in passing.

He wants this granted before he dies, not simply at some point in life.

That urgency shows how much these two requests matter to him.

The next verses spell out exactly what he is asking for.

🙏 Required means genuinely asked, not casual
⏳ He wants this granted before death
❗ The urgency shows real importance
📖 Two specific requests are about to follow

## 💨 Remove Far From Me Vanity And Lies

"Vanity" here means emptiness, things that promise meaning but deliver none.

Agur pairs it with lies, since both mislead a person about what is actually real.

He is not asking to avoid every hardship.

He is asking to avoid being deceived about what actually matters.

A life built on vanity and lies collapses no matter how it looks at first.

💨 Vanity means empty, false promises
🗣️ Lies mislead about what is real
🏚️ A life built on these collapses
📖 Agur asks to avoid deception, not hardship

## ⚖️ Give Me Neither Poverty Nor Riches

This is not a prayer against ambition or in favor of laziness.

Agur is asking for a steady, settled place instead of either extreme.

Most prayers in the Bible ask for blessing or rescue from disaster.

Agur asks instead for exactly enough, no more and no less.

That kind of prayer takes real maturity to actually want.

⚖️ This asks for balance, not laziness
📉 Poverty and riches are both named as risks
🎯 He wants exactly enough, not extremes
📖 This prayer takes real maturity to want

## 💰 Lest I Be Full And Deny Thee

Agur names the danger hidden inside wealth itself.

A person who has everything can start to feel he needs God for nothing.

"Deny thee" does not mean open rejection right away.

It starts quietly, as simply forgetting to depend on God at all.

Fullness can be just as spiritually dangerous as need.

💰 Wealth can quietly replace felt need for God
🙅 Deny thee starts as forgetting, not rebellion
😌 Comfort can dull real dependence
📖 Fullness carries its own spiritual danger

## 🍞 Lest I Be Poor And Steal

Agur names the opposite danger just as honestly.

Real poverty can pressure a person into taking what is not theirs.

"Take the name of my God in vain" means blaming God for the theft afterward.

Both riches and poverty can end in the same place, dishonoring God.

That is exactly why Agur asked for the middle ground in the verse before.

🍞 Poverty can pressure a person toward theft
🙏 Taking God's name in vain means blaming him
⚖️ Both extremes can dishonor God the same way
📖 This is why Agur asked for the middle

# Proverbs 30:10
# 🗣️ A Warning About Accusing A Servant
---
## 🗣️ Accuse Not A Servant Unto His Master

"Accuse" here means to slander, bringing a complaint that may not even be true.

Servants in this culture had very little power to defend themselves.

Agur warns against using that imbalance of power to cause someone harm.

This is a short verse, but it protects a person with no other protection.

A community is measured by how it treats those who cannot fight back.

🗣️ Accuse here means slander, not honest report
⚖️ Servants had little power to defend themselves
🛡️ This verse protects the powerless
📖 Community is judged by this kind of care

## 😠 Lest He Curse Thee And Thou Be Found Guilty

A false accusation does not stay one sided for long.

The servant's curse here represents a real, deserved response to real harm.

The one making the false charge ends up guilty, not the servant.

Wrongdoing has a way of circling back onto whoever started it.

This verse warns that cruelty toward the powerless carries its own cost.

😠 False accusations can circle back
🗯️ The servant's curse is a fair response
⚠️ Guilt lands on the accuser instead
📖 Cruelty toward the powerless has its own cost

# Proverbs 30:11-14
# 👥 Four Kinds Of People Agur Names
---
## 👥 There Is A Generation That Curseth Their Father

"Generation" here does not mean an age group the way the word is often used today.

It means a type of person, a whole category Agur has watched repeat itself.

This first type disrespects their own parents openly.

"Curseth" is a strong word, far past simple disagreement or complaint.

Agur is about to name three more types just like this one.

👥 Generation means a type, not an age
😡 Cursing a parent is far past disagreement
🔁 Agur has watched this type repeat
📖 Three more types are about to follow

## 🪞 Pure In Their Own Eyes

This second type believes their own conscience is spotless.

"Pure in their own eyes" means their standard for judging themselves is themselves.

The very next line exposes the problem hiding inside that standard.

A person can feel clean and still be genuinely unwashed underneath.

Self judgment is never a reliable measure of real purity.

🪞 This type judges purity by their own feelings
🚿 Feeling clean is not being clean
❌ Self judgment is not a reliable measure
📖 Real purity needs a standard outside yourself

## 👀 O How Lofty Are Their Eyes

"Lofty" eyes describe a posture of looking down on everyone else.

"Eyelids lifted up" pictures a face held high, unwilling to meet anyone as an equal.

This is pride expressed through simple body language.

Agur names it as its own recognizable type of person.

The way someone carries their face can reveal the state of their heart.

👀 Lofty eyes describe looking down on others
🙄 Lifted eyelids picture a proud posture
💔 This is pride shown through body language
📖 A face can reveal a heart's condition

## ⚔️ Teeth Are As Swords

This fourth type is the most dangerous of the four Agur names.

Their teeth are compared to swords, and their jaw teeth to knives.

The picture is a predator built to consume, not just to argue.

This is not casual cruelty but something closer to a whole way of life.

Agur saves the worst type for the description right before naming its target.

⚔️ Their teeth are compared to swords
🗡️ Jaw teeth are compared to knives
🦁 The picture is a predator, not a debater
📖 This is the worst of the four types

## 🍽️ To Devour The Poor From Off The Earth

This is the target of the sword and knife imagery from the line before.

"Devour" means consume completely, leaving nothing behind for the victim.

The poor and the needy are named specifically as the prey.

Agur is describing predatory people who profit directly from others' need.

Naming this type clearly is itself a form of warning and protection.

🍽️ Devour means consuming completely
🎯 The poor and needy are the named targets
💰 This type profits directly from others' need
📖 Naming this danger is itself a protection

# Proverbs 30:15-17
# 🩸 Never Satisfied, And An Eye That Mocks
---
## 🩸 The Horseleach Hath Two Daughters Crying Give Give

A "horseleach" is a leech, a creature known for drawing blood without stopping on its own.

Its "two daughters" pictures that same endless demand doubled.

"Give, give" repeats the sound of something that is never content with what it already took.

Agur uses this image to introduce a pattern he sees everywhere.

Some appetites do not pause simply because they have already been fed.

🩸 A horseleach is a bloodsucking leech
👧 Two daughters pictures doubled demand
🔁 Give give repeats an endless appetite
📖 Some appetites never pause on their own

## 🔢 There Are Three Things That Are Never Satisfied

Agur uses a three, then four counting pattern common in ancient wisdom sayings.

The higher number that follows is always the complete, final list.

This pattern builds suspense before naming the actual items.

It also signals that the list is meant to feel exhaustive, not partial.

The four items themselves come in the very next lines.

🔢 Three then four is a common wisdom pattern
📋 The higher number gives the full list
⏳ The pattern builds suspense on purpose
📖 A complete list follows next

## ⚰️ The Grave And The Barren Womb

Agur now names the four things that are never satisfied.

Each one takes in constantly without ever reaching a limit.

It often included:
The grave, which always has room for one more.
The barren womb, always wanting a child it lacks.
The earth, never fully filled with water.
The fire, which never says it has burned enough.

Agur is not condemning these things, only observing an appetite that never stops.

⚰️ The grave always has room for one more
🤰 The barren womb never stops wanting
🔥 Fire never says it has burned enough
📖 Appetites can behave the same way

## 👁️ The Eye That Mocketh At His Father

This eye belongs to the same rebellious type Agur named earlier in this chapter.

Mocking a father is treated as the first half of one single act.

"The ravens of the valley shall pick it out" describes a harsh, fitting punishment.

Ravens and eagles were scavengers, associated with the exposed and unburied dead.

The image warns that dishonoring a parent can end in public disgrace.

👁️ This eye mocks a father's authority
🐦‍⬛ Ravens were scavengers of the exposed dead
🦅 Young eagles complete the same harsh image
📖 Dishonoring a parent can end in disgrace

## 👩 Despiseth To Obey His Mother

This half of the verse names a second failure alongside mocking a father.

"Despiseth to obey" means treating a mother's instruction as beneath notice.

Agur pairs father and mother together throughout this chapter, never treating either parent's honor as optional.

Both forms of disrespect receive the exact same harsh punishment.

The verse refuses to let either parent's authority be treated as lesser.

👩 Despiseth means treating instruction as beneath notice
👨‍👩‍👧 Father and mother are named together
⚖️ Both get the same harsh punishment
📖 Neither parent's authority is optional

# Proverbs 30:18-20
# 🦅 Four Ways Too Wonderful To Trace
---
## 🔢 There Be Three Things Which Are Too Wonderful For Me

Agur returns to the same three, then four counting pattern from the section before.

"Too wonderful" means beyond his ability to fully trace or explain.

This is not confusion about right and wrong.

It is honest wonder at how certain things move without leaving a visible trail.

The four examples that follow all share exactly that quality.

🔢 This repeats the three then four pattern
🤔 Too wonderful means beyond full explanation
✅ This is wonder, not moral confusion
📖 Four trackless movements come next

## 🦅 The Way Of An Eagle In The Air

Agur now names three movements that leave no trace behind them.

Each one passes through its space without leaving a lasting mark.

It often included:
An eagle crossing open air.
A serpent gliding across a rock.
A ship cutting through open sea.

Something real happens in each case that cannot be fully retraced afterward.

🦅 An eagle leaves no path in the air
🐍 A serpent leaves no track on a rock
⛵ A ship leaves no lasting wake
📖 Some real events leave no visible trace

## 💞 The Way Of A Man With A Maid

This fourth item shifts from nature to human relationship.

It describes the mysterious, hard to fully explain bond formed between two people in love.

Like the eagle, the serpent, and the ship before it, something real happens without leaving a visible trace.

Agur treats this as wonder, not as something shameful.

The very next verse uses this same picture to expose something that is shameful.

💞 This item shifts to human relationship
❓ The bond formed is hard to fully explain
✅ Agur treats this as wonder, not shame
📖 The next verse turns this picture around

## 😶 Such Is The Way Of An Adulterous Woman

Agur adds a fifth item that breaks the pattern on purpose.

The other four were morally neutral, simply mysterious.

This one is the same kind of untraceable act, but chosen and guilty.

"She eateth and wipeth her mouth" pictures acting as though nothing happened at all.

Her claim of innocence right afterward is the real point of the whole comparison.

⚠️ This fifth item breaks the neutral pattern
🍽️ Eating and wiping her mouth hides the act
😶 She claims innocence right after
📖 Some untraceable acts still carry real guilt

# Proverbs 30:21-23
# 🌍 Four Things The Earth Cannot Bear
---
## 🌍 For Three Things The Earth Is Disquieted

"Disquieted" means shaken or thrown into unrest, not simply annoyed.

Agur uses the counting pattern one final time in this chapter.

Each of the four situations he is about to name involves someone suddenly holding power they are not ready for.

Sudden power in the wrong hands unsettles everything around it.

The next two verses name exactly who Agur has in mind.

🌍 Disquieted means genuinely shaken, not annoyed
🔢 This is the pattern's final use
⚡ Each case involves sudden, unready power
📖 Two verses now name the four cases

## 👑 For A Servant When He Reigneth

The first two cases here share the same root problem.

Both involve someone placed suddenly above their normal position.

It often included:
A servant who suddenly reigns as a king.
A fool who is suddenly filled with plenty.

Neither one had the character built up to handle the change well.

Sudden status without matching character tends to turn unstable fast.

👑 A servant reigning was a jarring reversal
🍖 A filled fool had plenty without wisdom
⚡ Neither had character to match new status
📖 Sudden status without character turns unstable

## 💔 For An Odious Woman When She Is Married

An "odious" woman is someone widely disliked or resented by those around her.

Her marrying does not resolve the tension her reputation already created.

The household must now absorb a difficult relationship it cannot easily undo.

This is less about the woman herself and more about a mismatch nobody prepared for.

Sudden marriage does not erase years of an already strained reputation.

💔 Odious means widely disliked or resented
🏠 Marriage does not erase that tension
⚠️ The household absorbs an unresolved mismatch
📖 A ceremony cannot undo a reputation

## 🗝️ An Handmaid That Is Heir To Her Mistress

This final case pictures a servant girl suddenly inheriting her own mistress's place.

The normal order of the household is completely reversed overnight.

Everyone who once answered to the mistress must now answer to her former servant.

This closes Agur's list on the most disruptive reversal of the four.

Sudden authority without any adjustment period unsettles everyone underneath it.

🗝️ A servant inherits her mistress's place
🔄 The household order is reversed overnight
😬 Everyone must adjust to a new authority
📖 The most disruptive reversal of the four

# Proverbs 30:24-28
# 🐜 Four Small Things That Are Exceedingly Wise
---
## 🐜 Four Things Which Are Little Upon The Earth

Agur shifts here from warning to genuine admiration.

"Little" describes their size, not their importance.

Each creature he is about to name has almost no strength or standing of its own.

Yet each one survives and thrives through pure skill instead of power.

Size was never the true measure of wisdom in this chapter.

🐜 Little describes size, not importance
💪 None of the four have real strength
🧠 Each survives through skill, not power
📖 Size was never the true measure

## 🌾 The Ants Are A People Not Strong

Ants have almost no individual strength at all.

"Yet they prepare their meat in the summer" describes storing food ahead of a coming season of scarcity.

No one commands them to do this.

They act with foresight that many stronger creatures never bother with.

Preparation, not size, is what keeps an ant colony alive through winter.

🐜 Ants have almost no individual strength
🌾 They store food ahead of scarcity
🧭 No one commands them to plan ahead
📖 Preparation kept them alive, not strength

## 🪨 The Conies Are But A Feeble Folk

"Conies" refers to small rock hyraxes, animals with no natural weapons or defenses.

"Feeble" underlines how physically vulnerable they really are.

"Yet make they their houses in the rocks" describes them choosing safety through location instead of force.

They cannot fight off a predator, so they live somewhere a predator cannot easily reach.

Wisdom here looks like choosing the right shelter, not winning a fight.

🪨 Conies are small, defenseless rock hyraxes
😟 Feeble means genuinely vulnerable
🏠 Their rock houses give safety without a fight
📖 Wisdom chose shelter over strength

## 👑 The Locusts Have No King

Locusts have no ruler organizing them at all.

"Yet go they forth all of them by bands" describes them moving together in massive, coordinated groups anyway.

No command structure was needed to produce that kind of order.

Their strength comes purely from cooperation, not leadership.

A group can move as one without anyone standing at the top giving orders.

👑 Locusts have no king or ruler
🦗 Yet they move together in organized bands
🤝 Their strength comes from cooperation
📖 Order does not always require a leader

## 🕷️ The Spider Taketh Hold With Her Hands

The spider builds her entire web using nothing but her own small legs.

"Taketh hold with her hands" pictures careful, deliberate work instead of force.

No creature on this list looks less imposing while it works.

Skill does not require size to be effective.

The next line reveals just how far that small skill can reach.

🕷️ A spider works with only her own body
✋ Taketh hold pictures careful, deliberate effort
🐜 Nothing here looks imposing while it works
📖 Skill does not require size

## 🏰 Is In Kings' Palaces

The very same small spider ends up inside the grandest buildings that exist.

No one invited her there or gave her permission to enter.

Her own quiet skill carried her further than any royal guard.

Agur closes this list by pairing the smallest creature with the highest place.

Patient, careful work can reach further than size or status ever could.

🏰 The spider reaches kings' palaces uninvited
🚪 No permission was needed to get there
🕷️ Her own skill carried her that far
📖 Patient work can outreach status entirely

# Proverbs 30:29-31
# 🦁 Four Things Stately In Their Going
---
## 🔢 There Be Three Things Which Go Well

Agur returns one final time to the three, then four counting pattern.

"Go well" describes moving with confidence, not simply walking normally.

"Comely in going" adds that this confidence is visible, even impressive to watch.

Each of the four examples carries itself in a way that commands attention.

The list that follows rises from animals up to a human ruler.

🔢 This is the chapter's final counting pattern
🚶 Go well means moving with real confidence
👀 Comely means visibly impressive to watch
📖 The list rises from animals to a king

## 🦁 A Lion Which Is Strongest Among Beasts

The lion is named first because its confidence is backed by real strength.

"Turneth not away for any" means it does not retreat from any other creature.

Nothing in its world forces it to yield ground.

That kind of presence sets the standard for the rest of the list.

Confidence here is earned, not simply displayed.

🦁 The lion is named strongest among beasts
🚫 It turns away from nothing
👑 Nothing forces it to yield ground
📖 This confidence is earned, not performed

## 👑 A King Against Whom There Is No Rising Up

Agur closes the list with three more examples of the same stately confidence.

It often included:
A greyhound, built purely for swift, steady motion.
A he goat, leading its herd without hesitation.
A king, secure enough that no one dares rebel against him.

Each one moves through its world without fear of challenge.

The list ends on a ruler whose authority is simply not questioned.

🐕 A greyhound moves with pure, steady confidence
🐐 A he goat leads without hesitation
👑 A secure king faces no uprising
📖 The list ends on unquestioned authority

# Proverbs 30:32-33
# ⚠️ Foolish Pride And The Danger Of Forcing Anger
---
## 🤚 Lay Thine Hand Upon Thy Mouth

Agur pictures a person catching their own foolish pride in the act.

"Lifting up thyself" means claiming more honor or importance than is deserved.

"Lay thine hand upon thy mouth" is a physical picture for stopping speech immediately.

The wise response to catching your own pride is silence, not defense.

Sometimes the fastest way out of foolishness is to simply stop talking.

🤚 The hand on the mouth pictures stopping speech
🎈 Lifting up thyself means false self importance
🤐 Silence is the wise response here
📖 Stopping quickly beats defending foolishness

## 🥛 The Churning Of Milk Bringeth Forth Butter

Churning milk takes a calm liquid and, through pressure, turns it into something solid.

Agur uses this as a picture for what pressure produces in people too.

Think of squeezing a sponge harder and harder until water finally forces its way out.

The right amount of force always produces some kind of result.

That result is not always something good.

🥛 Churning milk uses pressure to produce butter
🧽 Like squeezing a sponge until it releases
⚙️ Enough pressure always produces some result
📖 The result of pressure is not always good

## 👃 The Forcing Of Wrath Bringeth Forth Strife

"The wringing of the nose" pictures forcing something out through irritation and pressure, much like the milk before it.

Applied to anger, the same pattern holds true.

Provoking someone again and again eventually forces conflict out into the open.

Agur closes the whole chapter on this warning instead of a tidy summary.

A wise person learns to release pressure early, long before it becomes strife.

👃 Wringing the nose forces blood out by pressure
😠 Forcing wrath works the same way
💥 Repeated provoking eventually produces real conflict
📖 Wisdom releases pressure before it becomes strife
`.trim();

export const PROVERBS_THIRTY_PERSONAL_SECTIONS = parseProverbsThirtyRawNotes(PROVERBS_THIRTY_RAW_NOTES);
