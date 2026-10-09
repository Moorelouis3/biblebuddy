export type MarkThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkThirteenRawNotes(rawText: string): MarkThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 13:${startVerse}` : `Mark 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Mark 13 sections, received " + sections.length);
  }

  return sections;
}

const MARK_THIRTEEN_RAW_NOTES = `# Mark 13:1-2
# 🏛️ Not One Stone Upon Another
---
## 🏛️ What Manner Of Stones And What Buildings Are Here

This temple was not the simple tent Moses once built in the wilderness.

Herod the Great had rebuilt it into one of the largest buildings in the ancient world.

Some of its foundation stones weighed more than a loaded truck does today.

A disciple is marveling at something people traveled far just to see.

🏛️ Herod rebuilt the temple on a massive scale

🪨 Some stones weighed more than a loaded truck

👀 People traveled far just to see it

📖 A disciple marvels at real human achievement

## 🪨 There Shall Not Be Left One Stone Upon Another

Jesus answers the disciple's admiration with a shocking prediction.

This enormous building took decades to build and would be torn apart completely.

In the year seventy, Roman armies really did level the temple exactly this way.

The disciple praised the stones and Jesus pointed straight past them.

🔮 Jesus predicts the temple will be destroyed

⏳ The building had taken decades to build

⚔️ Rome leveled it exactly this way

📖 Jesus points past the stones ahead

# Mark 13:3-4
# 🧎 Privately Upon The Mount Of Olives
---
## 🧎 Peter And James And John And Andrew Asked Him Privately

These four men formed an inner circle among the twelve disciples.

Peter, James, and John appear together at other major moments, like the Transfiguration.

Andrew was the very first disciple Jesus ever called.

Asking Jesus privately meant this teaching was not meant for the crowd just yet.

🧎 Four disciples form an inner circle

⭐ Peter, James, and John share other key moments

🐟 Andrew was the first disciple Jesus called

📖 This teaching was private, not public yet

## ⛰️ Over Against The Temple

The Mount of Olives sits across a valley, facing Jerusalem directly.

From up there, the whole temple complex Jesus just described was fully visible.

Sitting over against the temple means looking right at the building He just condemned.

The setting matches the subject, judgment spoken while staring at what will fall.

⛰️ Mount of Olives faces Jerusalem across a valley

👀 The whole temple was visible from there

🏛️ Jesus speaks while looking right at it

📖 The setting matches the weight of His words

## ❓ When Shall These Things Be

The disciples are actually asking two different questions at once.

One question asks about timing, when the temple will actually fall.

The other asks about the sign, what will warn them right before it happens.

Jesus spends the rest of this chapter answering both questions together.

❓ The disciples ask two questions, not one

⏰ One question asks about timing

🚨 The other asks about the warning sign

📖 Jesus answers both across this whole chapter

# Mark 13:5-8
# ⚔️ Wars And Rumours Of Wars
---
## 🚫 Take Heed Lest Any Man Deceive You

Jesus opens His entire answer with a warning about being deceived.

That warning comes before any mention of wars, signs, or disasters.

Being fooled about the timing matters more to Him than the events themselves.

Everything that follows in this chapter gets filtered through this one command.

🚫 Jesus opens with a warning, not a timeline

🎭 Deception matters more than disasters here

🧭 This command filters everything that follows

📖 Watching for truth comes before watching for signs

## 👤 Many Shall Come In My Name, Saying, I Am Christ

Several men did claim to be the promised deliverer in the years before Jerusalem fell.

Claiming to come in Jesus's name means claiming His own authority and identity falsely.

These men were not denying Jesus outright, they were impersonating Him.

A counterfeit is far harder to spot than an obvious enemy.

👤 Several men later claimed to be the Messiah

🎭 They claimed Jesus's own identity falsely

🙅 They did not deny Jesus, they impersonated Him

📖 A counterfeit is harder to spot than enemies

## ⚔️ Wars And Rumours Of Wars, Be Ye Not Troubled

Wars and rumors of coming wars sound like the end of the world to an anxious reader.

Jesus tells His disciples plainly not to let that fear control them.

Such events were a constant feature of the ancient world, not a brand new sign.

Fear, here, is treated as a danger just as real as the wars themselves.

⚔️ Wars and rumors were a constant ancient reality

🙅 Jesus tells them plainly not to fear

🌍 These were not a brand new sign

📖 Fear itself is treated as a real danger

## 🌍 Nation Shall Rise Against Nation, And Kingdom Against Kingdom

This phrase describes widespread, large scale conflict between whole peoples.

It echoes language Old Testament prophets already used for past times of judgment.

Jesus is not describing something unprecedented in human history.

He is naming a pattern that keeps repeating until the end comes.

🌍 This describes conflict between whole nations

📜 Old Testament prophets used this language before

🔁 Jesus names a pattern, not something new

📖 The pattern repeats until the end arrives

## 🌊 Earthquakes In Divers Places, And Famines And Troubles

"Divers" is an old word that simply means various or several.

Earthquakes and famines were genuinely common disasters across the ancient Near East.

Jesus lists them together as ordinary hardships, not as a secret countdown.

Naming them side by side shows how widespread this kind of suffering would be.

🌊 Divers means various or several, not water

🌾 Earthquakes and famines were common ancient disasters

⏳ Jesus lists these as hardship, not a countdown

📖 Together they show how widespread suffering would be

## 👶 These Are The Beginnings Of Sorrows

"Sorrows" here actually translates a word used for labor pains before childbirth.

Labor pains increase and intensify, but they are not the birth itself.

Jesus is telling His disciples that wars and disasters are not the end.

They are only the first contractions of something much bigger still to come.

👶 Sorrows here means labor pains, not grief

📈 Labor pains build in intensity over time

🙅 Wars and disasters are not the end yet

📖 These are first contractions, not the birth

# Mark 13:9-13
# 🗣️ A Testimony Against Them
---
## ⚖️ Deliver You Up To Councils

Councils here means local Jewish courts with real power to judge and punish.

The book of Acts later shows the apostles standing trial in exactly this kind of setting.

Being beaten in the synagogues meant punishment from their own religious community, not Rome.

Jesus is warning that opposition would come from their own people first.

⚖️ Councils were local courts with real power

📜 Acts later shows this happening to the apostles

🏛️ Synagogue beatings came from their own community

📖 Opposition would come from their own people first

## 📢 For A Testimony Against Them

Being dragged before rulers and kings sounds like pure loss at first glance.

Jesus reframes it as an opportunity to speak the truth to powerful people.

A testimony here means a formal, public statement about who Jesus is.

Even a hostile courtroom becomes a stage instead of only a trap.

📢 A trial sounds like pure loss at first

🎤 Jesus reframes it as a chance to speak

⚖️ Testimony means a formal, public statement

📖 A courtroom becomes a stage, not a trap

## 🌍 The Gospel Must First Be Published Among All Nations

This single line turns persecution into something with a real purpose.

Trials before kings and rulers become unexpected opportunities, not just suffering to survive.

Being dragged in front of powerful people meant the gospel reached powerful ears.

Suffering and spreading the message are not two separate stories here, they are one.

🌍 The gospel reaches all nations through this

👑 Trials before rulers become unexpected opportunities

🎤 Suffering put the message in powerful ears

📖 Suffering and spreading become one story

## 🗣️ Take No Thought Beforehand What Ye Shall Speak

This is not a promise that ordinary preaching requires no preparation at all.

This promise applies specifically to the moment of being dragged before a hostile court.

In that one moment, the Holy Ghost himself supplies the words needed.

Fear in that courtroom does not have to mean silence or failure.

🗣️ This applies to hostile courtrooms, not daily preaching

⚖️ It is a promise for that one moment

🕊️ The Holy Ghost supplies the words needed

📖 Fear in that moment does not mean failure

## 👪 The Brother Shall Betray The Brother To Death

Persecution in this chapter does not stay safely outside the family.

Family loyalty was one of the strongest bonds in that entire culture.

Jesus predicts that even that bond would break under pressure to conform.

Betrayal from inside a family cuts deeper than hostility from strangers.

👪 Even family bonds would break under pressure

🤝 Family loyalty was a strong ancient bond

💔 Betrayal from family cuts deeper than strangers

📖 No relationship is safe from this pressure

## 👶 Children Shall Rise Up Against Their Parents

This is the same warning as the line before it, aimed in a different direction.

Children turning against parents who disagreed with their new faith genuinely happened in the early church.

Choosing Jesus could cost a believer the people closest to them in this life.

Jesus never hides how costly this choice could actually become.

👶 This mirrors the warning before it

📜 This genuinely happened in the early church

💔 Choosing Jesus could cost close relationships

📖 Jesus never hides how costly this could be

## 😔 Hated Of All Men For My Name's Sake

This hatred is not random or unexplained in this verse.

It comes specifically because of loyalty to Jesus's own name and identity.

The phrase ties the suffering directly back to who is being followed.

The hatred is the cost, and Jesus names the cost plainly.

😔 This hatred has a specific cause

🔗 It comes from loyalty to Jesus's name

💸 The verse names the actual cost plainly

📖 Jesus never hides what following Him may cost

## 🏁 He That Shall Endure Unto The End, The Same Shall Be Saved

"Endure" does not mean never feeling fear or never wanting to quit.

It means continuing to follow Jesus despite real pressure to deny Him.

Salvation here is tied to lasting faithfulness, not a single moment of belief.

This verse is a promise of final rescue for whoever keeps going.

🏁 Endure means continuing despite fear or pressure

🙅 It does not mean feeling no fear

🤝 Faithfulness over time matters, not one moment

📖 The promise is rescue for those who continue

# Mark 13:14-20
# 🏃 Flee To The Mountains
---
## 📜 The Abomination Of Desolation

This exact phrase comes from the prophet Daniel, written centuries earlier.

Daniel used it for a pagan act of defilement set up inside God's own temple.

Mark adds a quiet note telling the reader to pay careful attention here.

Jesus is pointing to a future repeat of that same kind of defilement.

📜 The phrase comes from the prophet Daniel

🏛️ It describes defiling God's own temple

⚠️ Mark flags this detail for careful attention

📖 Jesus points to a future repeat of it

## 🏃 Let Them That Be In Judaea Flee To The Mountains

This is not vague spiritual advice about fleeing temptation or sin.

This is a specific, practical instruction to physically run from Jerusalem's coming danger.

Early Christian writers later recorded believers actually obeying this exact warning in the year seventy.

Faith here looks like fast, literal obedience, not calm waiting.

🏃 This is literal advice, not a metaphor

🏙️ Jerusalem faced real coming danger

📜 Believers obeyed this warning in seventy

📖 Faith here means fast, literal obedience

## 🏠 Not Go Down Into The House

Houses in that culture had flat roofs with outside stairs leading up to them.

Someone on the roof could flee straight down the outside stairs without entering the house.

Going back inside to grab belongings would cost precious, dangerous time.

Jesus is describing the kind of urgency that leaves no room for packing.

🏠 Flat roofs had outside stairs for access

⏱️ Going inside first would waste dangerous time

🎒 There was no time to pack belongings

📖 The urgency Jesus describes allows no delay

## 🌾 Not Turn Back Again For To Take Up His Garment

A field worker in that culture often left an outer garment at the edge of the field.

Turning back for it meant walking away from the direction of escape.

Jesus repeats the same urgency from the housetop warning in a different setting.

Even one small, understandable detour could cost someone their life that day.

🌾 Field workers left an outer garment nearby

🔄 Turning back meant walking away from escape

🏠 This repeats the housetop warning differently

📖 Even a small detour could cost a life

## 🤰 Woe To Them That Are With Child, And To Them That Give Suck

Pregnant women and nursing mothers could not run as fast or as far.

Jesus names this specific hardship because it was a real, physical limitation, not an afterthought.

Compassion sits right inside a warning about coming disaster.

He is thinking about the people who would struggle the most to obey it.

🤰 Pregnant and nursing mothers could not flee quickly

💔 Jesus names a real physical hardship

🧡 Compassion sits inside this hard warning

📖 He thinks of those who would struggle most

## ❄️ Pray Ye That Your Flight Be Not In The Winter

Winter made travel, river crossings, and finding shelter far harder for anyone fleeing.

Praying about the timing of a disaster shows that prayer and practical planning work together.

Jesus does not treat prayer and preparation as opposites.

A believer can pray for mercy and still plan wisely at the same time.

❄️ Winter made travel and shelter much harder

🙏 Prayer and planning work together here

🤝 Jesus treats them as partners, not opposites

📖 A believer can pray and plan at once

## 😱 Such As Was Not From The Beginning Of The Creation

This tribulation is described as worse than anything since the world began.

That kind of language signals an event of total, historic severity.

Yet the very next verse says God himself shortens those very days.

Even the worst suffering described here stays firmly under God's control.

😱 This tribulation is worse than any before it

📏 The language signals total historic severity

✂️ God himself shortens those very days

📖 Even the worst suffering stays under God's control

## ✂️ Except That The Lord Had Shortened Those Days

Without God stepping in, this verse says no one at all would survive.

God's own choice to shorten the days is what makes survival possible.

The elect are those God has chosen and set apart for himself.

The worst tribulation described in this chapter still ends on a note of mercy.

✂️ God himself shortens the days described here

🙅 Without this, no one would survive

🫂 Elect means those God has chosen

📖 Even this chapter's worst section ends in mercy

# Mark 13:21-23
# 🎭 False Christs And False Prophets
---
## 🎭 Lo, Here Is Christ, Or, He Is There

Jesus repeats almost the exact warning He opened this whole chapter with.

Repetition here is not an accident or a careless copy.

He is showing that this danger stays constant through every stage of what is coming.

A reader should feel this warning land twice as heavy the second time.

🎭 Jesus repeats His opening warning on purpose

🔁 Repetition is not an accident here

⏳ This danger stays constant through every stage

📖 The warning lands twice as heavy here

## ✨ Shall Shew Signs And Wonders

A miracle on its own was never meant to prove someone speaks for God.

False prophets in this verse perform real, convincing signs, not obvious tricks.

Deuteronomy already warned Israel about this exact danger long before this chapter.

The real test for truth was never spectacle alone, it was faithfulness to God's word.

✨ A miracle alone never proves a true prophet

🎩 False prophets can perform real, convincing signs

📜 Deuteronomy warned Israel about this danger already

📖 The real test is faithfulness to God's word

## 👀 Behold, I Have Foretold You All Things

Jesus closes this warning by pointing back to His own words.

Being warned in advance removes the excuse of claiming surprise later.

This line is not a threat, it works as a kind of protection.

A forewarned reader is far harder to deceive than a surprised one.

👀 Jesus points back to His own warning

🙅 Being warned removes the excuse of surprise

🛡️ This line protects rather than threatens

📖 A forewarned reader is harder to deceive

# Mark 13:24-27
# ☁️ Coming In The Clouds
---
## 🌑 The Sun Shall Be Darkened

Old Testament prophets used a darkened sun and moon as pictures of major turning points in history.

Isaiah and Joel both used this exact kind of imagery for past historical judgments.

The image signals that something enormous is happening, more than an ordinary event.

This kind of language announces weight, not a literal forecast about the sky.

🌑 Darkened sun and moon were prophetic imagery

📜 Isaiah and Joel used this for past judgments

📢 It signals something enormous is happening

📖 It announces weight, not a literal forecast

## ☁️ The Son Of Man Coming In The Clouds With Great Power And Glory

"Son of man" is the title Jesus uses most often for himself.

The phrase comes from Daniel, where this very figure receives authority directly from God.

Coming in the clouds was a way ancient readers pictured arriving with divine authority.

This line answers the disciples' opening question with the clearest sign of all.

☁️ Son of man is Jesus's own favorite title

📜 The phrase comes from the prophet Daniel

👑 Clouds pictured arriving with divine authority

📖 Jesus himself returning is the clearest sign

## 📯 Gather Together His Elect From The Four Winds

This is the same elect named earlier in this chapter's hardest section.

The four winds is a way of saying every direction, the whole earth.

Angels gathering them pictures a rescue that reaches every scattered corner.

No distance and no scattering can place anyone beyond this gathering.

📯 This is the same elect named earlier

🧭 Four winds means every direction on earth

🕊️ Angels gather them from everywhere scattered

📖 No distance is too far for this rescue

## 🌏 From The Uttermost Part Of The Earth To The Uttermost Part Of Heaven

This phrase pairs two opposite extremes to describe total completeness.

Ancient writers often named two far extremes to mean absolutely everything between them.

Nothing on earth and nothing in heaven sits outside this gathering's reach.

The phrase is not about distance, it is about the totality of the rescue.

🌏 This pairs two extremes to mean everything

📏 Naming two ends was a common ancient style

🌌 Nothing in heaven or on earth is excluded

📖 This is about totality, not just distance

# Mark 13:28-31
# 🌿 Learn A Parable Of The Fig Tree
---
## 🌿 When Her Branch Is Yet Tender

Fig trees in that region lose their leaves completely every winter.

New, soft leaves on the branch were a reliable sign that summer was near.

Nobody needed a calendar to know this, the tree itself announced the season.

Jesus asks His disciples to read the coming signs this same simple way.

🌿 Fig trees lose their leaves each winter

🍃 Tender new leaves signaled summer was near

👀 The tree itself announced the season

📖 Jesus asks disciples to read signs simply

## 🚪 Know That It Is Nigh, Even At The Doors

"Nigh" is an old word that simply means near or close.

The doors here pictures something standing right outside, ready to enter at any moment.

Jesus wants watchfulness to feel urgent, not distant or theoretical.

The image puts the reader right at the threshold of what is coming.

🚪 Nigh is an old word meaning near

🚶 Doors pictures something ready to enter now

⏰ Jesus wants watchfulness to feel urgent

📖 The reader stands right at the threshold

## ⏳ This Generation Shall Not Pass, Till All These Things Be Done

Many readers assume this generation must mean the end of the entire world.

Many scholars believe Jesus points specifically to the temple's destruction described earlier in this chapter.

That event did happen within the lifetime of people listening to Him that day.

Reading this line back to the temple keeps it tied to what Jesus actually just said.

⏳ This generation likely points to the temple's fall

🏛️ That links back to verse two directly

📆 It happened within the hearers' own lifetime

📖 This keeps the saying tied to its context

## 📖 My Words Shall Not Pass Away

Jesus compares His own words to the most permanent things people could imagine.

Even heaven and earth, in that comparison, come out as temporary.

Everything else described in this chapter is unstable, uncertain, even frightening.

His words alone are offered as the one thing that will never fail.

📖 Jesus compares His words to heaven and earth

⏳ Heaven and earth are called temporary here

😨 Everything else in this chapter feels uncertain

➡️ His words are what will not fail

# Mark 13:32-37
# 🕰️ Watch, Therefore
---
## 🕰️ Of That Day And That Hour Knoweth No Man

This verse shifts the subject from the temple's fall to something else entirely.

No specific date for this final day is given anywhere in this chapter.

Jesus says even He, in His earthly limitation, did not know that exact timing.

Trying to calculate a date misses the entire point of this warning.

🕰️ This verse shifts to a different day

📅 No specific date is given anywhere here

🙅 Even Jesus did not know the exact timing

📖 Calculating a date misses the whole point

## 🙏 Watch And Pray, For Ye Know Not When The Time Is

Watching and praying are given here as one combined posture, not two separate tasks.

Not knowing the timing is the actual reason given for staying alert.

Uncertainty, in this verse, becomes the reason to stay ready rather than relax.

Jesus links alertness directly to prayer, not just careful calculation.

🙏 Watching and praying are one combined posture

❓ Not knowing the timing is the given reason

🧭 Uncertainty becomes a reason to stay ready

📖 Jesus links alertness directly to prayer

## 🚪 As A Man Taking A Far Journey

Think of an employer leaving town for an extended trip.

He hands real responsibility to his servants rather than leaving the house empty.

Each servant has a specific job, and the porter watches the door for his return.

Readiness here means steady, ongoing work, not standing idle at a window.

🚪 An employer leaves servants in charge

💼 Each servant has a specific job

🚶 The porter watches the door for his return

📖 Readiness means steady work, not idle waiting

## 🌙 At Even, Or At Midnight, Or At The Cockcrowing, Or In The Morning

These four phrases name the four watches of the Roman night.

Naming all four covers every single possible hour someone might return.

No window of time gives a servant an excuse to let their guard down.

The uncertainty itself is the whole point of staying ready at all.

🌙 These four watches cover the entire night

⏰ No hour gives an excuse to relax

🛡️ Uncertainty itself is the reason to stay ready

📖 Readiness has to last through every watch

## 😴 Lest Coming Suddenly He Find You Sleeping

Sleeping here pictures a servant caught completely off guard, not literal rest.

Sudden means the master's return will not wait for a convenient moment.

Being caught unprepared would undo all the responsibility given earlier in the parable.

Jesus names this exact danger so no listener can claim they were never warned.

😴 Sleeping pictures being caught off guard

⏱️ Sudden means no convenient moment is promised

⚠️ Being caught unprepared undoes real responsibility

📖 Jesus names this so no one is unwarned

## 👀 What I Say Unto You I Say Unto All, Watch

This final word is not addressed only to the four disciples sitting there.

Jesus deliberately widens it to include every single person who will ever hear it.

"Watch" sums up everything said since verse five into one single command.

The entire discourse ends not with a date, but with a posture to hold.

👀 This command widens beyond the four disciples

🌍 It includes everyone who will ever hear it

🔑 Watch sums up the whole chapter

📖 The chapter ends on posture, not a date`.trim();

export const MARK_THIRTEEN_PERSONAL_SECTIONS = parseMarkThirteenRawNotes(MARK_THIRTEEN_RAW_NOTES);
