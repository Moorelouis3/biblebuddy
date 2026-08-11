export type SecondSamuelFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelFourteenRawNotes(rawText: string): SecondSamuelFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 14:${startVerse}` : `2 Samuel 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Samuel 14 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_FOURTEEN_RAW_NOTES = `# SecondSamuel 14:1-3
# 🕊️ Joab's Secret Plan
---
## The King's Heart Was Toward Absalom

Toward Absalom here means David's anger is fading.

His old affection for his son is quietly returning.

Three years have passed since Absalom fled to Geshur.

David already stopped grieving for Amnon back in chapter thirteen.

That left him missing a living son he still refused to call home.

Joab is the first person to notice this shift in David.

🕰️ Three years have passed since Absalom fled
💔 David's grief for Amnon has faded
👀 Joab notices what David has not
📖 Joab decides to act on his silence

## Fetched Thence A Wise Woman

A wise woman was known for skill in speech and persuasion.

Tekoah was a small town in Judah.

It sat about ten miles south of Jerusalem.

The prophet Amos would later come from this same town.

Joab does not choose a soldier for this task.

He chooses someone trained to argue a case well.

🗣️ Wise women were skilled at persuasion
🏘️ Tekoah sat near Jerusalem in Judah
🎯 Joab needed someone who could argue well
📖 Her skill, not her rank, mattered here

## Feign Thyself To Be A Mourner

Feign means to pretend, to put on an act.

Joab tells her to dress like a woman in real grief.

Mourning apparel meant rough, plain clothing instead of normal dress.

Skipping oil mattered too, since oil was part of daily grooming.

Going without it for a long stretch showed ongoing sorrow.

Every detail of her disguise is built to look convincing.

🎭 Feign means to pretend
🖤 Mourning apparel was rough, plain clothing
🚫 Skipping oil signaled ongoing grief
📖 Every detail was built to look real

## Joab Put The Words In Her Mouth

This woman does not speak her own opinion to the king.

Every line she says comes from Joab.

He planned her whole speech out in advance.

She is an actor performing a script.

That detail matters once the king works out where the words came from.

Joab stays hidden behind her voice as long as the plan holds.

🎬 The woman is acting a script
✍️ Joab wrote every word in advance
🫥 Joab stays hidden behind her voice
📖 The plan depends on David not knowing

# SecondSamuel 14:4-7
# ⚖️ The Widow's Case
---
## Fell On Her Face To The Ground, And Did Obeisance

Obeisance means a deep bow showing full submission.

Falling to the ground added an even stronger layer of respect.

This was the normal way to approach a ruling king.

Her posture spoke before she said a single word.

It also fit her disguise, since a true widow would bow the same way.

🙇 Obeisance means a deep, submissive bow
👑 This was normal protocol before a king
🗣️ Her posture spoke before her words
📖 It matched her disguise as a widow

## Mine Husband Is Dead

A widow in this culture had no husband to argue her case.

That made her far more vulnerable than a married woman.

It also gave her a clear reason to appeal straight to the king.

Every part of her invented story is built to earn quick sympathy.

The king has no reason yet to doubt any of it.

👰 Widows had no husband to represent them
⚠️ That made her seem vulnerable
🎯 It justified her direct appeal to David
📖 David has no reason yet to doubt her

## They Two Strove Together In The Field

Strove means they argued or fought.

The field setting means no one was close enough to stop them.

One son struck the other and killed him in that fight.

The story never claims this violence was planned.

It sounds like a fight that went further than either son intended.

This detail matters later when her story is compared to David's own sons.

⚔️ Strove means they argued or fought
🌾 No witnesses were present in the field
💥 The killing was not planned
📖 This mirrors what happened to David's sons

## The Whole Family Is Risen Against Thine Handmaid

In this culture, a victim's family could act as his avenger.

This role was called the avenger of blood.

The law allowed it for a deliberate killing, not an accident.

Her family is treating an accident as if it were murder.

That turns her legal case into her family's own anger.

⚖️ Families could act as the avenger of blood
🩸 That law was meant for deliberate killing
😠 Her family treats an accident as murder
📖 Anger, not justice, drives their demand

## Quench My Coal Which Is Left

A coal here pictures the last glowing ember of a fire.

Quenching it means putting it out completely.

Her surviving son is that last ember.

He is the only hope left to carry her husband's name.

In this culture, losing a family's name was seen as a kind of second death.

This threat reaches past her son's life into her family's whole future.

🔥 A coal is the last glowing ember
🕯️ Quenching it means ending it completely
👦 Her last son is that final ember
📖 Losing him would erase her family's future

# SecondSamuel 14:8-11
# 🤴 The King's Promise
---
## I Will Give Charge Concerning Thee

This is not yet a ruling in her favor.

It is a vague, early answer, nothing more.

Charge here means an order, with no details attached yet.

She needs something far stronger before her plan can work.

That is exactly why she keeps pressing him further.

🤷 This is a vague answer, not a ruling
📋 Charge means an order with no details
🎯 She needs something stronger than this
📖 That pushes her to press further

## The Iniquity Be On Me, And On My Father's House

Iniquity here means the guilt for a wrong decision.

She offers to carry any blame herself if the ruling goes wrong.

The king and his throne be guiltless means David's name stays protected.

A wrong public ruling was a real risk for any king.

Her offer removes that risk for him.

⚖️ Iniquity means guilt or blame
🛡️ She offers to carry any blame herself
👑 This protects David's reputation as king
📖 It makes a quick answer easier for him

## He Shall Not Touch Thee Any More

This is David's first real promise of protection.

He tells her that anyone who threatens her answers to him.

It is still limited, since it only covers her being touched.

It says nothing yet about her son's actual fate.

She still needs a promise that reaches further than this.

🛡️ David promises to protect her personally
👊 It only covers her being touched
❓ Her son's safety is still not addressed
📖 She still needs a stronger promise

## Let The King Remember The LORD Thy God

To remember the LORD here means to act in a way that honors him.

She is not asking David to recall a fact.

She is asking him to make a choice that reflects who God is.

Revengers of blood were relatives allowed to execute a killer under the law.

She wants David to personally stop that law from taking her last son.

🙏 Remember here means to act rightly
⚖️ Revengers of blood could execute a killer
🛑 She asks David to stop that law
📖 She wants his decision to reflect God

## There Shall Not One Hair Of Thy Son Fall To The Earth

As the LORD liveth was a formal oath, the strongest a king could give.

This oath goes further than anything David has said so far.

Not one hair falling means total, complete protection.

That exact detail about hair returns later in Absalom's own story.

David has now bound himself with the strongest words available to him.

🤝 As the LORD liveth was a formal oath
💯 This promises total, complete protection
💇 The hair detail returns later in the story
📖 David has bound himself completely

# SecondSamuel 14:12-17
# 🎯 The Trap Springs
---
## Let Thine Handmaid Speak One Word Unto My Lord The King

Up to now, the woman has only told a story.

Now she asks permission to say something more direct.

David has no idea he is about to be confronted, not just consulted.

His simple answer, Say on, opens the door to his own conviction.

The whole parable was really leading toward this one moment.

🚪 She asks to speak more directly now
😮 David does not expect a confrontation
🗣️ His answer opens the door for her
📖 The parable was leading to this moment

## The King Doth Not Fetch Home Again His Banished

The woman turns the story around and points it at David.

By protecting her fictional son, David has just ruled against himself.

Banished here means Absalom, still alive but kept away in Geshur.

The word thought suggests this has been a choice, not simple neglect.

She is accusing him of choosing distance from his own living son.

🎯 The story now points straight at David
👑 Protecting her son convicts his own choice
🏞️ Banished refers to Absalom in Geshur
📖 She accuses him of choosing distance

## We Must Needs Die, And Are As Water Spilt On The Ground

This is a proverb about how final death really is.

Spilt water cannot be gathered back up off the ground.

She uses this image to say death itself cannot be undone.

Her point is that David cannot fix Amnon's death now.

But Absalom's exile is not death, and that part can still change.

💧 Spilt water cannot be gathered again
⚰️ This pictures how final death is
🚫 Amnon's death cannot be undone
📖 Absalom's exile still can be

## Yet Doth He Devise Means, That His Banished Be Not Expelled From Him

The word he here refers to God, named just before in the verse.

Expelled means permanently cut off, never allowed to return.

The woman claims God himself works to bring the banished back.

She uses this to argue that David should imitate God's own mercy.

This is her argument inside a persuasive speech, not a command from God.

It still lands hard, since David claims to serve this same God.

🕊️ He refers to God, named just before
🚫 Expelled means permanently cut off
🎭 This is her argument, not a command
📖 It challenges David to imitate God

## The People Have Made Me Afraid

This line is part of her cover story.

It is the reason she gives for coming forward at all.

She frames her whole visit as pressure from fearful relatives.

That keeps her disguise consistent from beginning to end.

Nothing here hints that Joab designed all of it.

🎭 This line protects her cover story
👨‍👩‍👧 She blames pressure from relatives
🤐 It hides Joab's role completely
📖 Her performance holds together to the end

## Destroy Me And My Son Together Out Of The Inheritance Of God

Inheritance of God here means Israel's land, given to each family to keep forever.

Losing her son also meant losing any legal claim to that land.

This was not just a threat to her family's safety.

It was a threat to their permanent place among God's people.

That larger stake is part of why she speaks in such serious terms.

🗺️ Inheritance of God meant Israel's given land
📜 Losing her son meant losing that claim
🏡 This threatened her family's permanent place
📖 The stakes go beyond her son's safety

## As An Angel Of God, So Is My Lord The King To Discern Good And Bad

Angel here means messenger, someone believed to carry unusual insight.

This is high praise, comparing David's judgment to something almost beyond human.

She uses it here to soften the sharp accusation she just made.

The same phrase returns again later in this chapter, from David himself.

Flattery and confrontation sit side by side in her closing words.

👼 Angel here means a wise messenger
🗣️ This phrase praises David's judgment
🎭 It softens her earlier accusation
📖 The same phrase returns later in the chapter

# SecondSamuel 14:18-20
# 🔍 David Sees Through It
---
## Hide Not From Me

David senses there is more happening here than a simple case.

He asks her directly not to hold anything back.

This marks the moment the performance starts to break down.

She cannot refuse a direct question from the king without exposing herself.

Her only real option left is to tell the truth.

🤔 David senses something more is happening
❓ He asks her not to hide anything
🎭 The performance begins to break down
📖 Her only option now is honesty

## Is Not The Hand Of Joab With Thee In All This

David names Joab by name, guessing correctly on his first try.

Hand of Joab is an idiom for his hidden involvement.

David knows Joab well enough to spot his style of scheming.

This is the same Joab who already shaped major decisions in David's reign.

Nothing about this trick truly surprises the king once he stops to think.

🖐️ Hand of Joab means his hidden involvement
🎯 David guesses correctly on his first try
🧠 He knows Joab's style of scheming well
📖 The trick does not truly surprise him

## He Put All These Words In The Mouth Of Thine Handmaid

The woman admits everything the moment David asks directly.

She confirms that every line she spoke came from Joab first.

This matches exactly what the narrator already told the reader back in verse three.

The reader already knew the truth the whole time David did not.

That gap between reader and king is what makes the scene work.

✅ She admits the truth immediately
🗣️ Every word came from Joab first
👀 The reader already knew this in verse three
📖 That gap is what makes the scene work

## To Fetch About This Form Of Speech

To fetch about means to bring a point around in an indirect way.

Joab could have asked David plainly.

Instead he built an entire disguised story to reach the same goal.

The woman credits David's wisdom for seeing through a plan built this carefully.

Angel of God repeats here, the same praise she used earlier.

This closing compliment restores David's dignity right after his trick is exposed.

🔄 Fetch about means an indirect approach
🏗️ Joab built a disguised story on purpose
👼 Angel of God repeats her earlier praise
📖 The compliment softens the exposed trick

# SecondSamuel 14:21-24
# 🚪 Absalom Comes Home, Half Way
---
## Bring The Young Man Absalom Again

David finally gives the order the whole scene was built to produce.

He speaks to Joab directly, showing he knows who was really behind it.

There is no anger in his words here, only a decision.

Three years of exile are about to end, at least partly.

The next verses will show this decision still has real limits attached.

📢 David finally gives the order
🎯 He speaks straight to Joab
⏳ Three years of exile are ending
📖 Real limits are still coming

## Today Thy Servant Knoweth That I Have Found Grace In Thy Sight

Grace here means favor, being viewed with approval instead of suspicion.

Joab bows to the ground in a formal show of gratitude.

This is a rare moment of genuine relief for Joab in this story.

His plan could easily have backfired and angered David instead.

Instead it worked exactly as he designed it to.

🙇 Joab bows in formal gratitude
😌 This is a moment of real relief
🎲 His plan could have easily backfired
📖 It worked exactly as designed

## Joab Arose, And Went To Geshur

Geshur was the foreign kingdom where Absalom had been living.

His grandfather Talmai ruled there.

Joab personally makes the journey rather than sending a messenger.

That choice shows how seriously he takes finishing what he started.

Bringing Absalom home himself also lets Joab control how the return happens.

🗺️ Geshur was Absalom's foreign refuge
🚶 Joab travels there in person
🎯 That shows how seriously he takes it
📖 Joab controls the return start to finish

## Let Him Not See My Face

This does not mean Absalom is fully forgiven and restored.

David allows him back into his own house in Jerusalem.

Not seeing the king's face meant staying outside the royal court entirely.

This was a real, lasting punishment, not just a formality.

Absalom is home, yet still living in a kind of exile inside the city.

🏠 Absalom may live in his own house
🚫 He is barred from the royal court
⚖️ This is a real, lasting punishment
📖 He is home, yet still in exile

## Absalom Returned To His Own House, And Saw Not The King's Face

The chapter's central problem is still not resolved by this homecoming.

David has brought his son back physically without repairing anything relationally.

This half measure will not hold for very long.

A wound left half healed often reopens worse than before.

That pattern is exactly what plays out for the rest of this chapter.

🏡 Absalom is home but not restored
💔 Nothing relational has actually been repaired
⏳ This half measure will not hold
📖 A half healed wound tends to reopen

# SecondSamuel 14:25-27
# 👑 Absalom's Beauty And Family
---
## None To Be So Much Praised As Absalom For His Beauty

Absalom's physical beauty is stated here as a simple fact.

The Bible does not usually spend this much attention on a man's looks.

That extra attention is a signal for what comes later in his story.

His appearance becomes a real political tool once he builds support against David.

This detail is character setup, not just description.

🌟 Absalom's beauty gets rare, extended attention
📢 That signals it will matter later
🎯 His charm becomes a political tool
📖 This is character setup, not just detail

## From The Sole Of His Foot Even To The Crown Of His Head There Was No Blemish In Him

Blemish means a physical flaw or imperfection of any kind.

This phrase covers Absalom completely, from his feet to his head.

Similar language elsewhere in scripture describes animals fit for sacrifice.

Using it for a person here emphasizes how flawless his appearance was.

It says nothing at all about his character underneath that appearance.

🔍 Blemish means any physical flaw
📏 The phrase covers him head to foot
🐑 Similar language described sacrificial animals
📖 It says nothing about his character

## When He Polled His Head

To poll the head means to cut or shave the hair.

Absalom did this once a year.

The growth became too heavy to manage otherwise.

This detail exists mainly to set up the number that follows.

It also plants a small detail that returns with far more weight later.

✂️ To poll means to cut the hair
📆 He did this once each year
🌱 The hair grew heavy enough to need it
📖 This detail returns later with far more weight

## He Weighed The Hair Of His Head At Two Hundred Shekels After The King's Weight

The king's weight refers to Israel's official royal standard for shekels.

Two hundred shekels by that standard came to about five pounds of hair.

That is an extraordinary amount for hair cut just once a year.

Ancient writers often used numbers like this to stress abundance, not a precise count.

Either way, the detail exists to make one point, that Absalom's looks were extraordinary.

⚖️ The king's weight was Israel's royal standard
📊 Two hundred shekels was about five pounds
😲 That is an extraordinary amount of hair
📖 The number stresses his extraordinary looks

## Unto Absalom There Were Born Three Sons, And One Daughter, Whose Name Was Tamar

This Tamar shares her name with Absalom's own sister from chapter thirteen.

Naming a daughter after her aunt was likely a way of honoring her.

The text calls this younger Tamar a woman of fair countenance.

That is the same praise given to her aunt earlier in the book.

Absalom's three sons are never named anywhere in this book.

That silence matters again later, when Absalom says he has no son to carry his name.

👧 This Tamar is named for Absalom's sister
🕯️ The name likely honors what she suffered
👦 His three sons are never named
📖 That silence matters again later in the story

# SecondSamuel 14:28-33
# 🔥 Absalom Forces The King's Hand
---
## Absalom Dwelt Two Full Years In Jerusalem

Two more years pass under the same unresolved terms.

Absalom is back in the city but still shut out of the court.

That makes five years total since Amnon's murder, counting the exile in Geshur.

Patience has clearly run out by the time this verse ends.

Something has to give, and the next verses show Absalom forcing it.

📆 Two more years pass under the same terms
🚫 Absalom stays shut out of the court
⏳ Five years total have now passed
📖 Absalom is about to force a change

## He Would Not Come To Him

Absalom sends for Joab twice, hoping for help reaching the king.

Joab refuses both times, with no explanation given in the text.

Joab may be avoiding a risky request.

He may simply be done serving as a go between.

Either way, Absalom has no normal path left forward.

🙅 Joab refuses to come, twice
❓ No explanation is given in the text
🚧 Absalom has no normal path left
📖 That refusal pushes him toward extremes

## Go And Set It On Fire

Burning a neighbor's crop was a serious act of aggression in this culture.

Barley was a real food source, not a small loss to absorb.

Absalom is not simply lashing out in anger.

He is deliberately forcing Joab to respond to him.

There is no other way left to get anyone's attention.

🔥 Burning crops was a serious act of harm
🌾 Barley was real food, not a small loss
🎯 Absalom forces Joab to respond
📖 This matches his instinct from chapter thirteen

## Wherefore Have Thy Servants Set My Field On Fire

The plan works immediately, since Joab finally comes in person.

Joab's question focuses only on the fire itself.

He says nothing about the years of silence before it.

Absalom finally has what he wanted, Joab standing before him and listening.

Extreme action succeeded where two direct requests already failed.

✅ The fire finally brings Joab in person
🔥 Joab only asks about the fire itself
🎯 Absalom gets the attention he wanted
📖 Extreme action succeeded where requests failed

## It Had Been Good For Me To Have Been There Still

Absalom claims staying in Geshur would have been better than this.

Being physically home while still barred from the king felt worse than exile.

That statement reveals how much this arrangement has worn him down.

A clear answer now matters more to him than staying in this limbo.

His words carry real frustration, not simple politeness.

😤 Absalom says exile felt better than this
🏠 Being home without access felt worse
⚖️ He wants a clear answer, not limbo
📖 His words carry real frustration

## If There Be Any Iniquity In Me, Let Him Kill Me

Iniquity here again means guilt for a specific wrong.

Absalom offers David an extreme, all or nothing choice.

Either the king restores him fully, or ends his life completely.

That kind of ultimatum is bold, even reckless, from a king's own son.

It also reveals a man out of patience for half measures.

⚖️ Iniquity means guilt for a real wrong
🎯 Absalom offers an all or nothing choice
😮 This ultimatum is bold and reckless
📖 He has run out of patience

## The King Kissed Absalom

This kiss finally gives Absalom the acceptance he waited five years for.

Absalom still bows to the ground first, showing proper respect.

On the surface, this looks like the ending the chapter was building toward.

The story does not end here, and the very next chapter shows why.

A reconciliation with no real conversation rarely settles what actually broke.

💋 The kiss signals full acceptance
🙇 Absalom still bows first in respect
🎭 On the surface this looks resolved
📖 Nothing was actually talked through
`.trim();

export const SECOND_SAMUEL_FOURTEEN_PERSONAL_SECTIONS = parseSecondSamuelFourteenRawNotes(SECOND_SAMUEL_FOURTEEN_RAW_NOTES);
