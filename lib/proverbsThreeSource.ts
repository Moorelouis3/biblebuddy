export type ProverbsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsThreeRawNotes(rawText: string): ProverbsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 3:${startVerse}` : `Proverbs 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 3 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_THREE_RAW_NOTES = `# Proverbs 3:1-4
# 📿 Wear Wisdom Like A Necklace
---
## 🎓 My Son, Forget Not My Law

Solomon speaks to his son the way a teacher speaks to a student.

"Law" here does not mean a strict legal code.

It means the teaching a father passes down about how to live.

Forgetting is not just losing a memory, it is drifting away from a way of life.

🎓 My son is Solomon's word for his student

📜 Law means fatherly teaching, not legal code

🧠 Forgetting means drifting away over time

📖 Meant to shape a whole life

---

## ❤️ Let Thine Heart Keep My Commandments

In the Bible, the heart is not just the seat of feeling.

It is the center of a person's will and decisions.

Keeping something with the heart means holding on to it inside, not just following it outwardly.

Solomon wants obedience that comes from the inside, not forced from the outside.

❤️ Heart means the will, not just feelings

🔐 Keep means holding on from the inside

🧭 Not outward rule following alone

📖 Solomon wants obedience that starts within

---

## ⏳ Length Of Days, And Long Life, And Peace

Hebrew poetry often says one idea multiple ways in a row.

Length of days and long life both point to a full, complete lifespan.

Peace here means more than the absence of war.

It means wholeness, the sense that life is genuinely right and complete.

🔁 Hebrew poetry repeats one idea several ways

⏳ Both phrases mean a full life

☮️ Peace means wholeness, not just no conflict

📖 Wisdom is tied to a genuinely full life

---

## 💗 Let Not Mercy And Truth Forsake Thee

"Mercy" here means loyal love, the kind kept even when it is not earned.

"Truth" means faithfulness, staying reliable and consistent.

These two words appear together often in the Bible.

They describe the same quality God shows His people, now expected of Solomon's son too.

💗 Mercy means loyal love, not pity

🤝 Truth means staying reliable and faithful

🔗 These two words pair together often

📖 The same quality God shows His people

---

## 📿 Bind Them About Thy Neck

Ancient people sometimes wore pendants or amulets around the neck for protection.

Solomon reuses that picture, but for wisdom instead of a charm.

Wearing something means it stays close, visible, and hard to forget.

These teachings are meant to be worn like that, not stored away out of sight.

📿 Ancient people wore pendants for protection

🔄 Solomon reuses that picture for wisdom

👀 Worn things stay close and visible

📖 Teaching is meant to be worn, not hidden

---

## 📝 Write Them Upon The Table Of Thine Heart

A "table" here means a flat writing surface, like a tablet.

Ancient people wrote important words on stone or clay tablets meant to last.

Solomon pictures the heart as that kind of surface.

The teaching should be permanently carved in, not just remembered for a while.

📝 Table means a writing tablet, not furniture

🪨 Ancient tablets were built to last

❤️ The heart is pictured as that surface

📖 Teaching should be permanent, not temporary

---

## 🙌 Favour And Good Understanding In The Sight Of God And Man

"Favour" means being genuinely well regarded, not just tolerated.

This blessing is described in front of two different audiences.

The first is God, who sees a person's heart.

The second is other people, who see a person's actions.

🙌 Favour means being genuinely well regarded

👁️ God sees the heart behind the choice

👥 People see the actions that follow

📖 Wisdom earns a good name both ways

# Proverbs 3:5-8
# 🧭 Trust The LORD, Not Yourself
---
## 🏗️ Trust In The LORD With All Thine Heart

Trust here means leaning your whole weight on someone else.

Think of leaning fully against a strong wall instead of testing it first.

"All thine heart" rules out a partial, cautious kind of trust.

Solomon is calling for complete confidence in God, not just occasional faith.

🏗️ Trust means leaning your whole weight

🧱 Like leaning fully against a strong wall

💯 All thine heart rules out partial trust

📖 Solomon calls for complete confidence in God

---

## 🧠 Lean Not Unto Thine Own Understanding

This does not mean thinking is forbidden.

It means human understanding alone is not enough to steer by.

A person sees only part of the picture at any moment.

God's wisdom is not limited that way.

🧠 Does not forbid thinking

🧩 Human understanding only sees part of the picture

🙅 Not enough to steer life by alone

📖 God's wisdom is not limited that way

---

## 🙏 In All Thy Ways Acknowledge Him

"Acknowledge" means more than believing God exists.

It means actively including Him in every decision, not just the big ones.

"All thy ways" covers ordinary daily choices, not only major life events.

Wisdom is meant to shape a whole life, not just a few important moments.

🙏 Acknowledge means more than believing He exists

🧭 It means including Him in every decision

📅 All thy ways covers daily choices too

📖 Wisdom shapes a whole life, not moments

---

## 🛣️ He Shall Direct Thy Paths

"Direct" pictures someone clearing and straightening a road ahead.

This is a promise, not a guarantee of an easy road.

God does not remove every obstacle.

He gives real guidance for the path that is actually walked.

🛣️ Direct pictures a road being cleared

🎯 A promise, not a guarantee of ease

🚧 God does not remove every obstacle

📖 He gives guidance for the real path

---

## 🙅 Be Not Wise In Thine Own Eyes

This corrects a specific kind of pride, not confidence in general.

"Wise in thine own eyes" means trusting your own judgment above everyone, even God.

It is possible to be very intelligent and still fall into this trap.

Real wisdom includes knowing your own understanding has limits.

🙅 Corrects a specific kind of pride

👁️ Trusting your own judgment above all else

🧠 Intelligence alone does not prevent this

📖 Real wisdom knows its own limits

---

## 😨 Fear The LORD, And Depart From Evil

"Fear the LORD" means taking God so seriously His view shapes your choices.

This is not the same fear you would feel toward an enemy.

Departing from evil is the natural next step, not a separate command.

Real reverence for God always shows up in a person's actual choices.

😨 Fear of the LORD is not terror

🙇 It means taking God seriously

👣 Departing from evil follows naturally

📖 Reverence always shows up in choices

---

## 🩺 Health To Thy Navel, And Marrow To Thy Bones

Ancient Hebrew often described whole body wellbeing using specific body parts.

"Navel" here stands for the whole body's health, not one organ.

"Marrow" is the soft tissue inside bones, essential to real physical strength.

Wisdom is pictured as good for the whole person, not just the soul.

🩺 Hebrew used body parts for whole health

🫀 Navel here stands for whole body wellness

🦴 Marrow means the strength inside the bones

📖 Wisdom is good for the whole person

# Proverbs 3:9-12
# 🎁 Honor God, Accept His Discipline
---
## 💰 Honour The LORD With Thy Substance

"Substance" means a person's material wealth and possessions.

Honoring God here is not just a feeling of respect.

It means actually giving Him a real, tangible part of what you own.

Worship in Israel always involved something concrete, not just private belief.

💰 Substance means wealth and possessions

🙏 Honor here is not just a feeling

✋ It means giving something real and tangible

📖 Worship in Israel was always concrete

---

## 🌾 The Firstfruits Of All Thine Increase

"Firstfruits" means the very first part of a harvest, given before the rest was even in.

Giving first, not last, required real trust that God would still provide.

"Increase" refers to a farmer's total harvest or income for the season.

Giving the first portion put God ahead of every other expense.

🌾 Firstfruits means the harvest's first part

⏳ Giving first, not last, took real trust

📈 Increase means a season's total income

📖 God came ahead of every other expense

---

## 🏚️ Thy Barns Be Filled With Plenty

A "barn" stored a farmer's grain, the family's food supply for the year.

This promise is agricultural, tied directly to the giving described just before it.

Filled barns pictured real, physical security, not only a spiritual metaphor.

Trusting God with the first portion was tied to trusting Him for the rest.

🏚️ Barns stored a family's grain supply

🔗 Tied directly to the giving before it

🌾 Pictures real physical security

📖 Trusting the first meant trusting the rest

---

## 🍇 Thy Presses Shall Burst Out With New Wine

A "press" was a stone vat used to crush grapes into juice for wine.

"Burst out" pictures overflow, more than the press was even built to hold.

New wine represented a fresh harvest's abundance, not a stored reserve.

The image is deliberately over the top, showing extravagant blessing.

🍇 Press was a stone vat for crushing grapes

💥 Burst out pictures true overflow

🍷 New wine meant a fresh harvest

📖 The image shows extravagant blessing

---

## 🚫 Despise Not The Chastening Of The LORD

"Chastening" means discipline meant to correct, not punishment out of anger.

"Despise" means rejecting something outright, refusing to take it seriously.

Solomon is warning against the instinct to resent correction the moment it arrives.

The son is being taught to receive discipline instead of bristling at it.

🚫 Chastening means correction, not angry punishment

😤 Despise means rejecting it outright

⚠️ Warns against resenting correction instantly

📖 The son should receive it, not bristle

---

## 🔁 Neither Be Weary Of His Correction

Despising rejects correction immediately.

Growing weary rejects it slowly, wearing down over time instead.

Both responses end the same place, refusing to keep learning.

Wisdom means staying teachable for the long run, not just at first.

⚡ Despising rejects correction right away

🐌 Weariness rejects it slowly over time

🔁 Both end in refusing to keep learning

📖 Wisdom stays teachable for the long run

---

## ❤️ Whom The LORD Loveth He Correcteth

This corrects a natural assumption that discipline signals rejection.

In Scripture, correction is often the direct evidence of love, not its opposite.

A God who did not care would simply let wrong choices go unaddressed.

Discipline here is proof of relationship, not proof of anger.

❤️ Corrects the idea that discipline means rejection

🔄 Correction is evidence of love, not its opposite

🙈 An uncaring God would let wrong go unaddressed

📖 Discipline proves relationship, not anger

---

## 👨‍👦 Even As A Father The Son In Whom He Delighteth

Solomon closes the thought with a picture every reader would recognize.

A good father corrects the child he delights in, not a stranger's child.

"Delighteth" means genuine joy and affection, not obligation.

God's discipline flows from that same kind of delight, not distance.

👨‍👦 A picture every reader would recognize

🧒 Fathers correct children they delight in

😊 Delighteth means real joy and affection

📖 God's discipline flows from delight, not distance

# Proverbs 3:13-18
# 🌳 Wisdom Is A Tree Of Life
---
## 🔍 Happy Is The Man That Findeth Wisdom

Wisdom is described here as something a person actively finds, not something they are simply born with.

"Happy" is a deep word, describing a person who is genuinely blessed, not just cheerful.

Starting in this verse, wisdom is pictured as a woman, "she," through the rest of the chapter.

That picture makes wisdom feel like a person worth pursuing, not an abstract idea.

🔍 Wisdom is found, not simply inherited

😊 Happy means genuinely blessed, not just cheerful

👩 Wisdom is pictured as "she" from here on

📖 A person worth pursuing, not an abstract idea

---

## 💱 The Merchandise Of It Is Better Than The Merchandise Of Silver

"Merchandise" means trade goods, the kind of thing a merchant buys and sells.

Silver was the everyday currency of the ancient world, used in ordinary transactions.

Comparing wisdom to silver puts it in economic terms a first hearer would understand instantly.

Even common, useful wealth cannot match the value of wisdom.

💱 Merchandise means goods a merchant trades

🪙 Silver was the everyday ancient currency

🧮 Puts wisdom in familiar economic terms

📖 Even useful wealth cannot match wisdom

---

## 🥇 The Gain Thereof Than Fine Gold

Gold was rarer and more valuable than silver in the ancient world.

Moving from silver to gold raises the comparison to the highest kind of wealth known.

"Fine gold" specifically means gold that has been refined, purified of impurities.

Even the very best material wealth still falls short of wisdom's worth.

🥇 Gold was rarer than silver in that world

📈 Raises the comparison to the highest wealth

✨ Fine gold means refined, purified gold

📖 Even the best wealth falls short of wisdom

---

## 💎 She Is More Precious Than Rubies

Rubies were rare gemstones, among the most valuable items a person could own.

Some scholars believe the Hebrew word here may refer to red coral or pearls instead.

Either way, the point is the same, a rare and costly treasure.

Wisdom is placed above even the objects people spend a lifetime trying to acquire.

💎 Rubies were rare, extremely valuable gemstones

❓ Scholars debate coral or pearls instead

🏆 Either way, it names a rare treasure

📖 Wisdom outranks a lifetime's ambitions

---

## 🌍 All The Things Thou Canst Desire Are Not To Be Compared Unto Her

This verse deliberately leaves the list of desirable things open ended.

It does not name one item, it names everything a person could possibly want.

No specific comparison is left standing after this line.

The point is total, wisdom outweighs every single alternative, without exception.

🌍 Leaves the list of desires open ended

🚫 Names everything, not just one thing

⚖️ No comparison is left standing

📖 Wisdom outweighs every alternative, without exception

---

## 🙌 Length Of Days Is In Her Right Hand

Wisdom is pictured here as a person holding gifts in each hand.

In the ancient world, the right hand was considered the hand of greater honor.

"Length of days" repeats the promise from verse 2, a long, full life.

Placing it in the right hand marks it as wisdom's primary, greatest gift.

🙌 Wisdom is pictured holding gifts in each hand

✋ The right hand held greater honor

⏳ Length of days means a long, full life

📖 It is marked as wisdom's greatest gift

---

## 💰 In Her Left Hand Riches And Honour

The left hand was considered the lesser hand of honor in this culture.

That does not mean riches and honor are worthless, only secondary.

Wisdom brings blessing on both sides, but a long, godly life ranks first.

The order teaches what to actually treasure most, without rejecting the rest.

✋ The left hand ranked lower in honor

💰 Riches and honor are secondary, not worthless

⚖️ Wisdom blesses both, but life ranks first

📖 Teaches what to treasure most

---

## 🛤️ Her Ways Are Ways Of Pleasantness

"Ways" here pictures wisdom as a road a person actually walks, not just an idea.

"Pleasantness" corrects the idea that wisdom's road is difficult and joyless.

Walking with wisdom is described as genuinely enjoyable, not just eventually rewarding.

The road itself, not only the destination, is worth wanting.

🛤️ Ways pictures wisdom as a walked road

🙅 Corrects the idea wisdom's road is joyless

😊 The walk itself is genuinely enjoyable

📖 The road itself is worth it

---

## ☮️ All Her Paths Are Peace

"Paths" narrows the picture from a wide road to the specific steps a person takes.

Peace here means the same wholeness described back in verse 2, not just calm feelings.

Every single step of wisdom's path leads toward that same wholeness.

Nothing on this road contradicts the destination it is leading toward.

🛣️ Paths narrows the picture to specific steps

☮️ Peace means wholeness, as in verse 2

👣 Every step leads toward that wholeness

📖 Nothing on this road contradicts its destination

---

## 🌳 A Tree Of Life To Them That Lay Hold Upon Her

"Tree of life" recalls the tree in the Garden of Eden, offering ongoing life.

Access to that original tree was lost after Adam and Eve sinned.

Wisdom is now offered as a way back toward that kind of flourishing life.

"Lay hold" pictures grabbing on firmly, not a light, passing interest.

🌳 Tree of life recalls the Garden of Eden

🚪 Access to that tree was lost after sin

🌱 Wisdom offers a way back to flourishing

📖 Lay hold means grabbing firmly, not lightly

---

## 🤝 Happy Is Every One That Retaineth Her

"Retaineth" means holding on to something over time, not just receiving it once.

This is the second "happy" in this section, framing wisdom on both ends.

Finding wisdom in verse 13 begins the story, retaining it in verse 18 completes it.

A wise choice made once still has to be kept, day after day.

🤝 Retaineth means holding on over time

🔁 The second "happy," framing the whole section

🎬 Finding begins it, retaining completes it

📖 A wise choice must be kept daily

# Proverbs 3:19-20
# 🌌 The Wisdom That Built The World
---
## 🌍 The LORD By Wisdom Hath Founded The Earth

This shifts the chapter from human wisdom to God's own wisdom.

"Founded" pictures laying a foundation, the way a builder starts a house.

Wisdom is not just useful advice for daily choices.

It is the same quality God used to build the world itself.

🌍 Shifts from human wisdom to God's own

🏗️ Founded pictures laying a foundation

🏠 Like a builder starting a house

📖 God used it to build creation

---

## 🌌 By Understanding Hath He Established The Heavens

Hebrew poetry pairs earth with heavens to describe the entire universe.

"Established" means setting something firmly in place, not a temporary fix.

Ancient people saw the sky as a fixed, ordered structure above them.

God's understanding is the reason creation holds together at all.

🔁 Earth and heavens together mean the whole universe

🔒 Established means set firmly, not temporary

🌌 Ancient people saw the sky as fixed

📖 God's understanding holds creation together

---

## 🌊 By His Knowledge The Depths Are Broken Up

"The depths" refers to the great waters, imagined beneath and around the earth.

Ancient Near Eastern people saw the sea as chaotic and dangerous.

"Broken up" pictures those waters being controlled, split apart on purpose.

Even the most chaotic force in creation obeys God's ordered knowledge.

🌊 The depths means the great waters below

😨 Ancient people saw the sea as chaotic

✂️ Broken up means controlled and split on purpose

📖 Even chaos obeys God's ordered knowledge

---

## ☁️ The Clouds Drop Down The Dew

This moves from the enormous, cosmic waters to something small and daily.

Dew formed overnight, providing needed moisture in a dry climate.

Farmers in Israel depended on dew for crops during the dry season.

The same wisdom that framed the universe also cares for a single field.

☁️ Moves from cosmic waters to something small

💧 Dew formed overnight in a dry climate

🌾 Farmers depended on dew for their crops

📖 The same wisdom cares for one field too

# Proverbs 3:21-26
# 😴 Sound Sleep, Steady Feet
---
## 👀 Let Not Them Depart From Thine Eyes

"Them" refers back to sound wisdom and discretion, named later in this same verse.

"Depart from thine eyes" pictures keeping something constantly in view, never out of sight.

This is the same warning given back in verse 3 about mercy and truth.

Wisdom is meant to stay in daily focus, not fade into the background.

👀 Them refers to sound wisdom and discretion

🎯 Keeping wisdom constantly in view

🔁 Echoes the same warning from verse 3

📖 Wisdom must stay in daily focus

---

## 🩺 Keep Sound Wisdom And Discretion

"Sound" means whole and healthy, not cracked or unreliable.

"Discretion" is the practical skill of making a careful, wise call in the moment.

Wisdom is the broad understanding, discretion is applying it to one specific choice.

Both are needed together, big picture understanding and small daily judgment.

🩺 Sound means whole and reliable

🎯 Discretion means a careful call in the moment

🔗 Wisdom is broad, discretion is specific

📖 Both are needed together

---

## 🫀 Life Unto Thy Soul

"Soul" in the Old Testament often means a person's whole inner self, not just an afterlife concept.

"Life" here means more than staying physically alive.

It describes a soul that is genuinely thriving, not merely surviving.

Wisdom is pictured as food that actually nourishes the inner person.

🫀 Soul means the whole inner self

💚 Life here means more than staying alive

🌱 It means a soul that is thriving

📖 Wisdom nourishes the inner person like food

---

## 📿 Grace To Thy Neck

This pictures wisdom as jewelry, an ornament worn openly around the neck.

It echoes the same image from verse 3, wearing teaching like something visible.

"Grace" here means favor and beauty, not the theological idea of unearned mercy.

Wisdom does not just help a person privately, it visibly adorns how they live.

📿 Pictures wisdom as jewelry worn openly

🔁 Echoes the same image from verse 3

✨ Grace here means favor and beauty

📖 Wisdom visibly adorns how a person lives

---

## 🚶 Walk In Thy Way Safely

"Walk" is one of this chapter's repeated pictures for how a person lives day to day.

"Safely" does not promise a life with no danger anywhere.

It promises confidence and steadiness while walking through real danger.

Wisdom changes how a person moves through life, not just what happens to them.

🚶 Walk pictures daily living throughout this chapter

🛡️ Safely does not mean danger free

💪 It means steadiness through real danger

📖 Wisdom changes how a person walks

---

## 🦶 Thy Foot Shall Not Stumble

"Foot" and "stumble" continue the walking picture from the line before.

Stumbling pictures a sudden, unexpected fall caused by something unseen.

This does not promise a person will never make any mistake.

It promises wisdom will keep them from careless, foolish ruin.

🦶 Foot and stumble continue the walking picture

🕳️ Stumbling means a sudden, unseen fall

🙅 Does not promise zero mistakes ever

📖 It promises protection from foolish ruin

---

## 🌙 When Thou Liest Down, Thou Shalt Not Be Afraid

The picture shifts from walking during the day to resting at night.

Ancient homes offered little real protection against thieves or raiders.

Lying down without fear meant genuine peace, not naive carelessness.

Wisdom brings rest even when outside danger has not actually gone away.

🌙 Shifts from daytime walking to nighttime rest

🏚️ Ancient homes offered little real protection

😌 Fearless rest means real peace, not naivety

📖 Wisdom brings rest even when danger remains

---

## 🍯 Thy Sleep Shall Be Sweet

"Sweet" pictures sleep as genuinely pleasant, not just uninterrupted.

A guilty or anxious mind often cannot rest even in a safe place.

This connects a person's inner life directly to their ability to rest well.

Wisdom settles the mind enough to actually enjoy sleep, not just survive the night.

🍯 Sweet pictures sleep as truly pleasant

😰 A guilty mind cannot rest even when safe

🔗 Connects inner life to the ability to rest

📖 Wisdom settles the mind enough to enjoy sleep

---

## ⚡ Be Not Afraid Of Sudden Fear

"Sudden fear" describes a crisis that arrives without warning, with no time to prepare.

This is not a command to ignore genuine danger.

It is a command not to be controlled and paralyzed by unexpected trouble.

Wisdom does not promise no crisis will come, only that fear will not rule the response.

⚡ Sudden fear means an unwarned crisis

🙅 Not a command to ignore real danger

🧊 It is a command not to be paralyzed

📖 Wisdom keeps fear from ruling the response

---

## 💥 The Desolation Of The Wicked, When It Cometh

"Desolation" describes the ruin and destruction that eventually catches up with wicked choices.

This connects back to earlier warnings in the book about the wicked man's road.

"When it cometh" assumes this ruin is a matter of time, not a maybe.

The wise person can watch that happen nearby without being swept into it.

💥 Desolation means eventual ruin from wicked choices

🔗 Connects to earlier warnings in the book

⏳ Assumes ruin is a matter of time

📖 The wise are not swept in

---

## 🧱 The LORD Shall Be Thy Confidence

"Confidence" here means the actual foundation a person leans their trust on.

This verse names exactly why safety and calm sleep were possible at all.

It is not wisdom itself that is the ultimate source of security.

It is the LORD, wisdom simply points a person toward Him.

🧱 Confidence means the actual foundation of trust

🔑 Names exactly why safety was possible

🙅 Wisdom itself is not the ultimate source

📖 The LORD is the source, wisdom points there

---

## 🪤 Keep Thy Foot From Being Taken

"Taken" pictures being caught, the way an animal is caught in a hidden trap.

This closes the section by returning to the foot and walking pictures used throughout.

The danger described is not always visible in advance.

God's protection covers dangers a person cannot even see coming.

🪤 Taken pictures being caught in a hidden trap

🔁 Returns to the foot and walking pictures

🙈 The danger is not always visible in advance

📖 God's protection covers what we cannot see

# Proverbs 3:27-31
# 🤝 How To Treat Your Neighbor
---
## ✋ Withhold Not Good From Them To Whom It Is Due

"Withhold" means holding something back that rightfully belongs to another person.

"Them to whom it is due" means someone with a genuine, legitimate claim or need.

This is not a general command to give away everything to everyone.

It is a command against refusing help you are actually able to give.

✋ Withhold means holding back what belongs to another

⚖️ To whom it is due means real need

🙅 Not a command to give away everything

📖 It targets refusing help you can actually give

---

## 🚧 When It Is In The Power Of Thine Hand To Do It

This phrase adds an important boundary to the command before it.

Wisdom does not demand help beyond a person's actual ability.

"Power of thine hand" simply means real, present capability, not wishful ability.

The point is refusing to help while able, not feeling guilty over limits.

🚧 Adds a boundary to the command before it

🙅 Does not demand help beyond real ability

✋ Power of thine hand means real capability

📖 It targets refusal, not honest limits

---

## 🗣️ Say Not Unto Thy Neighbour, Go, And Come Again

This pictures a specific, common excuse rather than an outright refusal.

The neighbor is not turned away, only delayed for no real reason.

Delaying a kindness someone genuinely needs is its own quiet kind of unkindness.

Wisdom calls out this small, everyday dishonesty, not just major wrongdoing.

🗣️ Pictures a specific, common excuse

⏳ The neighbor is delayed, not refused outright

😐 Needless delay is its own quiet unkindness

📖 Wisdom calls out small, everyday dishonesty

---

## 🔑 When Thou Hast It By Thee

This closes the excuse with the detail that makes it dishonest.

The person already has what the neighbor needs, right there.

There is no real obstacle, only a preference to wait.

The command in verse 27 is about timing here as much as willingness.

🔑 Closes the excuse with the key detail

✋ The person already has what is needed

🚫 No real obstacle, just a preference to wait

📖 Timing matters as much as willingness

---

## 🧠 Devise Not Evil Against Thy Neighbour

"Devise" means planning something out ahead of time, not a sudden impulse.

This describes a deliberate scheme, not a moment of anger that passes quickly.

Wisdom treats premeditated harm as more serious than a rash mistake.

Planning to hurt someone reveals what is actually stored up in the heart.

🧠 Devise means planning ahead, not sudden impulse

🗓️ Describes a deliberate scheme, not passing anger

⚠️ Premeditated harm is treated as more serious

📖 Planning harm reveals what is in the heart

---

## 🏡 He Dwelleth Securely By Thee

"Securely" means the neighbor lives without suspicion, trusting the people around him.

This detail makes any scheme against him worse, not better.

Betraying someone's honest trust is a deeper wrong than harming a wary enemy.

Wisdom cares about the vulnerability created by trust, not just the harm itself.

🏡 Securely means living without suspicion

🔓 Trust makes any scheme against him worse

💔 Betraying trust is worse than harming an enemy

📖 Wisdom protects the vulnerability trust creates

---

## 🥊 Strive Not With A Man Without Cause

"Strive" means picking a fight or quarrel, verbal or otherwise.

"Without cause" is the key phrase, this is not about avoiding all conflict.

Some conflict is necessary and right, especially over real wrongdoing.

Wisdom warns against manufacturing conflict where none was actually needed.

🥊 Strive means picking a fight or quarrel

🔑 Without cause is the key phrase here

⚖️ Some conflict is necessary and right

📖 It warns against manufacturing needless conflict

---

## 😠 Envy Thou Not The Oppressor

An "oppressor" is someone who gains power or wealth by mistreating others.

Envy here means wanting that same success badly enough to admire the method.

Their power might look impressive or enviable from the outside.

Wisdom warns that admiring the method is the first step toward copying it.

😠 An oppressor gains by mistreating others

👀 Envy means wanting that success badly

✨ Their power can look impressive from outside

📖 Admiring the method leads to copying it

---

## 🛤️ Choose None Of His Ways

"Ways" returns to this chapter's repeated picture of a road a person walks.

The oppressor's road may look successful, fast, or even exciting.

Wisdom draws a clear line, do not walk that road, whatever its results look like.

A path is not proven right just because it appears to be working.

🛤️ Ways returns to the chapter's road picture

🏎️ The oppressor's road can look fast or exciting

🚫 Wisdom draws a clear line against it

📖 A path is not right because it works

# Proverbs 3:32-35
# ⚖️ The LORD's Verdict On Two Roads
---
## 🌀 The Froward Is Abomination To The LORD

"Froward" is a word this chapter used earlier, meaning twisted and deliberately wrong.

"Abomination" is strong language, describing something God finds deeply offensive.

This is not a minor disapproval, it is the strongest possible rejection in this vocabulary.

The word choice shows how seriously God takes deliberate, twisted wrongdoing.

🌀 Froward means twisted, deliberately wrong

😠 Abomination means deeply offensive, not minor

🔝 The strongest rejection this vocabulary uses

📖 Shows how seriously God takes deliberate wrong

---

## 🤝 His Secret Is With The Righteous

"Secret" here means close friendship and private counsel, not hidden information.

The image is of being let into someone's inner circle, trusted with real closeness.

This directly contrasts the froward person, who is pushed away in the line before.

Wisdom leads toward closeness with God, not away from it.

🤝 Secret means close friendship, not hidden facts

🔑 Pictures being let into an inner circle

🔀 Directly contrasts the froward person before it

📖 Wisdom leads toward closeness with God

---

## 🏠 The Curse Of The LORD Is In The House Of The Wicked

"House" here means a whole household, not just a building.

A curse in this context means the absence of God's favor and protection over time.

This describes an ongoing condition, not one sudden strike of punishment.

The wicked person's whole family line lives under that missing favor.

🏠 House means a household, not just a building

🚫 Curse means missing favor and protection

⏳ Describes an ongoing condition, not one strike

📖 The whole family lives under that condition

---

## 🏡 He Blesseth The Habitation Of The Just

"Habitation" is another word for a home or dwelling place.

"The just" describes people who live rightly, matching their actions to what is right.

Blessing here mirrors the curse just described, but running in the opposite direction.

The same ongoing pattern applies, favor resting on a household over time.

🏡 Habitation means a home or dwelling

⚖️ The just means people who live rightly

🔀 Mirrors the curse, running the opposite way

📖 Favor rests on a household over time

---

## 😏 He Scorneth The Scorners

"Scorners" describes people who mock and openly reject wisdom and correction.

"He scorneth" pictures God matching their own attitude back to them.

This is not pettiness, it is a serious statement about persistent rejection of Him.

A person who mocks the offer of wisdom eventually loses the offer itself.

😏 Scorners mock and reject wisdom openly

🔄 God matches their own attitude back

⚠️ A serious statement, not pettiness

📖 Mocking wisdom eventually loses the offer

---

## 🙇 He Giveth Grace Unto The Lowly

"Lowly" describes someone humble, aware that they need help and correction.

"Grace" means unearned favor, given freely rather than something owed.

This verse sets up the direct opposite response to two different postures.

Humility opens the door that pride and mockery close.

🙇 Lowly means humble, aware of needing help

🎁 Grace means unearned, freely given favor

🔀 Sets up the opposite of the scorner's fate

📖 Humility opens what pride closes

---

## 🎓 The Wise Shall Inherit Glory

"Inherit" pictures receiving something passed down, not something earned by luck.

"Glory" here means genuine honor and a good reputation that actually lasts.

This closes the chapter by returning to its opening theme, wisdom's true reward.

The whole chapter has been building toward exactly this kind of ending.

🎓 Inherit pictures something passed down

👑 Glory means honor that genuinely lasts

🔁 Returns to the chapter's opening theme

📖 The chapter builds toward this ending

---

## 🙃 Shame Shall Be The Promotion Of Fools

This final line is deliberately ironic, pairing "shame" with "promotion."

A promotion normally means moving upward, gaining status and respect.

For a fool, the very thing they climb toward turns out to be public shame instead.

The chapter ends with a clear choice, wisdom's honor or foolishness's disgrace.

🙃 Deliberately ironic, pairing shame with promotion

📈 A promotion normally means moving upward

📉 For a fool it becomes public shame

📖 The chapter ends with a clear choice
`.trim();

export const PROVERBS_THREE_PERSONAL_SECTIONS = parseProverbsThreeRawNotes(PROVERBS_THREE_RAW_NOTES);
