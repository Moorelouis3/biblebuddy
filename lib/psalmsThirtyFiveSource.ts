export type PsalmsThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyFiveRawNotes(rawText: string): PsalmsThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 35:${startVerse}` : `Psalms 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 35 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_FIVE_RAW_NOTES = `# Psalms 35:1-4
# ⚖️ Plead My Cause, O LORD
---
## ⚖️ Plead My Cause, O LORD

"Plead" here means formally presenting a case before a judge.

This is courtroom language, not just an emotional cry.

David pictures God as both his defender and the judge over this fight.

The whole psalm reads like a legal appeal from start to finish.

He is asking God to argue his side of the case.

⚖️ Plead means a formal legal case
👨‍⚖️ God pictured as both judge and defender
📜 The psalm reads like a courtroom appeal
📖 David asks God to argue for him

## 🗡️ With Them That Strive With Me

The word they refers to real enemies actively working against David.

This is not a vague complaint about bad luck or hard circumstances.

David names specific people who are striving and fighting against him on purpose.

Nothing in this psalm points to one exact event in his life.

The prayer fits any season when real people cause real harm.

🗡️ They means real active enemies
🚫 Not a complaint about bad luck
🎯 Named as deliberate, ongoing opposition
📖 The prayer fits any real conflict

## 🛡️ Take Hold Of Shield And Buckler

A "buckler" is a small round shield, different from a full body shield.

Soldiers carried one on the arm for close combat protection.

David pictures God arming Himself the way a soldier would before a fight.

This is bold language, asking God to physically defend him like a warrior.

🛡️ Buckler means a small hand shield
🪖 Used for close combat protection
⚔️ Pictures God as an armed defender
📖 Bold language for real protection

## 🏹 Draw Out Also The Spear

God is pictured drawing an offensive weapon, not just defending with a shield.

This moves the prayer from passive protection into direct action.

David wants his enemies stopped, not merely held off.

The image is God stepping completely into the fight on David's behalf.

🏹 Spear means active, offensive help
🛡️ Not only defense, but attack
⚔️ David wants full victory, not delay
📖 God fights fully on David's side

## 🚧 Stop The Way Against Them That Persecute Me

"Stop the way" pictures blocking an enemy's path, not just slowing them down.

This is military language for cutting off an escape or advance route.

David wants his pursuers completely stopped, not merely delayed.

The image comes from ancient siege and ambush tactics.

🚧 Stop the way means blocking a path
🪖 Military language for cutting off a route
⏳ Not delay, but a full stop
📖 David wants pursuit ended completely

## 🗣️ Say Unto My Soul, I Am Thy Salvation

David asks God to speak directly and personally to his inner self.

This is not a general truth about God but a specific word David needs to hear.

"My soul" here simply means his whole inner being, not a separate spiritual part.

He wants reassurance in his own private fear, not just public rescue.

🗣️ Asks God to speak personally
💭 Soul means his whole inner self
🙏 A specific word, not a general truth
📖 Personal reassurance, not just rescue

## 😳 Let Them Be Confounded And Put To Shame

"Confounded" means thrown into confusion and defeat, not simply embarrassed.

David is asking for his enemies' plans to completely fail.

This kind of prayer is called imprecatory, asking God for judgment on wrongdoers.

It appears often in the Psalms during real danger.

😳 Confounded means thrown into confused defeat
🎯 A prayer for enemies' plans to fail
⚖️ This type of prayer is called imprecatory
📖 Common in the Psalms during real danger

## 🕵️ That Devise My Hurt

"Devise" means to plan or scheme something on purpose.

This is not an accidental conflict or a misunderstanding.

David describes people intentionally working out how to harm him.

The prayer responds to calculated cruelty, not random bad luck.

🕵️ Devise means to plan on purpose
🚫 Not an accident or misunderstanding
🎯 Describes calculated, intentional harm
📖 David responds to real cruelty

# Psalms 35:5-8
# 💨 Let Them Be As Chaff Before The Wind
---
## 💨 Let Them Be As Chaff Before The Wind

"Chaff" is the worthless husk left over after grain is separated from wheat.

Ancient farmers tossed grain into the air so wind would carry away the chaff.

The heavy grain fell back down to the ground.

The light chaff scattered off and disappeared.

David asks for his enemies to be that weightless, disposable husk.

💨 Chaff means the worthless leftover husk
🌾 Wind carried it away from real grain
⚖️ Grain stayed while chaff disappeared
📖 David asks enemies to scatter like chaff

## 👼 Let The Angel Of The LORD Chase Them

This angel is the same kind of figure who protects the righteous elsewhere in the Psalms.

Here the same messenger turns from protector into pursuer.

Which side the angel is on depends on which side a person stands on.

Protection and pursuit come from the very same source.

👼 Same angel who protects elsewhere
🔄 Here the angel pursues instead
⚖️ Side depends on right or wrong
📖 Protection and pursuit share one source

## 🌑 Let Their Way Be Dark And Slippery

This pictures walking a path with no light and no secure footing.

A traveler in this situation cannot see danger coming or stay balanced.

David wants his enemies' plans to end in exactly this kind of disaster.

The image works because it is a fear anyone would understand.

🌑 Dark and slippery means no safe footing
👣 A traveler could not see or balance
⚠️ David wants their plans to fail this way
📖 A universal, easily felt kind of fear

## 🕳️ Without Cause Have They Hid For Me Their Net In A Pit

The phrase "without cause" appears twice in these two verses on purpose.

David insists he did nothing to deserve this hidden attack.

A net hidden in a pit was a real hunting method for catching animals.

Here it pictures a secret trap set for a person instead.

🕳️ Without cause is repeated on purpose
🚫 David did nothing to deserve this
🪤 Net and pit was a real hunting method
📖 The trap here targets a person

## 🎯 Which Without Cause They Have Digged For My Soul

"Digged for my soul" means the trap targeted David's very life.

This was not a minor scheme or a small inconvenience.

The hidden pit represents a plan meant to destroy him completely.

Ancient hunters used exactly this method to catch large, dangerous animals.

🎯 Digged for my soul means life threatening
🚫 Not a minor scheme or inconvenience
🦌 A method used to catch large animals
📖 The plan aimed to destroy him fully

## 💥 Let Destruction Come Upon Him At Unawares

"Unawares" means without warning, catching someone completely off guard.

David asks that the sudden disaster planned for him fall on the enemy instead.

The prayer turns the enemy's own strategy back onto its source.

Surprise was meant to be a weapon, not a shield.

💥 Unawares means without any warning
🔄 The trap turns back on its planner
🗡️ Their weapon was meant to be surprise
📖 That same weapon now works against them

## 🪤 Let His Net That He Hath Hid Catch Himself

This line describes true poetic justice, the trap catching its own maker.

Whoever set the hidden net becomes its first victim instead of David.

The picture is almost comic, a hunter falling into his own hole.

Scripture often shows evil eventually turning back on the person who planned it.

🪤 Poetic justice, the trap catches its maker
🔄 The hunter becomes the victim instead
😅 An almost comic reversal
📖 Evil often turns back on its source

## ⬇️ Into That Very Destruction Let Him Fall

The word "very" points back to the exact same destruction planned for David.

Nothing new happens here, only a complete reversal of fate.

What was aimed at one person lands on the other instead.

This closes the section on a note of full, ironic justice.

⬇️ Very points to the same destruction planned
🔄 A complete reversal of fate
🎯 What was aimed elsewhere lands here
📖 The section closes on ironic justice

# Psalms 35:9-12
# 🎉 My Soul Shall Be Joyful In The LORD
---
## 🎉 My Soul Shall Be Joyful In The LORD

The tone shifts here from asking for judgment to anticipating joy.

David moves from describing the trouble to trusting how it will end.

This shift happens often in the Psalms, lament turning toward praise.

Confidence in God's rescue comes before the rescue actually arrives.

🎉 Tone shifts from judgment to joy
🔄 Moves from trouble to trust
📜 A common turn in the Psalms
📖 Confidence comes before the rescue arrives

## 🦴 All My Bones Shall Say

"All my bones" is a Hebrew way of saying his whole body and being.

This is not about literal bones speaking out loud.

It pictures praise that comes from every part of a person at once.

Nothing half hearted is being offered here.

🦴 Bones means his whole being
🚫 Not literal bones speaking
💯 Total, whole hearted praise
📖 Nothing half hearted is offered

## ❓ LORD, Who Is Like Unto Thee

This question expects no real answer because the answer is obviously no one.

It is a common way the Psalms express God's total uniqueness.

Asking the question is itself a form of worship.

David is not confused, he is amazed.

❓ A question with an obvious answer
📜 A common way Psalms express uniqueness
🙌 Asking it is itself worship
📖 Amazement, not confusion

## 🤲 Deliverest The Poor From Him That Is Too Strong For Him

"The poor" here means people without power to protect themselves.

David describes God as the defender of the weak against the powerful.

Strength often decided outcomes in the ancient world.

God's justice works against that natural order.

🤲 Poor means people without power
🛡️ God defends the weak against the strong
⚖️ Strength usually decided outcomes back then
📖 God's justice works against that pattern

## 🗣️ False Witnesses Did Rise Up

Bearing false witness was serious enough to be named in the Ten Commandments.

A false accusation in this culture could cost someone their freedom or even their life.

This was not a small lie but a legal weapon.

David faced exactly this kind of attack.

🗣️ False witness broke one of the Ten Commandments
⚖️ It could cost freedom or life
🗡️ A legal weapon, not a small lie
📖 David faced this exact attack

## 🤷 They Laid To My Charge Things That I Knew Not

David is accused of things he was not even aware of.

This makes the accusation impossible for him to have planned around.

Being blamed for something unknown to you is a particular kind of injustice.

It leaves no fair way to defend yourself in advance.

🤷 Accused of things he did not know
🚫 Could not have prepared a defense
⚖️ A particular kind of injustice
📖 No fair way to defend against it beforehand

## 💔 They Rewarded Me Evil For Good

This is worse than simple ingratitude.

David had shown kindness first, and it was answered with harm.

The pattern of good met with evil appears throughout the rest of this psalm.

Betrayal after kindness cuts deeper than betrayal from a stranger.

💔 Worse than plain ingratitude
🙏 Kindness answered with harm
🔁 A pattern repeated later in the psalm
📖 Betrayal after kindness cuts deepest

## 😢 To The Spoiling Of My Soul

"Spoiling" pictures something valuable being ruined or stripped away.

This is emotional devastation, not only legal or physical harm.

The betrayal reached all the way into David's inner life.

Injustice rarely stays contained to just the outward situation.

😢 Spoiling means ruined or stripped away
💭 Emotional damage, not only physical
🎯 The betrayal reached his inner life
📖 Injustice rarely stays only outward

# Psalms 35:13-16
# 😢 I Humbled My Soul With Fasting
---
## 🧵 When They Were Sick, My Clothing Was Sackcloth

"Sackcloth" was a rough, uncomfortable fabric worn only during deep mourning.

David wore it, not for himself, but for enemies who later betrayed him.

This detail shows real, costly compassion toward people who did not deserve it.

His kindness toward them was not an act, it was genuine grief.

🧵 Sackcloth was rough mourning clothing
🎭 Worn for enemies, not himself
🤲 Costly compassion for the undeserving
📖 His grief for them was genuine

## 🍽️ I Humbled My Soul With Fasting

Fasting means going without food on purpose for a spiritual reason.

It was a physical way of expressing serious grief or dependence on God.

David chose this discomfort on purpose.

He did not simply feel sad in private.

This was an active, visible act, not a passive emotion.

🍽️ Fasting means going without food on purpose
🙏 A physical expression of grief
💪 Active choice, not passive sadness
📖 Visible devotion, not private feeling only

## 🙏 My Prayer Returned Into Mine Own Bosom

This old idiom pictures a prayer settling back onto the one who prayed it.

It suggests David kept praying for these people even without any thanks in return.

The blessing meant for them seemed to come back and rest on him instead.

Sincere prayer is never wasted, even when it looks unanswered.

🙏 Pictures a prayer settling back on its owner
🔁 He kept praying without any thanks
💗 The blessing seemed to return to him
📖 Sincere prayer is never truly wasted

## 🤝 As Though He Had Been My Friend Or Brother

David treated these people with the same care he would show close family.

This makes their later cruelty even harder to accept.

The deeper the kindness given, the deeper the betrayal felt.

He is showing exactly how undeserved their treatment of him was.

🤝 Treated them like close family
💔 Makes the betrayal harder to accept
📈 Deeper kindness, deeper betrayal
📖 Shows how undeserved their cruelty was

## 😭 As One That Mourneth For His Mother

In this culture, mourning for a mother represented the deepest possible grief.

David compares his mourning for near strangers to this most intense sorrow.

This is not exaggeration for effect, it is a real cultural benchmark for grief.

He held nothing back in caring for people who would later turn on him.

😭 Mourning a mother meant the deepest grief
📏 A real cultural benchmark, not exaggeration
🎭 Compared his grief for others to this
📖 He held nothing back in caring for them

## 🎊 In Mine Adversity They Rejoiced

The people David mourned for now celebrate his suffering instead.

This is the exact opposite of what he had shown them.

Reciprocity completely breaks down at this point in the psalm.

Kindness given was met with open enjoyment of his pain.

🎊 They celebrated his suffering instead
🔄 The exact opposite of his kindness
💔 Reciprocity completely breaks down here
📖 His pain became their entertainment

## 👥 The Abjects Gathered Themselves Together

"Abjects" describes people considered lowest and most contemptible in society.

This is not a compliment but a harsh insult toward this crowd.

Even people with little standing of their own turned against David.

The opposition against him came from every level of society.

👥 Abjects means the most despised people
🚫 A harsh insult, not a compliment
📉 Even low standing people turned on him
📖 Opposition came from every level of society

## 😬 They Gnashed Upon Me With Their Teeth

"Gnashing teeth" is an idiom for intense rage and hostility, not literal chewing.

The hypocritical mockers David describes wore friendly faces at feasts.

Underneath, they hated him privately.

Public smiles hid real, aggressive hatred.

This kind of two faced cruelty is often harder to bear than open conflict.

😬 Gnashing teeth means intense rage
🎭 Friendly in public, hostile in private
🚫 Not literal chewing, an idiom for fury
📖 Hidden cruelty can hurt more than open conflict

# Psalms 35:17-21
# ⏳ Lord, How Long Wilt Thou Look On
---
## ⏳ Lord, How Long Wilt Thou Look On

This is not doubt about whether God will act.

It is an honest, urgent question about when He will act.

This exact kind of question appears often throughout the Psalms during real suffering.

Waiting on God does not require pretending the wait is easy.

⏳ Not doubt, an urgent question
📜 A common Psalms pattern in suffering
⏱️ Asks about timing, not whether
📖 Waiting does not require pretending it is easy

## 🦁 My Darling From The Lions

"My darling" is an old way of describing something precious, here meaning David's own life.

It does not refer to a separate person he loves.

Lions were the most feared and deadly predator in that region.

David compares his enemies to the worst threat he can picture.

🦁 Lions represent the most feared danger
💎 Darling means his own precious life
🚫 Not a separate person he loves
📖 David names the worst threat he can picture

## 🙌 I Will Give Thee Thanks In The Great Congregation

David promises public praise once he is delivered, not just private relief.

The "great congregation" describes the whole worshiping community gathered together.

His gratitude was meant to be seen and shared, not kept to himself.

Rescue that stays private loses part of its purpose.

🙌 Promises public praise, not just private relief
👥 Great congregation means the whole community
👀 Gratitude meant to be seen and shared
📖 Private rescue loses part of its purpose

## 😉 Wink With The Eye That Hate Me Without A Cause

A mocking wink here signals secret plotting, not friendliness.

This same gesture appears elsewhere in Scripture describing dishonest scheming.

It shows hatred hidden just under a casual, harmless looking expression.

Small gestures can carry large, hostile meaning.

😉 A wink here means secret plotting
📜 Appears elsewhere in Scripture for scheming
🎭 Hatred hidden behind a casual look
📖 Small gestures can carry hostile meaning

## 🕊️ They Speak Not Peace

This describes people who appear calm and friendly on the surface.

Underneath that surface, they are actively planning harm.

The gap between how they speak and what they intend is the real danger.

Peaceful words without peaceful intentions are their own kind of trap.

🕊️ Appear calm on the surface
🕵️ Actually planning harm underneath
⚠️ The gap between words and intent is dangerous
📖 Peaceful words can hide real traps

## 🏘️ Against Them That Are Quiet In The Land

"Them that are quiet" describes peaceful, harmless people, likely David and those loyal to him.

This phrase draws a clear contrast with the aggressive plotting just described.

Innocent, settled people become targets without provoking anything.

The victims here did nothing to invite this hostility.

🏘️ Quiet means peaceful, harmless people
⚖️ Contrasts sharply with the plotters
🚫 The victims provoked nothing
📖 Innocent people became targets anyway

## 😮 They Opened Their Mouth Wide Against Me

This idiom pictures aggressive, exaggerated mockery, like a predator baring its jaws.

It describes loud, public gloating rather than a quiet scheme.

The attack has now moved from secret plots into open humiliation.

David faces both hidden and visible forms of the same hostility.

😮 Pictures aggressive, exaggerated mockery
🦁 Like a predator baring its jaws
📢 Public gloating, not a quiet scheme
📖 Hidden plots become open humiliation

## 😏 Aha, Aha, Our Eye Hath Seen It

"Aha" is a mocking exclamation of triumph over someone's downfall.

Repeating it twice makes the gloating even more pointed and cruel.

"Our eye hath seen it" claims to have witnessed David's disgrace firsthand.

This taunt assumes his defeat is already certain.

😏 Aha is a mocking shout of triumph
🔁 Repeated twice for extra cruelty
👁️ Claims to have witnessed his downfall
📖 The taunt assumes defeat is already certain

# Psalms 35:22-24
# 🙏 Stir Up Thyself, And Awake To My Judgment
---
## 👀 This Thou Hast Seen, O LORD

David appeals to God as a firsthand witness to everything happening to him.

He is not explaining new information God does not already know.

The appeal rests on God's awareness, not on convincing Him of the facts.

Prayer here is a request for action based on what God already sees.

👀 God is called as a firsthand witness
🚫 Not new information God lacks
🙏 A request for action, not explanation
📖 Prayer built on what God already sees

## 🤐 Keep Not Silence

"Silence" here pictures inaction, not literally staying quiet.

David is not asking God to speak more, he is asking God to act.

Silence in Scripture often means withholding a response, not just not talking.

This turns the prayer from words into a plea for movement.

🤐 Silence here means inaction
🙏 A plea to act, not merely speak
📜 Scripture often uses silence this way
📖 The prayer asks for movement, not words

## 📍 O Lord, Be Not Far From Me

Nearness to God is repeatedly tied to comfort throughout the Psalms.

David is not questioning God's location in a physical sense.

He is asking for felt closeness during a frightening, uncertain time.

Distance here describes an emotional experience, not literal space.

📍 Nearness ties to comfort throughout Psalms
🚫 Not about physical location
💭 Asks for felt closeness in fear
📖 Distance here is emotional, not literal

## ⏰ Stir Up Thyself, And Awake To My Judgment

This language pictures God rousing Himself into action.

God never actually sleeps.

It is intentional, urgent poetry, not a literal claim about God.

David uses the boldest language he can to express his need.

Scripture allows this kind of vivid, human sounding prayer.

⏰ Pictures God rousing into action
🚫 God never literally sleeps
🗣️ Urgent poetry, not a literal claim
📖 Scripture allows vivid, human sounding prayer

## ⚖️ Even Unto My Cause, My God And My Lord

"My cause" returns to the courtroom image from the very first verse.

The psalm closes this loop by naming the same legal language again.

David wants his specific case judged, not a general rule applied.

The structure ties the whole psalm back to where it began.

⚖️ Cause returns to the opening courtroom image
🔁 Closes a loop from verse one
🎯 Wants his specific case judged
📖 The structure ties the psalm together

## 👨‍⚖️ Judge Me, O LORD My God, According To Thy Righteousness

David is not asking for a soft outcome or an easy pass.

He wants a true, righteous verdict, confident that a fair judgment favors him.

This is a request for justice, not for mercy over guilt.

Confidence in innocence shapes the whole tone of this request.

👨‍⚖️ Not asking for a soft outcome
⚖️ Wants a true, fair verdict
🚫 A request for justice, not mercy
📖 Confidence in innocence shapes the request

# Psalms 35:25-28
# 📣 Let The LORD Be Magnified
---
## 🤫 Let Them Not Say In Their Hearts, Ah, So Would We Have It

"In their hearts" points to private, secret satisfaction, not something spoken aloud.

David wants to prevent even the silent celebration of his downfall.

Their inward gloating would feel like just as real a victory to them.

This prayer reaches past words into hidden thoughts.

🤫 In their hearts means private thoughts
🎉 Wants to stop even silent gloating
💭 Inward victory would feel just as real
📖 The prayer reaches past spoken words

## 🐋 We Have Swallowed Him Up

"Swallowed up" pictures being completely consumed, leaving nothing behind.

The image borrows from predator and prey, one side finishing off the other.

David is describing total destruction, not a partial defeat.

This is the outcome he is praying will never actually happen.

🐋 Swallowed up means completely consumed
🦁 A predator and prey image
💯 Pictures total destruction, not partial defeat
📖 The outcome David prays against

## 😳 Let Them Be Ashamed And Brought To Confusion

This request echoes the same wording David used back in verse four.

The prayer that opened the psalm now closes it as well.

David wants the same reversal for his enemies that he feared for himself.

Structure like this makes the psalm feel complete, not left hanging.

😳 Echoes David's own words from verse four
🔁 The opening prayer returns at the close
🔄 He wants the same reversal for them
📖 This structure makes the psalm feel complete

## 🧥 Clothed With Shame And Dishonour

Shame is pictured here as an actual garment covering a person.

This contrasts with normal clothing that a person chooses and controls.

Instead, shame is something forced onto someone against their will.

The image turns an abstract feeling into something visible and permanent.

🧥 Shame pictured as a covering garment
🚫 Unlike clothing, forced on unwillingly
👀 Makes a feeling visible and permanent
📖 An abstract idea turned into a picture

## 🎊 Let Them Shout For Joy, And Be Glad, That Favour My Righteous Cause

This verse contrasts sharply with the enemies' private gloating back in verse twenty five.

Here the joy is public, loud, and shared among people who support what is right.

"My righteous cause" again ties back to the courtroom language from the opening.

The psalm sets two very different kinds of celebration side by side.

🎊 Contrasts with the enemies' private gloating
📢 This joy is public and shared
⚖️ Righteous cause echoes the opening courtroom image
📖 Two different celebrations placed side by side

## 🔍 Let The LORD Be Magnified

"Magnify" does not mean making God literally bigger, since He cannot grow.

It means making His greatness more visible and obvious to others.

David wants people's praise to make God easier for others to see clearly.

The size of God never changes, only how clearly people notice it.

🔍 Magnify means visible, not literally bigger
🚫 God's greatness cannot actually grow
👀 Praise makes Him easier to see
📖 What changes is people's view, not God

## 😊 Which Hath Pleasure In The Prosperity Of His Servant

God is described here as genuinely delighting in blessing His people.

This is not a reluctant tolerance but real, active pleasure.

"Prosperity" here means a servant's overall wellbeing, not only wealth.

God's care for His people is something He enjoys, not merely permits.

😊 God genuinely delights in blessing His people
🚫 Not reluctant tolerance, real pleasure
💰 Prosperity means wellbeing, not only wealth
📖 God enjoys caring for His people

## 🗣️ My Tongue Shall Speak Of Thy Righteousness And Of Thy Praise All The Day Long

The psalm began with a plea for a legal defense in a moment of danger.

It ends with a promise of continual, everyday praise.

"All the day long" means an ongoing habit, not one burst of gratitude.

The whole chapter moves from courtroom danger to constant worship.

🗣️ Began with a legal plea in danger
🔁 Ends with continual, everyday praise
📅 Means an ongoing daily habit
📖 The chapter moves from danger to constant worship
`.trim();

export const PSALMS_THIRTY_FIVE_PERSONAL_SECTIONS = parsePsalmsThirtyFiveRawNotes(PSALMS_THIRTY_FIVE_RAW_NOTES);
