export type PsalmsFiftyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyFiveRawNotes(rawText: string): PsalmsFiftyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+55:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 55 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+55:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+55:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 55 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 55,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 55:${startVerse}` : `Psalms 55:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 55 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_FIVE_RAW_NOTES = `# Psalms 55:1-3
# 📣 A Desperate Plea
---
## 🙉 Give Ear To My Prayer

"Give ear" is an old way of asking someone to listen closely.

David is not just hoping God overhears him.

He is asking for God's full attention right from the first line.

This urgency sets the tone for the entire psalm.

👂 Give ear means listen closely

🎯 David asks for full attention

🔓 It opens the psalm with urgency

📖 The whole psalm grows from this plea

## 🙏 Hide Not Thyself From My Supplication

"Supplication" means a humble, urgent request, not a casual comment.

"Hide not thyself" pictures a person turning away and refusing to answer.

David is not accusing God of being absent.

He is asking God not to act as though He cannot hear.

🙏 Supplication means an urgent humble request

🙈 Hiding pictures refusing to respond

❓ David is not accusing God of absence

📖 He is begging God to answer

## 😢 I Mourn In My Complaint, And Make A Noise

To mourn here means far more than looking a little sad.

It describes real, visible grief, not a quiet inner feeling.

"Make a noise" means crying out loud enough to be heard.

David is not silently worried.

He is loudly pouring out his pain to God.

😢 Mourn means real visible grief

📢 Make a noise means crying aloud

🗣️ David is not silent about his pain

📖 He pours it all out to God

## 🗣️ The Voice Of The Enemy

This is not a vague fear of unnamed danger.

David is describing real threats he has actually heard spoken.

Someone, or a group of people, is actively working against him.

Naming the danger this specifically makes the prayer more urgent.

🗣️ Enemy voice means real spoken threats

👤 David faced an actual person or group

⚠️ This was not a vague fear

📖 Naming the danger sharpens the prayer

## 🎯 They Cast Iniquity Upon Me

"Cast iniquity" is a Hebrew idiom for hurling false blame at someone.

It does not mean David had actually sinned against them.

Picture someone throwing an accusation the way you would throw a stone.

David is describing an unfair attack on his character.

🎯 Cast iniquity means hurling false blame

🪨 Pictures an accusation thrown like a stone

🚫 David had not actually wronged them

📖 This was an unfair attack on him

# Psalms 55:4-8
# 🕊️ Wings Like A Dove
---
## 💔 My Heart Is Sore Pained Within Me

"Sore" here is an old word for severe, not a modern ache.

David is not describing mild worry.

He is describing pain sharp enough to feel physical.

This kind of language shows up whenever the psalms describe deep anguish.

💔 Sore here means severe, not achy

😖 David describes sharp physical sounding pain

📉 This is deep anguish, not mild worry

📖 The psalms often describe pain this way

## ⚰️ The Terrors Of Death Are Fallen Upon Me

"Terrors of death" is not just poetic language.

David genuinely believed his life was in danger.

"Fallen upon me" pictures something sudden and crushing, not a slow fear.

This is a man who expects to die soon, not someone being dramatic.

⚰️ Terrors of death means real danger

💥 Fallen upon pictures something sudden

😨 David expected he might actually die

📖 This fear was not exaggeration

## 😱 Horror Hath Overwhelmed Me

"Fearfulness and trembling" describes both an inner feeling and a physical shaking.

"Horror" pushes even further than ordinary fear.

"Overwhelmed" pictures water rising over someone's head.

David is describing terror that has completely taken control of him.

🌊 Overwhelmed pictures rising water

😰 Trembling shows fear in his body

😱 Horror goes beyond ordinary fear

📖 Terror has taken full control

## 🕊️ Oh That I Had Wings Like A Dove

David is not literally asking to become a bird.

He is expressing a longing to simply disappear from the danger.

Doves were common birds in Israel, known for quick, easy flight.

This is the wish of someone who feels completely trapped.

🕊️ Wings like a dove means longing to flee

🐦 Doves picture quick easy escape

🔒 David feels completely trapped

📖 This is a wish, not a plan

## 🏜️ Wander Far Off, And Remain In The Wilderness

David imagines leaving everyone and everything behind.

"The wilderness" was the empty, unsettled land outside the cities.

It represents total isolation, far from friends and far from enemies.

Even solitude sounds better to David than staying in danger.

🏜️ Wilderness means empty unsettled land

🚶 David imagines leaving everything behind

🧍 It pictures total isolation

📖 Isolation sounds safer than staying

## 🎶 Selah

"Selah" appears often throughout the book of Psalms.

Nobody today knows for certain exactly what it means.

Many scholars believe it marked a pause in the music.

It likely gave the original singers a moment to let the words sink in.

🎶 Selah is a musical or liturgical term

❓ Its exact meaning is not fully known

⏸️ Many scholars believe it marked a pause

📖 It let the words settle before moving on

## 🌪️ The Windy Storm And Tempest

"Storm and tempest" is a picture, not a weather report.

It stands for David's overwhelming trouble.

The danger around him felt as violent and uncontrollable as a storm.

He wanted to escape it as urgently as someone fleeing real weather.

🌪️ Storm and tempest pictures overwhelming trouble

⚡ The danger felt violent and uncontrollable

🏃 David wanted to escape it urgently

📖 The image makes the danger feel real

# Psalms 55:9-11
# 🏙️ Violence In The City
---
## 🗼 Destroy, O Lord, And Divide Their Tongues

This line deliberately echoes the Tower of Babel in Genesis 11.

There, God confused one language into many to stop a prideful plan.

David asks God to do something similar to his enemies now.

He wants their plotting against him to fall apart from confusion.

🗼 This echoes the Tower of Babel

🗣️ God once confused one language into many

🤝 David asks for his enemies' plans to fail

📖 Confusion can undo a prideful plot

## 🏙️ Violence And Strife In The City

David is not just afraid of a few individuals.

He describes an entire city that has turned dangerous.

"Strife" means constant conflict and quarreling, not a single argument.

The threat surrounds him everywhere he turns.

🏙️ The whole city has turned dangerous

⚔️ Strife means constant conflict, not one fight

🚨 David feels surrounded by threat

📖 Danger fills the whole city

## 🧱 They Go About It Upon The Walls Thereof

City walls were normally guarded by watchmen keeping people safe.

Here the picture is reversed.

The people patrolling the walls are the ones causing harm.

The very structure meant to protect the city has been turned toward evil.

🧱 City walls were normally for protection

👀 Watchmen usually guarded, not harmed

🔄 Here the picture is reversed

📖 Protection has been turned toward evil

## ⚠️ Mischief Also And Sorrow Are In The Midst Of It

"Mischief" in this context means real harm, not a small prank.

"In the midst" means at the very center of the city, not the edges.

The danger is not hiding on the outskirts.

It sits right at the heart of where David lives.

⚠️ Mischief here means real harm

🎯 In the midst means at the center

🏚️ Danger fills the heart of the city

📖 There is nowhere safe left inside

## 🎭 Deceit And Guile Depart Not From Her Streets

"Guile" means clever, deliberate deception meant to trick someone.

This is not occasional dishonesty.

David says it never leaves the city's streets, day after day.

Dishonesty has become part of daily life there.

🎭 Guile means deliberate clever deception

🔁 It never leaves, day after day

🏘️ Dishonesty fills daily street life

📖 The whole city has become untrustworthy

# Psalms 55:12-14
# 💔 Betrayed By A Friend
---
## 🛡️ It Was Not An Enemy That Reproached Me

David says plainly that an open enemy would have been easier to bear.

He could expect attacks from someone who never claimed to be a friend.

"Reproached" means publicly insulted or shamed.

That kind of pain, though real, would not have surprised him.

🛡️ An open enemy would be easier

😤 Reproached means publicly insulted

😐 Expected attacks do not shock a person

📖 This pain was not from a stranger

## 🤝 A Man Mine Equal, My Guide, And Mine Acquaintance

This was someone close to David, not a distant acquaintance.

He was David's equal in standing, his advisor, and his friend.

Many scholars believe this describes Ahithophel, David's own counselor.

Second Samuel 15 through 17 records Ahithophel turning against David to help Absalom.

🤝 This describes someone close, not a stranger

🧑‍⚖️ Likely Ahithophel, David's own counselor

📜 Second Samuel 15 to 17 records the betrayal

📖 Betrayal from a friend cuts deepest

## 💬 We Took Sweet Counsel Together

"Sweet counsel" describes honest, trusted conversation between close friends.

David and this man had once shared private plans and advice.

That closeness makes the betrayal even harder to accept.

The same person who once helped him now works against him.

💬 Sweet counsel means honest trusted talk

🤝 They once shared private plans

💔 Closeness makes betrayal harder to accept

📖 A helper became an opponent

## 🏛️ Walked Unto The House Of God In Company

This describes worshiping together at the temple or tabernacle, not a casual walk.

They stood side by side in the most sacred setting Israel had.

Shared worship usually marked the deepest kind of trust between people.

Even that shared faith did not stop the betrayal.

🏛️ House of God means the place of worship

🚶 They worshiped side by side

🙏 Shared worship usually meant deep trust

📖 Even shared faith did not stop betrayal

# Psalms 55:15-19
# 🙏 From Despair To Confidence
---
## ⚰️ Let Them Go Down Quick Into Hell

"Quick" here is an old word for alive, not fast.

David is picturing his enemies going down into the grave while still living.

"Hell" in this verse translates the Hebrew word for the realm of the dead.

It is closer to the grave than the later idea of eternal punishment.

🏃 Quick here means alive, not fast

⚰️ Hell here means the realm of the dead

📚 Closer to the grave than later ideas

📖 David wants their evil ended completely

## 🙏 I Will Call Upon God, And The LORD Shall Save Me

This line marks a clear turn in the psalm.

David has spent many verses describing fear and betrayal.

Now he states, simply and plainly, where his hope actually lies.

The turn from despair to trust happens in a single line.

🔀 This marks a clear turn in tone

😔 Fear and betrayal filled the earlier verses

🙏 David now states where his hope lies

📖 Trust arrives in a single line

## 🌇 Evening, And Morning, And At Noon, Will I Pray

This lists three separate times of prayer across a single day.

Many faithful people in the ancient world prayed at set times like these.

David is not praying once and moving on.

He commits to returning to God again and again throughout the day.

🌇 Evening, morning, and noon name set times

🕰️ Ancient prayer often followed a daily rhythm

🔁 David returns to prayer again and again

📖 Steady prayer marks steady trust

## 🕊️ He Hath Delivered My Soul In Peace From The Battle

David describes his own rescue as if it has already happened.

"In peace" means the danger has genuinely passed, not just quieted for a moment.

"There were many with me" likely points to the many enemies arrayed against him.

Even outnumbered, David says God brought him safely through.

🕊️ In peace means the danger truly passed

⚔️ Many with me likely points to many enemies

🛡️ David was outnumbered, not overpowered

📖 God brought him safely through

## 📈 Because They Have No Changes, Therefore They Fear Not God

"No changes" is an old idiom for an easy, untroubled life.

People whose lives never get hard often stop feeling their need for God.

David is naming why his enemies feel free to act this way.

Comfort, left unchecked, can quietly grow into arrogance.

📈 No changes means an easy untroubled life

😌 Comfort can dull a person's need for God

🙄 This explains their careless arrogance

📖 Unshaken comfort can lead people from God

# Psalms 55:20-23
# ⚖️ Cast Thy Burden
---
## ✋ He Hath Broken His Covenant

"Covenant" here means a serious, binding promise of loyalty between friends.

This was not a casual friendship that quietly faded.

David is describing a deliberate betrayal of a formal commitment.

Putting "forth his hands" pictures an open, active attack, not passive distance.

🤝 Covenant means a serious binding promise

💔 This was deliberate, not a fading friendship

✋ Putting forth hands pictures active attack

📖 A formal trust was broken on purpose

## 🧈 The Words Of His Mouth Were Smoother Than Butter

This verse uses two images that say the same thing in two ways.

Butter and oil both picture something smooth, pleasant, and easy to take in.

"War was in his heart" reveals the truth hiding underneath the kind words.

"Drawn swords" makes that hidden violence unmistakably clear.

🧈 Butter and oil both picture smooth flattery

⚔️ War in his heart reveals the truth

🗡️ Drawn swords make the threat clear

📖 Kind words hid a violent intent

## 📦 Cast Thy Burden Upon The LORD

"Cast" pictures throwing something down completely, not setting it aside gently.

A burden is a heavy weight no one can carry alone forever.

Think of finally putting down a heavy bag after carrying it for miles.

The relief comes only once you actually let it go.

David is not managing his worry.

He is handing it over completely.

📦 Cast means throwing it down completely

🎒 A burden is too heavy alone

🙌 Picture setting down a heavy bag

📖 David hands his worry over completely

## 🏔️ He Shall Never Suffer The Righteous To Be Moved

"Suffer" here is an old word for allow, not physical pain.

"Moved" means shaken loose or toppled over, not simply relocated.

This is a promise of stability, not a promise of comfort.

God is not promising David an easy life.

He is promising David will not be permanently knocked down.

🚫 Suffer here means allow, not pain

🏔️ Moved means toppled, not relocated

🛡️ This is a promise of stability

📖 He will not stay knocked down

## ⏳ Bloody And Deceitful Men Shall Not Live Out Half Their Days

This line is an idiom for a life cut short before its time.

David is not naming an exact number of years.

He is saying his enemies will not enjoy a long, comfortable life.

The psalm that opened in terror ends with David's confidence restored.

The final words, I will trust in thee, seal that confidence.

⏳ Half their days means a shortened life

😈 Bloody and deceitful describes violent dishonest men

🔚 Enemies will not enjoy lasting comfort

📖 The psalm ends on David's trust
`.trim();

export const PSALMS_FIFTY_FIVE_PERSONAL_SECTIONS = parsePsalmsFiftyFiveRawNotes(PSALMS_FIFTY_FIVE_RAW_NOTES);
