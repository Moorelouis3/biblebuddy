export type FirstPeterThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstPeterThreeRawNotes(rawText: string): FirstPeterThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstPeterThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstPeter\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Peter 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstPeter\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstPeter\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Peter 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Peter 3:${startVerse}` : `1 Peter 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 First Peter 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_PETER_THREE_RAW_NOTES = `# FirstPeter 3:1-2
# 💍 Likewise, Ye Wives, Be In Subjection
---
## 💍 Likewise, Ye Wives, Be In Subjection To Your Own Husbands

"Likewise" ties this command to everything Peter just said.

Peter has been walking through different relationships one at a time.

Submission to leaders, then servants to masters, now wives to husbands.

None of these commands stand alone in his argument.

Each one fits the same larger pattern Peter has been building.

💍 Likewise links back to the earlier commands
👑 Leaders, then servants, now wives
🔗 Part of one larger pattern
📖 None of these stand alone

## 🤐 That, If Any Obey Not The Word, They Also May Without The Word Be Won

"Obey not the word" means a husband who does not believe the gospel.

Peter is picturing a wife married to an unbelieving husband.

"Without the word" means without a single sermon or argument.

Peter is not asking her to debate her husband into faith.

He is asking her life itself to do the convincing.

A quiet witness can reach a place words cannot.

🚫 Obey not the word means an unbelieving husband
🤐 Without the word means no sermon or argument
👀 Her life does the convincing instead
📖 A quiet witness reaches past words

## 🗣️ By The Conversation Of The Wives

"Conversation" in this older English means a whole way of life.

It is far wider than just the words someone speaks.

Peter already used this word back in chapter two.

A wife's conversation covers everything her husband watches day to day.

That daily pattern becomes the real argument for the gospel.

🗣️ Conversation means a whole way of life
📏 It is wider than spoken words
🔁 Peter used this word back in chapter two
📖 Daily pattern becomes the real argument

## 👀 While They Behold Your Chaste Conversation Coupled With Fear

"Behold" means a husband watching closely over time, not one glance.

"Chaste" means pure and faithful conduct, not only inside marriage.

"Fear" here does not mean being afraid of her husband.

It means a deep reverence toward God running underneath everything she does.

A watching husband sees that reverence long before he hears it explained.

👀 Behold means watching closely over time
✨ Chaste means pure and faithful conduct
🙏 Fear here means reverence toward God
📖 He sees it before he hears it explained

# FirstPeter 3:3-6
# 👗 Whose Adorning Let It Not Be That Outward Adorning
---
## 💇 Whose Adorning Let It Not Be That Outward Adorning Of Plaiting The Hair

"Adorning" means decoration meant to make someone look impressive.

"Plaiting the hair" describes elaborate, time consuming braided hairstyles.

In the Roman world, wealthy women wore tall, styled braids as a status display.

Peter is not banning hairstyles outright.

He is warning against chasing attention through outward display alone.

💇 Adorning means decoration meant to impress
🎀 Plaiting meant elaborate braided styles
👑 Wealthy Roman women wore this as status
📖 The warning is chasing attention, not hair

## 💰 And Of Wearing Of Gold, Or Of Putting On Of Apparel

Gold jewelry and fine clothing marked wealth and social rank in this culture.

Peter lists three items together on purpose, hair, gold, and clothing.

All three share the same problem.

Each one can become a stand in for real character.

Peter wants beauty built on something that cannot be bought.

💰 Gold and fine clothing marked wealth
📋 Peter lists three items together
🎭 Each can replace real character
📖 He wants beauty that cannot be bought

## 🫀 But Let It Be The Hidden Man Of The Heart

"The hidden man of the heart" means a person's true inner character.

It is everything no mirror or outfit can show.

Peter sets this directly against the outward adorning from the line before.

One beauty can be seen immediately.

The other only shows itself over time, through how a person actually lives.

🫀 Hidden man means true inner character
🪞 No mirror can show this beauty
⚖️ Peter sets it against outward display
📖 Inner beauty shows itself over time

## ⏳ In That Which Is Not Corruptible, Even The Ornament Of A Meek And Quiet Spirit

"Corruptible" describes anything that wears out, fades, or decays with time.

Clothes fray, gold can be stolen, and good looks eventually fade.

A "meek and quiet spirit" does not decay the same way.

"Meek" means gentle strength, not weakness.

"Quiet" means calm and unshaken, not loud or anxious.

That kind of spirit only grows more valuable with age.

⏳ Corruptible means it wears out over time
🧵 Clothes, gold, and looks all fade
💪 Meek means gentle strength, not weakness
📖 This beauty only grows more valuable

## 💎 Which Is In The Sight Of God Of Great Price

This beauty is measured by a different audience than the one usually watched.

"In the sight of God" means God is the one evaluating it.

"Of great price" means extremely valuable, worth far more than jewelry.

A quiet, gentle spirit might go completely unnoticed by other people.

It is never unnoticed by God.

👁️ God is the one measuring this beauty
💎 Great price means extremely valuable
🙈 People may miss it completely
📖 God never misses it

## 📜 The Holy Women Also, Who Trusted In God, Adorned Themselves

Peter now points back to a whole line of godly women from the Old Testament.

These were women whose trust in God shaped how they lived.

Their beauty was never built on outward display.

Peter is giving his readers a tradition to join, not inventing a new rule.

He points to one specific example next.

📜 Holy women means godly Old Testament women
🙏 Their trust in God shaped their lives
🚫 Their beauty was not outward display
📖 Peter gives a tradition, not a new rule

## 🗣️ Even As Sara Obeyed Abraham, Calling Him Lord

Sara is the Old Testament spelling of Sarah, Abraham's wife.

Calling a husband "lord" was a common form of honor in that culture.

It was a title of respect, not a sign of fear or inequality.

Peter points to Sara's respect as the pattern worth following now.

This is the same Sara whose story of faith runs through Genesis.

📖 Sara is the Old Testament spelling of Sarah
🗣️ Lord was a title of honor, not fear
🤝 It showed respect inside the marriage
➡️ Peter holds her up as the pattern

## 😨 Whose Daughters Ye Are, As Long As Ye Do Well, And Are Not Afraid With Any Amazement

Peter calls these wives Sara's daughters, meaning spiritual heirs of her example.

"Amazement" in this verse means sudden fear or being startled into panic.

Peter is not demanding fearlessness from women who are nervous by nature.

He is pointing to a deeper security that does not collapse under pressure.

That security comes from trusting God, the same way Sara did.

👩‍👩‍👧 Daughters means spiritual heirs of Sara
😨 Amazement means sudden panic or fear
🛡️ Peter points to a deeper security
📖 That security comes from trusting God

# FirstPeter 3:7
# 🤝 Likewise, Ye Husbands, Dwell With Them According To Knowledge
---
## 🧠 Likewise, Ye Husbands, Dwell With Them According To Knowledge

"Likewise" again links this command to the pattern running through this section.

"Dwell with them according to knowledge" means living with real understanding of a wife.

It is not knowledge in general.

It means paying attention to who she actually is.

A husband who never truly studies his wife cannot honor her well.

🔗 Likewise links to the pattern again
🧠 Knowledge means real understanding of her
👀 It means paying attention to who she is
📖 Honor requires really knowing her

## 🏺 Giving Honour Unto The Wife, As Unto The Weaker Vessel

"Vessel" is a common Biblical word picture for a person, like a container.

"Weaker" likely points to differences in physical strength, not worth or intellect.

This phrase does not mean a wife is less valuable or less capable.

Peter pairs "weaker" directly with the command to give her honor.

A weaker vessel in this picture is handled with more care, not less respect.

🏺 Vessel is a word picture for a person
💪 Weaker likely points to physical strength
🚫 It does not mean less value
📖 Weaker vessels get more care, not less

## 🤝 As Being Heirs Together Of The Grace Of Life

"Heirs together" means both husband and wife receive the same inheritance from God.

Neither one owns a bigger share of God's grace than the other.

"The grace of life" points to the full life God gives through Christ.

This phrase quietly undercuts any idea that a husband outranks his wife spiritually.

They stand on completely equal ground before God.

🤝 Heirs together means an equal inheritance
⚖️ Neither owns a bigger share
🎁 Grace of life means life through Christ
📖 They stand equal before God

## 🚧 That Your Prayers Be Not Hindered

"Hindered" means blocked or stopped from working properly.

Peter ties a husband's treatment of his wife directly to his prayer life.

Mistreating her at home does not stay separate from his walk with God.

A marriage out of order can quietly disrupt a man's closeness with God.

How a husband treats his wife and how he talks to God are not two separate things.

🚧 Hindered means blocked from working
🏠 Home life connects to prayer life
💔 Mistreatment disrupts a man's walk with God
📖 These two things are never separate

# FirstPeter 3:8-9
# 🤲 Finally, Be Ye All Of One Mind
---
## 🧩 Finally, Be Ye All Of One Mind, Having Compassion One Of Another

"Finally" signals Peter is now speaking to the whole church, not one group.

"Of one mind" means united around the same priorities and purpose.

"Compassion" means feeling someone else's pain as if it were your own.

Peter moves from specific relationships to the whole community at once.

Unity does not mean everyone agrees on everything.

It means everyone cares about the same things.

🔄 Finally shifts to the whole church
🧩 One mind means shared priorities
❤️ Compassion means feeling another's pain
📖 Unity means shared care, not sameness

## 👨‍👩‍👧 Love As Brethren, Be Pitiful, Be Courteous

"Brethren" treats every believer as family, not just fellow members.

"Pitiful" in this older English means full of compassion, not pathetic.

"Courteous" means genuinely polite and considerate toward others.

Peter is stacking short, practical commands one after another.

None of these require special talent.

They only require consistent, daily choice.

👨‍👩‍👧 Brethren means treating believers as family
💗 Pitiful here means full of compassion
🙇 Courteous means genuinely considerate
📖 These only require daily choice

## 🔁 Not Rendering Evil For Evil, Or Railing For Railing

"Rendering" means paying something back in return.

"Railing" means insulting or verbally attacking someone.

The normal instinct is to answer an insult with an insult of equal size.

Peter tells his readers to break that automatic cycle.

Breaking the cycle takes more strength than continuing it ever would.

🔁 Rendering means paying something back
🗣️ Railing means verbal attack
⚡ The instinct is to answer in kind
📖 Breaking the cycle takes real strength

## 🔄 But Contrariwise Blessing

"Contrariwise" simply means the exact opposite.

Instead of firing back an insult, Peter commands something that sounds backward.

He commands blessing, speaking good toward the very person causing harm.

This is not weakness or pretending to feel nothing.

It is a deliberate choice to respond the opposite way on purpose.

🔄 Contrariwise means the exact opposite
🗣️ Blessing means speaking good toward them
🚫 This is not weakness
📖 It is a deliberate opposite response

## 🎁 Knowing That Ye Are Thereunto Called, That Ye Should Inherit A Blessing

"Thereunto called" means this response is the actual calling, not an exception.

Blessing instead of retaliating is not a bonus assignment for advanced believers.

It is part of what being called by God actually looks like.

"Inherit a blessing" ties back to the promise language running through this letter.

The reward is not for winning the argument.

It is for becoming the kind of person who does not need to.

📞 Thereunto called means this is the calling
🚫 Not a bonus assignment for a few
🎁 Inherit a blessing ties to earlier promises
📖 The reward is character, not winning

# FirstPeter 3:10-12
# 👅 For He That Will Love Life, And See Good Days
---
## 📜 For He That Will Love Life, And See Good Days

Peter now quotes directly from Psalm 34, a psalm about trusting God under pressure.

"Love life" means genuinely wanting a good, full life, not just survival.

"See good days" describes actually experiencing that good life, not only hoping for it.

Peter answers that desire with a specific, practical path.

The path starts with something most people overlook, the tongue.

📜 This quotes Psalm 34 directly
❤️ Love life means wanting a full life
☀️ Good days means really experiencing it
📖 The path starts with the tongue

## 🎭 Let Him Refrain His Tongue From Evil, And His Lips That They Speak No Guile

"Refrain" means deliberately holding something back.

"Guile" means using lies or tricks to get your way.

Peter already used this exact word back in chapter two.

Controlling speech comes before every other instruction in this list.

Peter treats the tongue as the first and hardest battle to win.

🛑 Refrain means holding something back
🎭 Guile means lying to get your way
🔁 Peter used this word in chapter two
📖 The tongue is the first battle

## 🚫 Let Him Eschew Evil, And Do Good

"Eschew" means to deliberately turn away from and avoid something.

This is not passive avoidance by accident.

It takes active effort to turn away from a specific evil.

Peter immediately pairs that turning away with doing something positive instead.

Avoiding evil alone is only half the instruction.

🚫 Eschew means deliberately avoiding something
🏃 It takes active effort, not accident
➕ Peter pairs it with doing good
📖 Avoiding evil alone is only half

## 🏃 Let Him Seek Peace, And Ensue It

"Ensue" means to chase after or pursue with real effort.

"Seek" and "ensue" are placed together on purpose.

Peace in this verse is not something that simply shows up on its own.

It has to be actively chased, the same way someone chases a goal.

Most conflict ends only when someone decides to go after peace that hard.

🏃 Ensue means to chase after
🕊️ Peace does not show up on its own
🎯 It must be actively pursued
📖 Conflict ends when someone chases peace

## 👂 For The Eyes Of The Lord Are Over The Righteous, And His Ears Are Open Unto Their Prayers

"The eyes of the Lord" is a picture of God's close, watchful attention.

"His ears are open" pictures God actively listening, not just watching from a distance.

Together these two pictures describe a God paying full attention to his people.

This is not a distant or disinterested kind of care.

It is attentive, continual, and personal.

👀 Eyes of the Lord means watchful attention
👂 Ears open means actively listening
🤝 Together they picture full attention
📖 God's care is personal, not distant

## 😠 But The Face Of The Lord Is Against Them That Do Evil

"The face of the Lord" turned against someone pictures active opposition, not mere disapproval.

This verse pairs two pictures of the same God side by side.

Watchful care goes to the righteous.

Active resistance goes to those doing evil.

God's attention never changes.

Only the person's own direction decides which side of it they stand on.

😠 Face against someone means active opposition
➗ Two pictures of one God, side by side
🧭 Direction decides which side someone stands on
📖 God's attention never changes

# FirstPeter 3:13-17
# 🛡️ And Who Is He That Will Harm You
---
## ❓ And Who Is He That Will Harm You, If Ye Be Followers Of That Which Is Good

Peter asks a rhetorical question, not expecting a literal answer.

"Followers" here means imitators, people actively copying a pattern of good.

Consistent goodness generally lowers the number of enemies someone makes.

Peter knows this is not a guarantee.

He addresses the exception immediately in the very next line.

❓ Peter asks a rhetorical question
🚶 Followers means imitators of good
⬇️ Goodness generally lowers conflict
📖 The exception comes next

## ⚠️ But And If Ye Suffer For Righteousness' Sake, Happy Are Ye

Peter now addresses the exception, suffering that happens anyway.

"Happy" here does not mean cheerful or amused in the moment.

It means blessed, truly favored by God, even while it hurts.

Doing right does not guarantee safety from harm.

It does guarantee God's favor resting on the one who suffers for it.

⚠️ Peter now addresses the exception
😊 Happy here means blessed, not cheerful
🚫 Doing right does not guarantee safety
📖 It guarantees God's favor instead

## 😨 And Be Not Afraid Of Their Terror, Neither Be Troubled

"Their terror" points to the fear tactics of people hostile to these believers.

Peter does not promise the threats will stop.

He commands his readers not to let those threats control their hearts.

Fear was likely the exact tool their opponents were using against them.

Peter removes that tool's power over his readers directly.

😨 Their terror means hostile fear tactics
🚫 Peter does not promise threats stop
🛡️ He commands hearts stay unshaken
📖 He removes fear's power over them

## 🙏 But Sanctify The Lord God In Your Hearts

"Sanctify" means to set apart as holy, to treat as uniquely worthy of honor.

Peter is not describing a ritual act here.

He means an inward decision, made in the heart, not performed outwardly.

When God holds that highest place inside someone, outside threats shrink in comparison.

Fear of people gets smaller next to reverence for God.

🙏 Sanctify means setting apart as holy
🫀 This happens inwardly, in the heart
⚖️ It is not an outward ritual
📖 Fear of people shrinks next to this

## ⚖️ And Be Ready Always To Give An Answer To Every Man That Asketh You A Reason Of The Hope That Is In You

"Answer" here translates a word used for a formal legal defense.

Peter expects these believers to actually be asked why they hope the way they do.

"A reason" means a real explanation, not just a feeling.

Being ready means thinking this through ahead of time, not improvising under pressure.

A hope worth having is a hope that can be explained.

⚖️ Answer translates a legal defense word
❓ People will ask about their hope
🧠 Reason means a real explanation
📖 A hope worth having can be explained

## 💪 With Meekness And Fear

"Meekness" means gentle strength, not weakness or caving in.

"Fear" here again means reverence toward God, not nervousness toward the questioner.

Peter cares about the manner of the answer, not only its content.

A harsh or arrogant defense can undo the very witness it was meant to give.

How something is said can matter as much as what is said.

💪 Meekness means gentle strength
🙏 Fear means reverence toward God
🎯 Manner matters as much as content
📖 A harsh answer can undo a good one

## 🫀 Having A Good Conscience

"Good conscience" means an inner sense of having done nothing wrong.

Peter connects this same phrase to baptism later in this chapter.

Here it works as a kind of armor against false accusations.

A clean conscience does not stop accusations from coming.

It does give steady ground to stand on while they come.

🫀 Good conscience means a clean inner sense
🛡️ It works like armor against accusation
🚫 It does not stop accusations
📖 It gives steady ground to stand on

## 🤥 That, Whereas They Speak Evil Of You, As Of Evildoers, They May Be Ashamed That Falsely Accuse Your Good Conversation In Christ

Some people were accusing these believers of being criminals, with no real evidence.

"Falsely accuse" states plainly that the charge itself was not true.

"Good conversation in Christ" points back to that whole way of life Peter described earlier.

Peter expects consistent good living to eventually embarrass a false accuser.

The goal is not revenge.

It is a liar running out of a lie that no longer fits the evidence.

⚠️ Accusers had no real evidence
🤥 Falsely accuse means the charge was untrue
🗣️ Good conversation points to a godly life
📖 Consistent goodness outlasts a false charge

## ⚖️ For It Is Better, If The Will Of God Be So, That Ye Suffer For Well Doing, Than For Evil Doing

Peter closes this section with a plain comparison.

Suffering for doing right is painful, but it carries no shame with it.

Suffering for doing wrong carries both pain and guilt at the same time.

"If the will of God be so" admits that suffering is not always avoidable.

When it comes anyway, Peter wants his readers suffering for the right reason.

⚖️ Peter closes with a plain comparison
😣 Suffering for right carries no shame
😔 Suffering for wrong carries pain and guilt
📖 If suffering comes, let it be for right

# FirstPeter 3:18-20
# ✝️ For Christ Also Hath Once Suffered For Sins
---
## 1️⃣ For Christ Also Hath Once Suffered For Sins, The Just For The Unjust

"Once" here means one single time, never to be repeated again.

Old Testament sacrifices had to happen over and over without end.

Christ's suffering for sin needed to happen only once.

"The just for the unjust" means the one truly innocent died in place of the guilty.

This is the pattern Peter has been asking his readers to copy all along.

🔂 Once means one time, never repeated
🔁 Old sacrifices repeated endlessly
⚖️ The just died for the unjust
📖 This is the pattern readers copy

## 🎯 That He Might Bring Us To God

This phrase names the actual goal of Christ's suffering.

It was not suffering for its own sake.

"Bring us to God" means closing a distance that sin had created.

Before this, people were separated from God by their own guilt.

Christ's suffering existed to close that exact gap.

🎯 This names the goal of the suffering
🚫 Not suffering for its own sake
🌉 Bring to God means closing a gap
📖 Guilt had caused that separation

## 💀 Being Put To Death In The Flesh, But Quickened By The Spirit

"Put to death in the flesh" states plainly that Christ's body actually died.

"Quickened" means made alive, not merely kept alive.

This verse marks a clear turn from death toward life.

Peter is laying groundwork for resurrection before saying the word directly.

Death was real, but it was never the final word.

💀 Put to death means the body really died
⚡ Quickened means made alive
🔄 The verse turns from death to life
📖 Death was real but not final

## ❓ By Which Also He Went And Preached Unto The Spirits In Prison

This is one of the most debated verses in the whole letter.

"Spirits in prison" likely refers to beings held in a state of judgment.

Many scholars believe this points to disobedient beings from Noah's time, named next.

Other careful readers understand it differently.

The text does not give enough detail to settle every question here.

❓ This verse is widely debated
🔒 Spirits in prison means beings under judgment
📜 Many connect it to Noah's time
📖 The text does not settle every detail

## ⏳ Which Sometime Were Disobedient, When Once The Longsuffering Of God Waited In The Days Of Noah

"Sometime" here is older English for "formerly" or "at one time."

"Longsuffering" means patience that holds out far longer than seems reasonable.

God's patience toward that disobedient generation stretched across the whole time Noah built.

That patience was real, but it did eventually run out at the flood.

God's patience is long, but it is never permanent.

⏳ Sometime means formerly, in this verse
💪 Longsuffering means patience held out long
🛠️ God waited the whole time Noah built
📖 Patience is long, not permanent

## 🚢 While The Ark Was A Preparing, Wherein Few, That Is, Eight Souls Were Saved By Water

"The ark" was the massive wooden vessel Noah built at God's direct instruction.

"Eight souls" means Noah, his wife, his three sons, and their three wives.

Out of an entire world of people, only this one household survived the flood.

The flood that destroyed most of the earth is also what carried that household to safety.

The same water became both judgment and rescue, depending on where someone stood.

🚢 The ark was the vessel Noah built
👪 Eight souls were Noah's whole household
🌍 The rest of the world did not survive
📖 Water became both judgment and rescue

# FirstPeter 3:21-22
# 🕊️ The Like Figure Whereunto Even Baptism Doth Also Now Save Us
---
## 🖼️ The Like Figure Whereunto Even Baptism Doth Also Now Save Us

"The like figure" means baptism works as a picture matching Noah's story.

Water carried Noah's household safely through judgment and into a new start.

Baptism pictures that same kind of passage for a believer now.

Peter is not saying water itself has magic power.

He explains exactly what he means in the very next line.

🖼️ Like figure means a matching picture
🌊 Water carried Noah through judgment
🕊️ Baptism pictures that same passage
📖 Peter explains the meaning next

## 🚫 Not The Putting Away Of The Filth Of The Flesh

Peter immediately rules out one possible misunderstanding.

"The filth of the flesh" means ordinary physical dirt on the body.

Baptism was never meant to be understood as a simple bath.

If it were only about physical cleaning, Peter would not need this line.

He is clearing the ground before stating what baptism actually means.

🚫 Peter rules out a misunderstanding here
🧼 Filth of the flesh means physical dirt
🛁 Baptism is not a simple bath
📖 He clears ground before the real meaning

## 🫀 But The Answer Of A Good Conscience Toward God

"Answer" here points back to the same kind of response Peter named earlier.

"Good conscience" means an inward sense of being right with God.

Baptism marks a real, deliberate commitment made toward God.

The water itself does not create that commitment.

It pictures and marks a decision that already happened inside the heart.

🗣️ Answer points back to an earlier idea
🫀 Good conscience means being right with God
🤝 Baptism marks a real commitment
📖 It pictures a decision from the heart

## ⚡ By The Resurrection Of Jesus Christ

This phrase names the actual power behind baptism's meaning.

Baptism does not save by resembling Noah's flood alone.

It saves by connecting a believer to Christ's own resurrection.

Going under the water and rising back up pictures that same pattern.

Death happens, and then new life follows.

⚡ This names the real power at work
🌊 Not just a picture of the flood
✝️ It connects to Christ's resurrection
📖 Death, then new life, is the pattern

## 👑 Who Is Gone Into Heaven, And Is On The Right Hand Of God, Angels And Authorities And Powers Being Made Subject Unto Him

"The right hand of God" is a Biblical picture for the position of highest honor.

It pictures total authority, not a literal physical location.

"Angels and authorities and powers" names every kind of spiritual being that exists.

All of them, without exception, are placed under Christ's authority.

The letter opened with ordinary believers facing real hardship from real people.

It closes with the reminder that Christ already outranks every power they could face.

👑 Right hand means highest honor and authority
🙌 It pictures authority, not a location
👼 Angels, authorities, and powers covers every being
📖 Every power stands under Christ already
`.trim();

export const FIRST_PETER_THREE_PERSONAL_SECTIONS = parseFirstPeterThreeRawNotes(FIRST_PETER_THREE_RAW_NOTES);
