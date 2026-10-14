export type SecondCorinthiansSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansSixRawNotes(rawText: string): SecondCorinthiansSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 6:${startVerse}` : `2 Corinthians 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Corinthians 6 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_SIX_RAW_NOTES = `# SecondCorinthians 6:1-2
# 🤝 Now Is The Accepted Time
---
## 🤝 We Then, As Workers Together With Him

"Workers together" means partners laboring side by side toward the same goal.

Paul is not describing employees taking orders from a distant boss.

He pictures himself and his readers laboring alongside God himself.

That partnership comes with real responsibility, not just a title.

🤝 Workers together means true partners

👷 Not employees taking distant orders

🙌 Paul pictures laboring beside God

📖 Partnership brings real responsibility

## 🙏 Beseech You Also That Ye Receive Not The Grace Of God In Vain

"Beseech" means to plead earnestly, not to suggest politely.

Paul is continuing the appeal he already made in chapter five.

"In vain" means receiving a gift and letting it accomplish nothing.

This is not about losing salvation already given.

It is about truly letting that grace change how a person lives.

🙏 Beseech means to plead earnestly

🎁 Grace received can still go to waste

🙅 Not about losing salvation already given

📖 Let grace actually change a life

## 📜 I Have Heard Thee In A Time Accepted

Paul is quoting the prophet Isaiah here, not writing his own words.

Isaiah 49:8 originally promised that God would answer his people at the right moment.

"Accepted" means a time marked by God's special favor.

Paul applies that old promise to the exact moment his readers are living in right now.

📜 Paul is quoting the prophet Isaiah

⏳ Accepted time means a moment of favor

🔄 An old promise applied to today

📖 God's favor meets this exact moment

## ⏰ Now Is The Accepted Time, Now Is The Day Of Salvation

Paul repeats "now" twice on purpose.

The favor Isaiah once promised for the future has already arrived.

There is no better day to respond to God than the one a reader is living in right now.

Waiting for a more convenient season misses the point entirely.

⏰ Now is repeated twice on purpose

🎯 A future promise has already arrived

🙅 Waiting for later misses the point

📖 Today is the day to respond

# SecondCorinthians 6:3-7
# 🛡️ Proving The Ministry Through Hardship
---
## 🚧 Giving No Offence In Any Thing

"Offence" here means a stumbling block, something that trips another person up.

Paul is careful that his own conduct never becomes the reason someone rejects the gospel.

This is not about avoiding every disagreement or hard truth.

It is about never letting his own behavior be the obstacle.

🚧 Offence means a stumbling block

🙅 Not avoiding hard truths

👀 His conduct should never be the obstacle

📖 Guarding the gospel's reputation

## 📋 That The Ministry Be Not Blamed

"Ministry" means the actual work of representing Christ to others.

"Blamed" means discredited or held in contempt.

Paul protects more than his own name here.

He protects the message itself from being dismissed because of him.

📋 Ministry means representing Christ

⚠️ Blamed means discredited

🙅 More than his own reputation

📖 The message itself is at stake

## 🪙 Approving Ourselves As The Ministers Of God

"Approving" means proving something genuine through real testing.

Think of a coin tested against a counterfeit to prove it is real metal.

Paul says his life under pressure is that test.

What follows in this list is the proof.

🪙 Approving means proving genuine

🔍 Like testing a coin for counterfeits

💪 His life under pressure is the test

📖 What follows is the proof

## ⏳ In Much Patience, In Afflictions, In Necessities, In Distresses

Paul lists four kinds of pressure he has carried for the gospel.

"Patience" means enduring hardship without giving up.

"Afflictions" means hardship in general, the normal weight of trouble.

"Necessities" means going without basic needs like food or shelter.

"Distresses" means being pressed into a tight corner with no easy way out.

⏳ Patience means enduring without quitting

🌧️ Afflictions means general hardship

🍞 Necessities means lacking basic needs

📖 Distresses means being pressed with no way out

## 🩹 In Stripes, In Imprisonments, In Tumults

These three describe hardship other people inflicted on Paul.

"Stripes" means being beaten, leaving marks on the skin.

"Imprisonments" means real jail time for preaching the gospel.

"Tumults" means violent public riots stirred up against him.

None of this was invited or deserved.

🩹 Stripes means being beaten

⛓️ Imprisonments means real jail time

📣 Tumults means violent public riots

📖 All of it was inflicted, not deserved

## 💪 In Labours, In Watchings, In Fastings

These three describe hardship Paul chose for the sake of the work.

"Labours" means exhausting physical effort, not easy desk work.

"Watchings" means staying awake through the night for the sake of others.

"Fastings" means going without food, sometimes by choice and sometimes by circumstance.

💪 Labours means exhausting effort

🌙 Watchings means sleepless nights

🍽️ Fastings means going without food

📖 Chosen hardship for the sake of others

## 💎 By Pureness, By Knowledge, By Longsuffering, By Kindness

The list now shifts from hardships to character.

"Pureness" means a motive with nothing hidden or mixed in.

"Knowledge" means real understanding of the truth he preaches.

"Longsuffering" means patience with difficult people over a long time.

"Kindness" means genuine goodwill acted out, not just felt.

💎 Pureness means a motive with nothing hidden

📚 Knowledge means real understanding of truth

⏳ Longsuffering means patience over time

📖 Kindness means goodwill put into action

## 🕊️ By The Holy Ghost, By Love Unfeigned

"Holy Ghost" names the Holy Spirit as the actual source of Paul's strength.

None of the list before this came from Paul's own willpower.

"Unfeigned" means without any pretending or acting.

His love for the Corinthians was not a performance.

🕊️ Holy Ghost names the real source of strength

🙅 Not Paul's own willpower

🎭 Unfeigned means no pretending

📖 Real love, not a performance

## 📜 By The Word Of Truth, By The Power Of God

"Word of truth" means the accurate gospel message, not a distorted version of it.

Some in Paul's day were already twisting that message for personal gain.

"Power of God" means ability beyond anything Paul could produce on his own.

Both the message and the strength to deliver it came from outside himself.

📜 Word of truth means the accurate gospel

🙅 Not a distorted version for gain

⚡ Power of God means ability beyond himself

📖 Both message and strength came from God

## 🛡️ By The Armour Of Righteousness On The Right Hand And On The Left

A Roman soldier carried a shield in one hand and a weapon in the other.

"Armour of righteousness" pictures Paul fully equipped on both sides at once.

The right hand and left hand together mean complete readiness, not a single piece of gear.

Righteousness itself is what protects him and what he fights with.

🛡️ Picture a soldier equipped on both sides

⚔️ Right and left means complete readiness

🙅 Not just a single piece of gear

📖 Righteousness itself is the armour

# SecondCorinthians 6:8-10
# ⚖️ Paradoxes Of A Life In Christ
---
## 👏 By Honour And Dishonour, By Evil Report And Good Report

Paul's ministry does not depend on how people talk about him.

"Honour" means being praised and "dishonour" means being shamed publicly.

"Evil report" means being slandered and "good report" means being spoken well of.

He stays faithful to the same work no matter which one he receives.

👏 Honour means public praise

💔 Dishonour means public shame

🗣️ Evil and good report mean rumor either way

📖 His calling does not depend on reputation

## 🎭 As Deceivers, And Yet True

Some people accused Paul of being a fraud.

He does not deny that the accusation was made.

He simply states that it was false.

Being falsely accused does not make someone guilty.

🎭 Deceivers was a real accusation against him

🙅 He does not deny it was said

✅ He states plainly it was false

📖 A false accusation does not make it true

## 👻 As Unknown, And Yet Well Known

Paul carried no fame among the powerful people of his world.

To the elite and the influential, he was practically invisible.

But to God, and to every church he served, he was fully known.

The world's attention was never the measure that mattered.

👻 Unknown to the world's elite

🙏 Fully known to God

⛪ Fully known by the churches he served

📖 The world's attention was never the real measure

## ☠️ As Dying, And, Behold, We Live

Paul lived under constant threat of death for preaching the gospel.

He already described this same reality back in chapter four.

Yet he kept being preserved, again and again.

"Behold" signals genuine surprise, as if even Paul marvels at his own survival.

☠️ Constant threat of death

📜 Chapter four named this same reality

🔄 Preserved again and again

📖 Even Paul marvels at his own survival

## 👨‍👦 As Chastened, And Not Killed

"Chastened" means disciplined, the way a father corrects a child he loves.

This is not punishment meant to destroy.

Paul suffered real correction and real hardship under God's hand.

He was never actually destroyed by it.

👨‍👦 Chastened means a father's correction

🙅 Not punishment meant to destroy

💪 Real suffering under God's hand

📖 Corrected, never destroyed

## 😢 As Sorrowful, Yet Alway Rejoicing

Paul does not pretend to feel only one emotion at a time.

Real grief and real joy sit together in the same life.

"Alway" means this joy is constant, not occasional.

Faith was never about faking happiness.

😢 Real grief, honestly named

😊 Real joy held at the same time

⏳ Alway means constant, not occasional

📖 Faith is not about faking happiness

## 💸 As Poor, Yet Making Many Rich

Paul owned very little in material terms.

Think of someone with an empty wallet who still hands out something priceless.

What he gave the Corinthians was not money.

It was the gospel, and that made them truly rich.

💸 Poor means almost no material wealth

🎁 Still gives something priceless

📜 What he gave was the gospel

📖 Spiritual riches outlast material poverty

## 📦 As Having Nothing, And Yet Possessing All Things

This is the strongest paradox in the whole list.

Paul owned no property worth naming.

But everything that belongs to Christ already belongs to everyone united to him.

Possessing all things never meant personal property.

It meant sharing in Christ's own inheritance.

📦 Having nothing means no real property

✝️ United to Christ, united to his inheritance

🙅 Possessing all things is not about property

📖 Sharing fully in what Christ owns

# SecondCorinthians 6:11-13
# ❤️ Our Heart Is Enlarged
---
## 🗣️ Our Mouth Is Open Unto You

"Mouth is open" is a figure of speech for speaking with total honesty.

Paul is not hiding anything from the Corinthians anymore.

He has told them exactly where he stands, even the hard parts.

Nothing in this letter has been held back.

🗣️ Mouth open means total honesty

🙅 Nothing hidden from them

📜 Even the hard parts were said

📖 Nothing in this letter is held back

## ❤️ Our Heart Is Enlarged

"Enlarged" does not describe a physical change to Paul's heart.

It pictures deep affection opened wide, with room for more.

Paul is describing how much room he has made for the Corinthians in his own life.

This is the opposite of a closed, guarded heart.

❤️ Enlarged means opened wide

🙅 Not a literal physical change

🏠 Room made for them in his life

📖 The opposite of a guarded heart

## 📏 Ye Are Not Straitened In Us

"Straitened" means squeezed into a narrow, restricted space.

Paul says that restriction, if it exists, is not coming from his side.

He has already shown them full and open affection.

Any distance between them was never his doing.

📏 Straitened means squeezed narrow

🙅 Not coming from Paul's side

❤️ He already gave full affection

📖 The distance was never his doing

## 🚪 Ye Are Straitened In Your Own Bowels

"Bowels" in the King James Bible is an idiom for deep inner emotion, much like "heart" today.

Paul says the Corinthians have closed off their own affections toward him.

The restriction between them is coming from their side, not his.

He names this honestly instead of avoiding the issue.

❤️ Bowels means deep inner emotion

🚪 Their own affections have closed

🙅 Not Paul's restriction, theirs

📖 He names it honestly

## 👨‍👧 I Speak As Unto My Children

Paul founded this church himself through his own preaching.

That history gives him the standing to speak this directly.

"Children" names a parent's right to appeal honestly, not a parent's right to control.

He speaks with care, not with authority used to dominate.

👨‍👧 Paul founded this church himself

📜 That history gives him standing

🙅 Not control, but honest appeal

📖 Care, not domination

## 🙏 Be Ye Also Enlarged

Paul already described his own heart as wide open toward them.

Now he asks for the same openness in return.

This is not a demand backed by threats.

It is an invitation to match the affection already shown.

❤️ Paul already opened his heart first

🙏 Now he asks the same back

🙅 Not a demand backed by threats

📖 An invitation to match his affection

# SecondCorinthians 6:14-16
# 🚫 Be Ye Not Unequally Yoked
---
## 🐂 Be Ye Not Unequally Yoked Together With Unbelievers

A "yoke" was a wooden bar that joined two animals so they could pull a plow together.

Two mismatched animals, like an ox and a donkey, could not pull the same direction.

Paul borrows that picture for any close partnership that binds a believer's direction to someone who rejects Christ.

This is about binding alliances, not every ordinary friendship.

🐂 Yoke means two animals joined together

🙅 Mismatched animals cannot pull together

🔗 Pictures any binding partnership

📖 Not every friendship, but binding alliances

## 🤝 What Fellowship Hath Righteousness With Unrighteousness

"Fellowship" means a shared partnership working toward the same outcome.

Paul asks this as a rhetorical question, expecting the obvious answer of none.

Righteousness and unrighteousness are moving toward opposite destinations.

They cannot share one partnership and go two different directions.

🤝 Fellowship means shared partnership

❓ A rhetorical question expecting none

↔️ Opposite destinations cannot share one path

📖 Righteousness and unrighteousness cannot partner

## 🕯️ What Communion Hath Light With Darkness

"Communion" means an intimate, shared union.

Light entering a dark room does not blend with the darkness.

It simply replaces it.

The two cannot occupy the same space at once.

🕯️ Communion means intimate union

💡 Light entering a room replaces darkness

🙅 The two cannot blend together

📖 They cannot share the same space

## 😈 What Concord Hath Christ With Belial

"Concord" means harmony or agreement between two sides.

"Belial" was a Jewish name used for Satan or for what is utterly worthless.

Paul is naming the sharpest possible contrast available to his readers.

There is no harmony possible between these two.

🤝 Concord means harmony between two sides

😈 Belial was a Jewish name for Satan

⚔️ The sharpest contrast Paul could name

📖 No harmony is possible here

## 🙏 What Part Hath He That Believeth With An Infidel

"Infidel" here simply means someone without faith in Christ.

"Part" means a shared stake or portion in something.

Paul is not asking believers to avoid every unbeliever in daily life.

He is asking whether faith and unbelief can share one deep commitment.

🙏 Infidel means someone without faith

🧩 Part means a shared stake

🙅 Not about avoiding all unbelievers

📖 Can faith and unbelief share one commitment

## 🏛️ What Agreement Hath The Temple Of God With Idols

The temple in Jerusalem was the one place God's presence was understood to dwell.

Idols were lifeless images worshiped as if they were gods.

Paul asks what possible agreement could exist between God's true dwelling place and a lifeless image.

The answer is meant to be obvious.

🏛️ Temple was where God's presence dwelt

🗿 Idols were lifeless worshiped images

❓ What agreement could these two share

📖 The answer is meant to be obvious

## 🙌 Ye Are The Temple Of The Living God

Paul is not using temple as a decoration or a nice metaphor.

He is saying something literal about where God now dwells.

Believers together are the place God's presence actually lives.

That is the whole reason this unequal yoking matters so much.

🏛️ Not a decoration or metaphor

🙌 Believers are where God dwells now

⛪ This is said about them together

📖 This is why the yoking matters so much

## 🏠 I Will Dwell In Them, And Walk In Them

Paul is quoting Old Testament promises, echoing language from Leviticus and Ezekiel.

"Dwell" means a permanent home, not a short visit.

"Walk" means an ongoing, active presence, not a distant watch from far away.

God's closeness to his people was always the promise, not a new idea invented here.

📜 Quoting old covenant promises

🏠 Dwell means a permanent home

🚶 Walk means ongoing active presence

📖 God's closeness was always the promise

# SecondCorinthians 6:17-18
# 👑 Sons And Daughters Of The Lord Almighty
---
## 📜 Wherefore Come Out From Among Them, And Be Ye Separate

Paul is quoting Isaiah 52:11, originally spoken about leaving Babylon during the exile.

That exit meant walking away from a place soaked in idol worship.

Paul applies the same call to walking away from binding partnerships with what pulls a believer toward idolatry.

"Separate" is about loyalty, not isolation from every person in the world.

📜 Quoting Isaiah's call to leave Babylon

🚶 Originally about leaving idol worship behind

🔗 Applied to binding spiritual partnerships

📖 Separate means loyalty, not isolation

## ⚠️ Touch Not The Unclean Thing

"Unclean" echoes Old Testament language for anything that defiled a person spiritually.

This is not a rule about surface level contact.

It is about what shapes a person's deepest loyalty.

Some things cannot be handled casually without being changed by them.

⚠️ Unclean echoes Old Testament defilement

🙅 Not about surface level contact

❤️ About what shapes deep loyalty

📖 Some things change whoever handles them

## 🤲 I Will Receive You

This promise answers the call to come out and be separate.

"Receive" means a genuine, open welcome.

This is not Paul inventing a reward to earn salvation.

It is the relational closeness that follows obedience already given freely.

🤲 Receive means a genuine welcome

🎁 Answers the call to come out

🙅 Not a reward earned for salvation

📖 Closeness that follows obedience

## 👨‍👧 I Will Be A Father Unto You

This is a direct covenant promise, not a vague title.

A father in this culture provided protection, inheritance, and identity to his household.

God claims that same role personally.

The relationship is not distant or symbolic.

👨‍👧 A direct covenant promise

🛡️ Fathers gave protection and identity

👑 God claims that role personally

📖 Not distant, but personal

## ➕ Ye Shall Be My Sons And Daughters

Isaiah's original promise named only sons.

Paul deliberately adds daughters here.

This completes the family picture rather than leaving anyone out of the promise.

Every believer, regardless of standing in that world, is named as a full child in this family.

📜 Isaiah's original named only sons

➕ Paul adds daughters on purpose

🙌 No one is left out of the promise

📖 Every believer is a full child here

## ⚡ Saith The Lord Almighty

"Almighty" translates a title used for God's total, unmatched power.

This closing line is not a casual signature.

It backs the whole promise with the full weight of who is making it.

The chapter ends on the certainty of that promise, not on human effort.

⚡ Almighty names total unmatched power

✍️ Not a casual closing signature

🏋️ Backs the promise with full weight

📖 The chapter ends on certainty, not effort
`.trim();

export const SECOND_CORINTHIANS_SIX_PERSONAL_SECTIONS = parseSecondCorinthiansSixRawNotes(SECOND_CORINTHIANS_SIX_RAW_NOTES);
