export type LukeThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeThirteenRawNotes(rawText: string): LukeThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 13:${startVerse}` : `Luke 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 13 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_THIRTEEN_RAW_NOTES = `# Luke 13:1-5
# ⚠️ Repent Or Perish
---
## 🩸 Whose Blood Pilate Had Mingled With Their Sacrifices

Pilate was the Roman governor who ruled Judea with a harsh hand.

Some Galilaeans were killed by Roman soldiers while they were offering sacrifices at the temple.

Their own blood mixed with the blood of the animals on the altar.

People brought Jesus this gruesome story expecting him to explain why it happened.

Jesus does not take the question where they expect.

🏛️ Pilate ruled Judea with violence

🩸 Galilaeans died offering sacrifices

😨 Their blood mixed with the sacrifice

➡️ Jesus redirects their assumption

## ❓ Suppose Ye That These Galilaeans Were Sinners Above All

Jesus names the assumption everyone secretly makes about tragedy.

People often believe that suffering proves someone did something worse than others.

Jesus flatly rejects that idea here.

Tragedy is never proof of extra guilt.

Everyone carries the same need to turn back to God, tragedy or not.

❓ Suffering does not prove extra sin

🚫 Jesus rejects that common assumption

⚖️ Tragedy and guilt are not the same

📖 Everyone shares the same need to repent

## 🔁 Except Ye Repent, Ye Shall All Likewise Perish

Jesus repeats this exact warning twice in the passage, once after each example.

"Repent" means to turn away from sin and turn back toward God.

The warning is not aimed at especially bad people.

It is aimed at everyone listening, including the one asking the question.

Jesus is not explaining why tragedy happens. He is calling everyone to respond to it.

🔁 Jesus repeats this warning twice

🙏 Repent means turning back to God

🎯 The warning is aimed at everyone

📖 Response matters more than explanation

## 🏗️ The Tower In Siloam Fell, And Slew Them

Siloam was a well known pool and water system inside Jerusalem.

A tower near it collapsed and killed eighteen people without warning.

Jesus pairs this accident with the earlier act of violence on purpose.

One tragedy came from a government. The other came from nobody at all.

Both examples prove the same point.

🏗️ Siloam was a pool inside Jerusalem

💥 A tower there fell without warning

⚖️ Jesus pairs violence with an accident

📖 Nobody is uniquely singled out for guilt

# Luke 13:6-9
# 🌳 The Barren Fig Tree
---
## 🌳 A Certain Man Had A Fig Tree Planted In His Vineyard

Vineyard owners sometimes planted a few fig trees among the vines for extra fruit.

In the Old Testament, Israel itself is often pictured as a fig tree or a vine.

A listener familiar with that image would hear this parable as a story about the nation, not just a tree.

The owner comes looking for fruit, exactly what any owner would expect.

What happens next is not really about farming.

🌳 Fig trees were often planted in vineyards

📜 The Old Testament uses this image for Israel

👂 Listeners would hear more than a farming story

📖 The parable is about more than a tree

## 📆 These Three Years I Come Seeking Fruit On This Fig Tree, And Find None

Fig trees in this region usually needed a few years to mature before producing fruit.

Three years without fruit meant this tree had already had a fair chance.

The owner is not acting rashly or without reason.

He has waited exactly as long as any reasonable owner would.

Patience was already extended generously before this conversation even starts.

🌱 Fig trees needed time to mature

📆 Three years was already a fair chance

🤷 The owner is not acting rashly

📖 Patience was extended before this moment

## 🪓 Cut It Down, Why Cumbereth It The Ground

"Cumbereth" is an old word meaning to use up space and resources without giving anything back.

A worthless tree was still taking the sunlight, water, and soil that a productive tree needed.

The dresser is not just annoyed. He is thinking about everything else the tree is blocking.

Taking up space is not the same as being useful.

An unproductive life can quietly cost everyone else around it.

📚 Cumbereth means wasting space and resources

🌱 The tree blocks a productive tree's growth

🚫 Taking up space is not being useful

📖 Unproductive lives cost those around them

## 🙏 Lord, Let It Alone This Year Also, Till I Shall Dig About It, And Dung It

The dresser steps in and asks for exactly one more year.

He does not just ask for delay. He offers extra work to help the tree succeed.

Digging loosened the soil, and dung added nutrients the tree was missing.

This is intercession paired with real effort, not an empty excuse.

Mercy here comes with work attached, not just more time.

🙏 The dresser asks for one more year

⛏️ Digging and dung describe real extra care

🤝 This is intercession joined with real effort

📖 Mercy here comes with work attached

# Luke 13:10-13
# 🦴 A Woman Loosed From Her Infirmity
---
## 🏛️ He Was Teaching In One Of The Synagogues On The Sabbath

Teaching in a synagogue on the Sabbath was completely normal for a Jewish rabbi.

Jesus regularly used this exact setting throughout Luke's gospel.

Nothing about the setting itself was unusual yet.

What happens next inside that normal setting is what causes the conflict.

The controversy was never about where he taught. It was about what he did there.

🏛️ Synagogue teaching on the Sabbath was normal

📖 Jesus often taught in this same setting

😌 Nothing unusual yet about the scene

➡️ The conflict comes from what happens next

## 🦴 A Spirit Of Infirmity Eighteen Years, And Was Bowed Together

"Infirmity" means a weakness or sickness of the body.

Many people in this culture connected ongoing illness like this to spiritual bondage, not just a physical cause.

"Bowed together" means her body was permanently curved forward and could not straighten.

Eighteen years marks this as a lifelong, chronic condition, not a passing illness.

She had likely spent nearly two decades unable to look anyone in the eye while standing.

🤕 Infirmity means a sickness of the body

👻 A spirit was blamed for her condition

🦴 Bowed together means a permanently curved back

📖 Eighteen years marks a lifelong condition

## 🔓 Woman, Thou Art Loosed From Thine Infirmity

"Loosed" means set free, the opposite of being bound or tied down.

Jesus speaks the healing before he ever touches her.

He addresses her directly as "woman," a respectful and personal greeting, not a label.

The same loosed language returns later in verse sixteen.

Freedom here starts with a sentence, before it ever becomes visible.

🔓 Loosed means set free from bondage

🗣️ Jesus speaks healing before he touches her

🙋 Woman is a personal, respectful address

📖 His words come before the visible change

## ✋ He Laid His Hands On Her: And Immediately She Was Made Straight

Laying on hands was a physical act of blessing and healing used throughout Jesus's ministry.

"Immediately" rules out any gradual recovery. The change happens the instant he touches her.

"Made straight" reverses the exact bowed condition described back in verse eleven.

She responds by glorifying God, not by thanking Jesus first.

The healing and the praise arrive in the very same moment.

✋ Laying on hands marked blessing and healing

⚡ Immediately rules out a slow recovery

🦴 Made straight reverses her bowed condition

📖 Her first response is praising God

# Luke 13:14-17
# 😤 The Ruler's Indignation
---
## 😠 The Ruler Of The Synagogue Answered With Indignation

A ruler of the synagogue managed the building and oversaw its services.

"Indignation" means anger mixed with a sense of being personally offended.

He is not angry at the healing itself so much as the timing of it.

His anger is really about broken rules, not about the woman's suffering.

A good thing happening at the wrong time can still make some people furious.

🏛️ A ruler managed the synagogue's services

😠 Indignation means offended anger

⏰ His real issue is the timing

📖 Rules mattered more to him than her suffering

## 📜 There Are Six Days In Which Men Ought To Work

The Law of Moses set aside six days for labor and one day for rest.

The ruler is quoting that law correctly, word for word.

His logic says healing counts as work, so it should wait for a weekday.

He is technically accurate and still completely misses the point.

Correct rules can still be used in the wrong direction.

📜 Six days for work came from the Law

✅ The ruler quotes the rule correctly

🧮 He counts healing as a form of work

📖 Being technically right missed the real point

## 🐂 Doth Not Each One Of You On The Sabbath Loose His Ox Or His Ass From The Stall

Jesus points to something every single person listening already did on the Sabbath.

Feeding and watering an ox or donkey was treated as basic care, not forbidden work.

If an animal's needs could not wait a single day, a person's suffering certainly should not either.

Jesus argues from the lesser case up to the greater one.

If mercy to an animal was allowed, mercy to a person could not be refused.

🐂 Everyone fed animals on the Sabbath already

💧 Basic animal care was never forbidden

⚖️ Jesus argues from animals up to people

📖 Mercy to people cannot rank below animals

## 👨‍👩‍👧 A Daughter Of Abraham, Whom Satan Hath Bound, Lo, These Eighteen Years

"Daughter of Abraham" names her as a full member of God's covenant people.

Jesus states plainly that Satan, not just illness, had bound her all this time.

"Lo" is an old word meaning look or take notice, used to draw attention to the number.

Eighteen years repeats the detail from verse eleven on purpose.

If an ox deserved care on the Sabbath, a daughter of Abraham deserved it even more.

👨‍👩‍👧 Daughter of Abraham means covenant family

👻 Satan is named as the real binder

👀 Lo means look or take notice

📖 Her claim outranks an ox's claim

# Luke 13:18-21
# 🌱 Mustard Seed And Leaven
---
## 👑 Unto What Is The Kingdom Of God Like

Jesus often taught about the kingdom of God using small, everyday pictures.

The kingdom of God means God's reign and rule breaking into the world.

Asking what it is like signals a parable is about to compare two things.

The comparison, not the object itself, is always the point.

Jesus is about to describe how God's reign grows, not what it physically looks like.

👑 Kingdom of God means God's reign

🧩 Parables compare two very different things

🌍 The kingdom breaks into the world

📖 The growth matters more than the image

## 🌱 A Grain Of Mustard Seed Which A Man Took, And Cast Into His Garden

A mustard seed was famous for being one of the smallest seeds a farmer planted.

"Waxed" is an old word meaning grew or increased over time.

A mustard plant could grow tall enough that birds could actually nest in its branches.

The kingdom starts from something almost too small to notice.

What looks insignificant at the start can still become something large enough to shelter others.

🌱 Mustard seeds were famously tiny

📈 Waxed means grew larger over time

🌳 The plant grew tall enough for birds

📖 Small beginnings can become something large

## 🪹 The Fowls Of The Air Lodged In The Branches Of It

"Lodged" means the birds made their nests and rested there.

Older prophets like Ezekiel and Daniel pictured a great tree sheltering birds.

For them, that tree stood for a kingdom gathering many nations under it.

Jesus borrows that same picture here on purpose.

The kingdom of God is pictured as a shelter big enough for outsiders too.

A tiny seed becomes a shelter wide enough for more than just its own.

🪹 Lodged means nesting and resting there

📜 Older prophets used this same tree image

🌲 A kingdom imagined as a sheltering tree

📖 Outsiders find shelter under this kingdom too

## 🍞 Leaven, Which A Woman Took And Hid In Three Measures Of Meal

"Leaven" is the ancient equivalent of yeast, the ingredient that makes dough rise.

"Three measures of meal" was a very large batch, enough to feed more than a hundred people.

A small amount of leaven quietly spreads through a batch far bigger than itself.

Nobody can see the leaven working once it is mixed in.

The kingdom works the same way, growing from the inside out before it is ever fully visible.

🍞 Leaven is the ancient version of yeast

🥣 Three measures of meal fed over a hundred

👻 Leaven works invisibly once mixed in

📖 The kingdom grows unseen before it is visible

# Luke 13:22-27
# 🚪 The Strait Gate
---
## 🗺️ He Went Through The Cities And Villages, Teaching, And Journeying Toward Jerusalem

Luke repeatedly reminds readers that Jesus is on the road to Jerusalem throughout this whole section of the gospel.

This travel note is not just geography.

Jerusalem is where the cross is waiting for him.

Every stop along this road happens under that shadow.

Jesus keeps teaching the whole way there, right up to the end.

🗺️ Luke tracks this road to Jerusalem

✝️ Jerusalem is where the cross waits

🚶 Every stop happens under that shadow

📖 Jesus keeps teaching the whole way

## 🔢 Lord, Are There Few That Be Saved

This was a live debate among Jewish teachers in Jesus's own day.

Some taught that nearly all Israel would be saved. Others taught that very few would be.

The question assumes salvation is mainly about which group someone belongs to.

Jesus answers with instructions instead of a number.

He redirects a numbers question into a question about each person's own urgency.

📚 Teachers debated this question in Jesus's day

🔢 The question wanted a number answer

👥 It assumed group identity decided salvation

📖 Jesus answers with urgency, not a number

## 📏 Strive To Enter In At The Strait Gate

"Strait" is an old word meaning narrow.

It is easy to confuse with the modern word straight.

A strait gate was narrow enough that a person could not carry everything through it at once.

"Strive" means to make a real, strenuous effort, not a casual stroll.

Entering the kingdom takes real urgency, not easy assumptions.

📏 Strait means narrow, not straight

🚪 A narrow gate limits what can pass through

💪 Strive means real, strenuous effort

📖 The kingdom is not entered casually

## 🔍 Many, I Say Unto You, Will Seek To Enter In, And Shall Not Be Able

"Seek" here means a late, half hearted attempt after the moment has already passed.

Seeking is not the same thing as entering.

Jesus warns that plenty of people will want in once it is too late to matter.

Desire alone does not open a door that has already been shut.

Wanting something later cannot replace choosing it now.

🔍 Seeking here means a late attempt

🚫 Wanting in is not the same as entering

⏳ Many will try once it is too late

📖 Desire cannot replace an earlier choice

## ❓ I Know You Not Whence Ye Are

This phrase appears twice in this short passage, in verses twenty five and twenty seven.

"Whence" is an old word meaning from where.

Knowing someone's origin here means having a real relationship, not just recognizing a face.

Eating and teaching near Jesus, mentioned in verse twenty six, was still not the same as truly belonging to him.

Proximity to Jesus was never the same thing as actually being known by him.

🔁 This exact line repeats twice here

❓ Whence means from where

🤝 Knowing someone means real relationship

📖 Closeness is not the same as belonging

# Luke 13:28-30
# ↕️ Last And First
---
## 😭 There Shall Be Weeping And Gnashing Of Teeth

"Gnashing of teeth" is an old idiom for grinding the teeth together in rage and anguish.

Jesus uses this exact phrase several times across the gospels for final judgment.

Weeping captures the grief of being shut out.

Gnashing captures the fury that comes with it.

Both emotions describe the same moment, being excluded from something expected.

😭 Weeping shows grief at being shut out

😠 Gnashing shows fury at the same moment

🔁 Jesus repeats this phrase elsewhere too

📖 Both describe the pain of exclusion

## 👴 When Ye Shall See Abraham, And Isaac, And Jacob, And All The Prophets, In The Kingdom Of God

Abraham, Isaac, and Jacob were the three founding patriarchs of the entire nation of Israel.

Seeing them already seated in the kingdom would have been fully expected by a Jewish listener.

The shock is not that the patriarchs are there. Everyone expected that.

The shock is who else turns out to be there instead of some of Israel's own.

Belonging to the family tree was never the same thing as belonging to the kingdom.

👴 Abraham, Isaac, and Jacob founded Israel

😲 Their presence was fully expected

🔀 The real shock is who else is there

📖 Ancestry alone never guaranteed a place

## 🧭 They Shall Come From The East, And From The West, And From The North, And From The South

Naming all four directions means people from literally everywhere on earth.

Jewish listeners would have expected this seat at the table to belong only to Israel.

Jesus is describing Gentiles and outsiders streaming in from every direction instead.

This was one of the more startling claims in the whole chapter.

The kingdom's guest list turns out to be far wider than anyone assumed.

🧭 Four directions means literally everywhere

🌍 Outsiders are included, not just Israel

😳 This claim would have startled listeners

📖 The guest list is wider than assumed

## 🔃 There Are Last Which Shall Be First, And There Are First Which Shall Be Last

This saying flips the expected order of who gets in first.

People confident in their own standing, the first, are not guaranteed anything.

People written off or overlooked, the last, are not excluded either.

Status at the start of the story does not decide how the story ends.

God's kingdom does not run on human rank.

🔃 This saying flips the expected order

😌 Confidence does not guarantee a place

🙇 The overlooked are not excluded

📖 God's kingdom does not run on rank

# Luke 13:31-35
# 🏙️ O Jerusalem, Jerusalem
---
## 👑 Get Thee Out, And Depart Hence: For Herod Will Kill Thee

This Herod is Herod Antipas, the ruler over Galilee who had already executed John the Baptist.

Some Pharisees bring Jesus this warning, though their exact motive is not stated.

It may have been genuine concern, or it may have been a scare tactic meant to move him along.

Either way, Jesus does not react with fear.

A death threat does not change his plans at all.

👑 Herod Antipas already killed John the Baptist

🗣️ Pharisees bring Jesus this warning

🤔 Their real motive is not stated

📖 Jesus reacts with no fear at all

## 🦊 Go Ye, And Tell That Fox

Calling a ruler a fox was a real insult in this culture.

A fox was seen as cunning and destructive, but small and ultimately not a serious threat.

Jesus is not denying Herod's danger. He is denying that Herod controls the outcome.

A king worried about one wandering teacher is not nearly as powerful as he thinks.

Jesus names Herod's real size, not the size Herod imagines for himself.

🦊 Fox meant cunning but not truly powerful

😤 Calling Herod this was a real insult

👑 Herod does not control this outcome

📖 Jesus names Herod's true size

## 📆 To Day, And To Morrow, And The Third Day I Shall Be Perfected

"To day, to morrow, and the third day" is an old way of naming a short set time.

It is not meant as a literal count of days.

"Perfected" here means completed or brought to full purpose, not made flawless.

Jesus means his mission is running on God's timetable, not Herod's threats.

Nothing Herod does can move that schedule up or push it back.

The real deadline belongs to God, not to the king making the threat.

📆 This phrase names a short set time

🎯 Perfected means completed, not flawless

⏳ The mission runs on God's schedule

📖 Herod cannot move that deadline

## 📜 It Cannot Be That A Prophet Perish Out Of Jerusalem

This line is heavy with dark irony, since Jesus is not currently anywhere near Jerusalem.

It recalls a long pattern of prophets who were rejected and killed specifically in that city.

Jesus is already naming where his own death will happen before anyone else has said it.

He walks toward that city with full knowledge of what waits there.

This is a choice, not an accident he stumbles into.

📜 Jerusalem had a pattern of killing prophets

🔮 Jesus names his own death in advance

🚶 He walks toward it with open eyes

📖 This is a choice, not an accident

## 🐣 As A Hen Doth Gather Her Brood Under Her Wings

"Brood" means a mother bird's chicks.

A hen spreading her wings over her chicks is a picture of protection from danger, like a hawk overhead.

Jesus pictures himself wanting to protect the very city about to reject him.

The tone here is sorrow, not anger.

He wanted to gather them. They were the ones who would not come.

🐣 Brood means a mother bird's chicks

🛡️ A hen's wings picture real protection

💔 Jesus wanted to protect this city

📖 They were the ones who refused

## 🏚️ Your House Is Left Unto You Desolate

"House" likely points to the temple, the center of Jerusalem's religious life.

"Desolate" means abandoned and empty of the presence that once filled it.

This is a judgment, not a passing complaint.

God's presence is described as withdrawing from the very place meant to house it.

An empty house is a strange and sobering image for the center of a nation's worship.

🏛️ House likely means the temple

🏚️ Desolate means abandoned and emptied

⚖️ This line pronounces real judgment

📖 God's presence is pictured withdrawing

## 🎉 Blessed Is He That Cometh In The Name Of The Lord

This exact line comes from Psalm one hundred eighteen, originally sung to welcome pilgrims arriving at the temple.

Jesus says Jerusalem will not see him again until they say this line about him.

This points forward to his arrival into the city in the next chapter, when crowds do say these very words.

The line closes the chapter on a note of hope folded inside the judgment.

Even a desolate house is not the end of the story.

📖 This line quotes Psalm one hundred eighteen

🎉 It was sung to welcome pilgrims

🔮 It points forward to the next chapter

➡️ Judgment here still leaves room for hope
`.trim();

export const LUKE_THIRTEEN_PERSONAL_SECTIONS = parseLukeThirteenRawNotes(LUKE_THIRTEEN_RAW_NOTES);
