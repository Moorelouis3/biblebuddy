export type PsalmsSixtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyFourRawNotes(rawText: string): PsalmsSixtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+64:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 64 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+64:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+64:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 64 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 64,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 64:${startVerse}` : `Psalms 64:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 64 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_FOUR_RAW_NOTES = `# Psalms 64:1-4
# 🏹 Words Sharpened Like Weapons
---
## 🛡️ Preserve My Life From Fear Of The Enemy

"Preserve" means much more than simply staying alive.

It describes being guarded and protected over time.

David names two different things he wants help with here.

One is the real danger coming from his enemy.

The other is the fear that danger creates inside him.

He is asking God to remove both the threat and the dread.

🛡️ Preserve means guarded over time
😨 Fear of the enemy is named directly
⚔️ Danger and dread are two different things
📖 David asks God to remove both

## 🤫 Hide Me From The Secret Counsel Of The Wicked

"Secret counsel" means a hidden plan made in private.

David is not afraid of an open argument here.

He is afraid of a plot he cannot see coming.

The wicked in this verse are not acting alone.

They are meeting together and forming a plan against him.

Hidden plans can hurt just as much as open attacks.

🤫 Secret counsel means a hidden plan
👥 The wicked are plotting together
👀 David cannot see this danger coming
📖 Hidden plans can hurt like open ones

## 🔥 The Insurrection Of The Workers Of Iniquity

"Insurrection" describes an organized revolt, not a lone outburst.

"Workers of iniquity" describes people who practice sin like a job.

This is not one bad choice or a single angry moment.

It describes people who return to wrongdoing again and again.

David faces a group with real structure behind their plotting.

This danger is organized, not random.

🔥 Insurrection means organized revolt
🛠️ Workers of iniquity means sin as a job
🔁 Wrongdoing repeated again and again
📖 David faces organized danger, not randomness

## 🗡️ Who Whet Their Tongue Like A Sword

"Whet" means to sharpen a blade before using it.

David compares his enemies' words to a sharpened sword.

Their tongue is not clumsy or careless in this picture.

It has been deliberately prepared to cut deep.

Cruel words can wound just as sharply as a blade.

Speech becomes a real weapon in these enemies' hands.

🗡️ Whet means to sharpen a blade
👅 The tongue is compared to a sword
🎯 These words are deliberately prepared
📖 Speech becomes a real weapon here

## 🏹 Bend Their Bows To Shoot Their Arrows, Even Bitter Words

This line continues the weapon picture from the line before it.

A bow and arrow were the long range weapons of that era.

David is still describing enemies, not literal soldiers.

"Even bitter words" tells the reader what the arrows really are.

Cruel speech can strike someone from a distance, without warning.

The whole picture describes cruel speech, not literal war.

🏹 Bows and arrows were long range weapons
🗣️ Even bitter words reveals the true meaning
😢 Cruel speech strikes without warning
📖 This pictures cruel speech, not literal war

## 🎯 That They May Shoot In Secret At The Perfect

"The perfect" does not mean someone who never sins.

In the Psalms it describes someone blameless and sincere toward God.

David likely uses this word to describe himself here.

"In secret" describes an ambush, not a fair fight.

His enemies attack an honest man from a hidden position.

Integrity does not protect David from being targeted.

🎯 The perfect means blameless, not sinless
🙋 David likely describes himself this way
🕶️ In secret describes an ambush
📖 Integrity does not stop this attack

## 😈 Suddenly Do They Shoot At Him, And Fear Not

"Fear not" here does not describe David's own courage.

It describes his enemies feeling no fear of consequences.

They fear no punishment, and they fear no God.

"Suddenly" adds the detail that David never sees this attack coming.

That combination is what makes the danger so severe.

Confidence with no fear of God turns into cruelty.

😈 Fear not describes the enemies, not David
⏱️ Suddenly means the attack is unseen
🚫 They fear no punishment or God
📖 Confidence without fear of God turns cruel

# Psalms 64:5-8
# 🔄 The Trap Turns On The Trapper
---
## 🗣️ They Encourage Themselves In An Evil Matter

These enemies are not acting on a sudden impulse.

They actively talk themselves into doing wrong.

Group encouragement can make sin feel easier to commit.

People often need permission from others before acting on cruelty.

This shows planning and mutual reinforcement, not one outburst.

Wrongdoing here spreads through a group, not one person alone.

🗣️ They talk themselves into evil
👥 Group encouragement makes sin feel easier
🧠 This shows planning, not impulse
📖 Wrongdoing spreads through the group

## 🗨️ They Commune Of Laying Snares Privily

"Commune" means to talk something over together.

"Snares" were traps used to catch animals without a fight.

"Privily" means secretly, done where no one else can see.

Together the phrase describes a group planning a hidden trap.

This is careful plotting, not a sudden threat.

The danger David faces has already been carefully planned.

🗨️ Commune means talking something over
🪤 Snares were hidden animal traps
🤐 Privily means done in secret
📖 This danger was carefully planned

## ❓ Who Shall See Them?

This question is not really a question at all.

It reveals what the plotters actually believe about God.

They assume no one, including God, is watching them.

That false assumption is exactly what makes them bold.

The rest of the psalm proves this belief wrong.

Believing God does not see is the real danger here.

❓ This is a rhetorical question, not real doubt
🙈 They assume no one is watching
😏 That false belief makes them bold
📖 The psalm proves this belief wrong

## 🔎 They Search Out Iniquities

Searching out iniquities means actively hunting for ways to sin.

This is not someone who stumbles into wrongdoing by accident.

The picture is deliberate effort spent on finding an opportunity.

People can put real energy into planning harm against someone.

This kind of searching takes patience and intention.

Their sin took effort here, not just a weak moment.

🔎 Searching out means active hunting
🎯 This is deliberate, not accidental
⏳ Real patience went into this plan
📖 Their sin took effort, not weakness

## 🧭 They Accomplish A Diligent Search

"Diligent" describes careful, thorough, persistent effort.

This is the second time this verse describes their searching.

Repeating the idea shows just how determined these plotters are.

They are not casually considering harm and moving on.

Their planning is careful and sustained over time.

Determined evil is still evil, and God still sees it.

🧭 Diligent means thorough and persistent
🔁 The verse repeats this idea on purpose
⏱️ Their planning is sustained over time
📖 God still sees determined evil

## 🕳️ The Inward Thought Of Every One Of Them, And The Heart, Is Deep

This line says their private thoughts run deep and hidden.

They believe their inward plotting is out of anyone's reach.

The Bible often describes the human heart as hard to know.

Only God is ever described as able to search it fully.

Their confidence in hiding sets up the reversal in the next verse.

What feels hidden to people is never hidden from God.

🕳️ Inward thought means deep, private plotting
🔒 They believe it cannot be reached
👁️ Only God searches the heart fully
📖 Nothing hidden from people is hidden from God

## 🏹 But God Shall Shoot At Them With An Arrow

This verse repeats the arrow picture from earlier in the psalm.

Before, the wicked shot arrows made of bitter words.

Now God is the one holding the weapon instead.

The word "but" marks a sudden turn in the whole psalm.

The hunters have suddenly become the ones being hunted.

The very picture they used against David now turns on them.

🏹 The arrow image returns from verse three
🔄 But marks a sudden turn
🎯 God now holds the weapon
📖 Their own picture turns against them

## ⏱️ Suddenly Shall They Be Wounded

This word "suddenly" repeats from verse four as well.

There, David was the one caught by surprise.

Here, the surprise attack lands on his enemies instead.

The reversal is exact and clearly intentional in the poem.

What they planned for someone else happens to them now.

Their own ambush plan becomes their own downfall.

⏱️ Suddenly repeats from verse four
🔄 The surprise now lands on them
⚖️ The reversal is exact and intentional
📖 Their ambush plan becomes their downfall

## 👅 So They Shall Make Their Own Tongue To Fall Upon Themselves

The tongue was described as a sharpened sword back in verse three.

That same tongue now becomes the reason for their own downfall.

Their own words end up turning back on them here.

This is a common pattern seen elsewhere in the Psalms.

What a person uses to harm others often exposes them instead.

The weapon they sharpened ends up cutting its own owner.

👅 The tongue callback returns from verse three
💬 Their own words expose them
🔁 This pattern repeats elsewhere in Psalms
📖 Their weapon cuts its own owner

## 🏃 All That See Them Shall Flee Away

Once these plotters are exposed, people react with alarm.

"Flee away" describes people running from something shocking or dangerous.

This shows their downfall becomes publicly obvious to everyone.

Whatever respect people once had for them is now gone.

Their secret plotting ends in open, public disgrace.

Hidden sin, once uncovered, rarely stays quiet for long.

🏃 Flee away means running from shock
👀 Their downfall becomes fully public
💔 Any respect for them disappears
📖 Hidden sin ends in open disgrace

# Psalms 64:9-10
# 🙌 Fear Turns To Praise
---
## 😮 And All Men Shall Fear

"Fear" here does not mean the same terror the wicked felt.

This fear means reverent awe at what God has done.

The reaction spreads beyond David to people watching from outside.

Seeing real justice happen can change how people see God.

This is a public response, not only a private feeling.

Right fear of God grows when people witness real justice.

😮 Fear here means reverent awe
👥 The reaction spreads beyond David
🌍 This response is public, not private
📖 Justice can grow right fear of God

## 📢 Shall Declare The Work Of God

"Declare" means to announce something openly to other people.

Witnesses do not simply notice what happened and move on.

They actively tell others what God has done here.

This turns a private prayer into a shared, public testimony.

One person's rescue becomes a story that spreads to many.

What God does in private often becomes public testimony.

📢 Declare means announcing openly
👂 Witnesses actively tell others
🔗 A private prayer becomes public testimony
📖 One rescue becomes a shared story

## 🤔 They Shall Wisely Consider Of His Doing

"Consider" here means more than a quick glance at what happened.

It describes careful, thoughtful reflection on the meaning behind it.

Wise people do not just witness an event and forget it.

They draw the right conclusion from what they have seen.

The lesson here is that God protects the honest and judges plotters.

Watching justice happen is meant to teach a real lesson.

🤔 Consider means careful reflection
🧠 Wise people draw the right conclusion
⚖️ The lesson is God protects the honest
📖 Justice is meant to teach something

## 😊 The Righteous Shall Be Glad In The LORD

This gladness is not simply relief that enemies were punished.

The text says the righteous are glad specifically in the LORD.

Their joy is rooted in who God is, not in revenge.

This distinction matters throughout the whole book of Psalms.

Right praise always points back toward God's own character.

Real gladness rests in God, not in someone else's downfall.

😊 Gladness is rooted in the LORD
🚫 Not gladness over someone's downfall
📜 This pattern repeats through the Psalms
📖 Real joy points back to God

## 🙌 All The Upright In Heart Shall Glory

"Glory" here means to boast or celebrate something openly.

"Upright in heart" describes someone honest and sincere before God.

This closes the psalm by widening beyond David alone.

Everyone who shares that honesty gets to share this same joy.

The psalm that opened in fear over secret plots ends in open praise.

Secret danger at the start gives way to shared praise at the end.

🙌 Glory means open celebration
❤️ Upright in heart means honest and sincere
👥 The ending widens beyond David alone
📖 Secret danger ends in shared praise
`.trim();

export const PSALMS_SIXTY_FOUR_PERSONAL_SECTIONS = parsePsalmsSixtyFourRawNotes(PSALMS_SIXTY_FOUR_RAW_NOTES);
