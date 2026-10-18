export type FirstPeterFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstPeterFiveRawNotes(rawText: string): FirstPeterFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstPeterFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstPeter\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Peter 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstPeter\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstPeter\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Peter 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Peter 5:${startVerse}` : `1 Peter 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 First Peter 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_PETER_FIVE_RAW_NOTES = `# FirstPeter 5:1-4
# 🐑 Feed The Flock Of God
---
## 🧓 The Elders Which Are Among You I Exhort

"Elder" was a real position of leadership in the local church, not just an older person.

"Exhort" means to urge strongly, with warmth, not to command from a distance.

Peter is about to ask something hard of men already carrying real responsibility.

He chooses encouragement over a harsh order right from the first word.

🧓 Elder names an actual church leadership role
💬 Exhort means urging strongly and warmly
🤝 Peter leads with encouragement, not force
📖 He asks something hard of them gently

## 🤲 Who Am Also An Elder, And A Witness Of The Sufferings Of Christ

Peter puts himself in the same category as the men he is addressing.

He calls himself a fellow elder before giving a single instruction.

"Witness of the sufferings of Christ" means Peter saw Christ suffer firsthand.

That eyewitness experience, not rank, is where Peter gets his authority to speak.

🤝 Peter calls himself a fellow elder
👀 Witness means he saw Christ suffer firsthand
🙅 He claims no rank above the others
📖 His authority comes from what he witnessed

## 🌟 A Partaker Of The Glory That Shall Be Revealed

"Partaker" means sharing directly in something, not just hearing about it secondhand.

"The glory that shall be revealed" points forward to Christ's return.

Peter already used this exact idea back in chapter one of this letter.

The same future hope Peter preaches to others is a hope he shares himself.

🌟 Partaker means sharing directly in something
🔮 Points forward to Christ's future return
🔁 Peter already used this idea in chapter one
📖 Peter shares the same hope he preaches

## 🐑 Feed The Flock Of God Which Is Among You

"Feed" here means shepherd and nourish, not simply hand out food.

"The flock" is an old picture for a local group of believers.

Jesus gave Peter this exact command by name after his resurrection.

Peter is passing along the very instruction Christ once gave to him.

🐑 Feed means shepherd and nourish, not food
👥 Flock pictures a local group of believers
✝️ Jesus gave Peter this exact command before
📖 Peter passes on what Christ told him

## 👁️ Taking The Oversight Thereof, Not By Constraint, But Willingly

"Oversight" means the real responsibility of watching over and caring for people.

"Constraint" means being forced into a duty against one's own wishes.

Peter wants leaders who choose this responsibility, not men stuck with it.

A forced shepherd and a willing shepherd care for a flock very differently.

👁️ Oversight means real responsibility for people
🚫 Constraint means being forced into a duty
🙋 Peter wants leaders who choose the role
📖 A willing shepherd cares differently

## 💰 Not For Filthy Lucre, But Of A Ready Mind

"Filthy lucre" means money gained in a shameful or dishonest way.

Some leaders in the early church used their position to profit unfairly.

"A ready mind" means an eager, willing attitude instead of a greedy one.

Peter names the wrong motive first so the right one stands out clearly.

💰 Filthy lucre means shamefully gained money
🙅 Some leaders used position to profit unfairly
🙂 A ready mind means eager willingness instead
📖 Peter contrasts greed with a willing heart

## 👑 Neither As Being Lords Over God's Heritage

"Lords over" pictures someone ruling with harsh, controlling authority.

"God's heritage" means the people who belong to God, not to the elder.

Peter reminds leaders who actually owns the flock they are caring for.

Leadership here was never meant to be about personal control.

👑 Lords over pictures harsh, controlling rule
👥 God's heritage means the people belong to God
🙅 Leaders do not own the flock they tend
📖 Leadership was never about personal control

## 🎯 But Being Ensamples To The Flock

"Ensamples" is an old spelling of examples, patterns worth copying.

Peter wants elders leading by life, not only by instruction.

A congregation watches how its leaders live just as much as what they say.

The flock learns far more from example than from a lecture.

🎯 Ensamples means examples worth copying
🧭 Elders lead by life, not just words
👀 A flock watches how leaders live
📖 Example teaches more than a lecture

## 🌿 When The Chief Shepherd Shall Appear, Ye Shall Receive A Crown Of Glory That Fadeth Not Away

"The chief Shepherd" names Christ as the one true leader above every elder.

"Appear" points to Christ's return, when every under shepherd answers to him.

Ancient winning athletes received a woven crown that withered within days.

"Fadeth not away" contrasts that short lived prize with a reward that never dies.

👑 Chief Shepherd names Christ above every elder
🔮 Appear points to Christ's future return
🌿 Athletic crowns back then withered quickly
📖 This crown fadeth not away, ever

# FirstPeter 5:5-7
# 🙇 Clothed With Humility
---
## 🧑 Likewise, Ye Younger, Submit Yourselves Unto The Elder

"Likewise" ties this command back to the willing attitude Peter just described.

Peter now turns from leaders to the younger members of the church.

"Submit" means willingly placing yourself under someone else's guidance.

Respect for leadership was expected to flow from the whole congregation.

🧑 Likewise links back to the attitude above
🔄 Peter now turns to the younger members
🙇 Submit means willingly accepting guidance
📖 Respect for leaders was expected from everyone

## 🤝 Yea, All Of You Be Subject One To Another

Peter widens the command from younger members to the entire church.

"Be subject" means yielding to one another instead of insisting on your own way.

This is not one group obeying another.

It runs in both directions through the whole congregation.

🤝 Peter widens the command to everyone
🔁 Subject one to another runs both ways
🙅 It is not one group over another
📖 Mutual respect was meant to be constant

## 🧥 And Be Clothed With Humility

"Clothed" pictures humility as something worn deliberately, like a garment.

A piece of clothing gets put on, not inherited automatically.

Peter is describing a choice made again and again, not a fixed trait.

This image may recall Jesus himself wrapping a towel around his waist to serve.

🧥 Clothed pictures humility as a garment
🙋 Putting it on is a daily choice
🤲 Not a trait, a repeated decision
📖 Echoes Jesus wrapping a towel to serve

## ⚖️ For God Resisteth The Proud, And Giveth Grace To The Humble

Peter quotes this line directly from the Book of Proverbs.

"Resisteth" means God actively opposes, not just disapproves quietly.

Pride puts a person in direct conflict with God, not just other people.

Humility opens the door to God's favor instead of his resistance.

📜 Peter quotes this directly from Proverbs
🛑 Resisteth means God actively opposes
⚔️ Pride puts someone in conflict with God
📖 Humility opens the door to his favor

## 💪 Humble Yourselves Therefore Under The Mighty Hand Of God

"The mighty hand of God" is an old picture of God's power over all of life.

Humbling yourself means accepting God's authority instead of fighting against it.

Peter's readers were living under real pressure and persecution at the time.

Submitting to God's hand does not mean giving up, it means trusting who holds it.

💪 Mighty hand pictures God's power over life
🙇 Humbling means accepting his authority
😣 Readers faced real pressure and persecution
📖 Submitting means trusting, not giving up

## 🕰️ That He May Exalt You In Due Time

"In due time" means at the right moment God chooses, not whenever we want.

"Exalt" means God himself will lift them up eventually.

Peter's readers were living under real pressure at the time he wrote.

The timing of that lifting up belongs to God, not to the one waiting.

🕰️ In due time means God's timing, not ours
⬆️ Exalt means God will lift them up
😣 Readers faced real pressure at the time
📖 The timing belongs to God, not to us

## 🎒 Casting All Your Care Upon Him

"Casting" pictures throwing something away from yourself completely, not setting it down gently.

"All your care" covers every worry, not just the biggest one.

Peter asks for a complete handoff, not a partial one.

This is an action taken again and again, not a single moment.

🎒 Casting pictures throwing something away fully
📦 All your care means every worry, not some
🤲 Peter asks for a complete handoff
📖 This handoff happens again and again

## ❤️ For He Careth For You

"Careth" means God pays close, personal attention, not distant concern.

This short line gives the actual reason the handoff in the verse before makes sense.

God's attention is not divided among believers like a crowd competing for notice.

Each person's worry matters to him individually.

❤️ Careth means close personal attention
🔗 This gives the reason casting care works
👥 God's attention is not divided like a crowd
📖 Each person's worry matters to him

# FirstPeter 5:8-9
# 🦁 Your Adversary The Devil
---
## 👀 Be Sober, Be Vigilant

"Sober" means clear minded, with full self control.

"Vigilant" means staying alert the way a guard watches through the night.

Peter uses both words together because a clear mind needs real alertness.

A distracted or careless mind is an easy target.

🧠 Sober means clear minded self control
👀 Vigilant means staying alert like a guard
🤝 Both words work together on purpose
📖 A careless mind is an easy target

## 🦁 Because Your Adversary The Devil, As A Roaring Lion, Walketh About

"Adversary" means an enemy actively working against someone, not a passive threat.

Peter pictures the devil as a roaring lion, a predator known in that region.

A roaring lion signals danger before it ever attacks.

Peter wants his readers alert to real spiritual danger, not living carelessly.

🦁 Adversary means an active enemy, not passive
🌍 Lions were a real, known danger there
📢 A roar signals danger before the attack
📖 Peter wants real alertness, not carelessness

## 🍽️ Seeking Whom He May Devour

"Devour" means to destroy completely, the way a predator consumes its prey.

The devil is pictured as actively searching, not waiting passively to be noticed.

This is not random danger, it is a targeted search for the weak.

Peter's warning aims to keep believers from being caught off guard.

🍽️ Devour means complete destruction
🔎 The devil is pictured actively searching
🎯 He targets the weak or distracted
📖 The warning prevents being caught off guard

## 🛡️ Whom Resist Stedfast In The Faith

"Resist" means standing firm against an attack instead of retreating.

"Stedfast" is an old spelling of steadfast, meaning firm and unmoving.

"The faith" here means trust in God, not a rulebook to defend.

Standing firm in trust is the direct answer to a prowling enemy.

🛡️ Resist means standing firm against attack
🪨 Stedfast means firm and unmoving
🙏 The faith means trust in God
📖 Firm trust answers a prowling enemy

## 🌍 Knowing That The Same Afflictions Are Accomplished In Your Brethren That Are In The World

"Afflictions" means hardships and suffering, the same kind just described.

"Accomplished" means these hardships are actually happening, not just a possibility.

"Your brethren" means fellow believers scattered across the wider world.

Knowing the struggle is shared everywhere makes it easier to carry alone.

🌍 Afflictions means hardships, like those just named
✅ Accomplished means actually happening, not hypothetical
👥 Brethren means fellow believers everywhere
📖 A shared struggle is easier to carry

# FirstPeter 5:10-11
# 🙌 The God Of All Grace
---
## 🎁 But The God Of All Grace

"The God of all grace" names God as the source of every undeserved gift.

Peter shifts from warning about the devil to resting in God's character.

This title covers every kind of grace, not just one specific blessing.

The chapter's tone changes the moment this phrase appears.

🎁 Names God as the source of grace
🔀 Peter shifts from warning to resting in God
🌈 Covers every kind of grace, not one
📖 The chapter's whole tone changes here

## ✝️ Who Hath Called Us Unto His Eternal Glory By Christ Jesus

"Called" means God himself started this relationship, not the believer.

"Eternal glory" points to a future far bigger than present suffering.

"By Christ Jesus" names exactly how that calling becomes possible.

Peter grounds the whole hope of this letter in one specific person.

✝️ Called means God started the relationship
🔮 Eternal glory points past present suffering
🔑 By Christ Jesus names how it happens
📖 The whole hope rests on one person

## 🔨 After That Ye Have Suffered A While, Make You Perfect, Stablish, Strengthen, Settle You

"A while" means suffering has a real limit, not an endless stretch.

Peter lists four actions God performs, each building on the last.

"Stablish" and "settle" are old words close to today's establish and secure.

God is pictured repairing and strengthening something damaged by hardship.

⏳ A while means suffering has a real limit
🧱 Peter lists four actions God performs
🔧 Stablish and settle mean establish and secure
📖 God repairs what hardship has damaged

## 👑 To Him Be Glory And Dominion For Ever And Ever

"Dominion" means complete ruling authority, not shared with anyone else.

Peter closes this thought the same way he closed chapter four, with worship.

"For ever and ever" stretches this praise beyond any limited season.

"Amen" seals the statement right after as true and settled.

👑 Dominion means complete ruling authority
🙌 Peter closes again with worship, not instruction
♾️ For ever and ever has no limit
📖 Amen seals the statement as settled

# FirstPeter 5:12-14
# ✉️ Greet Ye One Another With A Kiss Of Charity
---
## ✍️ By Silvanus, A Faithful Brother Unto You, As I Suppose, I Have Written Briefly

"Silvanus" was likely the same Silas who traveled with Paul in the Book of Acts.

Peter names the person who most likely carried or helped write this letter.

"As I suppose" is an honest admission, not a claim of total certainty.

"Written briefly" shows Peter knew he was compressing a much larger message.

✍️ Silvanus was likely Silas from Acts
📜 Peter names who carried this letter
❓ As I suppose admits honest uncertainty
📖 Briefly shows a larger message compressed

## 🤲 Exhorting, And Testifying That This Is The True Grace Of God Wherein Ye Stand

"Exhorting" means urging with encouragement, the same word used back in verse one.

"Testifying" means Peter is stating this as something he personally vouches for.

"The true grace of God" answers any doubt about whether this teaching is genuine.

"Wherein ye stand" pictures grace as solid ground already under their feet.

🤲 Exhorting means urging with encouragement
✅ Testifying means Peter vouches for it personally
✔️ True grace answers any doubt of it
📖 Wherein ye stand pictures solid ground already held

## 🏛️ The Church That Is At Babylon, Elected Together With You, Saluteth You

Many scholars believe "Babylon" here is a coded name for the city of Rome.

Rome, like ancient Babylon, represented a pagan empire opposed to God's people.

"Elected together with you" calls that distant church family, chosen the same way.

"Saluteth" simply means they send their greetings.

🏛️ Many scholars believe Babylon means Rome
⚔️ Both represented empires opposed to God's people
👥 Elected together calls them family, chosen alike
📖 Saluteth simply means sending greetings

## 👤 And So Doth Marcus My Son

"Marcus" is very likely John Mark, the writer of the Gospel of Mark.

"My son" probably describes a close spiritual relationship, not a literal birth son.

Mark traveled closely with Peter according to early church tradition.

A personal greeting like this grounds the letter in real relationships, not just teaching.

👤 Marcus is likely John Mark, the Gospel writer
💬 My son likely means a spiritual relationship
🧳 Mark traveled closely with Peter by tradition
📖 A personal greeting grounds the letter

## 💋 Greet Ye One Another With A Kiss Of Charity

A greeting kiss was a normal, respectful custom in that culture, not romantic.

"Charity" again means selfless love, the same word used earlier in the letter.

This simple gesture expressed real family affection inside the church.

Peter asks for warmth between believers right up to the letter's final line.

💋 A greeting kiss was a normal custom there
❤️ Charity means selfless love, as used earlier
🫂 It expressed real family affection
📖 Peter asks for warmth to the very end

## ☮️ Peace Be With You All That Are In Christ Jesus

Peter ends the letter the same way many New Testament letters end, with peace.

"In Christ Jesus" marks exactly who this blessing belongs to.

After pages about suffering, trials, and a roaring lion, the final word is peace.

"Amen" closes the letter the way it closed the praise earlier in this chapter.

☮️ Peter ends with peace, a common closing
🔑 In Christ Jesus marks the blessing
🌊 The final word is peace, not fear
📖 Amen closes the letter as before
`.trim();

export const FIRST_PETER_FIVE_PERSONAL_SECTIONS = parseFirstPeterFiveRawNotes(FIRST_PETER_FIVE_RAW_NOTES);
