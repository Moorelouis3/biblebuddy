export type PsalmsThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtySevenRawNotes(rawText: string): PsalmsThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 37:${startVerse}` : `Psalms 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 37 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_SEVEN_RAW_NOTES = `# Psalms 37:1-5
# 🌱 Trust Instead Of Fretting
---
## 🔥 Fret Not Thyself Because Of Evildoers

Fret means much more than simply feeling annoyed.

It describes a mind that worries itself into anger or despair.

This psalm is a Hebrew acrostic, moving through the alphabet letter by letter.

That structure was built for memory, not just for reading once.

🔥 Fret means worry that turns to anger
📜 The psalm follows a Hebrew acrostic pattern
🧠 It moves through the alphabet in order
📖 Built for memory, not one time reading

## 😒 Envious Against The Workers Of Iniquity

Envious here means wanting the success wicked people seem to have.

Iniquity is an old word for sin and wrongdoing done on purpose.

It seems strange to warn against envying someone doing wrong.

But watching evil people prosper can quietly tempt a person to copy them.

😒 Envious means wanting what evildoers have
⚖️ Iniquity means sin done on purpose
👀 Watching evil prosper can tempt imitation
📖 The warning protects against copying evil

## 🌾 Cut Down Like The Grass

Grass in this region grew fast after rain but faded just as fast.

The image pictures something that looks alive one moment and gone the next.

Wicked success in this psalm is compared to that short season of grass.

It looks impressive for a little while, then disappears completely.

🌾 Grass grew fast then faded fast
☀️ Ancient readers watched grass die quickly
⏳ Wicked success is pictured the same way
📖 It looks strong but does not last

## 🍃 Wither As The Green Herb

Herb here simply means a green garden plant.

This line repeats the same idea as the grass in different words.

Hebrew poetry often says one thought twice using two different pictures.

Repetition like this was meant to drive the point home, not add new information.

🍃 Herb means a green garden plant
🔁 This restates the grass image differently
📜 Hebrew poetry often repeats an idea twice
📖 Repetition here drives home one point

## 🌿 Trust In The Lord, And Do Good

Trust and action are joined together in this one line on purpose.

Faith in this psalm never stays only in the mind.

It always leads to a specific, visible way of living.

Belief and behavior are treated as one connected habit here.

🌿 Trust and action appear together here
🧭 Faith in this psalm always leads somewhere
👐 Belief shapes how a person actually lives
📖 Faith and behavior are treated as one

## 🍞 Verily Thou Shalt Be Fed

Verily is an old word that simply means truly or certainly.

Being fed here points back to the promised land given to Israel.

That land depended completely on rain and harvest each year.

A promise of being fed was a promise of real security.

🍞 Verily means truly or certainly
🗺️ Fed points back to the promised land
🌦️ That land depended on rain each year
📖 The promise was one of real security

## 💛 Delight Thyself Also In The Lord

Delight means finding real joy in something, not just tolerating it.

This is not a formula for getting anything a person wants.

It describes a heart that genuinely enjoys knowing God.

That kind of joy slowly reshapes what a person even wants.

💛 Delight means real joy, not tolerance
🚫 This is not a wish granting formula
🌱 Genuine joy in God reshapes desire
📖 Right desires grow out of real delight

## 🎁 The Desires Of Thine Heart

This does not mean God simply hands over every private wish.

A heart that truly delights in God starts wanting different things.

The desires being described here are the ones formed by that closeness.

God is not a genie granting requests picked before knowing Him.

🎁 Not a promise of every wish
🌱 New desires grow from real closeness
🔄 Wanting changes as a heart changes
📖 God shapes desire, not just grants it

## 🎯 Commit Thy Way Unto The Lord

The Hebrew word behind commit literally means to roll something onto someone else.

Picture rolling a heavy stone off your own shoulders and onto another person's.

That is the exact picture behind handing your path over to God.

It means releasing control, not just asking for occasional help.

🎯 Commit literally means to roll something over
🪨 Pictures rolling a heavy weight away
🤲 It means releasing control completely
📖 Trust means letting go, not managing it

## ⏱️ He Shall Bring It To Pass

Bring it to pass is an old way of saying make it happen.

This line does not promise instant results after committing to God.

God working out a person's path often takes real time.

The promise is about the final outcome, not the speed of it.

⏱️ Bring to pass means make it happen
⏳ This is not a promise of speed
🛤️ God works out the path over time
📖 The outcome is certain, the timing is not

# Psalms 37:6-10
# ⏳ Wait, Do Not Retaliate
---
## ☀️ Thy Righteousness As The Light

Light here pictures something that becomes clear and visible to everyone.

A righteous life eventually gets proven true, even if it takes time.

People may doubt or misjudge someone's character for a while.

God promises that the truth about a person eventually comes into view.

☀️ Light pictures something becoming clearly visible
⏳ A good name can take time to show
🕵️ People may misjudge someone for a season
📖 Truth eventually comes fully into view

## 🕛 Thy Judgment As The Noonday

Ancient people had no clocks, so noon was known by the sun straight overhead.

Noonday was the brightest, clearest point of the entire day.

This line pairs with the light in the verse before it.

Both images describe the same idea, total clarity with nothing hidden.

🕛 Noonday meant the sun straight overhead
🔆 It was the brightest point of the day
🔁 This pairs with the light image before it
📖 Both picture total, complete clarity

## 🕊️ Rest In The Lord, And Wait Patiently

Rest here does not mean giving up or becoming passive.

It means settling down inwardly instead of scrambling to fix everything alone.

Waiting patiently means trusting God's timing even when nothing seems to change.

This kind of rest takes real effort, not less effort.

🕊️ Rest does not mean giving up
🧘 It means settling down inwardly instead
⏳ Waiting means trusting God's timing
📖 This rest takes real effort to hold

## 😤 Him Who Prospereth In His Way

This refers to a wicked person who seems to be winning at life.

That kind of success can feel deeply unfair to watch.

Other psalms wrestle with this exact same frustration openly.

The temptation is to imitate the shortcut instead of trusting God's way.

😤 Refers to a wicked person succeeding
⚖️ That success can feel deeply unfair
📜 Other psalms wrestle with this same struggle
📖 The danger is copying the shortcut

## 😠 Cease From Anger, And Forsake Wrath

Anger is the inward feeling, while wrath is that feeling acted out.

This verse addresses both the emotion and what a person does with it.

Forsake means to completely let go of something, not just calm down briefly.

Left unchecked, anger at injustice can push a person toward doing evil.

😠 Anger is the feeling underneath
🔥 Wrath is anger acted out
🙌 Forsake means letting go completely
📖 Unchecked anger can lead to evil

## ✂️ Evildoers Shall Be Cut Off

Cut off is a strong image of being completely removed from a place.

It pictures a branch severed from the tree that once fed it.

This is the fate of those who build their life on wrongdoing.

The picture is permanent removal, not a temporary setback.

✂️ Cut off means completely removed
🌿 Pictures a branch severed from the tree
⚠️ This is wrongdoing's ultimate fate
📖 The removal described here is permanent

## 🌍 They Shall Inherit The Earth

Inherit means receiving something as a lasting possession, not just borrowing it.

This is the first of several promises about inheriting land in this psalm.

The wicked's gains in this psalm never last long.

The patient person's reward is described as permanent instead.

🌍 Inherit means a lasting possession
🔁 The first of several such promises here
⏳ Wicked gains never last long
📖 The patient person's reward is lasting

## ⏳ Yet A Little While

This phrase asks for patience measured against eternity, not a calendar.

What feels like a long wait to a person is brief to God.

The wicked person's apparent success will not last as long as it seems.

This is comfort for someone growing tired of waiting.

⏳ Patience is measured against eternity here
🕰️ A long wait can feel short to God
📉 Wicked success will not last
📖 This verse comforts a weary heart

## 🔍 Thou Shalt Diligently Consider His Place

This pictures someone actively searching for a person who has vanished.

Diligently means searching carefully and on purpose, not glancing quickly.

The wicked person's whole world will simply stand empty.

This same searching image returns again later in the psalm.

🔍 Pictures someone searching for a person gone
🕵️ Diligently means searching carefully on purpose
🏚️ Their whole world will simply stand empty
📖 This searching image returns again later

# Psalms 37:11-15
# 😄 The Lord Sees What Is Coming
---
## 🕊️ The Meek Shall Inherit The Earth

Meek does not mean weak or timid in this context.

It describes strength that is fully under control, not aggression given free rein.

Jesus later quotes this exact line directly in the Beatitudes.

That connection shows this promise carries all the way into the New Testament.

🕊️ Meek means controlled strength, not weakness
💪 Not aggression, but strength held back
✝️ Jesus quotes this line directly
📖 The promise carries into the New Testament

## 🌾 The Abundance Of Peace

Abundance means more than enough, running over instead of barely lasting.

This peace is not the absence of conflict around a person.

It is a deep steadiness inside, even while trouble continues outside.

That inner peace answers the fretting warned against back in verse one.

🌾 Abundance means more than enough
🧘 Peace here is inward steadiness
⚔️ It exists even amid real conflict
📖 It answers the fretting from verse one

## 😬 Gnasheth Upon Him With His Teeth

Gnasheth means grinding the teeth together in extreme rage.

This same picture appears later when Stephen is stoned in the book of Acts.

It shows fury that has moved past words into physical tension.

The wicked person's anger here is aimed directly at someone innocent.

😬 Gnasheth means grinding teeth in rage
📜 The same image appears later in Acts
🔥 It shows anger moved into the body
📖 The anger here targets someone innocent

## 😄 The Lord Shall Laugh At Him

This laughter is not cruelty aimed at someone in pain.

It pictures God's calm confidence next to a human plot that looks doomed from the start.

A short lived threat looks small from where God sits.

The wicked person's plan already carries its own defeat inside it.

😄 Not cruelty, but calm confidence
👁️ God sees a doomed plan clearly
🐜 A short lived threat looks small to Him
📖 The plan already carries its own defeat

## 📅 For He Seeth That His Day Is Coming

Day here refers to a coming moment of reckoning, not a literal sunrise.

God's patience is not the same thing as God missing what is happening.

He sees the outcome before it ever arrives.

The wicked person's timeline is already fixed, even without their knowledge.

📅 Day means a coming moment of reckoning
👁️ God's patience is not blindness
🔮 He sees the outcome in advance
📖 The timeline is fixed either way

## 🏹 Drawn Out The Sword, And Bent Their Bow

Both actions describe weapons fully readied for immediate use.

A drawn sword and a bent bow show intent, not just possession.

This is a picture of planned violence, not a passing thought.

The wicked here are actively preparing to harm someone specific.

🏹 Both weapons are fully readied here
🎯 They show intent, not just ownership
🧨 This pictures planned violence
📖 The threat here is specific, not vague

## 🤲 To Cast Down The Poor And Needy

The poor and needy had little power to fight back in this culture.

This verse names exactly who the violence is aimed at.

Scripture repeatedly measures justice by how the vulnerable are treated.

God takes special notice when the powerless are the ones being hurt.

🤲 The poor and needy had little power
🎯 The violence here has a clear target
⚖️ Scripture measures justice by this treatment
📖 God notices harm done to the powerless

## 🗣️ Such As Be Of Upright Conversation

Conversation in this old English usage means someone's entire way of living.

It does not refer to talking or speech at all.

An upright conversation describes a consistently honest and faithful lifestyle.

This is another word modern readers commonly misunderstand at first glance.

🗣️ Conversation here means a way of living
🚫 It does not mean talking or speech
✅ Upright describes a consistently honest life
📖 This old word is easy to misread

## ⚔️ Their Sword Shall Enter Into Their Own Heart

This is a picture of violence turning back on the person who planned it.

The weapon prepared for someone else ends up striking its owner instead.

This same kind of reversal shows up elsewhere in scripture, like Haman's own gallows.

Evil plans often carry the seeds of their own downfall.

⚔️ The violence turns back on its planner
🔁 The weapon strikes its own owner
📜 A similar reversal happens with Haman
📖 Evil plans often undo themselves

# Psalms 37:16-20
# 🔥 What Lasts And What Burns Up
---
## 🪙 A Little That A Righteous Man Hath

This verse compares a small, honest amount to a large, dishonest fortune.

Righteous wealth may look small next to the wicked person's pile.

The comparison is not really about the size of each amount.

It is about which one a person can actually keep in peace.

🪙 Compares a small honest amount to a fortune
⚖️ The comparison is not about size
🕊️ It is about what stays peaceful
📖 A small, honest amount outweighs a fortune

## 💪 The Arms Of The Wicked Shall Be Broken

Arms in this idiom means strength and power, not literal limbs.

Ancient readers understood this picture as broken authority, not broken bones.

The strength the wicked lean on gets taken away completely.

Power built on wrongdoing does not hold up in the end.

💪 Arms here means strength and power
🚫 Not a literal injury but broken authority
📉 Their strength gets taken away completely
📖 Power built on wrong does not last

## 🤝 The Lord Upholdeth The Righteous

Uphold means actively supporting someone so they do not collapse.

This is a picture of a hand placed under someone before they fall.

It is ongoing support, not a single rescue after the fact.

The righteous stand because they are held, not because they never stumble.

🤝 Uphold means active, ongoing support
✋ Pictures a hand placed under someone
🔁 It is continual, not one time help
📖 They stand because they are held

## 📆 The Lord Knoweth The Days Of The Upright

Knoweth here means far more than simply being aware of something.

It describes intimate, personal attention to each day of a person's life.

This is not distant knowledge from far away.

God pays attention to the details, not just the big moments.

📆 Knoweth means intimate personal attention
👀 It covers each individual day
🔍 This is close attention, not distance
📖 God notices small details, not just big ones

## ♾️ Their Inheritance Shall Be For Ever

Inheritance here is not only about land or property.

It includes the lasting relationship and security promised throughout this psalm.

Unlike an earthly inheritance, this one cannot be lost or spent.

The word forever marks it as different from anything temporary.

♾️ Inheritance includes more than land
🔒 It cannot be lost or spent
🆚 Unlike an ordinary earthly inheritance
📖 Forever marks it as permanent

## 😊 They Shall Not Be Ashamed In The Evil Time

Evil time refers to a season of hardship or crisis.

Being ashamed here means being publicly humiliated or exposed as wrong.

This promises the upright will not be caught helpless when trouble comes.

Their trust in God will hold up under real pressure.

😊 Evil time means a season of hardship
😳 Ashamed here means publicly humiliated
🛡️ They will not be caught helpless
📖 Their trust holds under real pressure

## 🌾 In The Days Of Famine They Shall Be Satisfied

Famine was a constant, real fear in this farming based culture.

A whole harvest depended entirely on rain that could fail without warning.

This promise addressed the deepest fear an ancient reader actually carried.

Being satisfied here meant real provision, not just survival.

🌾 Famine was a constant real fear
🌦️ Harvest depended completely on rain
😨 This addressed a real, common fear
📖 Satisfied means real provision, not just survival

## 🔥 As The Fat Of Lambs

Fat portions of sacrificed animals were burned completely on the altar.

Nothing of that fat was saved or eaten afterward.

This image pictures the wicked being consumed totally, with nothing left over.

The comparison to sacrifice would have been instantly familiar to the original readers.

🔥 Sacrificial fat was burned completely
🚫 None of it was saved or eaten
💨 Pictures total consumption of the wicked
📖 The sacrifice image was instantly familiar

## 💨 Into Smoke Shall They Consume Away

Smoke rises and then disappears completely into the air.

This finishes the sacrifice image from the verse just before it.

There is nothing gradual left after this point, only vanishing.

The wicked person's whole existence pictured here ends without a trace.

💨 Smoke rises then disappears completely
🔁 This finishes the sacrifice image
⏳ Nothing gradual remains after this
📖 Their existence ends without a trace

# Psalms 37:21-25
# 🧓 A Lifetime Of Watching God Provide
---
## 💸 The Wicked Borroweth, And Payeth Not Again

This describes someone who takes without any intention of returning it.

It is a small, everyday example of a much larger pattern of dishonesty.

Character shows up in ordinary financial habits, not only in dramatic moments.

How a person treats debt reveals something true about them.

💸 Takes without intending to return it
🔁 A small example of a larger pattern
🪙 Character shows in ordinary habits
📖 Debt habits reveal something real

## 🎁 The Righteous Sheweth Mercy, And Giveth

Sheweth is an old spelling that simply means shows.

This verse pairs mercy with actual giving, not just kind feelings.

The righteous person's generosity is the direct opposite of the wicked one's dishonesty.

Real mercy always shows up as action eventually.

🎁 Sheweth simply means shows
💛 Mercy is paired with real giving
🆚 This contrasts directly with the borrower
📖 Real mercy shows up as action

## 🌍 Such As Be Blessed Of Him Shall Inherit The Earth

Blessed and cursed here echo the covenant language given through Moses.

Being blessed of God meant living under His favor and provision.

Being cursed meant being cut off from that same favor.

This verse ties the whole psalm back to that older covenant promise.

🌍 Blessed and cursed echo Moses's covenant language
✅ Blessed meant living under God's favor
🚫 Cursed meant cut off from favor
📖 This ties back to that older promise

## 🛤️ The Steps Of A Good Man Are Ordered By The Lord

Ordered means directed and established, not merely allowed to happen.

This covers the small, daily steps of an ordinary life.

God's care in this verse is not limited to major decisions only.

Even the ordinary, unnoticed parts of a day are held by Him.

🛤️ Ordered means directed, not just allowed
🚶 It covers small daily steps
🔍 God's care is not only for big moments
📖 Even the unnoticed parts are held by Him

## 😊 He Delighteth In His Way

This reverses the delight from earlier in the psalm.

There, the person delighted in God, and now God delights in that person's path.

It shows a real relationship moving in both directions.

God is not distant from someone who is actually trying to follow Him.

😊 This reverses the earlier delight verse
🔄 Now God delights in the person's path
🤝 It shows a two way relationship
📖 God is close to those who follow Him

## 🤕 Though He Fall, He Shall Not Be Utterly Cast Down

This does not promise a life with no failure or stumbling.

Fall here includes real mistakes, not just outside attacks from enemies.

The promise is about final ruin, not about avoiding every stumble.

God's people are held even after they genuinely mess up.

🤕 Falling includes real personal mistakes
🚫 This is not a promise of no failure
🛡️ The promise concerns final ruin, not stumbling
📖 God holds His people even after failure

## 🧓 I Have Been Young, And Now Am Old

This is David speaking from decades of personal observation.

It reads as honest testimony, not a guaranteed formula for every single case.

Other psalms openly wrestle with times the righteous do suffer deeply.

This verse describes a pattern David saw, not a strict promise with no exceptions.

🧓 David speaks from decades of watching
📜 Other psalms wrestle with real suffering
🔍 It describes a pattern, not a promise
📖 This is testimony, not a guarantee

## 🍞 Nor His Seed Begging Bread

Seed is an old word for children or descendants.

Begging bread pictures complete poverty, reduced to asking strangers for food.

David is describing the family line of the righteous over time.

He testifies that he never watched that family line end in total ruin.

🍞 Seed means children or descendants
🥺 Begging bread pictures total poverty
👪 This describes a family line over time
📖 David never saw that line end in ruin

# Psalms 37:26-30
# 🗣️ A Life That Speaks For Itself
---
## 🤲 He Is Ever Merciful, And Lendeth

Israel's law commanded lending to the poor without charging interest.

This verse describes a righteous person who actually lives out that command.

Ever here means constantly, not just on rare occasions.

Generosity like this becomes a settled habit, not an occasional gesture.

🤲 The law commanded interest free lending
✅ This person actually lives that out
🔁 Ever means constantly, not rarely
📖 Generosity here is a settled habit

## 👪 His Seed Is Blessed

This continues the theme of blessing carrying across generations.

A person's choices can shape the life of their children long after them.

This is not a magic guarantee about every single descendant.

It describes a pattern of blessing that tends to follow a faithful life.

👪 Blessing here carries across generations
🔗 Choices shape children long afterward
🚫 Not a guarantee for every descendant
📖 It describes a pattern, not a rule

## 🚶 Depart From Evil, And Do Good

This repeats the same two part command given back in verse three.

A faithful life requires both turning away and turning toward something.

Avoiding wrong alone is not the same as actively doing right.

This repetition marks it as one of the psalm's central instructions.

🚶 Repeats the command from verse three
🔄 Faithfulness requires both turning away and toward
⚖️ Avoiding wrong is not enough alone
📖 This is one of the psalm's key instructions

## ⚖️ The Lord Loveth Judgment

Judgment here means fairness and justice, not condemnation or punishment.

This line describes something God genuinely loves and delights in.

A God who loves fairness cannot ignore real injustice forever.

That love for justice is the foundation for every promise in this psalm.

⚖️ Judgment means fairness, not condemnation
💛 God genuinely delights in justice
🚫 He cannot ignore real injustice forever
📖 This love for justice grounds the whole psalm

## 🙏 Forsaketh Not His Saints

Saints here does not mean flawless or specially holy people.

It simply describes those who belong to God and follow Him sincerely.

Forsaketh means abandoning or walking away from someone completely.

God's promise here is that He will never do that to His own.

🙏 Saints means those devoted to God
🚫 It does not mean flawless people
👋 Forsaketh means walking away completely
📖 God promises He will not walk away

## 🏞️ The Righteous Shall Inherit The Land, And Dwell Therein For Ever

Land and earth translate the very same Hebrew word throughout this psalm.

The shift in English wording does not signal a different promise.

Dwell therein for ever adds a picture of permanent, settled rest.

This is the fourth time this same promise appears in this chapter.

🏞️ Land and earth translate one Hebrew word
🔁 The English wording shifts, the promise does not
🏡 Dwell for ever pictures permanent rest
📖 This promise repeats for the fourth time

## 🗣️ The Mouth Of The Righteous Speaketh Wisdom

What a person says reveals what has already shaped their heart.

This verse begins a shift toward the theme of speech and character.

Wisdom here means skill in living well, not just clever words.

A righteous life shows itself first through what someone chooses to say.

🗣️ Speech reveals what shapes the heart
🔄 This begins a shift toward speech
🧠 Wisdom means skill in living well
📖 Character shows first through words

## ⚖️ His Tongue Talketh Of Judgment

This verse pairs directly with the wisdom named just before it.

A wise person's speech naturally leans toward fairness and honesty.

Talketh of judgment means regularly speaking with justice in mind.

Someone shaped by God tends to speak the way God Himself speaks.

⚖️ Pairs directly with the wisdom before it
🗣️ Talketh of judgment means speaking with justice
🧭 Justice shapes how this person speaks
📖 A shaped heart speaks like God speaks

# Psalms 37:31-35
# 🌳 The Wicked Look Permanent, But Are Not
---
## ❤️ The Law Of His God Is In His Heart

This describes the law moved from an outside rule to an inward conviction.

It is no longer just words written on a scroll somewhere else.

The prophet Jeremiah later describes this exact same picture of an inward law.

A law kept only outwardly can be dropped the moment no one is watching.

❤️ The law moves from outside to inward
📜 It is more than words on a scroll
🔮 Jeremiah later pictures this same idea
📖 An inward law is not easily dropped

## 🦶 None Of His Steps Shall Slide

Slide here is an old way of saying slip or fall away.

This pictures someone walking on solid, stable ground.

An inward law, held deeply, gives a person that same stability.

A person can walk confidently when they are not constantly second guessing themselves.

🦶 Slide means slip or fall away
🪨 Pictures someone on stable ground
❤️ An inward law gives that stability
📖 Confidence grows from deep conviction

## 👀 The Wicked Watcheth The Righteous

This describes ongoing, deliberate surveillance, not a passing glance.

David likely wrote from his own time being hunted by Saul.

Being watched with hostile intent is exhausting and genuinely frightening.

This verse names a real danger honestly, without softening it.

👀 Describes ongoing, deliberate surveillance
👑 David likely wrote from his time with Saul
😰 Being watched this way is exhausting
📖 The psalm names real danger honestly

## ✋ The Lord Will Not Leave Him In His Hand

Hand here is an idiom for someone's power or control.

This answers directly the threat described in the verse just before it.

Being watched by an enemy does not mean being abandoned by God.

Real danger and real protection can exist in the same moment.

✋ Hand here means power or control
🔁 This answers the threat from the last verse
🛡️ Being watched does not mean abandoned
📖 Danger and protection can coexist

## ⚖️ Nor Condemn Him When He Is Judged

This uses courtroom language of a formal trial.

Being judged does not automatically mean being found guilty.

This describes a legal process that ends in acquittal, not punishment.

God's people can face accusation without facing final condemnation.

⚖️ Uses formal courtroom language here
🔍 Judged does not mean guilty
✅ This process ends in acquittal
📖 Accusation is not the same as condemnation

## 🧭 Wait On The Lord, And Keep His Way

This same command already appeared earlier in this psalm.

Repeating it here signals the psalm circling back toward its close.

Waiting and obedience are treated as one connected habit, not two separate options.

This pairing shows up throughout the whole chapter.

🧭 This command already appeared earlier
🔁 It signals the psalm circling back
🤝 Waiting and obedience are one habit
📖 This pairing runs through the whole chapter

## 👑 He Shall Exalt Thee To Inherit The Land

This is the last of several inheritance promises across this psalm.

Each earlier mention built toward this final, complete statement.

Exalt means being lifted up and honored, not just given property.

The whole chapter has been building steadily toward this one moment.

👑 The last of several inheritance promises
🔁 Each earlier mention built toward this
⬆️ Exalt means lifted up and honored
📖 The chapter builds toward this moment

## 🌳 Spreading Himself Like A Green Bay Tree

A bay tree was a large evergreen known for staying lush year round.

It looked permanent in a way that most plants in this region did not.

This picture makes the wicked person's success look especially secure and lasting.

The very next verse will completely overturn that impression.

🌳 A bay tree stayed lush year round
🆚 It looked unusually permanent for a plant
💪 This makes wicked success look secure
📖 The next verse overturns that impression

# Psalms 37:36-40
# 🍃 Trust Is How The Psalm Began And Ends
---
## 💨 Yet He Passed Away, And, Lo, He Was Not

Lo is an old exclamation meaning look or behold.

This verse suddenly reverses the picture from the verse just before it.

The seemingly permanent bay tree is gone without warning.

What looked unshakable disappeared faster than anyone expected.

💨 Lo means look or behold
🔄 This suddenly reverses the last verse
🌳 The permanent looking tree is gone
📖 What looked unshakable vanished quickly

## 🔍 I Sought Him, But He Could Not Be Found

This exact same searching picture already appeared earlier in the psalm.

That earlier search was also about a wicked person's sudden disappearance.

The repeated image ties the whole chapter together on purpose.

What was promised early on is now shown actually happening.

🔍 This same picture appeared earlier
🔁 Both searches involve sudden disappearance
🧵 The repeated image ties the psalm together
📖 The early promise is now shown fulfilled

## 👁️ Mark The Perfect Man, And Behold The Upright

Mark here means pay close, deliberate attention, not a casual glance.

Perfect in this old usage means complete devotion, not sinless flawlessness.

The reader is being told to study a real example on purpose.

Watching a faithful life closely teaches lessons words alone cannot.

👁️ Mark means paying close attention
✅ Perfect means devoted, not flawless
📚 The reader is told to study an example
📖 Watching faithfulness teaches what words cannot

## 🕊️ The End Of That Man Is Peace

End here means final outcome or destiny, not just the moment of death.

This looks past a single hard season toward how the whole story finishes.

A difficult life along the way does not cancel a peaceful ending.

The psalm keeps insisting on looking at the final outcome, not the middle.

🕊️ End means final outcome, not just death
⚖️ Struggle does not cancel a peaceful end
🔭 The psalm keeps focusing on the outcome
📖 The finish matters more than the middle

## 💥 The Transgressors Shall Be Destroyed Together

Transgressors means those who deliberately cross a moral boundary.

Together suggests a shared, collective downfall, not isolated individual cases.

This verse mirrors the peaceful end described for the righteous just before it.

The contrast between the two endings could not be more direct.

💥 Transgressors means those crossing a boundary
👥 Together suggests a shared downfall
🔄 This mirrors the righteous ending before it
📖 The contrast is direct and deliberate

## ✂️ The End Of The Wicked Shall Be Cut Off

This is the psalm's final use of the phrase cut off.

Every earlier warning about the wicked's fate arrives at this same word.

Cutting off pictures a complete and final separation.

The pattern named across the whole chapter reaches its conclusion here.

✂️ The final use of cut off here
🔁 Earlier warnings arrive at this same word
🌿 It pictures complete, final separation
📖 The chapter's pattern reaches its conclusion

## 🛟 The Salvation Of The Righteous Is Of The Lord

This verse corrects a misreading that could build up across this whole psalm.

The chapter has listed many good habits like trusting, waiting, and giving.

None of those habits earn salvation on their own merit.

Salvation is something God gives, not something a person achieves by good behavior.

🛟 This corrects a possible misreading
📋 The chapter lists many good habits
🚫 None of those habits earn salvation
📖 Salvation is given, not achieved

## 🤲 He Shall Deliver Them From The Wicked, And Save Them

Deliver here means rescued out of active danger, not just comforted.

This is a specific, real rescue, not a vague spiritual feeling.

The wicked named throughout this whole psalm are the actual threat in view.

God's help meets a real problem with a real solution.

🤲 Deliver means rescued from real danger
🎯 The threat here is specific, not vague
🆘 This is real rescue, not just comfort
📖 God's help meets a real problem

## 🤝 Because They Trust In Him

This single word trust reaches back to the very first command in verse three.

The whole psalm has circled around this one theme from beginning to end.

Every promise, warning, and comparison in this chapter serves this one point.

Trusting God, not managing life alone, is the real subject of Psalm 37.

🤝 Trust echoes the very first command
🔄 The whole psalm circles this theme
🎯 Every promise serves this one point
📖 Trusting God is the psalm's real subject
`.trim();

export const PSALMS_THIRTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsThirtySevenRawNotes(PSALMS_THIRTY_SEVEN_RAW_NOTES);
