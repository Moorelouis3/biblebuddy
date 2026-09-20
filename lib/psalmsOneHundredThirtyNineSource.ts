export type PsalmsOneHundredThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyNineRawNotes(rawText: string): PsalmsOneHundredThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+139:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 139 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+139:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+139:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 139 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 139,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 139:${startVerse}` : `Psalms 139:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 139 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_NINE_RAW_NOTES = `# Psalms 139:1-6
# 🔍 A God Who Already Knows Everything
---
## 🔍 Thou Hast Searched Me

"Searched" means far more than a quick glance.

It pictures someone digging carefully into every corner, missing nothing.

David is not describing a casual observer.

He is describing a God who has gone through his whole life in detail.

Nothing about David is hidden from that kind of search.

🔍 Searched means dug into thoroughly
👀 Nothing about David stays hidden
🕵️ God is no casual observer
📖 Total knowledge opens this psalm

## 💞 And Known Me

The Hebrew word behind "known" means far more than facts about a person.

It describes the kind of knowing found in a close relationship.

The same word describes a husband knowing his wife.

David is saying God knows him that intimately, not just factually.

Searching finds information.

Knowing means relationship.

💞 Known means intimate relationship
📚 The same word describes marriage
🔎 Searching only finds facts
📖 Knowing goes far beyond facts

## 🪑 My Downsitting And Mine Uprising

Sitting down and standing up sound like two random actions.

Together they form a literary pattern called a merism.

A merism names two opposites to mean everything in between.

David is really saying God knows every motion he makes, all day long.

Not one activity is left out of that knowledge.

🪑 Downsitting means every quiet moment
🚶 Uprising means every active moment
🔗 Together they mean everything between
📖 God tracks David's whole day

## 🧠 Thou Understandest My Thought Afar Off

"Afar off" does not mean God is watching from a distance.

It means God understands a thought before it has even fully formed.

The thought is still forming in David's own mind.

God already grasps it in full.

This is not surveillance.

It is knowledge that outruns the thinker.

🧠 Afar off means before it forms
⏳ God understands the thought early
🚫 Not watching from a distance
📖 God's knowledge outruns the thought

## ⭕ Thou Compassest My Path And My Lying Down

"Compassest" means to surround completely, like a circle drawn around something.

David's path is his daily activity, his walking and working.

His lying down is his rest at night.

God surrounds both the busy hours and the resting hours.

There is no gap between them where God is absent.

⭕ Compassest means surrounded completely
🚶 Path means daily activity
🛌 Lying down means nightly rest
📖 God surrounds the whole day

## 🧭 Art Acquainted With All My Ways

To be acquainted with something usually means casual familiarity.

Here it means far more than that.

God is intimately familiar with every path David takes, not just the major ones.

"All my ways" leaves out none of them, small or large.

Nothing about David's daily routine is a mystery to God.

🧭 Acquainted here means real familiarity
🛤️ Ways means every path taken
🔍 Nothing is left a mystery
📖 God knows the routine, not just highlights

## 👄 There Is Not A Word In My Tongue

David has not even spoken yet in this line.

The word is still sitting in his mouth, unspoken.

God already knows it completely before it is said out loud.

Speech usually reveals a person's thoughts to others.

Here it reveals nothing new to God, since He already knew it.

👄 The word is still unspoken
⏱️ God knows it before it is said
🗣️ Speech reveals nothing new to Him
📖 God is ahead of every sentence

## 🚧 Thou Hast Beset Me Behind And Before

"Beset" means hemmed in on every side, unable to slip past unnoticed.

Behind covers David's past.

Before covers what is still ahead of him.

God is not only aware of where David has been.

God already surrounds where David is going.

🚧 Beset means hemmed in completely
⏮️ Behind covers David's past
⏭️ Before covers what lies ahead
📖 God surrounds both directions of life

## ✋ Laid Thine Hand Upon Me

A hand placed on someone can mean two very different things.

It can mean a firm grip that restrains.

It can also mean a steady hand that protects and guides.

David does not sound afraid here.

He describes this touch as close, not threatening.

✋ A hand can restrain or protect
🔒 Here it feels close, not threatening
🛡️ It reads as guidance, not danger
📖 God's hand stays near David always

## 🤯 Such Knowledge Is Too Wonderful For Me

"Wonderful" here does not mean pleasant or nice.

It means something so far beyond a person's grasp that it stuns them.

David is not complaining about this kind of knowledge.

He is admitting that it is bigger than his mind can hold.

Some truths about God are meant to be marveled at, not fully explained.

🤯 Wonderful means beyond human grasp
🙆 David is not complaining here
🧩 Some truths are too big to explain
📖 Marveling can replace understanding

## ⛰️ It Is High, I Cannot Attain Unto It

Think of trying to reach the top of a mountain with no visible peak.

No matter how far David climbs in his own thinking, the top stays out of reach.

This is not a failure on David's part.

It is simply the size of the truth he is describing.

God's knowledge of him is too vast to be mastered by a human mind.

⛰️ High means impossible to fully reach
🧗 David cannot climb to the top
🚫 This is not David's own failure
📖 God's knowledge is simply too vast

# Psalms 139:7-12
# 🌌 Nowhere To Escape His Presence
---
## ❓ Whither Shall I Flee From Thy Presence

This is a question David already knows the answer to.

He is not truly searching for an escape route.

He is marveling out loud at how impossible escape actually is.

Spirit and presence describe the same reality here, said two different ways.

Wherever David could imagine running, God is already there before him.

❓ The question already has its answer
🚫 Escape from God is not possible
🔁 Spirit and presence mean the same thing
📖 David marvels instead of searching

## ☁️ If I Ascend Up Into Heaven, Thou Art There

Heaven represents the highest place David can imagine reaching.

Even there, God is not a visitor David happens to run into.

God is already present, filling that space before David arrives.

There is no ceiling high enough to rise above God's reach.

☁️ Heaven means the highest place imaginable
🏠 God is already there, not visiting
🚫 No height rises above His reach
📖 The highest place still belongs to Him

## ⚰️ If I Make My Bed In Hell, Behold, Thou Art There

"Hell" here does not describe the fiery place of final punishment.

The Hebrew word is sheol, the realm of the dead in general.

David is picturing the lowest, darkest place a person could end up.

Even there, God has not left the scene.

The highest place and the lowest place are equally within God's reach.

⚰️ Hell here means sheol, realm of death
🌑 It pictures the lowest possible place
🚫 God has not left even that place
📖 Highest and lowest are both His reach

## 🌅 The Wings Of The Morning

Sunrise seems to spread across the whole sky almost instantly.

David borrows that image and calls it flying on wings.

"The uttermost parts of the sea" means the farthest shore imaginable.

Together the picture is the fastest trip to the most distant place.

Even a journey like that could not put David beyond God's reach.

🌅 Wings of morning pictures fast sunrise
🌊 Uttermost sea means the farthest shore
🚀 Together they picture the farthest escape
📖 Even that trip stays within reach

## 👉 Thy Right Hand Shall Hold Me

In Bible poetry, "hand" often stands for God's own power in action.

The right hand specifically pictures strength, honor, and favor.

"Lead me" describes guidance along the way.

"Hold me" describes a firm, secure grip once David arrives.

Guidance and grip travel together, wherever David goes.

✋ Hand means God's power in action
👉 Right hand pictures strength and favor
🧭 Lead me means guidance along the way
📖 God guides and grips at once

## 🌑 Surely The Darkness Shall Cover Me

David imagines trying one more plan to hide, this time using nightfall.

Darkness has always been a natural way for people to disappear from view.

This is David voicing the temptation to test the limits of God's reach.

The word "surely" makes it sound like a confident plan.

That confidence is about to be proven wrong.

🌑 Darkness was a natural place to hide
🧪 David tests the limits here
😏 Surely sounds like a confident plan
📖 That confidence is about to fail

## 👁️ The Darkness And The Light Are Both Alike To Thee

Human eyes need light to see anything clearly.

God does not depend on light the way people do.

To Him, the darkest night and the brightest noon look exactly the same.

Nothing about darkness gives anyone real cover from God.

Every attempted hiding place in this psalm has now failed.

👁️ Human sight depends on light
🌗 Darkness and light look the same to God
🚫 Darkness offers no real cover
📖 Every hiding place here has failed

# Psalms 139:13-18
# 🧬 Formed And Watched Before Birth
---
## 🫘 Thou Hast Possessed My Reins

"Reins" is an old word for the kidneys.

Ancient Hebrew thought treated the kidneys as the seat of deep emotion.

Saying God possessed David's reins means God formed and owns his inner feelings.

This is not a comment about internal organs alone.

It reaches into the part of a person that feels and decides.

🫘 Reins is an old word for kidneys
💓 Ancient thought placed emotion there
🔑 Possessed means God formed and owns it
📖 God reaches the innermost part of a person

## 🧶 Thou Hast Covered Me In My Mother's Womb

"Covered" here carries the sense of weaving or knitting something together.

David is describing his own formation before birth in careful, personal terms.

This did not happen by accident or by chance alone.

God was personally involved in shaping David before anyone else saw him.

🧶 Covered here means knitted together
🤰 This describes formation before birth
🙌 God was personally involved
📖 David was shaped with intention

## 😮 I Am Fearfully And Wonderfully Made

"Fearfully" here does not mean something to be afraid of.

It means made with awe inspiring skill and care.

"Wonderfully" adds that the result is stunning to consider.

David is praising his own design, not complimenting himself.

The praise is aimed entirely at the maker, not the finished product.

😮 Fearfully means awe inspiring skill
✨ Wonderfully means stunning to consider
🙏 The praise targets the maker
📖 Good design points back to the designer

## 🧠 My Soul Knoweth Right Well

David is not guessing about this truth.

He says his own soul knows it clearly.

"Right well" means without any doubt at all.

Some truths about God are learned slowly through study.

This one, David says, is simply obvious once you notice it.

🧠 Soul knoweth means deep certainty
✅ Right well means without doubt
📚 Some truths take slow study
📖 This one is obvious once noticed

## 🙈 My Substance Was Not Hid From Thee, When I Was Made In Secret

"Made in secret" does not mean God was hiding from anyone.

It means the process of forming a baby happens hidden from every human eye.

No doctor or parent can watch it happen in real time.

God was never kept out of that hidden process.

He was present for the part no person can see.

🙈 Made in secret means hidden from people
👀 No human eye can watch it happen
🚪 God was never kept out
📖 He sees what no person can see

## 🧵 Curiously Wrought In The Lowest Parts Of The Earth

"Curiously wrought" is an old way of saying skillfully embroidered.

"Lowest parts of the earth" does not mean literally underground.

It is a poetic way of describing the womb, hidden low and out of sight.

David is comparing his own formation to careful, detailed craftsmanship.

🧵 Curiously wrought means skillfully embroidered
🌍 Lowest parts of the earth pictures the womb
🎨 The comparison is careful craftsmanship
📖 Even hidden work gets God's full attention

## 👁️ Thine Eyes Did See My Substance, Yet Being Unperfect

"Unperfect" describes David at the earliest, unformed stage of life.

Most eyes would see nothing worth noticing yet at that stage.

God's eyes already saw him fully, even before he looked like anything.

Being unfinished did not make David invisible to God.

👶 Unperfect means the earliest unformed stage
🙈 Most eyes see nothing yet
👁️ God's eyes already saw him fully
📖 Unfinished never means invisible to God

## 📖 In Thy Book All My Members Were Written

The "book" here pictures a divine record kept before David existed.

"Members" means the parts of his body, formed one by one over time.

"When as yet there was none of them" means the plan came before the parts.

God's design for David was already written down before it was built.

📖 Book pictures a divine record
🧩 Members means the parts of his body
⏳ The plan came before the parts
➡️ God writes the design before the build

## 💎 How Precious Also Are Thy Thoughts Unto Me, O God

"Precious" means treasured, something valued far above its ordinary worth.

David is not talking about God's thoughts toward the whole world here.

He means the specific thoughts God has toward him personally.

Being individually considered by God feels valuable to David, not distant.

💎 Precious means highly treasured
🎯 These thoughts are aimed at David personally
🙌 Being considered feels valuable, not distant
📖 God's attention is treasured, not routine

## ➕ How Great Is The Sum Of Them

"Sum" means the total count added all together.

David is marveling at just how large that total must be.

This is not a complaint about being overwhelmed.

It is amazement at the sheer scale of God's attention toward him.

➕ Sum means the total added together
😮 David marvels at the scale of it
🚫 This is not a complaint
📖 God's attention is vast, not occasional

## 🏖️ More In Number Than The Sand

Sand is the ancient world's picture for something impossible to count.

David tries to imagine counting every single grain on a beach.

That task fails immediately, and so does counting God's thoughts toward him.

The comparison is meant to communicate a number too large to hold in the mind.

🏖️ Sand pictures something impossible to count
🔢 Counting every grain fails immediately
🚫 So does counting God's thoughts
📖 The point is scale beyond imagination

## 😴 When I Awake, I Am Still With Thee

Sleep interrupts almost everything else in a person's day.

It does not interrupt God's nearness to David.

The very first thought David has each morning already includes God's presence.

This closes the opening half of the psalm the same way it began.

God's attention never actually stops, even overnight.

😴 Sleep interrupts most things, not this
🌅 God greets the first waking thought
🔁 This echoes how the psalm began
📖 God's attention never truly pauses

# Psalms 139:19-24
# 🙏 Hating Evil And Asking To Be Searched
---
## 🔀 Surely Thou Wilt Slay The Wicked, O God

David's tone shifts sharply now, from wonder to concern about evil.

He states plainly that God will eventually deal with wickedness in the world.

This is not David taking justice into his own hands.

It is David trusting that justice belongs to God alone.

🔀 The tone shifts sharply here
⚖️ God will deal with wickedness
🙅 David does not act as judge himself
📖 Justice belongs to God, not David

## 🩸 Depart From Me Therefore, Ye Bloody Men

"Bloody men" describes people guilty of violence, often murder.

David is not simply annoyed by these people.

He wants clear distance between himself and their way of life.

Being searched and known by God, as verse one describes, makes their company feel wrong.

🩸 Bloody men means people guilty of violence
😠 This is more than mild annoyance
🚧 David wants real distance from them
📖 Knowing God changes who feels welcome

## 🗣️ For They Speak Against Thee Wickedly

"They" refers back to the bloody men just named in the verse before.

Their wickedness is not only in violent actions.

It also shows up in how they speak about God Himself.

Words and actions both reveal what a person truly values.

🗣️ They refers to the bloody men
💬 Their wickedness includes their words
⚖️ Words reveal values just like actions
📖 Speech about God is never neutral

## 🏷️ Thine Enemies Take Thy Name In Vain

Taking God's name in vain does not only mean casual cursing.

It includes using God's name falsely or for personal gain.

These enemies invoke God's name without honoring what it stands for.

That kind of misuse is treated here as a serious offense, not a small slip.

🏷️ Name in vain is broader than swearing
💸 It includes using His name for gain
🚫 They dishonor the name while invoking it
📖 Misusing God's name is taken seriously

## 🙅 Do Not I Hate Them, O LORD, That Hate Thee

This is not David nursing a personal grudge.

The hatred here is aimed at people who oppose God, not people who wronged David.

David lines his own loyalty up directly with God's side.

This kind of hatred is loyalty language, not petty resentment.

🙅 This is not a personal grudge
🎯 It targets those who oppose God
🤝 David aligns his loyalty with God
📖 This is loyalty, not petty resentment

## 😢 Am Not I Grieved With Those That Rise Up Against Thee

"Grieved" adds real sorrow to what could otherwise sound like pure anger.

David is not only frustrated by rebellion against God.

He genuinely mourns that people choose to oppose their creator.

Anger and grief sit together in this single verse.

😢 Grieved adds real sorrow, not just anger
💔 David mourns their rebellion against God
🤝 Anger and grief sit together
📖 Even opposition can carry real sorrow

## 💯 I Hate Them With Perfect Hatred

"Perfect" here means complete or total, not flawless in a moral sense.

David is describing the full intensity of his opposition to evil.

This is not casual dislike that fades quickly.

It stands as the total opposite of half hearted feelings.

💯 Perfect here means complete or total
🔥 This describes full intensity, not virtue
🚫 It is not casual or temporary
📖 David opposes evil with his whole heart

## 🚩 I Count Them Mine Enemies

David draws a clear line here between himself and those who oppose God.

Naming them as enemies is not exaggeration.

It reflects exactly which side David has chosen to stand on.

This verse closes the section on wickedness before the prayer that follows.

🚩 David draws a clear line here
🎯 Naming enemies is not exaggeration
🧭 It shows which side David stands on
📖 This closes the section on wickedness

## 🔁 Search Me, O God, And Know My Heart

This line echoes the very first verse of the entire psalm.

There, David described God already searching and knowing him.

Here, David turns that same truth into an invitation instead of an observation.

He is not afraid of being searched.

He is asking for it directly.

🔁 This echoes verse one of the psalm
🔍 Search now becomes an invitation
🙌 David is not afraid of being known
📖 He asks for scrutiny instead of avoiding it

## 🔥 Try Me, And Know My Thoughts

"Try" here means test, the way metal is tested by fire to prove its quality.

David is inviting God to examine his thoughts under real pressure.

This is a bold request, not a cautious one.

He wants nothing about himself left unexamined.

🔥 Try means test, like metal in fire
🧠 It targets David's thoughts directly
💪 This is a bold, not cautious, request
📖 Nothing is left unexamined here

## 🛤️ See If There Be Any Wicked Way In Me

"Wicked way" describes a pattern of sin, not just a single mistake.

David is asking God to search for a direction, not only isolated actions.

This kind of self examination assumes the search might actually find something.

David is not claiming to be already perfect.

🛤️ Wicked way means a pattern, not one mistake
🔎 David invites a search for hidden patterns
🙇 He does not claim to be perfect
📖 Real prayer allows for real findings

## ♾️ Lead Me In The Way Everlasting

"The way everlasting" points to a path that lasts beyond this present life.

David does not end this psalm with a request to be left alone.

He asks God to actively lead him somewhere, not simply to leave him uncorrected.

This closing line ties the whole psalm back to its opening theme.

♾️ Way everlasting means a path beyond this life
🧭 David asks to be led, not corrected
🔗 This ties back to the psalm's opening
📖 The God who knows him now guides him
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_NINE_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyNineRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_NINE_RAW_NOTES
);
