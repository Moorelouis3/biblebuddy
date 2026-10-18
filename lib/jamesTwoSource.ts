export type JamesTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJamesTwoRawNotes(rawText: string): JamesTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JamesTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*James\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing James 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+James\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+James\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing James 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `James 2:${startVerse}` : `James 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 James 2 sections, received " + sections.length);
  }

  return sections;
}

const JAMES_TWO_RAW_NOTES = `# James 2:1-4
# 💍 Favoritism In The Assembly
---
## 🙅 With Respect Of Persons

"Respect of persons" means judging someone by status instead of character.

A biased judge decides a case before hearing both sides.

James opens the chapter by naming that failure directly.

Faith in Christ and favoritism do not belong together.

🙅 Respect of persons means judging by status

⚖️ A biased judge decides before hearing the case

📣 James names this failure right away

📖 Faith in Christ leaves no room for favoritism

## ✨ The Lord Of Glory

James calls Jesus "the Lord of glory" in the middle of a warning.

That title points to Christ's divine majesty, not just His teaching.

Pairing it with a warning about seating is not an accident.

The One who deserves highest honor watches how believers treat the poor.

✨ Lord of glory names Christ's divine majesty

⚠️ The title sits inside a warning

💍 Favoritism clashes with worshiping this Lord

📖 Christ watches how believers treat the poor

## 💍 A Man With A Gold Ring, In Goodly Apparel

A gold ring in this culture marked a man as wealthy.

It often meant he belonged to the ruling or merchant class.

"Goodly apparel" means fine, expensive clothing most people could not afford.

His appearance alone announced money before he said a word.

💍 A gold ring signaled wealth and status

👔 Goodly apparel means fine expensive clothing

👀 Appearance alone announced his status

➡️ The church had to choose how to react

## 🧥 A Poor Man In Vile Raiment

"Vile raiment" does not mean evil clothing.

It means worn, shabby clothes that marked someone as poor.

James sets this man beside the man in the gold ring on purpose.

The contrast exposes which visitor the church would rather impress.

🧥 Vile raiment means poor and shabby clothes

🔍 It is not evil clothing, just worn clothing

⚖️ James sets up a deliberate contrast

📖 The contrast exposes who the church impresses

## 🪑 Sit Thou Here In A Good Place

The "good place" was the seat of highest honor in the room.

Giving it instantly to the rich visitor showed he was treated as important.

Nobody checked his character or his faith first.

His clothing alone earned him the best seat in the house.

🪑 Good place means the seat of honor

💰 The rich man is seated based on looks

🚫 Nobody checks his character first

➡️ Appearance alone decided his treatment

## 🦶 Sit Here Under My Footstool

A footstool sat at the feet of someone important.

Telling the poor man to sit there placed him at floor level.

The command does not even offer him a real seat.

One visitor gets honor, the other gets the floor, for the same visit.

🦶 A footstool sat beneath an honored seat

⬇️ The poor man is placed at floor level

🚫 He is not even offered a seat

📖 Both men came, but only one was welcomed

## ⚖️ Judges Of Evil Thoughts

Judging by appearance turns ordinary believers into judges.

James says that role belongs to God alone.

"Evil thoughts" means the reasoning behind the favoritism is corrupt from the start.

A bad standard for judging people produces a bad judgment.

⚖️ Favoritism turns believers into self made judges

🧠 Evil thoughts means the reasoning itself is corrupt

👎 Judging by clothing is not a neutral act

📖 A bad standard produces a bad judgment

# James 2:5-7
# 💎 God's Economy Turned Upside Down
---
## 💎 Chosen The Poor Of This World Rich In Faith

Rich in faith means wealthy in trust and relationship with God.

That richness has nothing to do with money.

God's choices often run opposite the world's rankings.

The poor the culture overlooked, God called rich in faith.

💎 Rich in faith means wealthy in trust

🙅 Money has nothing to do with this richness

🔄 God's choices often reverse the world's rankings

📖 The poor the world ignores, God calls rich

## 👑 Heirs Of The Kingdom

An heir receives what was promised, not what was earned.

James says the poor hold that same promise.

The kingdom cannot be bought with status or a gold ring.

It is given to those who love God.

👑 An heir receives a promise, not a purchase

🚫 The kingdom cannot be bought

❤️ Given to those who love God

📖 Status does not control this gift

## 💰 Do Not Rich Men Oppress You

"Oppress" means using power or wealth to pressure someone weaker.

James flips the situation around sharply.

The group being honored was also the group causing harm.

Favoritism rewarded the very people doing the damage.

💰 Oppress means using power to exploit someone

🔄 James flips the situation around sharply

⚠️ The honored group was also causing harm

➡️ Favoritism rewarded the people doing damage

## 🙏 Blaspheme That Worthy Name

"That worthy name" refers to the name of Jesus spoken over believers.

"Blaspheme" means to speak against or dishonor something sacred.

These same rich oppressors were mocking the very name the church claimed.

Honoring them in church ignored how they acted outside it.

🙏 That worthy name refers to Jesus Christ

😡 Blaspheme means to dishonor something sacred

🎭 These oppressors mocked the name outside church

📖 The church ignored this contradiction

# James 2:8-13
# ⚖️ The Royal Law And Its Weight
---
## 👑 The Royal Law

James calls the command to love your neighbor as yourself "the royal law."

"Royal" marks it as the ruling command over all the others.

Every other command in scripture answers to this one.

Favoritism breaks the very law meant to rule over it.

👑 Royal law means the ruling command

❤️ Love your neighbor governs every other command

💔 Favoritism breaks the law meant to rule it

📖 One command stands above all the rest

## ⚖️ Convinced Of The Law As Transgressors

"Convinced" here means proven guilty, not persuaded.

Showing favoritism is not a small social mistake.

It is named sin.

That sin puts the believer on trial.

Being religious does not exempt anyone from this verdict.

⚖️ Convinced means proven guilty, not persuaded

🚫 Favoritism is named sin, not a mistake

👤 Religious people are not exempt from this

📖 The law puts the believer on trial

## 🔗 Guilty Of All

James is not saying every sin carries equal weight.

He is saying the law works as one connected whole.

Breaking it in one place still makes someone a lawbreaker.

Keeping most of the law does not erase that one break.

🔗 The law works as one connected whole

🧩 One broken point still makes someone guilty

🚫 Keeping most of it does not erase this

📖 One break is still a real break

## 🚫 Do Not Commit Adultery... Do Not Kill

James picks two commands most people would never excuse breaking.

Both come from the same giver of the law.

Breaking either one makes a person a transgressor.

There is no such thing as a partial keeper.

The law is not sorted into greater and lesser commands.

🚫 Both commands come from the same giver

⚖️ Breaking either makes someone a transgressor

🙅 No command ranks as optional

📖 The law is not sorted by importance

## 🕊️ The Law Of Liberty

This same phrase already appeared in James chapter one.

"Liberty" here does not mean freedom to do anything.

It means freedom found in obeying God willingly, not under force.

Believers will be judged by how they lived under that freedom.

🕊️ Liberty means willing obedience, not permission to sin

🔁 This phrase already appeared in chapter one

⚖️ Believers are judged by how they lived

📖 Freedom and obedience are not opposites

## ⚖️ Judgment Without Mercy

James closes this section with a warning, not a comfort.

Someone who refused mercy to others should not expect to find it himself.

"Mercy rejoiceth against judgment" means mercy wins out when it is genuinely shown.

How someone treats the poor reveals what they will receive in return.

⚖️ Refusing mercy forfeits mercy in return

🏆 Mercy wins out when genuinely shown

👀 Treatment of others reveals a deeper truth

📖 Mercy shown now echoes back later

# James 2:14-17
# 🍞 Faith That Does Nothing
---
## 🤔 What Doth It Profit

James opens with a blunt question, not a lecture.

"Profit" means real benefit, not just a nice sounding claim.

Saying you have faith costs nothing to say.

James wants to know what that claim actually produces.

🤔 Profit means real benefit, not just words

🗣️ Claiming faith costs nothing to say

🔍 James asks what the claim produces

📖 A claim without result is empty

## 🍞 Naked, And Destitute Of Daily Food

James pictures the most basic human needs.

"Daily food" means the food needed for just that one day.

This is not a hypothetical case written to make a point.

It names the kind of person every church actually had nearby.

🍞 Daily food means the most basic need

🧥 Naked here means lacking basic clothing

👀 This describes a real person, not a theory

➡️ A real need tests real faith

## 👋 Depart In Peace, Be Ye Warmed And Filled

These words sound kind on the surface.

They are a blessing spoken instead of actual help.

No food or clothing is actually given, only a wish.

Kind words without action leave the need exactly where it started.

👋 The words sound kind but give nothing

🙏 A blessing replaces real help here

🚫 No food or clothing is actually given

📖 Kind words alone leave the need unmet

## 💀 Faith, If It Hath Not Works, Is Dead, Being Alone

"Dead" means faith without works has no life in it.

"Being alone" pictures faith cut off from any action that proves it real.

James is not saying works earn salvation.

He is saying real faith always produces something that can be seen.

💀 Dead means no life, not just weakness

🔒 Being alone pictures faith cut off from action

🚫 Works do not earn salvation here

📖 Real faith always produces something visible

# James 2:18-20
# 😨 Faith That Devils Have Too
---
## 🔍 Shew Me Thy Faith Without Thy Works

James imagines someone challenging his argument directly.

Faith cannot be held up and shown the way an object can.

Works are the only way faith becomes visible to anyone else.

The claim to faith has nothing to point to without them.

🔍 Faith cannot be held up and shown alone

👀 Works make faith visible to others

🫳 The claim has nothing to point to

📖 Visible proof is what James is asking for

## 😨 The Devils Also Believe, And Tremble

Believing facts about God is not the same as saving faith.

Even demons agree that one God exists.

"Tremble" shows they know what that truth means for them.

Knowledge like that did not change how they live.

😨 Devils believe facts about God too

🧠 Correct belief alone is not saving faith

🔁 Knowledge did not change how they live

📖 Belief without transformation proves nothing

## 🙄 O Vain Man

"Vain" means empty, without real substance.

James uses this sharp address on purpose.

It cuts through a debate that sounds impressive but changes nothing.

Calling someone vain was a direct challenge, not a gentle correction.

🙄 Vain means empty, without real substance

🗣️ James uses sharp language on purpose

⚠️ The debate itself was going nowhere

📖 Empty arguments deserve a direct challenge

# James 2:21-24
# 👴 Abraham And A Faith That Moves
---
## 👴 Abraham Our Father

James calls Abraham "our father" because every believer is connected to his example.

This is not just a history lesson about one ancient man.

Abraham sets the pattern for how faith and action belong together.

What happened on that altar still speaks to every reader of this letter.

👴 Abraham is the pattern for every believer

🌍 His example reaches every reader of this letter

⛰️ The altar scene still speaks today

📖 One ancient act still teaches a living lesson

## ⚖️ Justified By Works

"Justified" here does not contradict faith alone for salvation.

James is describing faith proven real in front of other people.

Abraham was already counted righteous long before Isaac was born.

Offering Isaac simply showed that the trust was genuine.

⚖️ Justified here means proven real, not earned

🔄 This does not contradict faith alone for salvation

👶 Abraham was already righteous before Isaac was born

📖 The offering showed the trust was genuine

## 🤝 Faith Wrought With His Works

"Wrought with" means faith and works worked together.

Think of two hands working on one job.

Neither hand replaces the other.

Faith supplied the trust.

The offering supplied the proof.

James pictures them as partners, not rivals.

🤝 Wrought with means working together, not apart

✋ Faith supplied the trust behind the act

📜 The offering supplied visible proof

📖 Faith and works are partners, not rivals

## 👑 The Friend Of God

This title does not appear anywhere else in the law given to Abraham.

It describes a relationship of closeness, not just obedience to commands.

Abraham earned that title through a life that backed up his belief.

The title names what a life of real faith can grow into.

👑 Friend of God describes real closeness

🤲 It means relationship, not just obedience

🏆 Abraham earned this through a life of faith

📖 Real faith can grow into real friendship

## ⚖️ By Works A Man Is Justified

James sums up the whole argument in one line.

Faith that stays invisible cannot prove it is alive.

Works are not a replacement for faith.

They are the evidence that faith was ever really there.

⚖️ Works are the proof faith is alive

🚫 Works never replace faith itself

🔍 They are evidence, not a substitute

📖 Real faith always leaves visible evidence

# James 2:25-26
# 💀 Two Proofs And One Picture
---
## 🏠 Rahab The Harlot

Rahab's past is named plainly, not hidden or softened.

She was a Canaanite woman with a history that would normally disqualify her.

James chooses her on purpose, right alongside Abraham.

Real faith is available to people with a history, not only a pedigree.

🏠 Rahab's past is named plainly

🙅 She had no claim by normal standards

🤝 James pairs her with Abraham on purpose

📖 Faith is for people with a history too

## 🚪 Received The Messengers, And Sent Them Out Another Way

Rahab hid the Israelite spies at real risk to herself.

She then helped them escape by a different route than they came.

That was a dangerous, visible action, not a private feeling.

Her faith in God's promise showed up as action.

🚪 She hid the spies at real risk

🏃 They escaped by a different route

⚠️ Her own life was in danger

📖 Her faith showed up as action

## 💀 The Body Without The Spirit Is Dead

James ends the chapter with a picture everyone already understands.

A body with no spirit in it is not merely weak.

It is a corpse.

That comparison is deliberately extreme.

Faith with no works is lifeless in exactly the same way.

💀 A body without spirit is a corpse

⚡ The comparison is deliberately extreme

🚫 Dead faith is not just weak faith

📖 Faith and works share one life
`.trim();

export const JAMES_TWO_PERSONAL_SECTIONS = parseJamesTwoRawNotes(JAMES_TWO_RAW_NOTES);
