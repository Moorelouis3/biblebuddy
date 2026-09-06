export type PsalmsThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyThreeRawNotes(rawText: string): PsalmsThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 33:${startVerse}` : `Psalms 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 33 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_THREE_RAW_NOTES = `# Psalms 33:1-4
# 🎉 Rejoice In The LORD, O Ye Righteous
---
## 🎉 Rejoice In The LORD, O Ye Righteous

"Rejoice" here is a command, not a passing feeling.

"Righteous" describes someone made right with God, not someone without flaw.

David is not calling out a small, elite group.

He is calling everyone who has already been made right with God.

🎉 Rejoice means a command, not a mood
✅ Righteous means made right with God
🙌 The call goes out to everyone made right
📖 Worship starts once a person is made right

## 🙌 Praise Is Comely For The Upright

"Comely" means fitting, the way a coat fits a shoulder it was cut for.

Praise is not something forced onto the upright from outside.

It is the natural response of a heart already leaning toward God.

The upright do not need to be talked into worship.

🙌 Comely means fitting, not forced
🧵 Praise fits the upright, like a coat
❤️ Worship flows naturally from an aligned heart
➡️ The upright are drawn to praise, not pushed

## 🎵 Praise The LORD With Harp

The harp was one of the most common instruments in ancient Israel.

It was small enough to carry anywhere.

People played it standing, sitting, or walking.

David himself was known as a skilled harp player before he was king.

This instrument was not reserved for professionals only.

🎵 Harps were common, portable instruments
🚶 People played it standing or walking
👑 David played harp long before his throne
📖 Ordinary instruments were fit for worship

## 🎻 Sing Unto Him With The Psaltery And An Instrument Of Ten Strings

"Psaltery" was a stringed instrument similar to a small harp or zither.

The "instrument of ten strings" was likely a separate, larger stringed instrument.

Naming several instruments together is a way of describing a full orchestra.

This is not one lonely voice praising God.

It is a whole assembly of sound.

🎻 Psaltery means a small stringed instrument
🎼 Ten strings names a separate instrument
🎶 Together they describe a full ensemble
📖 Worship here is a shared, layered sound

# Psalms 33:5-9
# 🌌 By The Word Of The LORD Were The Heavens Made
---
## ⚖️ He Loveth Righteousness And Judgment

"Judgment" here means fair and right ruling, not condemnation.

God does not simply tolerate righteousness the way a rule gets tolerated.

He loves it the way a person loves something close to their heart.

That love shapes everything He does toward the world.

⚖️ Judgment means fair, right ruling
❤️ God loves righteousness, does not just allow it
🌍 That love shapes how He treats the world
📖 God's actions flow from what He loves

## 🌍 The Earth Is Full Of The Goodness Of The LORD

This line follows straight from the verse before it on purpose.

Because God loves righteousness, that love spills out into creation itself.

"Goodness" here is not a vague feeling but something visible and touchable.

A reader could point to the world around them as proof of it.

🌍 Goodness fills the whole earth
🔗 This follows from His love of right
👀 Goodness is visible, not just felt
📖 Creation itself is evidence of God's character

## 🌌 By The Word Of The LORD Were The Heavens Made

God did not build the heavens with tools or effort.

He spoke, and the heavens simply existed.

This is the same creation pattern described in Genesis chapter one.

Speech alone was enough because the one speaking is God.

🌌 The heavens came from spoken words
🛠️ No tools or effort were needed
📜 This matches the pattern in Genesis one
📖 God's word alone is enough to create

## ⭐ All The Host Of Them By The Breath Of His Mouth

"Host" is an old word for a vast, organized group, often an army.

Here it describes the stars, pictured like a great army lined up in the sky.

"Breath of his mouth" pairs with "word" from the line before it.

Speaking and breathing out are the same creative act described two ways.

⭐ Host means a vast, organized group
🌠 Here it pictures the stars as an army
🌬️ Breath of his mouth parallels his word
📖 Speaking and breathing describe one act

## 🌊 He Gathereth The Waters Of The Sea Together As An Heap

This line echoes Genesis, where God gathered the waters into one place.

"As an heap" pictures the sea piled up, held back on purpose.

The same picture appears again when Israel crosses the Red Sea.

Water that could drown a nation instead obeys God's command.

🌊 This echoes the waters gathered in Genesis
🧱 An heap pictures water piled up on purpose
🚶 The Red Sea shows the same picture again
➡️ Even the sea obeys God's command

## 🏚️ He Layeth Up The Depth In Storehouses

Ancient people pictured the deep ocean as a vast reserve held somewhere unseen.

"Storehouses" were buildings used to hold grain and supplies for later use.

The psalm borrows that everyday picture to describe the ocean's depths.

Nothing about creation is random or uncontained in this picture.

🏚️ Storehouses were buildings for holding supplies
🌊 The deep is pictured the same way
📦 Even the ocean is kept, not scattered
📖 Creation is controlled, not random

## 😨 Let All The Earth Fear The LORD

"Fear" here means deep reverence, not terror or dread.

It is the response of standing before something far greater than yourself.

This fear does not push people away from God.

It is the beginning point that leads a person toward Him.

😨 Fear means reverence, not terror
🌍 This call goes out to the whole earth
🙇 Reverence draws a person toward God
📖 True fear of God is a starting point

## 😮 Let All The Inhabitants Of The World Stand In Awe Of Him

This line repeats the idea of the line before it in different words.

That repeating pattern is called parallelism, common throughout Hebrew poetry.

Saying the same truth twice, two ways, gives it weight.

Fear and awe are not two separate reactions here.

They are the same response, stated for emphasis.

😮 This repeats verse eight in new words
📜 That pattern is called parallelism
⚖️ Repetition in Hebrew poetry adds weight
📖 Fear and awe describe one response

## 🗣️ For He Spake, And It Was Done

This line summarizes everything said about creation so far in the psalm.

There is no gap between God's word and the result.

Human plans often fail between the idea and the outcome.

God's word never runs into that gap.

🗣️ God's word and result are simultaneous
⏳ Human plans usually face delay or failure
🚫 God's word never runs into that gap
📖 What God speaks becomes reality at once

## 🧱 He Commanded, And It Stood Fast

"Stood fast" means it remained fixed, not fragile or temporary.

What God commands into existence does not wobble or fade later.

This closes out the section on creation with a note of permanence.

The world was not a lucky accident that might still collapse.

🧱 Stood fast means fixed, not fragile
🏗️ What God commands does not fade
🎯 Creation was not a lucky accident
📖 God's commands come with permanence built in

# Psalms 33:10-12
# 🏛️ The Counsel Of The LORD Standeth For Ever
---
## 🚫 The LORD Bringeth The Counsel Of The Heathen To Nought

"Heathen" is an old word for nations outside God's covenant with Israel.

"Counsel" means their plans, strategies, or intended course of action.

"To nought" means those plans come to nothing in the end.

The psalm shifts here from creation to God's rule over nations.

🚫 Heathen means nations outside the covenant
🧠 Counsel means their plans or strategy
💨 To nought means those plans fail
📖 The psalm now turns to God ruling nations

## 🗑️ He Maketh The Devices Of The People Of None Effect

"Devices" means schemes, often ones built in secret or with cunning.

"Of none effect" means the scheme produces no real result at all.

This is not a passive failure that happens on its own.

God actively frustrates plans that stand against Him.

🗑️ Devices means secret schemes or plots
🚧 None effect means the plan produces nothing
✋ God actively frustrates these schemes
📖 Opposition to God does not simply fizzle out

## 🏛️ The Counsel Of The LORD Standeth For Ever

This verse flips the picture from the two lines before it.

Human plans fail, but God's plan never does.

"Standeth for ever" describes something that cannot be undone by time or opposition.

Nations rise and pass away, but this counsel remains.

🏛️ God's counsel never fails like man's does
⏳ Standeth for ever means unshaken by time
👑 Nations rise and fall around it
📖 Only God's plan is truly permanent

## 💭 The Thoughts Of His Heart To All Generations

"Thoughts of his heart" describes God's deepest intentions, not passing ideas.

These intentions were not made for one moment or one nation only.

They stretch across every generation that will ever live.

A promise made to Israel long ago still reaches readers today.

💭 Thoughts of his heart means deep intentions
🌍 They were never limited to one nation
⏳ They stretch across every generation
📖 An ancient promise still reaches readers now

## 🙏 Blessed Is The Nation Whose God Is The LORD

This verse names the specific benefit of belonging to this God.

Blessing here is tied directly to who a nation worships.

Many ancient nations worshiped gods tied to weather, war, or fertility alone.

Israel's God was not limited that way.

🙏 Blessing is tied to who is worshiped
🌦️ Other ancient gods were limited to one role
🌍 Israel's God was not confined that way
📖 The right God brings the real blessing

## 👑 The People Whom He Hath Chosen For His Own Inheritance

"Inheritance" describes something kept and treasured, passed down on purpose.

God is not describing Israel as property to be used and discarded.

He is describing a people He chose to keep close, permanently.

This word appears throughout the Old Testament for Israel's covenant relationship.

👑 Inheritance means kept and treasured
🤝 Israel was chosen, not merely used
📜 This covenant word appears often for Israel
📖 God keeps His chosen people close

# Psalms 33:13-15
# 👁️ He Beholdeth All The Sons Of Men
---
## 👁️ The LORD Looketh From Heaven

This line begins a new section, shifting from nations to individuals.

"Looketh from heaven" pictures God observing from a position above all things.

Nothing about His view is limited or partial.

This is not a distant glance but a constant, attentive watch.

👁️ God looks from a position above all
🌍 His view is not limited or partial
👀 This is a constant watch, not a glance
📖 The psalm moves from nations to persons

## 👀 He Beholdeth All The Sons Of Men

"Sons of men" is simply a Hebrew way of saying all humanity.

"Beholdeth" carries more weight than a quick look.

It means paying full, careful attention to what is seen.

No person is too small or too distant to be seen this way.

👀 Sons of men means all humanity
🔍 Beholdeth means careful, full attention
🌍 No one is too small to be seen
📖 God's attention covers every single person

## 🏠 From The Place Of His Habitation

"Habitation" means a dwelling place, the location where someone lives.

Here it pictures heaven as God's throne room and home.

This detail matters because it shows His view is not limited by distance.

A ruler far away can still see everything happening below.

🏠 Habitation means a dwelling place
👑 Heaven is pictured as God's throne room
🌍 Distance does not limit His sight
📖 A far off ruler still sees everything

## 🌍 He Looketh Upon All The Inhabitants Of The Earth

This line repeats the idea from two lines earlier, using new words.

That repetition, common in Hebrew poetry, drives the point home twice.

Every single person on earth falls under this same gaze.

No nation and no individual sits outside of it.

🌍 This repeats an earlier line in new words
📜 Hebrew poetry often drives a point home twice
🧍 Every person falls under this same gaze
📖 No one sits outside God's sight

## ❤️ He Fashioneth Their Hearts Alike

"Fashioneth" means shaped or formed, the same word used for a potter's work.

"Alike" means every person shares the same basic Maker and design.

This quietly undercuts any nation's claim to be inherently superior.

Every heart, in every nation, was formed by the same hands.

❤️ Fashioneth means shaped, like a potter's work
🧑‍🤝‍🧑 Alike means everyone shares the same Maker
🚫 No nation is inherently above another
📖 One Maker formed every heart

## 📋 He Considereth All Their Works

"Considereth" means thinking something over carefully, not glancing past it.

This closes the section by pairing what God sees with what He weighs.

He does not only observe actions from a distance.

He evaluates them with full attention and understanding.

📋 Considereth means careful, weighed attention
👀 God does not just observe from far off
⚖️ He evaluates what He sees
📖 Nothing done escapes God's full understanding

# Psalms 33:16-19
# 🐴 An Horse Is A Vain Thing For Safety
---
## 👑 There Is No King Saved By The Multitude Of An Host

"Multitude of an host" means the sheer size of an army.

Ancient kings often measured their safety by how many soldiers they could field.

This verse names that confidence directly and rejects it.

A large army was never the real source of a king's protection.

👑 Multitude of an host means army size
🛡️ Kings often trusted sheer troop numbers
🚫 That numbers based safety gets rejected here
📖 Army size was never the true protection

## 💪 A Mighty Man Is Not Delivered By Much Strength

This line applies the same lesson to a single warrior instead of a king.

Personal strength and skill in battle were highly prized in this culture.

Even that strength cannot guarantee deliverance on its own.

The psalm is dismantling every human source of confidence, one by one.

💪 Strength here means personal battle skill
🏋️ This culture prized strong, skilled warriors
🚫 That strength cannot guarantee deliverance alone
📖 Every human confidence gets dismantled here

## 🐴 An Horse Is A Vain Thing For Safety

Horses were expensive, valuable animals used heavily in ancient warfare.

An army with strong horses was considered far harder to defeat.

"Vain" means empty or useless, not simply weak.

The psalm calls this trusted war asset completely empty as a source of safety.

🐴 Horses were prized war animals
⚔️ Strong horses made an army feared
🚫 Vain means empty, not just weak
📖 Even horses cannot truly provide safety

## 🚫 Neither Shall He Deliver Any By His Great Strength

This line closes out the horse's failure with a flat statement.

"Great strength" here describes the raw power and speed of the animal.

None of that power translates into actual deliverance from danger.

The verse leaves no room to argue an exception.

🚫 Great strength means the horse's raw power
🏇 That power does not guarantee deliverance
🔒 No exception is left open here
➡️ Power without God still fails to save

## 👁️ Behold, The Eye Of The LORD Is Upon Them That Fear Him

"Behold" signals a turn, calling the reader to pay close attention now.

After naming every failed source of safety, the psalm names the real one.

"Fear him" again means reverence, the same meaning as verse eight.

God's eye replaces the army, the strength, and the horse all at once.

👁️ Behold signals an important turn
🔄 The psalm now names the real safety
🙇 Fear him means reverence, as in verse eight
📖 God's eye replaces every failed source

## 🤍 Upon Them That Hope In His Mercy

"Mercy" describes God's loyal, covenant kindness, not a passing feeling.

"Hope" here means confident expectation, not wishful thinking.

This mercy is not earned by strength, numbers, or skill.

It is simply received by those who look to God for it.

🤍 Mercy means loyal, covenant kindness
⏳ Hope means confident expectation, not wishing
🎁 This mercy is received, not earned
📖 Looking to God is what matters most

## 💀 To Deliver Their Soul From Death

This is the first of two real dangers the psalm names by name.

Death here is not abstract but a genuine, physical threat.

The eye of the LORD from the verse before this is not decoration.

It actively works to pull a person back from real danger.

💀 Death here is a real, physical danger
👁️ This connects directly to God's watching eye
✋ That eye actively works to protect
📖 God's care meets real danger, not theory

## 🌾 To Keep Them Alive In Famine

Famine was one of the most feared, common disasters in the ancient world.

A failed harvest could threaten an entire region for years at a time.

This verse pairs sudden death with slow, grinding hunger.

Both dangers, fast and slow, fall under the same protecting eye.

🌾 Famine was a common ancient disaster
⏳ It could threaten a region for years
⚖️ Sudden death and slow hunger are paired
📖 Every kind of danger falls under God's care

# Psalms 33:20-22
# 🙏 Our Soul Waiteth For The LORD
---
## ⏳ Our Soul Waiteth For The LORD

"Waiteth" means active, patient trust, not passive boredom.

The voice shifts here from talking about God to speaking directly to Him.

This waiting looks back at everything just described about God's care.

It is trust built on evidence, not a blind guess.

⏳ Waiteth means active, patient trust
🔄 The voice now speaks directly to God
🧠 This trust is built on evidence
📖 Waiting here follows real reasons to trust

## 🛡️ He Is Our Help And Our Shield

"Help" and "shield" are both battlefield words.

A shield does not attack but protects the one carrying it.

This picture directly answers the failed horse and army from verses sixteen through seventeen.

The real defense was never a weapon at all.

🛡️ Help and shield are battlefield words
🚷 A shield protects, it does not attack
🐴 This answers the failed horse from before
📖 God, not a weapon, is the real defense

## 😊 Our Heart Shall Rejoice In Him

This rejoicing answers the call from the very first verse of the psalm.

The psalm has moved from a command to rejoice to a settled reason for it.

Joy here is not manufactured or forced.

It grows naturally out of trust already placed in God.

😊 This answers the call from verse one
🔄 The psalm moves from command to reason
🌱 Joy grows out of trust, not effort
📖 Real joy follows real trust

## 🙌 We Have Trusted In His Holy Name

"Name" in this culture meant far more than a label for identifying someone.

A name represented a person's full character and reputation.

Trusting God's name means trusting who He has shown Himself to be.

"Holy" marks that character as set apart from anything ordinary.

🙌 Name means a person's full character
📜 It is more than a simple label
✨ Holy means set apart from ordinary
📖 Trusting the name means trusting who God is

## 🙏 Let Thy Mercy, O LORD, Be Upon Us

The psalm closes the way many psalms do, with a direct request.

After describing God's mercy at length, David now simply asks for it.

This is not empty repetition of ideas already stated.

It is the difference between believing something true and asking for it personally.

🙏 The psalm closes with a direct request
🔄 David asks for the mercy just described
🙋 Believing something and asking for it differ
📖 The psalm ends in personal prayer

## ⏳ According As We Hope In Thee

This final line ties the whole psalm back to its middle themes.

"Hope" here means the same confident expectation named in verse eighteen.

David is asking God to match His mercy to the depth of that hope.

The psalm that began with a command to rejoice ends in quiet trust.

⏳ Hope repeats the meaning from verse eighteen
🔗 This line ties back to the psalm's middle
🙏 David asks mercy to match his hope
📖 The psalm ends in quiet, settled trust
`.trim();

export const PSALMS_THIRTY_THREE_PERSONAL_SECTIONS = parsePsalmsThirtyThreeRawNotes(PSALMS_THIRTY_THREE_RAW_NOTES);
