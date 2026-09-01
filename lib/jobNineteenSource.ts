export type JobNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobNineteenRawNotes(rawText: string): JobNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 19:${startVerse}` : `Job 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 19 sections, received " + sections.length);
  }

  return sections;
}

const JOB_NINETEEN_RAW_NOTES = `# Job 19:1-6
# 😤 Job Fires Back At His Friends
---
## 😩 How Long Will Ye Vex My Soul

"Vex" means to torment or wear someone down with trouble.

Job is asking his three friends how much longer they plan to keep attacking him like this.

This is Job's response after three straight rounds of speeches accusing him of hidden sin.

He is exhausted from his suffering and from being lectured about it.

The question is not really asking for a number.

It is a cry for them to stop.

😩 Vex means to torment or wear down
🗣️ Job answers three rounds of accusations
😔 He is worn out by their lectures
📖 The question is really a plea to stop

## 💥 Break Me In Pieces With Words

Job pictures his friends' arguments as physical blows, not just talk.

"Break me in pieces" is a violent image for something being crushed and shattered.

Their careful speeches have not comforted him.

They have wounded him the same way a beating would.

Job is telling them plainly that words can do real damage.

💥 Break in pieces means crushed and shattered
🗣️ Their speeches feel like physical blows
🤕 Careful arguments have wounded him deeply
📖 Words can do real and lasting damage

## 🔟 These Ten Times Have Ye Reproached Me

"Reproached" means sharply blamed or shamed for wrongdoing.

"Ten times" is not a literal count of insults.

In Hebrew idiom, a round number like ten simply means many times or repeatedly.

Job is saying his friends have piled on the same accusation again and again.

He wants them to notice the pattern, not just the latest speech.

🔟 Ten times means many times, not literally ten
🗣️ Reproached means sharply blamed for wrongdoing
🔁 Job hears the same accusation repeated
📖 He wants them to notice the pattern

## 😳 Ye Make Yourselves Strange To Me

"Strange" here means acting like a stranger, not familiar or friendly.

Job says his own close friends now treat him like someone they barely know.

Men who once sat with him now approach him coldly.

The distance is not physical.

It is emotional and relational.

People who should know him best have stopped acting like they do.

😳 Strange means acting like a stranger
🥶 Old friends now treat him coldly
💔 The distance is emotional, not physical
📖 They have stopped acting like they know him

## 🤷 Mine Error Remaineth With Myself

Job briefly allows that he might be wrong about something.

"Mine error remaineth with myself" means any fault he has is his own to carry.

He is not asking his friends to fix him or judge him for it.

Job's point is that even a real mistake would still be his private business.

He is drawing a boundary around what they have any right to correct.

🤷 Error remaineth with myself means his own
🙅 He is not asking them to fix him
🚧 Job draws a boundary around correction
📖 Even a real fault stays his to carry

## 📣 Ye Will Magnify Yourselves Against Me

"Magnify" here means to make something look bigger and more important than it is.

Job accuses his friends of building themselves up by tearing him down.

Each time they correct him, they get to sound wise and righteous.

Job's suffering becomes the stage they use to look good.

He sees their arguments as self promotion dressed up as concern.

📣 Magnify means to inflate or build up
⚖️ They build themselves up by tearing him down
🎭 His suffering becomes their stage
📖 Job sees concern as self promotion

## 😖 Plead Against Me My Reproach

"Plead" here means to argue a case, the way a lawyer would in court.

Job pictures his friends prosecuting him using his own suffering as the evidence.

"My reproach" is the shame and disgrace he is already carrying.

They are not just discussing his pain.

They are using it against him in an argument.

Job feels like a defendant in a trial he never agreed to join.

😖 Plead means to argue a legal case
⚖️ Job's suffering becomes their evidence
🎯 They use his shame against him
📖 He feels like an unwilling defendant

## 💥 God Hath Overthrown Me

Job shifts from blaming his friends to naming the deeper problem.

"Overthrown" means knocked down and defeated completely.

Job says it is God, not his friends, who has brought him this low.

This is the real accusation underneath everything else he says in this chapter.

Job is not just suffering.

He believes God has personally acted against him.

💥 Overthrown means knocked down completely
🎯 Job names God as the real cause
🔄 The friends are not his true target
📖 Job believes God acted against him directly

## 🕸️ Compassed Me With His Net

"Compassed" means surrounded on every side, with no way out.

A net here is a hunting image, the same tool used to trap animals.

Job pictures himself caught by God the way prey is caught by a hunter.

He is not describing bad luck.

He is describing what feels like deliberate pursuit.

🕸️ Compassed means surrounded with no way out
🪢 A net is a hunter's trapping tool
🎯 Job pictures himself as trapped prey
📖 This feels like deliberate pursuit, not luck

# Job 19:7-12
# ⚔️ God Has Turned Against Me
---
## 🔇 I Cry Out Of Wrong But Am Not Heard

Job says he is shouting that he has been wronged, and nothing answers back.

He is not being quiet about his suffering.

He is not being patient in secret either.

Job is actively crying out, and the silence that follows is its own kind of pain.

Being ignored feels worse to him than being punished.

🔇 Job is actively crying out, not staying silent
📢 He calls his suffering a wrong
😶 No answer comes back to him
📖 Being ignored feels worse than punishment

## ⚖️ I Cry Aloud But There Is No Judgment

"Judgment" here means a fair legal ruling, the kind a court would give.

Job wants his case heard and decided, the way a judge would decide a lawsuit.

Ancient Near Eastern culture leaned heavily on public courts at the city gate for this kind of dispute.

Job feels like a man shouting for a trial that never gets scheduled.

No verdict ever comes, in either direction.

⚖️ Judgment means a fair legal ruling
🏛️ Job wants his case formally decided
🚪 Ancient courts met publicly at the city gate
📖 No verdict ever comes for him

## 🧱 He Hath Fenced Up My Way

"Fenced up" means blocked off completely, like a wall built across a road.

Job pictures God closing off every path forward he might try to take.

This is not one obstacle among many.

It is every direction sealed off at once.

Job feels trapped, not simply delayed.

🧱 Fenced up means completely blocked off
🚧 God closes off every path forward
🔒 Every direction is sealed, not just one
📖 Job feels trapped, not merely delayed

## 🌑 Set Darkness In My Paths

Darkness in this verse does not just mean nighttime.

It pictures confusion, danger, and an inability to see what is ahead.

Job says he cannot tell what is coming or how to move forward safely.

Even the ground in front of him feels unreadable.

Losing his way and losing his light are, for Job, the same experience.

🌑 Darkness pictures confusion and danger, not just night
👣 Job cannot see what is ahead
🗺️ Even the ground in front feels unreadable
📖 Losing light and losing direction feel the same

## 👑 Stripped Me Of My Glory

"Glory" here means Job's honor, wealth, and high standing in his community.

Job once held real status, both socially and publicly, as a respected elder.

He says God has taken that reputation away entirely, not just his health or property.

Public honor mattered enormously in this culture, often more than wealth itself.

Losing it left Job exposed in a way money alone would not explain.

👑 Glory means his honor and high standing
🏆 Job once held real public respect
📉 God removed that status, not just his health
📖 Public honor mattered more than wealth here

## 👒 Taken The Crown From My Head

This is not a literal royal crown.

It pictures the dignity and authority Job carried as a respected leader in his town.

Elders and community leaders in the ancient world were often pictured wearing symbolic crowns of honor.

Job says that symbolic crown has been removed in full view of everyone who once respected him.

His fall from honor happened publicly, not privately.

👒 Crown pictures dignity, not literal royalty
🧓 Job was once a respected community leader
👀 The symbolic crown was removed publicly
📖 His fall from honor was not private

## 🌳 Destroyed Me On Every Side

Job repeats the idea of total surrounding ruin, using different words this time.

"On every side" means there is no direction left that offers safety.

Every part of his life, health, family, and reputation has been struck at once.

This is not one wound.

It is total collapse from every angle.

Job describes ruin with no untouched corner left standing.

🌳 On every side means no safe direction left
💥 Every part of his life was struck
🩹 This is total collapse, not one wound
📖 No untouched corner of his life remains

## 🌲 Mine Hope Hath He Removed Like A Tree

Job compares his hope to a tree that has been uprooted completely.

A tree pulled out by its roots cannot simply be replanted and expected to live.

Job is not describing a hope that faded slowly.

He is describing a hope that was torn out at the source.

Without roots, there is nothing left to grow back from.

🌲 Hope compared to an uprooted tree
🌱 A tree without roots cannot be replanted
⚡ This hope was torn out, not faded
📖 Nothing is left to grow back from

## 🔥 Kindled His Wrath Against Me

"Kindled" means lit like a fire, starting small and then spreading.

Job says God's anger toward him has been deliberately set ablaze.

This is a strong claim.

Job believes God is not simply allowing his suffering.

He believes God is actively angry with him personally.

That belief is what makes this chapter so raw and painful to read.

🔥 Kindled means lit like a fire
😠 Job believes God is actively angry
🎯 This anger feels personal, not distant
📖 That belief makes the chapter so raw

## 👥 Counted As One Of His Enemies

Job says God now treats him the way a king would treat an enemy soldier.

This is the sharpest line in the section.

Job is not just unlucky in his eyes.

He is being fought against on purpose.

Nothing in Job's story actually justifies being called God's enemy.

The gap between what Job has done and how he feels treated is the whole tension of the book.

👥 God treats him like an enemy soldier
🎯 Job feels deliberately fought against
❓ Nothing in his story earns this label
📖 That gap is the whole book's tension

## ⛺ His Troops Encamp Round About My Tabernacle

Job pictures God's forces surrounding his home the way an army lays siege to a city.

"Tabernacle" here simply means his tent, his household, his home base.

A siege cuts off supply, escape, and safety all at once.

Job feels like a city under complete military blockade, not a man having a bad season.

Nothing about this image is small or ordinary.

It is total war.

⛺ Tabernacle means his tent or home
🪖 God's forces are pictured laying siege
🚧 A siege cuts off escape and safety
📖 Job feels like a city under total war

# Job 19:13-17
# 👪 Abandoned By Everyone I Know
---
## 👨‍👩‍👧 My Brethren Put Far From Me

"Brethren" means Job's own blood relatives, not just close friends.

Job says his family has been pushed away from him, and he believes God did the pushing.

Family loyalty was one of the strongest bonds in the ancient world.

Losing it was not a small social inconvenience.

It was one of the deepest losses a person in this culture could suffer.

👨‍👩‍👧 Brethren means Job's own blood relatives
🚪 Family has been pushed away from him
🤝 Family loyalty was a core ancient bond
📖 Losing it was one of the deepest losses

## 🙋 Mine Acquaintance Are Estranged From Me

"Estranged" means made distant, like a relationship that has quietly broken down.

"Acquaintance" here refers to the wider circle Job once knew well, not strangers.

People who used to greet him by name now avoid him entirely.

This is a second, wider circle of loss beyond just his immediate family.

The distance keeps spreading outward from Job the more the chapter goes on.

🙋 Estranged means made distant or broken off
👋 Acquaintance means people he once knew well
🚶 They now avoid him entirely
📖 Loss keeps spreading outward through the chapter

## 😞 My Kinsfolk Have Failed

"Kinsfolk" points to extended family, cousins and relatives beyond his immediate household.

Job expected support from this wider family circle in a crisis like this.

"Failed" means they did not show up when it mattered most.

Extended family obligation was a serious cultural expectation in the ancient Near East.

Job names this failure specifically because it broke a promise no one had to speak aloud.

😞 Kinsfolk means extended family and relatives
🤝 Job expected support from this circle
🚫 Failed means they did not show up
📖 An unspoken family duty was broken here

## 😢 My Familiar Friends Have Forgotten Me

"Familiar friends" means people who were genuinely close to him, not casual acquaintances.

These were the people Job likely trusted the most before his suffering began.

"Forgotten" is a strong word.

It means they act as though he no longer exists.

Job is not describing distance here.

He is describing erasure.

The people closest to him have let him disappear from their attention entirely.

😢 Familiar friends means his closest circle
🤝 These were people Job trusted most
🫥 Forgotten means acting as if he vanished
📖 The closest people let him disappear

## 🏠 Count Me For A Stranger

Job says even the people who live inside his own house now treat him as an outsider.

Servants and household members who once answered to him now keep their distance.

This detail lands harder than the earlier losses because it happens under his own roof.

A person can be pushed away by outsiders and still expect safety at home.

Job has lost even that.

🏠 His own household treats him as an outsider
🧑‍🤝‍🧑 Servants who once answered him now keep distance
🚪 This loss happens under his own roof
📖 He has lost safety even at home

## 🌍 I Am An Alien In Their Sight

"Alien" here means a foreigner, someone with no rightful place or belonging.

Job says the people who know him best now look at him like he is from somewhere else entirely.

This is not a stranger's reaction.

It is a familiar face suddenly treated as unfamiliar.

Job has not moved anywhere.

The people around him are the ones who have shifted how they see him.

🌍 Alien means a foreigner with no rightful place
👁️ Familiar faces now look at him as unknown
📍 Job has not moved, they have shifted
📖 Their view of him changed, not his location

## 🔇 I Called My Servant And He Gave No Answer

In this culture, a servant answering a master's call was expected without question.

Job says even that basic, guaranteed response has stopped happening.

If a servant will not answer a direct call, something has fundamentally broken in the household order.

This small detail carries enormous weight for how far Job's status has fallen.

Even people obligated to respond to him no longer do.

🔇 A servant answering was normally guaranteed
🧑‍🍳 Job says even that has stopped
🏚️ The household order has fundamentally broken
📖 Even obligated respect no longer comes to him

## 🙏 I Intreated Him With My Mouth

"Intreated" means begged or pleaded earnestly, not a casual request.

Job did not simply repeat the order.

He begged his own servant to respond.

A master reduced to begging his own servant shows just how far his authority has collapsed.

This detail is humiliating on purpose.

Job wants his friends to feel the full weight of how low he has fallen.

🙏 Intreated means begged earnestly, not casually
🗣️ Job begged his own servant to answer
📉 His authority has visibly collapsed
📖 Job wants the humiliation to be felt fully

## 💨 My Breath Is Strange To My Wife

"Breath" here likely points to Job's physical presence, worn down by illness and grief.

His own wife now reacts to him as if he were a stranger in her own home.

This may reflect the visible toll of Job's disease on his body.

It may also reflect how deeply the relationship itself has been strained by everything Job has lost.

Either way, the marriage that should be his closest bond has become distant too.

💨 Breath likely points to his worn physical presence
🤒 His illness may have changed how he seems
💔 His closest relationship has grown distant too
📖 Even his marriage was not spared

## 👶 For The Children's Sake Of Mine Own Body

Job says he begged for his wife's affection for the sake of the children they shared.

"Mine own body" is a Hebrew way of saying children born from him, his direct offspring.

This detail is heartbreaking given what the reader already knows.

Job's own children had already died earlier in the book, in chapter one.

He may be pleading in memory of them, or referring to any children still living.

👶 Mine own body means his direct offspring
💔 Job pleads in the name of his children
😢 This memory makes the plea more painful
📖 His children had already died in chapter one

# Job 19:18-22
# 💔 Even My Own Body Turns Against Me
---
## 🧒 Young Children Despised Me

Job says even young children in his community now look down on him with contempt.

"Despised" means viewed with open scorn, not simply avoided.

In this culture, being mocked by children was considered a uniquely shameful humiliation.

Adults were supposed to be shown basic respect, even by the very young.

Losing respect at every level of society, down to the youngest members, completed Job's public disgrace.

🧒 Despised means viewed with open scorn
😔 Even children mocked a grown man
🏘️ This was considered uniquely shameful in this culture
📖 His public disgrace reached every level of society

## 🗣️ They Spake Against Me

Job adds that these same children did not just mock him quietly.

They spoke out against him openly, likely mimicking the accusations circulating among adults.

Children often repeat what they hear at home without fully understanding it.

This detail suggests Job's reputation had become common talk throughout the whole community.

Even the youngest voices were repeating the same judgment against him.

🗣️ They spoke against him openly, not quietly
👂 Children likely repeated adult accusations
🏘️ His reputation had become common talk
📖 Even the youngest voices judged him

## 💔 All My Inward Friends Abhorred Me

"Inward friends" means the people Job trusted with his private, inner life.

"Abhorred" is a strong word meaning deep disgust, not mild disagreement.

These were not casual acquaintances reacting to gossip.

These were people who once knew Job closely and chose disgust anyway.

The betrayal cuts deeper because of how close these people once were.

💔 Inward friends means his closest confidants
🤢 Abhorred means deep disgust, not disagreement
🚪 These were close people, not strangers
📖 Closeness makes this betrayal cut deeper

## 🔄 They Whom I Loved Are Turned Against Me

Job names the direction of the betrayal plainly here.

These are not neutral people who simply drifted away.

They are people Job actively loved, who chose to turn and oppose him.

Love did not protect Job from betrayal in this case.

The people closest to his heart caused some of the deepest wounds in this chapter.

🔄 These people turned, they did not just drift
❤️ Job actively loved these people
⚔️ They chose to oppose him
📖 Closeness did not protect him from betrayal

## 🦴 My Bone Cleaveth To My Skin

"Cleaveth" means clings tightly, sticks fast, with nothing in between.

Job is describing his own body wasting away from illness and grief.

Normally muscle and flesh sit between bone and skin.

Job says his body has wasted away so completely that bone and skin now touch directly.

This is a vivid, physical picture of just how far his health has collapsed.

🦴 Cleaveth means clings tightly with nothing between
📉 Job describes his body wasting away
🩻 The flesh between bone and skin is gone
📖 This pictures how far his health has collapsed

## 😮‍💨 Escaped With The Skin Of My Teeth

This phrase has become a common English idiom, and it starts right here.

It means surviving by the narrowest possible margin, barely making it through.

Teeth do not actually have skin, which makes the image intentionally strange and vivid.

Job means he has barely, barely survived what has happened to him.

Nothing about his survival has felt comfortable or secure.

😮‍💨 This idiom began right here in Job
📏 It means surviving by the narrowest margin
🦷 Teeth have no skin, the image is strange
📖 Job's survival has felt anything but secure

## 🙏 Have Pity Upon Me Have Pity Upon Me

Job repeats this plea twice in a row, back to back.

Hebrew poetry often repeats a line for emphasis, not to add new information.

This repetition signals real desperation, not simply poetic style.

Job is not making an argument in this line.

He is begging.

After everything he has just described, this cry needs no further explanation.

🙏 The plea is repeated for emphasis
🔁 Hebrew poetry often repeats for weight
😢 This signals real desperation, not style
📖 After his losses, the cry needs no explanation

## ✋ The Hand Of God Hath Touched Me

"The hand of God" is a common Old Testament way to describe direct divine action.

Job is not blaming random misfortune or bad luck for his condition.

He is naming God specifically as the one responsible for what has happened to him.

This is the clearest, most direct accusation in the whole chapter.

Job wants his friends to understand exactly who he believes is behind his suffering.

✋ Hand of God pictures direct divine action
🎯 Job blames God, not random misfortune
🗣️ This is his most direct accusation yet
📖 Job names exactly who he believes caused this

## ❓ Why Do Ye Persecute Me As God

Job asks his friends why they are piling on when God has already struck him down.

"Persecute" means to hunt down and attack relentlessly.

If God has already judged him, why do his friends need to as well.

He is accusing them of adding cruelty on top of what he sees as divine judgment.

One attacker should be more than enough for any person to bear.

❓ Persecute means to hunt down relentlessly
🎯 Job asks why they pile on too
⚖️ God's judgment should be enough alone
📖 One attacker is already more than enough

## 🍖 Not Satisfied With My Flesh

"Flesh" here means Job's suffering body, already wasted by disease.

Job accuses his friends of wanting even more from him than what he has already lost.

He pictures their words as an appetite that his ruin has not yet fed.

This is a harsh, almost violent image for verbal cruelty.

Job feels like his friends are still hungry for his downfall.

🍖 Flesh means his already wasted body
😠 Job accuses them of wanting even more
🗣️ Their words feel like an appetite unfed
📖 His friends are hungry for his downfall

# Job 19:23-29
# ✝️ I Know That My Redeemer Liveth
---
## 📜 Oh That My Words Were Now Written

Job wishes his words could be permanently recorded, not just spoken and lost to the air.

He wants a lasting record of what he has said in this trial he feels trapped inside.

Job may want future generations to reach their own verdict, even if his friends will not.

Writing something down in the ancient world made it far more permanent than any spoken argument.

Job is asking for his testimony to outlive this moment.

📜 Job wants his words permanently recorded
⏳ Speech disappears, writing lasts
👥 He hopes future generations judge for themselves
📖 Job wants his testimony to outlive this moment

## 🗿 Printed In A Book

The word translated "printed" here really means engraved or inscribed, not printed like a modern book.

Job pictures his words carved into something lasting, not written on something fragile.

Books in Job's world were not paper.

They were often scrolls or tablets.

Job repeats his wish for permanence a second way, using a different image.

He wants no one to be able to erase or dispute what he has said.

🗿 Printed here means engraved, not modern printing
📃 Ancient books were scrolls or tablets, not paper
✍️ Job wants his words impossible to erase
➡️ He repeats his wish for permanence again

## ⚒️ Graven With An Iron Pen And Lead In The Rock

"Graven" means carved or engraved into a hard surface, not written with ink.

An "iron pen" was a chisel like tool used to carve letters into stone.

Filling the carved letters with melted lead made the words even more permanent and visible.

Job wants the most durable form of writing available in his world, cut into solid rock.

He is asking for words that could survive for centuries, long after he is gone.

⚒️ Graven means carved, not written with ink
🔨 An iron pen was a chisel like tool
🪨 Lead filled the letters for permanence
📖 Job wants words that could survive centuries

## ❤️ I Know That My Redeemer Liveth

"Redeemer" translates the Hebrew word goel, a legal term for a family protector.

A goel was the nearest relative responsible for defending a family member's rights, debts, or honor.

In the middle of his despair, Job suddenly declares confidence.

He believes his redeemer exists, and that this redeemer is alive.

This is one of the most quoted lines in the entire Old Testament.

Job's hope breaks through even in his darkest chapter.

❤️ Redeemer translates the Hebrew word goel
👨‍👩‍👧 A goel was a family protector and defender
✨ Job suddenly declares confident hope here
📖 Hope breaks through even in his darkest chapter

## 🌅 He Shall Stand At The Latter Day Upon The Earth

"The latter day" points toward a future moment beyond Job's present suffering.

Job is not only claiming his redeemer exists now.

He is claiming this redeemer will stand and act at some point still to come.

Many scholars see this as an early flicker of hope in a future resurrection or final vindication.

Job reaches past his current pain toward something certain still ahead of him.

🌅 Latter day points to a future moment
⏳ Job claims his redeemer will act later
✨ Many see an early hint of resurrection
📖 Job reaches past his pain toward hope

## 🪱 Though Worms Destroy This Body

Job speaks plainly about his own coming death and decay.

He does not flinch from naming what will physically happen to his body after he dies.

This blunt honesty makes his next line even more striking by contrast.

Job holds together two things at once, his certain death and his certain hope.

He does not look away from death to reach his hope.

🪱 Job names his own coming decay plainly
💀 He does not flinch from naming death
⚖️ This makes his next line more striking
📖 Job holds his death and hope together

## 👁️ In My Flesh Shall I See God

Job declares that he expects to see God, and to see Him in a real, embodied way.

"In my flesh" is a strong phrase, pointing to Job's own body somehow being part of this hope.

This is not Job describing a vague spiritual feeling.

He is naming a real, personal encounter he expects to have.

Whatever exact shape Job pictured, his hope reaches beyond death itself.

👁️ Job expects to see God, not feel Him
🦴 In my flesh points to his own body
🤝 Job names a real personal encounter
📖 His hope reaches beyond death itself

## 👀 Mine Eyes Shall Behold And Not Another

Job stresses that this will not be a secondhand report from someone else.

"Not another" means he will witness this himself, with his own eyes, not through a messenger.

Job wants to make sure his friends understand this hope belongs personally to him.

He is not describing a general future for all people in the abstract.

Job is claiming this promise for himself, by name.

👀 He will witness this himself, firsthand
🚫 Not another means no secondhand report
🙋 Job claims this hope personally, by name
📖 This is not an abstract promise for others

## 💓 Though My Reins Be Consumed Within Me

"Reins" is an old word for the kidneys, seen in ancient thought as the seat of deep emotion.

Job says his innermost feelings are being worn out and consumed by everything he has endured.

Modern readers might say "my heart is breaking" to describe the same kind of inner exhaustion.

Even as Job's inner self feels consumed, his declared hope still stands.

His hope does not weaken even as his body does.

💓 Reins is an old word for the kidneys
😢 Ancient thought placed deep emotion there
🔥 Job's inner self feels consumed and worn out
📖 His hope stands even as his body fails

## 🌱 The Root Of The Matter Is Found In Me

"The root of the matter" is an idiom for the real, true cause of something.

Job turns back to warn his friends directly after his statement of hope.

He insists that whatever they think is wrong with him, the real cause is not what they assume.

Job is not hiding a secret sin they have not found yet.

He wants them to stop searching in the wrong direction entirely.

🌱 Root of the matter means the true cause
🔍 Job turns to warn his friends directly
🙅 The real cause is not what they assume
📖 He wants their search to stop entirely

## ⚔️ Be Ye Afraid Of The Sword

Job closes with a warning, not a plea, this time.

"The sword" pictures God's coming judgment against wrongdoing, not a literal weapon in this line.

Job warns his friends that their harsh accusations could bring judgment on themselves.

Accusing an innocent man wrongly was treated seriously under this culture's understanding of justice.

Job's closing warning flips the courtroom picture from earlier in the chapter back onto his friends.

⚔️ The sword pictures coming judgment, not a weapon
⚠️ Job warns his friends about their accusations
⚖️ Wrongful accusation was taken seriously in this culture
📖 Job flips the courtroom image back onto them`.trim();

export const JOB_NINETEEN_PERSONAL_SECTIONS = parseJobNineteenRawNotes(JOB_NINETEEN_RAW_NOTES);
