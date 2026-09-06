export type PsalmsThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyFourRawNotes(rawText: string): PsalmsThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 34:${startVerse}` : `Psalms 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 34 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_FOUR_RAW_NOTES = `# Psalms 34:1-4
# 🙌 I Will Bless The LORD At All Times
---
## 🙌 I Will Bless The LORD At All Times

"Bless" here means speaking well of God, not just feeling thankful inside.

David commits to this no matter how life feels right now.

This psalm comes from one of the most frightening chapters in his life.

He had just escaped King Saul by fleeing to a foreign king's court.

David does not wait for calm circumstances before he starts blessing God.

🙏 Bless means speaking well of God
😊 Not tied to feeling good today
😨 Written after a terrifying escape
📖 Praise does not wait for calm

## 🗣️ His Praise Shall Continually Be In My Mouth

"Continually" does not mean David never stopped talking about God out loud.

It means praise became a steady habit, not a rare event.

Something continual shows up again and again, not only on good days.

David is describing a lifestyle, not one loud moment.

🔁 Continually means a steady habit
🚫 Not nonstop literal talking
📆 Praise shows up again and again
📖 A lifestyle, not one loud moment

## 🙌 My Soul Shall Make Her Boast In The LORD

"Boast" usually sounds prideful today, like bragging about yourself.

Here it means the opposite, bragging about someone else entirely.

David is not boasting about his own escape or cleverness.

Every ounce of credit goes to God instead.

🗣️ Boast usually means self praise
🔄 Here it praises God instead
🙅 Not credit for his own escape
📖 All credit goes to God

## 👂 The Humble Shall Hear Thereof, And Be Glad

"The humble" means people who know they need God, not people who lack confidence.

David expects other struggling people to hear his testimony and take heart.

His own deliverance becomes good news for someone else.

One person's rescue can strengthen someone who has not been rescued yet.

🙇 Humble means knowing you need God
👂 Others will hear David's story
💪 His rescue encourages someone else
📖 One testimony can strengthen many

## 🔍 O Magnify The LORD With Me

"Magnify" does not mean making God bigger, since God cannot get any bigger than He already is.

It means making God look bigger in how we talk and think about Him.

Think of a magnifying glass held over small print.

The print does not change size, but it becomes easier to see clearly.

🔍 Magnify means making something easier to see
🚫 God does not actually grow bigger
👀 Our view of Him gets clearer
📖 Praise makes God's greatness visible

## 🤝 Let Us Exalt His Name Together

David does not invite others to watch him worship from a distance.

He invites them to join in with him personally.

Verse one was David alone blessing God.

Verse three turns into a call for shared, communal praise.

🤝 David invites others to join him
👀 Not a solo performance to watch
🔄 Verse one alone becomes verse three together
📖 Praise grows when it is shared

## 🔍 I Sought The LORD, And He Heard Me

"Sought" means David actively looked for God, not that he simply waited around.

He was in real danger at the time, surrounded by an enemy king's court.

God's answer did not depend on David having everything figured out first.

It only required David reaching out honestly in the middle of fear.

🔍 Sought means actively looking for God
😨 David was in real danger
🙌 God did not require a perfect prayer
📖 Honest fear can still reach God

## 😰 Delivered Me From All My Fears

This line names fears, not only the danger itself.

David had just escaped a Philistine king by acting like a madman.

He scratched on doors and let spit run down his beard.

The physical danger passed quickly once he got away.

The fear that followed him needed its own kind of rescue.

😰 Fears are named, not just danger
🎭 David acted like a madman to escape
🏃 The physical danger passed fast
📖 Fear needed its own healing too

# Psalms 34:5-7
# 👼 The Angel Of The LORD Encampeth
---
## 💡 They Looked Unto Him, And Were Lightened

"Lightened" here does not mean lit up with a lamp.

It means their faces brightened with visible relief.

Looking to God changed how these people appeared, not only how they felt inside.

Relief was visible on the outside.

💡 Lightened means brightened, not lit up
😌 Relief showed on their faces
👀 Visible outside, not just felt inside
📖 Looking to God changes appearance too

## 😳 Their Faces Were Not Ashamed

Shame here means the humiliation of being abandoned in a desperate moment.

These are people who had cried out and were actually answered.

A face that expected rejection instead shows relief.

That contrast is the whole point of the verse.

😳 Shame means fear of being abandoned
🙌 These people were actually answered
😌 Expected rejection turned to relief
📖 Answered prayer erases that shame

## 👤 This Poor Man Cried

"This poor man" is David referring to himself.

"Poor" here does not mainly describe money but someone in a low, desperate position.

Verse six switches from a whole group to one example, David himself.

He offers his own story as proof of what he just described about others.

👤 This poor man means David himself
💰 Poor means low and desperate, not broke
🔄 The group example becomes one story
📖 David proves his own claim

## 🔢 And Saved Him Out Of All His Troubles

"All" leaves nothing out of this rescue.

David does not say some troubles or most troubles.

This is the same king who once faked madness in front of Philistine soldiers.

That same total trouble still ended in total deliverance.

🔢 All means nothing was left out
😨 David had faced real terror
🎭 The same fear behind the madman act
📖 Total trouble met total deliverance

## ⛺ The Angel Of The LORD Encampeth

"Encampeth" is a military word describing an army setting up camp to protect a place.

David pictures God's angel surrounding him the way soldiers would surround a king.

This is not one angel passing by briefly.

It is a permanent, guarding presence set up on purpose.

⛺ Encampeth means setting up a protective camp
🪖 A military picture of surrounding protection
👑 Like soldiers guarding a king
📖 God's protection is not brief or passing

## 🙇 Round About Them That Fear Him

"Fear him" again means deep reverence, not being scared of God like an enemy.

This protection surrounds a whole group, not one lone exception like David.

Anyone who takes God seriously shares this same kind of covering.

David's rescue was never meant to be a one time gift just for him.

🙇 Fear him means reverence, not terror
👥 The promise covers a whole group
🛡️ Anyone reverent shares this covering
📖 David's rescue was not a one time gift

## 🔗 And Delivereth Them

This line ties the whole section together with one simple result, deliverance.

Looking to God, crying out honestly, and living in reverence each lead here.

The chapter repeats this pattern instead of stating it only once.

Repetition here is not filler.

It is reassurance.

🔗 Ties the section to one outcome
🙏 Looking, crying, and reverence all lead here
🔁 The chapter repeats this pattern on purpose
📖 Repetition here means reassurance

# Psalms 34:8-10
# 😋 O Taste And See That The LORD Is Good
---
## 👅 O Taste And See That The LORD Is Good

"Taste" invites personal experience, not secondhand information.

David is not asking readers to simply agree that God is good in theory.

Think of someone describing a meal compared to someone who actually eats it.

A description can only go so far.

Actual experience convinces in a different way.

👅 Taste means personal experience, not theory
🗣️ More than agreeing with an idea
🍽️ Like hearing about food versus eating it
📖 Real experience convinces differently

## 🙌 Blessed Is The Man That Trusteth In Him

"Blessed" describes a genuinely good state, not simply good luck.

Trust here is not a single decision made once.

It describes leaning on God again and again through ordinary life.

The blessing follows the trusting, not the other way around.

🙌 Blessed means a genuinely good state
🎲 Not the same as lucky
🔁 Trust means leaning on God repeatedly
📖 Blessing follows trust, not luck

## ✨ O Fear The LORD, Ye His Saints

"Saints" here does not mean people already perfect or officially declared holy.

It simply means people set apart as belonging to God.

David calls this same group toward fear, meaning deep reverence again.

Belonging to God and revering God go together in this verse.

✨ Saints means people set apart for God
🚫 Not the same as already perfect
🙇 Fear again means deep reverence
📖 Belonging and reverence go together

## 📉 For There Is No Want To Them That Fear Him

"Want" here means lacking something needed, not simply desiring something extra.

This is a strong promise, not a vague feeling of comfort.

David is not claiming a life free of hardship.

He is claiming that real need gets met for those who revere God.

📉 Want means lacking something needed
💭 Not the same as an extra wish
⚠️ Not a promise of an easy life
📖 Real need gets met for the reverent

## 🦁 The Young Lions Do Lack, And Suffer Hunger

Lions were the most feared and powerful predators in the region David lived in.

Even young, strong lions built for hunting still sometimes go hungry.

David picks the most self sufficient creature he can think of on purpose.

If even a lion can fail to provide for itself, no human strength guarantees enough either.

🦁 Lions were the region's top predator
💪 Even strong hunters can still fail
🎯 David picks the strongest example on purpose
📖 No strength guarantees enough alone

## 🙏 But They That Seek The LORD Shall Not Want Any Good Thing

This verse flips the lion picture directly.

A powerful predator can still go hungry through its own effort.

A person who seeks God is promised the opposite outcome.

The security here never depended on personal strength to begin with.

🦁 A strong predator can still go hungry
🙏 Seeking God brings the opposite outcome
💪 Security was never about personal strength
📖 Real security only comes from seeking God

# Psalms 34:11-14
# 👂 Come, Ye Children, Hearken Unto Me
---
## 👂 Come, Ye Children, Hearken Unto Me

The psalm shifts here from praising God to teaching people directly.

"Children" likely means students or younger disciples, not just young kids.

David moves from personal testimony into wisdom instruction.

This same shift happens often in wisdom literature like Proverbs.

👂 The psalm shifts from praise to teaching
👦 Children likely means students, not just kids
📚 A common shift in wisdom literature
📖 Personal testimony becomes wisdom instruction

## 🔁 I Will Teach You The Fear Of The LORD

This is the fourth time this chapter names fearing the LORD.

Repeating a word this often signals it as the psalm's central theme.

David treats reverence toward God as something that can actually be taught.

It is a skill to learn, not only a feeling that shows up on its own.

🔁 Fourth use of fear in this chapter
🎯 Repetition signals the psalm's main theme
🧠 It functions like a learnable skill
📖 Reverence can be taught, not just felt

## ⏳ What Man Is He That Desireth Life, And Loveth Many Days

This question sounds like it is only about living a long time.

David is really asking who wants a life worth having, not just a long one.

"Many days" pictures a full lifetime, not a magic number of years.

The question hooks the reader before giving the actual answer.

⏳ Sounds like it is only about long life
❓ Really asks about a life worth having
📅 Many days pictures a full lifetime
📖 The question sets up the real answer

## 👀 That He May See Good

"See good" means actually experiencing good things, not just witnessing them happen to someone else.

David is offering a real answer to the question he just asked.

The rest of this section explains exactly how to get there.

Wanting a good life comes with actual instructions, not vague hope.

👀 See good means experiencing it firsthand
❓ Answers the question just asked
📋 Real instructions follow next
📖 A good life comes with actual steps

## 🗣️ Keep Thy Tongue From Evil

The very first instruction targets speech, not big dramatic actions.

Words are often the easiest sin to justify and the hardest to take back.

David starts the list here on purpose.

Guarding the tongue is treated as the doorway to guarding everything else.

🗣️ The first instruction targets speech
😬 Words are easy to justify, hard to undo
🚪 Speech guards the door to everything else
📖 Small words carry real weight

## 🎭 And Thy Lips From Speaking Guile

"Guile" means deceit, tricking someone through clever or dishonest words.

This goes further than simply avoiding cursing or rude language.

It targets manipulation dressed up as normal conversation.

Honesty here means more than just not lying outright.

🎭 Guile means deceit or manipulation
🚫 More than avoiding rude language
🕵️ Targets dishonesty disguised as normal talk
📖 Honesty means more than not lying

## 🔢 Depart From Evil, And Do Good

This verse gives two separate commands, not one.

Departing from evil means actively moving away from it.

Doing good means replacing that gap with something positive instead.

Avoiding wrong is not the same as actually doing right.

🔢 Two separate commands, not one
🚶 Depart means actively moving away
✅ Do good fills that space with action
📖 Avoiding wrong differs from doing right

## 🏃 Seek Peace, And Pursue It

"Seek" means looking for something.

"Pursue" means chasing it down with real effort.

Peace is not something that just falls into a person's lap.

It has to be actively hunted like something truly valuable.

Real peace takes real, ongoing effort.

🔍 Seek means looking for something
🏃 Pursue means chasing with real effort
💎 Peace does not just fall into place
📖 Real peace takes real effort

# Psalms 34:15-18
# 💔 The LORD Is Nigh Unto Them That Are Of A Broken Heart
---
## 👁️ The Eyes Of The LORD Are Upon The Righteous

This pictures God's attention as constant, not occasional.

"Upon" suggests a steady watching, not a passing glance.

The righteous are never out of view, even in ordinary, unremarkable moments.

Being watched here is protection, not surveillance to fear.

👁️ Eyes upon means constant attention
🚫 Not a passing glance
🧍 The righteous are never out of view
📖 Being watched here means protection

## 😭 And His Ears Are Open Unto Their Cry

"Cry" describes desperate, urgent calling out, not calm conversation.

Eyes and ears together picture full attention.

God watches and listens at the same time.

His ears being open means He does not need convincing.

Access to Him is already available before the cry even happens.

😭 Cry means urgent, desperate calling
👂 Eyes and ears together mean full attention
🚪 God's ears are already open
📖 Access exists before the cry starts

## 🔄 The Face Of The LORD Is Against Them That Do Evil

This verse flips the picture from the one before it.

A face turned toward someone shows favor.

That is the opposite of the eyes just described for the righteous.

A face turned against someone shows opposition instead.

The chapter draws a clear line between these two very different outcomes.

🔄 This verse flips the earlier picture
😊 A face toward someone shows favor
😠 A face against someone shows opposition
📖 A clear line separates the two outcomes

## 📜 To Cut Off The Remembrance Of Them From The Earth

In this culture, being remembered after death mattered enormously.

That often happened through children or a lasting name.

Losing that remembrance was considered one of the worst possible fates.

This is not describing a quick punishment but a complete erasing over time.

Evil here does not get preserved the way righteousness does.

📜 Being remembered mattered deeply back then
💀 Losing remembrance was a feared fate
⏳ This pictures erasing over time
📖 Evil is not preserved like righteousness is

## 🔁 The Righteous Cry, And The LORD Heareth

This repeats the pattern from verse fifteen almost word for word.

Repetition in Hebrew poetry is not accidental filler.

Saying the same truth twice reinforces it as something to actually count on.

David wants this promise remembered, not just read once and forgotten.

🔁 Repeats the pattern from verse fifteen
📜 Hebrew poetry repeats things on purpose
💪 Repetition reinforces a promise to count on
📖 Meant to be remembered, not just read

## 🔗 And Delivereth Them Out Of All Their Troubles

This exact phrase already appeared in verse six about David personally.

The promise now widens from David's own story to every righteous person.

What worked once for one desperate king applies far beyond him.

Personal testimony becomes a general promise here.

🔗 Repeats the phrase from verse six
👤 Verse six was David's personal story
🌍 Now it widens to everyone righteous
📖 One testimony becomes a lasting promise

## 📏 The LORD Is Nigh Unto Them That Are Of A Broken Heart

"Nigh" is an old word simply meaning near or close by.

This is the opposite picture of someone distant and hard to reach.

A broken heart here describes real emotional devastation, not a minor disappointment.

God moves closest exactly where the pain is deepest.

📏 Nigh means near or close by
🚫 The opposite of distant or unreachable
💔 Broken heart means real devastation
📖 God moves closest where pain is deepest

## 😔 And Saveth Such As Be Of A Contrite Spirit

"Contrite" describes genuine sorrow over wrongdoing, not just feeling sad about consequences.

It is the humility of admitting real fault, not simply regret over getting caught.

This verse pairs grief over pain with grief over sin.

Both kinds of brokenness receive the same nearness from God.

😔 Contrite means genuine sorrow over sin
🚫 Not the same as regretting consequences
🙏 Pairs grief over pain and grief over sin
📖 Both kinds of brokenness meet God's nearness

# Psalms 34:19-22
# 🛡️ Many Are The Afflictions Of The Righteous
---
## ⚠️ Many Are The Afflictions Of The Righteous

This line corrects a wrong assumption directly.

Being righteous never guaranteed an easy or trouble free life in this psalm.

David has already described real fear and real danger throughout this chapter.

Faith was never the promise of an escape from every hardship.

⚠️ Corrects the idea that faith means ease
😨 David already described real danger
🚫 No promise of a trouble free life
📖 Faith is not an escape from hardship

## 🚪 But The LORD Delivereth Him Out Of Them All

The promise is deliverance through troubles, not exemption from them.

"All" again leaves no exception, echoing the same word from verse six.

Many troubles meet an equally complete deliverance.

The size of the trouble never outmatches God's ability to deliver.

🚪 Deliverance comes through, not around, trouble
🔢 All echoes the same word from verse six
⚖️ Complete trouble meets complete deliverance
📖 No trouble outmatches God's ability

## 🦴 He Keepeth All His Bones, Not One Of Them Is Broken

This line pictures complete physical protection and care.

Centuries later, the Gospel of John quotes this exact verse.

It connects to Jesus on the cross.

His legs were not broken like the men crucified beside him.

Old Testament language often carries more weight than first readers could know.

🦴 Originally pictured complete protection
✝️ John's Gospel later quotes this exact line
🔗 Connected to Jesus's unbroken legs on the cross
📖 Old words can carry unexpected weight

## ⚖️ Evil Shall Slay The Wicked

This verse describes a kind of poetic justice.

The very evil a wicked person practices eventually turns and destroys them.

Sin here is pictured almost like a trap that closes on the one who set it.

Consequences are not always an outside punishment.

Sometimes they grow directly out of the wrongdoing itself.

⚖️ Describes a kind of poetic justice
🪤 Evil is pictured like a trap
🔄 Sin can turn back on its own user
📖 Consequences can grow out of the wrong itself

## 🏚️ And They That Hate The Righteous Shall Be Desolate

"Desolate" means left empty and abandoned, not simply unhappy.

This describes the eventual outcome for hating righteous people specifically.

The picture is total isolation, not a temporary setback.

David draws a hard line between this fate and what comes next for the righteous.

🏚️ Desolate means left empty and abandoned
😠 This targets hating the righteous specifically
🔒 Pictures total isolation, not a setback
📖 A hard line separates the two fates

## 💰 The LORD Redeemeth The Soul Of His Servants

"Redeemeth" means buying something back or rescuing it at a real cost.

It is not a small favor but a costly, deliberate action.

This word appears throughout the Old Testament for God rescuing His people.

The whole psalm's story of rescue gets summarized in this one word.

💰 Redeemeth means rescuing at a real cost
🎯 Not a small favor but a deliberate act
📜 A common Old Testament word for rescue
📖 The whole psalm's rescue is summarized here

## 🔄 And None Of Them That Trust In Him Shall Be Desolate

This closing line directly answers the warning back in verse twenty one.

The same word, desolate, appears in both verses on purpose.

One path leads to complete abandonment.

The other leads to complete security.

The psalm opened with David blessing God in danger.

It closes with the same promise for anyone who trusts Him.

🔄 Directly answers verse twenty one's warning
🔁 Desolate repeats on purpose in both verses
⚖️ One path ends empty, the other secure
📖 The psalm closes where it began, in trust
`.trim();

export const PSALMS_THIRTY_FOUR_PERSONAL_SECTIONS = parsePsalmsThirtyFourRawNotes(PSALMS_THIRTY_FOUR_RAW_NOTES);
