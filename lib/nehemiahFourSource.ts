export type NehemiahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahFourRawNotes(rawText: string): NehemiahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 4:${startVerse}` : `Nehemiah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Nehemiah 4 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_FOUR_RAW_NOTES = `# Nehemiah 4:1-3
# 😠 Sanballat's Mockery And Tobiah's Fox
---
## 😠 He Was Wroth, And Took Great Indignation

Wroth means intensely angry, far beyond simple annoyance.

Indignation adds a layer of injured pride on top of that anger.

Sanballat was not simply frustrated that the Jews were building.

He felt personally insulted that feeble exiles dared to succeed.

😠 Wroth means intensely angry
💔 Indignation adds injured pride
🏗️ Sanballat hated the Jews building
📖 Progress can provoke real enemies

## 🗣️ What Do These Feeble Jews

Sanballat mocks the builders in front of his own army.

Feeble means weak, powerless to accomplish much.

He assumed the builders could never finish this project.

His questions never expected a real answer.

The mockery was designed to plant doubt in listeners.

🗣️ Sanballat mocked in front of his army
😔 Feeble means weak or powerless
❓ His questions needed no real answer
📖 Mockery plants doubt in listeners

## 🦊 If A Fox Go Up, He Shall Even Break Down Their Stone Wall

Tobiah adds his own insult right after Sanballat's speech.

He claims the wall is so weak a fox could topple it.

A fox is small, nowhere near strong enough to break stone.

The comparison was meant to humiliate, not to describe reality.

🦊 A fox is small and weak
🧱 Tobiah mocked the wall's strength
😤 The insult aimed to humiliate
📖 Enemies exaggerate to discourage builders

# Nehemiah 4:4-6
# 🙏 A Prayer For Justice And A Wall Half Built
---
## 🔄 Turn Their Reproach Upon Their Own Head

Nehemiah does not fight Sanballat and Tobiah with his own hands.

He takes the insult straight to God in prayer.

Turn their reproach means let their own shame fall back on them.

This asks God to judge justly, not for personal revenge.

🙏 Nehemiah prayed instead of retaliating
🔄 He asked their insults to return to them
⚖️ The prayer asked for fair judgment
📖 Nehemiah answered mockery with prayer

## 📜 Let Not Their Sin Be Blotted Out

To blot out sin means to erase it completely from the record.

Nehemiah asks God not to forgive this particular offense.

This sounds harsh to readers used to mercy language.

The Psalms contain similar prayers against persistent enemies.

📜 Blotted out means erased completely
⚖️ Nehemiah asked God to withhold pardon
😮 This kind of prayer sounds harsh today
📖 The Psalms include similar prayers

## 💪 For The People Had A Mind To Work

Despite the mockery, the builders keep going without slowing down.

Having a mind to work means their motivation stayed strong.

The wall reaches the halfway point in this same verse.

Insults tested the project, they did not stop it.

💪 The people stayed motivated to work
🧱 The wall reached the halfway point
😤 Mockery failed to slow them down
📖 Insults tested but did not stop them

# Nehemiah 4:7-9
# ⚔️ A Conspiracy And A Prayer
---
## 🌍 Then They Were Very Wroth

This anger now includes a much wider coalition of enemies.

Arabians, Ammonites, and Ashdodites join Sanballat and Tobiah's anger.

Real progress on the wall is what triggers this reaction.

The more the work succeeded, the more enemies it attracted.

🌍 A wider coalition joins the anger
🧱 Real progress triggered this reaction
📈 Success attracted more enemies
📖 Opposition grows as the work grows

## 🗡️ Conspired All Of Them Together To Come And To Fight Against Jerusalem

This coalition moves from mocking words into an actual battle plan.

Conspired means they secretly agreed together on a plan.

Their goal was to hinder the work by force.

Words had failed, so the enemies escalated to violence.

🗡️ Words moved into an actual battle plan
🤝 Conspired means secretly agreed together
🛑 Their goal was to stop the work
📖 Failed mockery escalated to violence

## 🙏 We Made Our Prayer Unto Our God, And Set A Watch

Nehemiah answers a real military threat with two responses.

He prays first, trusting God with the outcome.

He also sets a watch, taking practical action himself.

Faith in God never replaced ordinary caution here.

🙏 Nehemiah prayed about the threat
👀 He also set a physical watch
🤝 Faith and caution worked together
📖 Trusting God did not replace action

# Nehemiah 4:10-12
# 😩 Discouragement, A Plot, And A Ten Times Warning
---
## 😩 The Strength Of The Bearers Of Burdens Is Decayed

Judah's own people voice discouragement from within the project now.

Bearers of burdens were the laborers hauling stone by hand.

Decayed means their physical strength was simply wearing out.

Exhaustion had become as real a threat as any enemy.

😩 Judah voiced discouragement from within
🧱 Bearers of burdens hauled stone by hand
📉 Decayed means their strength wore out
📖 Exhaustion became a threat too

## 🗡️ They Shall Not Know, Neither See, Till We Come In The Midst Among Them

This describes the enemy's actual plan for a surprise attack.

They intended to strike the workers without warning.

Slay them and cause the work to cease was the goal.

An unprepared workforce would have made an easy target.

🗡️ The enemy planned a surprise attack
😱 They intended to strike without warning
🛑 Their goal was to stop the work
📖 An unprepared workforce is an easy target

## 🔟 They Said Unto Us Ten Times

Jews living near the enemy camps kept warning Nehemiah.

Ten times signals a constant flow of real intelligence, not a rumor.

The threat could come from any direction.

Repeated warnings from multiple sources are hard to dismiss.

🔟 Ten times signals repeated warnings
👂 Nearby Jews kept relaying intelligence
🌐 The threat could come from any direction
📖 Repeated warnings are hard to dismiss

# Nehemiah 4:13-18
# 🛡️ Swords, Spears, And A Trumpeter By His Side
---
## 👪 I Even Set The People After Their Families With Their Swords, Their Spears, And Their Bows

Nehemiah organizes the defense using existing family units.

Grouping by family meant men fought beside people they trusted.

Swords, spears, and bows covered both close and distant combat.

The defense plan used structure the people already understood.

👪 Nehemiah organized defense by family
🤝 Men fought beside people they trusted
🗡️ Weapons covered close and distant combat
📖 The plan used structure people knew

## ⚡ Remember The LORD, Which Is Great And Terrible

Nehemiah speaks directly to fear he can see in the people.

Terrible here means awe inspiring and powerful.

It does not mean frightening in a bad sense.

He points them toward God's greatness instead of the threat.

Courage in this verse comes from where attention is placed.

😨 Nehemiah addressed the people's visible fear
⚡ Terrible here means awe inspiring
👀 He redirected attention toward God
📖 Courage came from where they looked

## ⚖️ The Other Half Of Them Held Both The Spears, The Shields, And The Bows, And The Habergeons

The workforce splits in two, half building and half guarding.

Habergeons were a type of armor covering the chest and shoulders.

This system let construction continue without leaving the city exposed.

Every builder became a soldier the moment danger appeared.

⚖️ The workforce split into two duties
🛡️ Habergeons were armor for the chest
🧱 Building continued without leaving the city exposed
📖 Every builder was ready to fight

## 📯 He That Sounded The Trumpet Was By Me

Nehemiah keeps a trumpeter stationed right beside him.

The wall stretched too far for a shouted voice alone.

The trumpet was the one signal that could reach every worker.

Command and communication stayed centered on one man.

📯 A trumpeter stayed beside Nehemiah
📢 The trumpet reached workers across the wall
🎯 Nehemiah personally controlled the alarm
📖 Command stayed centered on one man

# Nehemiah 4:19-23
# 🌙 One Trumpet, One Guard, Clothes Never Off
---
## 📏 We Are Separated Upon The Wall, One Far From Another

Nehemiah names the real danger built into such a long defense line.

Workers were spread thin, too far apart to help each other quickly.

He states the problem plainly instead of hiding it.

Naming a weakness openly is often the first step to solving it.

📏 Workers were spread far apart
⚠️ Nehemiah named the danger plainly
🗣️ He did not hide the problem
📖 Naming a weakness starts the fix

## 📯 Resort Ye Thither Unto Us, Our God Shall Fight For Us

The trumpet becomes the solution to the spacing problem just named.

Resort ye thither means gather quickly at the sound of the signal.

One trumpet call could pull scattered workers into a single point.

Nehemiah still credits the coming victory to God, not the plan.

📯 The trumpet solved the spacing problem
🏃 Resort thither means gather quickly
🎯 One signal united scattered workers
📖 Nehemiah credited God with the victory

## 🏙️ Let Every One With His Servant Lodge Within Jerusalem

Nehemiah orders workers to stop going home to nearby towns at night.

Sleeping inside the city walls kept a guard present after dark.

This meant real personal sacrifice for every worker.

Safety for the whole project came before individual convenience.

🏙️ Workers had to stay inside the city
🌙 This kept a guard present after dark
😔 It meant real personal sacrifice
📖 Safety came before convenience

## 👔 None Of Us Put Off Our Clothes, Saving That Every One Put Them Off For Washing

Nehemiah includes himself in this exhausting routine.

This was never a rule only for others.

Keeping clothes on meant staying ready to fight at any moment.

The one exception allowed was removing clothes briefly to wash them.

Leadership here meant sharing the same discomfort as everyone else.

👔 Nehemiah shared the exhausting routine himself
⚔️ Staying dressed meant staying ready to fight
🧺 Washing was the only real exception
📖 Leadership meant sharing the same discomfort
`.trim();

export const NEHEMIAH_FOUR_PERSONAL_SECTIONS = parseNehemiahFourRawNotes(NEHEMIAH_FOUR_RAW_NOTES);
