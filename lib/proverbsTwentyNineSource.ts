export type ProverbsTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyNineRawNotes(rawText: string): ProverbsTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 29:${startVerse}` : `Proverbs 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Proverbs 29 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_NINE_RAW_NOTES = `# Proverbs 29:1-3
# 🪨 Stubbornness, Leadership, And A Wise Son
---
## 🐂 Being Often Reproved Hardeneth His Neck

"Reproved" means corrected or warned, not just criticized once.

"Hardeneth his neck" pictures an ox that refuses to turn where the yoke is pulling it.

The image comes from an animal stiffening its whole body against every pull of the rein.

A person can do the same thing with correction, growing more stiff each time truth pushes back.

The more warnings someone refuses, the harder that refusal becomes to break.

🐂 Hardening the neck pictures a stubborn ox
⚠️ Reproved means warned or corrected
🔁 Refusing correction becomes a habit
📖 Each refusal makes the next one easier

## ⏱️ Suddenly Be Destroyed, And That Without Remedy

The judgment here arrives suddenly, not as a slow decline anyone could see coming.

"Without remedy" means no cure is left and no second chance remains.

This is not one bad day.

It is the last stop after many ignored warnings.

Each earlier reproof was itself a chance at remedy, offered and refused.

⏱️ Suddenly means without warning
🚫 Without remedy means no cure left
🪜 This follows many earlier warnings
📖 Refused correction runs out of chances

## 👑 When The Wicked Beareth Rule, The People Mourn

A ruler's character does not stay private.

It spreads through the whole nation like weather.

Good leadership brings safety and fair treatment, so people feel free to rejoice.

Corrupt leadership brings fear and injustice, so people learn to mourn instead.

Solomon is describing a pattern he watched again and again in his own court.

👑 A leader's character shapes the whole nation
😀 Righteous rule brings relief and joy
😢 Wicked rule brings fear and grief
📖 A nation's mood mirrors its ruler

## 📚 Whoso Loveth Wisdom Rejoiceth His Father

A father's greatest joy in this culture was watching a son grow wise instead of foolish.

Wisdom was not just knowledge, it was character that showed itself in daily choices.

A wise son protected the family name and its future.

That is why this joy is aimed specifically at the father, not just at the son himself.

📚 Wisdom means character, not just knowledge
👴 A father's joy centers on his son
🏠 A wise son protects the family name
📖 A son's choices reach the whole household

## 💰 He That Keepeth Company With Harlots Spendeth His Substance

"Substance" means a person's wealth, property, and financial security.

"Keepeth company" describes an ongoing habit, not a single failure.

This is the same warning Proverbs gives repeatedly about the seductive woman, now stated in one blunt line.

Money spent this way is gone permanently, along with the reputation and stability it could have built.

💰 Substance means wealth and security
🔁 Company here means a repeated habit
📉 This spending pattern cannot be undone
📖 Wasted wealth wastes a family's future

# Proverbs 29:4-6
# ⚖️ Justice, Flattery, And The Trap Of Sin
---
## ⚖️ The King By Judgment Establisheth The Land

"Judgment" here means fair, consistent rulings that treat every case the same way.

A king who rules this way gives his people something to build their lives on.

Stability comes from knowing the rules will not shift based on who is asking.

That predictability is what "establisheth" describes, a nation built to last.

⚖️ Judgment means fair and consistent rulings
🏛️ Fair rulings give people something stable
📏 Predictability lets a nation build and grow
📖 Justice is the foundation under a kingdom

## 💸 He That Receiveth Gifts Overthroweth It

"Gifts" here is a polite word for bribes.

A ruler who accepts them starts ruling for whoever pays the most instead of for what is true.

Every bribe taken replaces one fair ruling with an unfair one.

Enough of those and the whole foundation from the verse before this one collapses.

💸 Gifts here means bribes
⚖️ Bribes replace truth with payment
🏚️ Each bribe weakens the foundation
📖 Bribery is how justice quietly collapses

## 🥷 Spreadeth A Net For His Feet

Flattery here is not an innocent compliment.

It is calculated praise meant to lower someone's guard.

The picture is a hunter laying a net for an animal that never sees it coming.

The flatterer sets the trap, but the neighbour is the one who falls into it.

🥷 Flattery here means calculated praise
🕸️ A net catches what never sees it coming
😶 The neighbour is the one who falls
📖 Kind words can hide a real trap

## 🕸️ In The Transgression Of An Evil Man There Is A Snare

Sin does not just break a rule, it sets a trap for the person who commits it.

The evil man's own wrongdoing becomes the very thing that catches him later.

The righteous carry no such hidden trap waiting to spring.

That freedom is why they can sing and rejoice without looking over their shoulder.

🕸️ Sin becomes its own hidden trap
😨 His own choices become the trap
🎵 The righteous carry no such trap
📖 A clear conscience sings freely

# Proverbs 29:7-9
# 🕊️ The Poor, The City, And The Fool
---
## 🔍 The Righteous Considereth The Cause Of The Poor

"Considereth the cause" means taking time to actually understand a poor person's situation before judging it.

The righteous person asks questions and looks closely instead of assuming.

The wicked person refuses even to look, choosing ignorance on purpose.

Not knowing here is not innocent, it is a decision to avoid caring.

🔍 Considereth the cause means understanding a situation
👂 The righteous take time to listen
🙈 The wicked refuse to even look
📖 Willful ignorance is still a choice

## 😏 Scornful Men Bring A City Into A Snare

A "scornful" man mocks and provokes rather than reasons.

One person like this can stir up an entire city into conflict.

Scorn spreads quickly because it invites people to take sides instead of think clearly.

A single mocking voice can trap a whole community in tension it never asked for.

😏 Scornful means mocking and provoking
🔥 Scorn spreads faster than reasoned speech
🏙️ One voice can trap a whole city
📖 Mockery divides where wisdom could calm

## 🕊️ Wise Men Turn Away Wrath

Where the scornful man ignites conflict, the wise man works to defuse it.

Turning away wrath takes real effort, not just staying quiet.

This often means a calm word, a fair explanation, or a willingness to absorb blame that is not fully deserved.

The city that has wise voices in it survives conflicts that would otherwise spiral.

🕊️ Turning away wrath takes real effort
🗣️ A calm word can defuse a crowd
🛡️ Wisdom absorbs conflict before it spreads
📖 A city needs peacemakers, not just leaders

## ⚖️ Whether He Rage Or Laugh, There Is No Rest

"Contendeth" means arguing a case or debating a point.

A wise man can bring perfect logic to a talk with a fool and still lose the peace.

The fool may respond with anger or with mockery, but neither response engages the argument.

Some talks cannot be won because the other side was never arguing in good faith.

⚖️ Contendeth means arguing or debating
😡 Rage is one way a fool avoids truth
😆 Laughter is the other way
📖 Some arguments cannot be won, only left

# Proverbs 29:10-12
# 🗣️ Hatred, Silence, And A Ruler's Ears
---
## 🩸 The Just Seek His Soul

"Bloodthirsty" describes people who want to see an upright person harmed or ruined.

"Seek his soul" here means the opposite, working to protect and preserve that same person's life.

The same upright man draws two completely different responses depending on who is watching him.

One side wants him destroyed, the other wants him kept safe.

🩸 Bloodthirsty means wanting someone harmed
🛡️ Seek his soul means work to protect him
👀 The same man draws opposite reactions
📖 Character reveals itself in who defends whom

## 🗯️ A Fool Uttereth All His Mind

The fool says every thought the moment it arrives.

Nothing gets filtered, weighed, or reconsidered before it leaves his mouth.

That habit feels honest in the moment but usually costs him later.

Unfiltered speech tends to reveal more than it should, at exactly the wrong time.

🗯️ Uttereth all his mind means no filter
⏱️ Every thought comes out immediately
💥 This costs him later
📖 Unfiltered speech reveals too much too soon

## 🤐 A Wise Man Keepeth It In Till Afterwards

The wise man has the same thoughts as the fool.

The difference is timing, not honesty.

He holds a reaction back until he can judge whether saying it will actually help.

Self control in speech is not silence forever, it is silence until the right moment.

🤐 Keepeth it in means holding a reaction back
⏳ The wise man waits for the right time
🧠 Self control is about timing, not silence
📖 Wisdom often looks like patience with words

## 👂 If A Ruler Hearken To Lies, All His Servants Are Wicked

"Hearken" means to listen closely and give something real weight.

A ruler who rewards lies teaches everyone under him what actually gets ahead in his court.

Honest servants either learn to lie too or eventually get pushed out.

A leader's ear shapes the character of everyone who serves him.

👂 Hearken means listening and giving weight
🏆 Rulers teach what gets rewarded
🎭 Honest servants adapt or get pushed out
📖 A leader's ear shapes his whole court

# Proverbs 29:13-15
# 👁️ Shared Light, A Faithful King, And The Rod
---
## 🧍 The Poor And The Deceitful Man Meet Together

These two men could not be more different in circumstance.

One has nothing, the other has gained through dishonest schemes.

Yet the verse puts them in the same sentence on purpose.

Solomon is about to say something that levels the ground between them completely.

🧍 Two very different men, side by side
💰 One has nothing, one gained by fraud
⚖️ The verse levels the ground between them
📖 Circumstance does not decide someone's worth

## 👁️ The LORD Lighteneth Both Their Eyes

"Lighteneth the eyes" means giving life and sight itself, the basic gift of being alive and able to see.

Both men, honest poor and dishonest rich, receive this same gift from the same God.

Wealth gained by fraud does not earn a person more life than anyone else gets.

Every person's ability to see the world at all is a gift neither of them created.

👁️ Lighteneth the eyes means giving life and sight
🎁 Both men receive the same gift
🚫 Wealth does not earn extra life
📖 God is the source behind both gifts

## 👑 His Throne Shall Be Established For Ever

The poor in this culture had the least power to demand fair treatment.

A king who judges them faithfully anyway is proving his justice is real, not just for show.

That kind of integrity, tested where it costs the most, is what actually makes a throne last.

A throne kept safe by force can fall, but a throne built on real justice endures.

👑 Judging the poor tests real integrity
⚖️ Fair treatment for the powerless proves character
🏛️ Force can fail, justice endures
📖 A throne stands longest on real justice

## 🪵 The Rod And Reproof Give Wisdom

"The rod" means physical discipline, and "reproof" means being corrected in words.

Proverbs pairs these two together often, since discipline without explanation just confuses a child.

Together they teach a child where the real boundaries are and why they matter.

Wisdom in a child is not automatic, it is shaped by consistent correction.

🪵 The rod means physical discipline
🗣️ Reproof means correction in words
🧭 Both together teach where boundaries are
📖 Wisdom in children is shaped, not automatic

## 🙅 A Child Left To Himself Bringeth His Mother To Shame

"Left to himself" describes a child raised with no correction at all.

The shame described here lands specifically on the mother.

Raising children was seen as chiefly her role in this culture.

An undisciplined child does not just embarrass himself later, he embarrasses the whole household that raised him.

🙅 Left to himself means no correction given
👩 Shame here falls specifically on the mother
🏠 An undisciplined child reflects on the whole home
📖 Discipline protects the whole family's name

# Proverbs 29:16-18
# 📜 Increase, Correction, And Vision
---
## 📈 The Righteous Shall See Their Fall

Sin does not stay contained to one wicked person.

More wicked people in a place means more sin spreading around them.

That growth looks alarming while it is happening.

The righteous are promised they will still be standing when it eventually collapses.

📈 More wicked people means more sin spreading
😟 Growth in sin looks alarming at first
🧍 The righteous remain standing through it
📖 Wicked systems eventually collapse under their own weight

## 👨‍👦 He Shall Give Thee Rest

This is a direct command, not just an observation about parenting.

"Rest" here means relief from the constant worry an undisciplined child creates.

Correction now is traded for peace later, a fair exchange most parents do not expect.

The reward is not just less trouble, it is genuine delight in who that child becomes.

👨‍👦 This verse is a direct command
😌 Rest means relief from constant worry
🔄 Correction now is traded for peace later
📖 A disciplined child becomes a delight

## 🔥 Where There Is No Vision, The People Perish

"Vision" here means a message or direction from God, given through a prophet.

Without that guidance, people drift and lose any sense of shared purpose.

"Perish" describes a people who become unrestrained, running wild without any moral direction.

A community without God's word eventually falls apart from the inside.

🔥 Vision means a prophetic message from God
🧭 Without it, people lose shared direction
🏚️ Perish here means falling apart, not just dying
📖 A community needs God's word to hold together

## 📜 He That Keepeth The Law, Happy Is He

This half answers the first half directly.

Where vision is missing, people fall apart.

Where God's law is kept, a person finds real stability and happiness.

The law was never meant as a burden, it was the vision written down and made livable every day.

📜 This half answers the verse's first half
🧱 Keeping the law brings real stability
😀 Happy here means genuinely stable and blessed
📖 The law makes God's vision livable daily

# Proverbs 29:19-21
# 🗯️ Words That Fail To Correct
---
## 🧠 Though He Understand He Will Not Answer

This servant is not confused, he understands exactly what is being said to him.

His silence is not ignorance, it is quiet defiance.

Words alone cannot correct someone who has already decided not to respond.

Understanding a correction and accepting it are two very different things.

🧠 The servant understands the correction fully
🤐 His silence is defiance, not confusion
🚧 Words fail against a closed will
📖 Understanding and accepting are not the same

## 🏃 There Is More Hope Of A Fool Than Of Him

"Hasty in his words" describes someone who speaks before thinking at all.

That habit is ranked here as worse than plain foolishness.

A fool at least might eventually learn, since his mistakes are usually obvious to him.

A person who never pauses before speaking rarely even notices the damage he causes.

🏃 Hasty in words means speaking before thinking
🎓 A fool can still learn from mistakes
🙈 The hasty man rarely notices the damage
📖 A pause before speaking is real wisdom

## 🍯 Shall Have Him Become His Son At The Length

"Delicately" means raising someone with too much comfort and too little correction.

A master who spoils a servant this way is not being generous, he is skipping the training that role required.

"Become his son" here is a warning, not a compliment, describing a servant who grows entitled instead of useful.

Kindness without boundaries can raise the wrong kind of person.

🍯 Delicately means overindulged, not disciplined
🎁 Spoiling is not the same as kindness
👶 Become his son means entitled, not honored
📖 Boundaries matter as much as comfort

# Proverbs 29:22-24
# 🔥 Anger, Pride, And Stolen Goods
---
## 😠 An Angry Man Stirreth Up Strife

Anger here is not one outburst, it is a pattern that follows a person around.

Strife means ongoing conflict, not a single argument.

An angry man does not just react to conflict, he manufactures it wherever he goes.

People around him learn to expect tension before he even says a word.

😠 Anger here is a repeating pattern
🔥 Strife means ongoing conflict
🌀 This man manufactures tension himself
📖 People learn to brace around an angry person

## 🌋 A Furious Man Aboundeth In Transgression

"Furious" describes anger taken one level further, into rage.

"Aboundeth" means multiplying, not just occurring once.

Rage does not stay contained to the moment it starts in.

It tends to produce more sin than the anger that caused it in the first place.

🌋 Furious means rage, beyond ordinary anger
📈 Aboundeth means multiplying, not staying contained
💥 Rage produces more sin than it started with
📖 Unchecked fury spreads beyond its first cause

## 🎈 A Man's Pride Shall Bring Him Low

Pride here describes someone who thinks he deserves more than his actual position.

That kind of pride makes a person brittle, since he cannot handle correction or failure without shattering.

Proverbs repeats this pattern constantly, pride goes up right before it comes crashing down.

The fall is not random, it grows directly out of the pride itself.

🎈 Pride inflates a false sense of position
🥚 Pride makes a person brittle, not strong
📉 The fall grows directly out of the pride
📖 Proverbs repeats this pattern throughout the book

## 🪞 Honour Shall Uphold The Humble In Spirit

"Humble in spirit" describes someone who has an accurate view of himself, not a low one.

Because he is not defending a false image, he can accept correction, credit, and criticism without breaking.

That stability is what actually earns lasting honor from others.

Humility is not weakness here, it is the strength that pride only pretends to have.

🪞 Humble in spirit means an accurate self view
🧱 Accepting correction builds real stability
🏅 That stability earns lasting honor
📖 Humility is strength, not weakness

## 🤝 Whoso Is Partner With A Thief Hateth His Own Soul

"Partner with a thief" means helping or benefiting from a theft, not just committing it alone.

"Hateth his own soul" is a strong way of saying this choice works against his own good.

Joining someone else's sin does not divide the consequences, it multiplies who carries them.

This partner gains nothing lasting and risks everything he has.

🤝 Partner with a thief shares the guilt
💔 Hateth his own soul means harming himself
➗ Joining sin multiplies risk, does not divide it
📖 Shared guilt is still full guilt

## 📢 He Heareth Cursing, And Bewrayeth It Not

In this culture, a public curse was sometimes spoken over an unknown crime to pressure any witness into speaking up.

"Bewrayeth" means revealing or exposing something hidden.

This partner hears that curse and knows exactly what happened, yet says nothing.

His silence protects the thief and places himself directly under that same curse instead.

📢 A public curse pressured hidden witnesses to speak
🗝️ Bewrayeth means revealing something hidden
🤐 He knows the truth and stays silent
📖 Silence here shares in the curse itself

# Proverbs 29:25-27
# 🛡️ Fear, Favor, And Two Kinds Of Abomination
---
## 😟 The Fear Of Man Bringeth A Snare

"Fear of man" means shaping decisions around what other people think instead of what is right.

That fear feels protective, but it actually traps a person into choices they would not otherwise make.

People pleasing looks safe in the moment and costly over time.

The snare closes slowly, one compromised decision at a time.

😟 Fear of man means living for approval
🕸️ This fear becomes its own trap
🔁 The trap closes one compromise at a time
📖 People pleasing feels safe but costs more

## 🙏 Whoso Putteth His Trust In The LORD Shall Be Safe

Trust in the LORD is offered here as the direct opposite of fearing man.

One produces a snare, the other produces safety.

This is not a promise that nothing bad will ever happen.

It is a promise about whose opinion actually gets to control a person's choices.

🙏 Trust in the LORD opposes fear of man
🛡️ One path traps, the other protects
🌩️ Safety is not the absence of hardship
📖 The real question is who controls your choices

## 👑 Every Man's Judgment Cometh From The LORD

People in this culture worked hard to gain a ruler's approval, since he controlled so much of daily life.

That approval, chased so eagerly, was never the real source of anyone's outcome.

The verse quietly redirects attention upward, past the throne people were straining to please.

The one who actually judges every case with real justice sits above every earthly ruler.

👑 People chased a ruler's approval constantly
🎯 That approval was never the real source
⬆️ The verse redirects attention above the throne
📖 God's judgment outranks every human ruling

## 🚫 An Unjust Man Is An Abomination To The Just

"Abomination" is a strong word meaning something deeply offensive, not just mildly annoying.

A truly unjust man does more than break rules, he becomes personally repulsive to someone who values fairness.

This is a moral reaction, not simple disagreement or a difference of opinion.

The just person cannot shrug off injustice as a minor issue.

🚫 Abomination means deeply offensive
⚖️ Injustice repels someone who values fairness
💢 This is a moral reaction, not opinion
📖 Real justice cannot shrug off real wrong

## ↔️ He That Is Upright In The Way Is Abomination To The Wicked

The reaction described here runs in both directions.

The wicked find an upright life just as offensive as the just find injustice.

That mutual disgust exposes two moral systems that were never going to agree.

Proverbs ends this chapter the same way it opened it, with two paths that cannot both be walked.

↔️ The disgust runs in both directions
😤 The wicked find integrity offensive too
⚔️ Two moral systems that cannot agree
📖 The chapter ends where it began, two paths
`.trim();

export const PROVERBS_TWENTY_NINE_PERSONAL_SECTIONS = parseProverbsTwentyNineRawNotes(PROVERBS_TWENTY_NINE_RAW_NOTES);
