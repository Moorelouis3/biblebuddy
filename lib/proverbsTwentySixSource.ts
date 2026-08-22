export type ProverbsTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentySixRawNotes(rawText: string): ProverbsTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 26:${startVerse}` : `Proverbs 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Proverbs 26 sections, received " + sections.length);
  }

  return sections;
}



const PROVERBS_TWENTY_SIX_RAW_NOTES = `# Proverbs 26:1-3
# ❄️ Honour Not Fit For A Fool
---
## As Snow In Summer, And As Rain In Harvest

Snow in summer or rain during harvest never happens in Israel's climate.

Both would be strange and out of place if they showed up.

The image pictures something completely wrong for its season.

That wrongness is the whole point of the comparison.

❄️ Snow in summer never happens naturally

🌧️ Rain in harvest also never happens

🚫 Both images picture something out of place

📖 Sets up the comparison to a fool

## Honour Is Not Seemly For A Fool

Honour means public praise, respect, or a position of high standing.

Seemly means fitting or appropriate for the situation.

Giving that kind of praise to a fool never fits, just like snow in summer.

It looks wrong to everyone watching, and it will not last.

👑 Honour means public praise or respect

✅ Seemly means fitting for the moment

🚫 A fool never fits that kind of praise

📖 This kind of honour will not last

## As The Bird By Wandering, As The Swallow By Flying

Sparrows and swallows are birds that are always moving, never landing for long.

A wandering bird never settles on any one place.

The picture is motion that never actually arrives anywhere.

That restlessness becomes the picture for the next line.

🐦 Birds wander and rarely settle down

🕊️ Swallows fly without ever really landing

🌀 The picture is motion without arrival

➡️ Sets up the point about a curse

## The Curse Causeless Shall Not Come

Causeless means a curse spoken without any real reason behind it.

A curse without real cause has nowhere to land, just like a wandering bird.

This verse offers real comfort to someone who has been cursed unfairly.

Words spoken against you falsely carry no actual power over your life.

🚫 Causeless means spoken without real reason

🐦 Like a bird, it has nowhere to land

🛡️ Unfair curses carry no real power

📖 This verse offers comfort, not fear

## A Whip For The Horse, A Bridle For The Ass

A whip pushed a horse forward when it slowed down.

A bridle steered a donkey by controlling its head and mouth.

Both tools existed to correct or guide an animal that would not obey on its own.

Working animals needed outside control to do their job well.

🐎 A whip pushed a horse forward

🐴 A bridle steered a stubborn donkey

🛠️ Both tools corrected an animal's behavior

➡️ Sets up a surprising comparison next

## A Rod For The Fool's Back

A rod here means physical discipline, the same kind used to correct a child.

Placing the fool alongside a horse and a donkey is intentional.

Like those animals, a fool who will not listen to reason may need firmer correction.

Some lessons only get learned the hard way.

🪵 A rod means physical discipline

🐴 Fools are compared to stubborn animals

⚠️ Words alone may not be enough

📖 Some lessons only get learned firmly

# Proverbs 26:4-5
# 🪞 Answering A Fool
---
## Answer Not A Fool According To His Folly

Folly means foolish, careless speech, or bad reasoning.

This line warns against fighting foolish words with more foolish words.

Sinking to an insulting or careless argument style helps no one win anything.

The goal is staying wise, not just staying loud.

🙊 Folly means foolish or careless speech

🚫 Do not fight foolishness with foolishness

⚖️ Winning an argument is not the goal

📖 Staying wise matters more than winning

## Lest Thou Also Be Like Unto Him

Arguing on a fool's level can slowly turn you into a fool yourself.

Anger and insults are contagious in a heated conversation.

This verse warns that how you argue can shape who you become.

Wisdom sometimes means refusing to answer at all.

🔁 Arguing at his level rubs off

😠 Anger and insults spread easily

🪞 How you argue can shape who you are

➡️ Sometimes silence is the wiser answer

## Answer A Fool According To His Folly

This verse looks like it directly contradicts the one just before it.

Answering here means correcting the fool's mistaken claim, not copying his tone.

A calm and direct correction is not the same as trading insults.

Both proverbs actually agree with each other.

🪞 This looks like a direct contradiction

🎯 Correcting an error is not copying tone

⚖️ Calm correction differs from trading insults

📖 Both proverbs actually agree with each other

## Lest He Be Wise In His Own Conceit

Conceit here means a false, inflated opinion of your own wisdom.

Staying completely silent can let a fool believe nobody can answer him.

Silence in that case looks like agreement or defeat, not wisdom.

The wise choice depends entirely on which risk matters more in the moment.

🪞 Conceit means a false sense of wisdom

🤐 Total silence can look like defeat

🎭 Silence sometimes reads as agreement

📖 Wisdom means judging which risk is bigger

# Proverbs 26:6-9
# 📜 Wisdom Wasted On A Fool
---
## He That Sendeth A Message By The Hand Of A Fool

Before writing and fast travel, an important message depended entirely on the messenger.

Sending a fool to carry it was a serious mistake, not a small risk.

A fool could easily forget, twist, or bungle the words along the way.

Choosing the right messenger mattered as much as the message itself.

📬 Messages depended completely on the messenger

⚠️ A fool made a poor choice

🌀 Words could get twisted or forgotten

📖 The messenger mattered as much as the message

## Cutteth Off The Feet, And Drinketh Damage

This does not describe an actual physical injury happening to anyone.

Cutting off the feet pictures a plan that suddenly cannot move forward at all.

Drinketh damage pictures swallowing harm the same way someone swallows a drink.

Both images describe the real cost of trusting the wrong person with an important task.

🦵 Cut off feet means a plan stalls

🥤 Drinketh damage means swallowing real harm

💥 Both picture the cost of bad trust

📖 The wrong messenger brings real damage

## The Legs Of The Lame Are Not Equal

A lame person's legs do not match, making every step awkward and uneven.

That same awkwardness happens when a fool tries to speak real wisdom.

A parable means a wise saying meant to teach a lesson.

Wisdom sounds wrong and unstable coming from someone who does not actually understand it.

🦵 Uneven legs make every step awkward

📜 A parable is a wise teaching saying

🗣️ Wisdom sounds wrong from a fool's mouth

📖 The words do not match the speaker

## As He That Bindeth A Stone In A Sling

A sling was built to throw a stone hard and far.

Tying the stone into the sling instead defeats its entire purpose.

The tool becomes useless the moment it cannot do the one thing it was made for.

This strange image sets up the point in the next line.

🪨 A sling was built to throw stones

🔗 Tying the stone defeats its purpose

🚫 A tool that cannot work is useless

➡️ Sets up a comparison about honour

## So Is He That Giveth Honour To A Fool

Honour was made to recognize real wisdom or real character.

Giving it to a fool wastes it the same way a tied sling wastes a stone.

The fool cannot use honour well, since he lacks the character to carry it.

Both the sling and the honour end up useless in the wrong hands.

👑 Honour is meant to reward real character

🪨 A fool cannot carry honour well

🚫 It gets wasted like a tied stone

📖 The wrong hands waste a good thing

## As A Thorn Goeth Up Into The Hand Of A Drunkard

A drunk man handling a thornbush cannot feel it clearly or control it well.

He could easily jab himself and barely notice the pain in time.

A fool handling real wisdom is just as careless and just as dangerous.

He repeats wise sayings without any real grip on what they actually mean.

🍷 A drunk cannot handle a thorn safely

🤕 He could be hurt without noticing

🗣️ A fool handles wisdom just as carelessly

📖 He repeats words without understanding them

# Proverbs 26:10-12
# 🎯 The Fool's Fate
---
## The Great God That Formed All Things

This is one of the hardest verses in Proverbs to translate clearly.

The Hebrew wording behind it is unusually difficult, and scholars still debate its exact meaning.

What stays clear is that God is named here as the maker of everything that exists.

That fact anchors whatever comes next in the verse.

❓ This verse is notoriously hard to translate

📚 Scholars still debate its exact meaning

👑 God is named as the maker

📖 That fact anchors the rest of the verse

## Both Rewardeth The Fool, And Rewardeth Transgressors

Rewardeth means repays or gives back what is actually deserved.

A fool sins mostly out of blindness.

A transgressor sins by deliberate choice.

This verse says God repays both kinds of wrongdoing in the end.

No one escapes accountability just because their sin looked different.

⚖️ Rewardeth means repays what is deserved

🙈 A fool sins mostly from blindness

😈 A transgressor sins on purpose

📖 God repays both in the end

## As A Dog Returneth To His Vomit

Dogs in this culture were not kept as beloved pets the way many are today.

They roamed as unclean scavengers, and this image would have sounded genuinely disgusting to the first readers.

A dog returning to eat its own vomit pictures something repulsive and self destroying.

The New Testament quotes this exact verse in Second Peter chapter two.

🐕 Dogs were unclean scavengers, not pets

🤢 Eating vomit pictures something repulsive

🔁 It shows something harmful being repeated on purpose

📖 Second Peter later quotes this exact verse

## So A Fool Returneth To His Folly

This line applies the disgusting dog image directly to a person.

A fool who repeats the same foolish mistakes acts the same way.

He returns to what hurt him before, the same way a dog returns to sickness.

Real change means refusing to go back, not just regretting it once.

🔁 Fools repeat the same foolish mistakes

🐕 It matches the disgusting dog image

😔 Regret alone does not stop the return

📖 Real change means refusing to go back

## Wise In His Own Conceit

Conceit means a false, overly high opinion of your own wisdom.

This exact phrase already appeared back in verse five of this chapter.

A person like this is not actually wise, only convinced that he is.

That false confidence is what makes him so hard to reach.

🪞 Conceit means a false sense of wisdom

🔁 This phrase already appeared in verse five

🎭 Being convinced does not make him wise

📖 False confidence makes correction hard to land

## There Is More Hope Of A Fool Than Of Him

An honest fool at least knows he still has something to learn.

The man convinced of his own wisdom has already closed that door.

Hope depends on being willing to be corrected, not on how smart someone actually is.

That is a hard, uncomfortable truth about pride.

📚 A fool knows he still has to learn

🚪 The falsely wise man closes that door

🤝 Hope depends on being willing to change

📖 Pride can be harder to fix than folly

# Proverbs 26:13-16
# 🛌 The Sluggard's Excuses
---
## There Is A Lion In The Way

Slothful means lazy, someone unwilling to do the work in front of him.

This is not a real report of a dangerous animal in town.

It is an exaggerated excuse invented to justify staying home.

The made up danger sounds serious enough that no one could argue with it.

😴 Slothful means unwilling to work

🦁 There was no real lion outside

🎭 It is an excuse dressed up as danger

📖 A good excuse can still be fake

## As The Door Turneth Upon His Hinges

A door swings back and forth all day without ever actually going anywhere.

That constant motion looks active, but nothing about it makes real progress.

Every swing ends exactly back where it started.

This image sets up an unflattering comparison in the next line.

🚪 A door swings without going anywhere

🔄 The motion looks active but achieves nothing

🎯 It always ends back where it started

➡️ Sets up a comparison in the next line

## So Doth The Slothful Upon His Bed

The sluggard rolls over in bed the same way a door swings on its hinges.

There is plenty of motion and no actual progress toward getting up.

This is a gentle, almost funny picture of wasted energy.

Motion is not the same thing as moving forward.

🛌 The sluggard rolls over in bed

🚪 It matches the swinging door image

😄 The picture is gently funny, not cruel

📖 Motion is not the same as progress

## Hideth His Hand In His Bosom

Bosom here means the fold of a loose outer garment, used something like a pocket.

Tucking a hand inside that fold kept it warm and out of use.

This pictures a person too lazy to even do simple things for himself.

The next line pushes this same exaggeration even further.

👕 Bosom means the fold of a garment

🤚 A hand tucked inside stayed unused

😴 It pictures extreme, almost comic laziness

➡️ The next line pushes the joke further

## It Grieveth Him To Bring It Again To His Mouth

Grieveth here means it feels like a genuine burden or hardship.

Even lifting food to his own mouth feels like too much effort.

This is comic exaggeration, not a literal medical condition.

The proverb pokes fun at laziness by pushing it to an absurd extreme.

😩 Grieveth means it feels like a burden

🍽️ Even feeding himself feels like too much

😆 This is comic exaggeration on purpose

📖 Laziness is mocked by pushing it further

## Wiser In His Own Conceit Than Seven Men That Can Render A Reason

Seven often stands for completeness or fullness in the Bible, not a literal headcount.

Seven wise men who can render a reason means a full council of genuinely capable advisers.

The sluggard rates his own judgment above every one of them combined.

His laziness has not humbled him at all, only made him more sure of himself.

🔢 Seven often means completeness in scripture

🧑‍⚖️ It pictures a full council of wise advisers

😤 The sluggard rates himself above all of them

📖 Laziness left him more prideful, not humbler

# Proverbs 26:17-19
# 🐕 Meddling And Mad Tricks
---
## Meddleth With Strife Belonging Not To Him

Meddleth means inserting yourself into a conflict that was never actually yours.

Passeth by shows this is someone who was not even originally involved.

Getting pulled into someone else's argument rarely ends up helping anyone.

The next line pictures exactly how risky that choice really is.

🚶 Passeth by means someone not originally involved

🥊 Meddleth means jumping into a conflict anyway

🙅 Outside conflicts rarely need another voice

➡️ The next line shows the real risk

## Is Like One That Taketh A Dog By The Ears

Dogs in this culture usually roamed loose, ownerless, and not fully tame.

Grabbing a strange dog by the ears was a fast way to get bitten.

There was no real reward for doing it, only unnecessary danger.

Getting involved in someone else's fight works exactly the same way.

🐕 Street dogs were loose and untamed

🦷 Grabbing the ears risked a real bite

🚫 There was no reward, only danger

📖 Outside fights carry that same risk

## As A Mad Man Who Casteth Firebrands, Arrows, And Death

A firebrand is a burning stick, dangerous to whoever it lands near.

This pictures someone throwing burning wood, sharp arrows, and deadly harm without any real care.

A person acting this recklessly could seriously hurt someone at any moment.

The next line reveals exactly who this madman represents.

🔥 A firebrand is a burning stick

🏹 Arrows and fire both cause real harm

😵 Reckless carelessness can seriously hurt someone

➡️ The next line names who this pictures

## So Is The Man That Deceiveth His Neighbour, And Saith, Am Not I In Sport

Sport here means playing around or joking, not a real game.

This person lies to or tricks someone, then hides behind a joke when confronted.

Real damage was done, even though the excuse sounds harmless.

Calling cruelty a joke does not undo the harm it actually caused.

😏 Sport means joking or playing around

🎭 A joke gets used to excuse real harm

💔 The damage caused was still real

📖 A joke cannot undo actual harm

# Proverbs 26:20-22
# 🔥 Fueling Strife
---
## Where No Wood Is, There The Fire Goeth Out

A fire cannot keep burning without fuel to feed it.

Once the wood runs out, the flames naturally die down on their own.

This simple, familiar picture from daily life sets up the next line.

Nothing complicated is being said here, only an obvious fact about fire.

🔥 Fire needs fuel to keep burning

🪵 No wood means the fire dies out

👀 This is a simple, familiar picture

➡️ Sets up a comparison about conflict

## Where There Is No Talebearer, The Strife Ceaseth

A talebearer is someone who spreads gossip and stirs up conflict between people.

Strife needs a talebearer to keep spreading it, the same way fire needs wood.

Remove the gossip, and most arguments naturally run out of fuel.

This is a practical, not just moral, reason to avoid gossip.

🗣️ A talebearer spreads gossip and conflict

🔥 Strife needs gossip the way fire needs wood

🚫 Removing gossip often ends the conflict

📖 Avoiding gossip is practical, not just moral

## As Coals Are To Burning Coals, And Wood To Fire

Fresh coals placed next to burning ones catch fire and spread the heat further.

Adding wood to an existing fire only makes it grow larger.

Both images describe something added that makes an existing situation more intense.

The next line names exactly who plays that role among people.

🔥 Fresh coals spread heat to new coals

🪵 More wood only makes a fire grow

📈 Both pictures show something intensifying

➡️ Names who plays that role next

## So Is A Contentious Man To Kindle Strife

Contentious means someone who enjoys arguing and provoking conflict.

This kind of person adds fuel to a disagreement the same way wood feeds fire.

Without him, a small disagreement might have simply faded away.

His presence is often the actual reason small conflicts become bigger ones.

😤 Contentious means someone who loves arguing

🔥 He adds fuel the way wood feeds fire

📉 Without him, conflict often fades away

📖 His presence turns small fights into big ones

## The Words Of A Talebearer Are As Wounds

This same comparison also appears earlier in Proverbs chapter eighteen.

Gossip is being compared here to a real physical injury, not just hurt feelings.

A wound can heal on the outside while still causing damage underneath.

Words can cause that same kind of lasting harm.

🩹 Wounds compare gossip to real injury

🔁 This same comparison appears in chapter eighteen

💔 Damage can linger under the surface

📖 Words can cause lasting harm too

## They Go Down Into The Innermost Parts Of The Belly

Innermost parts of the belly pictures something being swallowed and settling deep inside.

Gossip is not just heard and forgotten a moment later.

It gets absorbed, remembered, and often repeated by whoever received it.

That is exactly why gossip spreads so easily from person to person.

🍽️ Innermost parts pictures being swallowed deep

🧠 Gossip gets remembered, not just heard

🔁 It often gets repeated by the listener

📖 That is why gossip spreads so easily

# Proverbs 26:23-26
# 🎭 Hidden Hatred
---
## Burning Lips And A Wicked Heart

Burning lips here means passionate, warm sounding, or flattering speech.

A wicked heart underneath that speech means real hatred or evil intent.

The outside sounds warm while the inside stays cold and dangerous.

That mismatch is exactly what the next line pictures.

🔥 Burning lips means warm, flattering speech

💔 A wicked heart means hidden evil intent

🎭 The outside and inside do not match

➡️ The next line pictures that mismatch

## Like A Potsherd Covered With Silver Dross

A potsherd is a broken, worthless piece of cheap clay pottery.

Silver dross was the impure waste skimmed off during silver refining, not real silver at all.

Someone could coat cheap clay with that waste to make it look valuable at a glance.

Flattering words work the same way, dressing up something worthless to look precious.

🏺 A potsherd is cheap, broken clay

🥈 Dross is worthless waste, not real silver

✨ A coating can fake real value

📖 Flattery dresses up something worthless

## He That Hateth Dissembleth With His Lips

Dissembleth means disguising your true feelings behind a false, calm appearance.

This person hates someone but hides it carefully behind pleasant words.

Nothing about his outward behavior gives away what he actually feels inside.

Hidden hatred is more dangerous than open hatred because no one sees it coming.

🎭 Dissembleth means hiding true feelings

🗣️ Pleasant words can hide real hatred

👀 Nothing on the outside gives it away

📖 Hidden hatred is harder to see coming

## When He Speaketh Fair, Believe Him Not

Speaketh fair means using pleasant, friendly sounding words.

This verse offers a warning, not a reason to distrust every kind word you hear.

It applies specifically to someone already known to carry real hatred inside.

Pleasant words from that kind of person deserve real caution.

🗣️ Speaketh fair means pleasant, friendly words

⚠️ This warns about a known hater specifically

🚫 Not every kind word deserves suspicion

📖 Caution fits a person already known to hate

## Seven Abominations In His Heart

Abomination means something viewed as deeply offensive or detestable.

Seven again pictures completeness, echoing the same number already used in verse sixteen.

This heart is not just a little corrupted, it is fully and completely corrupted.

The pleasant words on the surface hide something total underneath.

🤢 Abomination means something deeply detestable

🔢 Seven again pictures full completeness

💯 This heart is fully, not partly, corrupted

📖 Surface words hide total corruption

## Whose Hatred Is Covered By Deceit

Deceit here works like a lid, keeping the real hatred hidden underneath.

This covering can hold for a long time, sometimes for years.

Nothing about this arrangement is described as permanent or safe.

The next line reveals exactly what eventually happens to it.

🎭 Deceit works like a lid on hatred

⏳ The cover can hold for years

⚠️ Nothing about it is described as safe

➡️ The next line reveals what happens

## His Wickedness Shall Be Shewed Before The Whole Congregation

Congregation means the whole community gathered together, often for a public matter.

Shewed means revealed or exposed, the opposite of staying hidden.

Whatever hatred was hidden under pleasant words eventually comes out in front of everyone.

Hidden evil rarely stays hidden forever.

👥 Congregation means the gathered whole community

🔦 Shewed means revealed, not hidden anymore

📢 Hidden hatred eventually surfaces publicly

📖 Hidden evil rarely stays hidden forever

# Proverbs 26:27-28
# 🪃 Evil Returns On Its Doer
---
## Whoso Diggeth A Pit Shall Fall Therein

Digging a pit here pictures setting a hidden trap meant to harm someone else.

Therein means inside that very same pit.

Schemes built to hurt other people have a way of catching their own maker instead.

This is not always guaranteed, but it happens often enough to be proverbial.

🕳️ A pit pictures a hidden trap

🎯 Therein means inside that same trap

🔄 Schemes often catch their own maker

📖 This pattern is common enough to be proverbial

## He That Rolleth A Stone, It Will Return Upon Him

Rolling a heavy stone uphill toward someone else takes real, deliberate effort.

Gravity and momentum both work against whoever tries to control it.

A stone like that can easily roll backward onto the person who pushed it.

Harm aimed at someone else often finds its way back to its source.

🪨 Rolling a stone takes deliberate effort

⬇️ Gravity can send it rolling backward

🎯 It can strike whoever pushed it

📖 Harm aimed outward often returns inward

## A Lying Tongue Hateth Those That Are Afflicted By It

This does not describe a liar who is hated by his victims.

It describes something stranger, a liar who ends up hating the people he has wronged.

Guilt is uncomfortable, and blaming the victim can feel easier than facing it.

Resenting the person you hurt is a common, ugly way people avoid facing their own guilt.

🔄 The liar hates his own victims here

😣 Guilt is uncomfortable to sit with

👉 Blame gets shifted onto the victim instead

📖 Resentment can hide from real guilt

## A Flattering Mouth Worketh Ruin

Flattering means saying pleasant things that are not actually true.

Worketh ruin means it actively causes real, lasting damage over time.

This closes the chapter the same way it opened, warning against pleasant sounding lies.

Words that only please rarely turn out to be words that actually help.

🗣️ Flattering means pleasant words that are false

💥 Worketh ruin means it causes real damage

🔁 This echoes the chapter's opening warning

📖 Pleasing words are not always helpful ones
`.trim();

export const PROVERBS_TWENTY_SIX_PERSONAL_SECTIONS = parseProverbsTwentySixRawNotes(PROVERBS_TWENTY_SIX_RAW_NOTES);
