export type ProverbsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsFourRawNotes(rawText: string): ProverbsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 4:${startVerse}` : `Proverbs 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 4 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_FOUR_RAW_NOTES = `# Proverbs 4:1-3
# 👂 A Father Passes Down What His Father Taught Him
---
## 👂 Hear, Ye Children, The Instruction Of A Father

The first three chapters spoke to just one son at a time.

Here Solomon suddenly speaks to children, a plural group.

He may be picturing his own sons, or a wider circle of students gathered to learn.

Either way, this wisdom was never meant to stay private.

👂 Children means more than one listener

🔀 Earlier chapters spoke to one son

🎓 Solomon may be teaching wider students

📖 Wisdom was never meant to stay private

---

## 🎯 Attend To Know Understanding

To attend means far more than simply hearing sound.

It means giving full, careful focus to what is being said.

Understanding here is not just facts memorized.

It is the kind of grasp that actually changes how a person lives.

👂 Attend means giving full careful focus

🧠 More than simply hearing sound

📚 Understanding is not memorized facts alone

📖 It is grasp that changes how you live

---

## 📚 I Give You Good Doctrine

Doctrine sounds like a modern word for church teaching.

Here it simply means the body of teaching a father hands down.

Solomon calls it good, meaning it is reliable and will not lead a son astray.

This is fatherly wisdom passed on, not abstract theory.

📚 Doctrine means a body of teaching

👨‍👦 Not a modern church idea alone

✅ Good means reliable, not misleading

📖 Fatherly wisdom passed down, not theory

---

## ⚖️ Forsake Ye Not My Law

Law does not mean a strict legal code here.

Chapter three already used this same word for a father's spoken teaching.

Forsaking something means walking away from it completely, not just forgetting for a moment.

Solomon is warning against a total departure, not a passing lapse.

⚖️ Law means fatherly teaching, not legal code

🔁 Chapter three used this same word

🚪 Forsake means walking away completely

📖 Warns against total departure, not lapse

---

## 👨‍👦 I Was My Father's Son

Solomon now pauses his own instruction to remember his own childhood.

He is about to quote what his father David once taught him.

This shows wisdom passed down across at least three generations already.

David taught Solomon, and now Solomon teaches his own children.

👨‍👦 Solomon pauses to recall his childhood

🗣️ He is about to quote David

🔗 Wisdom passed down three generations here

📖 David taught Solomon, who now teaches his own

---

## 🌱 Tender And Only Beloved In The Sight Of My Mother

Tender here means young and still delicate, not weak in a bad way.

Only beloved does not mean Solomon had no brothers.

David and Bathsheba had other sons besides him.

David also had many more children through other wives.

The phrase describes how deeply Solomon was cherished, not his birth order.

🌱 Tender means young and delicate

👶 Only beloved does not mean no brothers

👨‍👩‍👦 David and Bathsheba had other sons too

📖 It describes being deeply cherished

# Proverbs 4:4-9
# 👑 Get Wisdom, Wear Her Crown
---
## 🗣️ He Taught Me Also

Solomon now begins quoting his father's actual words to him as a boy.

This look back shows Solomon was not born wise on his own.

He received these lessons the same way he is now giving them.

Wisdom in this family was something taught, not something automatic.

🗣️ Solomon quotes his father directly here

👦 Solomon was not born wise alone

🔄 He received lessons the same way

📖 Wisdom here was taught, not automatic

---

## 🔐 Let Thine Heart Retain My Words

Retain means holding something firmly over a long stretch of time.

Chapter three used this same idea for holding onto wisdom permanently.

The heart here is the center of will and decision, not just feeling.

David wanted his words fixed inside Solomon, not just heard once.

🔐 Retain means holding on over time

🔁 Chapter three used this same idea

❤️ Heart means the will, not feeling

📖 Words fixed inside, not heard once

---

## 💚 Keep My Commandments, And Live

Live here means more than simply staying alive physically.

Throughout Proverbs, keeping wisdom is tied to a full and thriving life.

Breaking commandments is pictured as its own kind of slow decline.

David is offering his son a real, practical path to flourishing.

💚 Live means more than staying alive

🌱 Keeping wisdom leads to thriving life

💀 Breaking it is pictured as decline

📖 David offers a path to flourishing

---

## 🔁 Get Wisdom, Get Understanding

The same command is repeated twice in a row on purpose.

Hebrew poetry often repeats an idea for emphasis, not by accident.

Get is an active verb, wisdom will not simply arrive on its own.

A person has to actually go after it.

🔁 Command repeated twice on purpose

📢 Hebrew poetry repeats ideas for emphasis

🏃 Get is active, not passive waiting

📖 A person has to go after it

---

## 📉 Neither Decline From The Words Of My Mouth

Decline here means slowly drifting away, not a single sudden decision.

It pictures a gradual turning off the path rather than one big wrong turn.

David is warning against slow neglect just as much as open rebellion.

Small drift adds up the same way a wrong turn does over time.

📉 Decline means slowly drifting away

🐌 Pictures gradual turning, not one moment

⚠️ Warns against slow neglect too

📖 Small drift adds up over time

---

## 👩 Forsake Her Not, And She Shall Preserve Thee

Wisdom is pictured here as a person again, someone who protects in return.

Forsaking her means walking away from the relationship completely.

Preserve means keeping someone safe from harm over time.

The relationship runs both directions, loyalty for protection.

👩 Wisdom pictured as a protecting person

🚪 Forsake means walking away completely

🛡️ Preserve means keeping safe over time

📖 Loyalty is traded for protection

---

## 🥇 Wisdom Is The Principal Thing

Principal here means first in importance.

It is the main thing everything else depends on.

It does not mean wisdom is the only thing worth having.

It means wisdom should be sought before anything else is chased.

🥇 Principal means first in importance

🙅 Not the only thing worth having

🎯 Should be sought before anything else

📖 Every other pursuit comes after this

---

## ⬆️ Exalt Her, And She Shall Promote Thee

Exalt means lifting something up in honor and value.

The relationship with wisdom is pictured as a two way exchange.

A person honors wisdom first, and wisdom returns the honor.

This is not a one sided demand, it is a real partnership.

⬆️ Exalt means lifting up in honor

🔄 The relationship works in two ways

🤝 Honor wisdom, wisdom honors you back

📖 It is a real partnership, not a demand

---

## 🤗 When Thou Dost Embrace Her

Embrace pictures holding someone close, the way a person holds a loved one.

This is intimate language, not distant or formal respect.

Wisdom is not meant to be admired from far away.

She is meant to be held close in daily life.

🤗 Embrace pictures holding someone close

❤️ Intimate language, not formal distance

🙅 Not meant to be admired from far

📖 Wisdom is meant to be held close

---

## 🌿 An Ornament Of Grace

An ornament here likely means a wreath or garland worn on the head.

Many scholars believe this pictures the kind of headpiece given to honored guests.

Grace in this phrase means beauty and favor, not the theological idea of mercy.

Wisdom is pictured decorating a person the way jewelry decorates an outfit.

🌿 Ornament likely means a wreath or garland

🎉 Given to honored guests in that culture

✨ Grace here means beauty and favor

📖 Wisdom decorates a person like jewelry

---

## 👑 A Crown Of Glory Shall She Deliver To Thee

A crown in the ancient world marked royalty or a victor in competition.

Glory here means genuine honor, the kind that actually lasts.

Wisdom is pictured giving this same royal honor to an ordinary son.

The image raises the stakes from a simple gift to a coronation.

👑 Crown marked royalty or a victor

🏆 Glory means honor that actually lasts

🙌 Wisdom gives royal honor to a son

📖 The image raises a gift to a coronation

# Proverbs 4:10-13
# 🏃 Steps That Will Not Stumble
---
## 🔙 Hear, O My Son

Solomon returns from quoting his father back to speaking to his own son directly.

The address shifts back to singular, one listener again instead of many.

This closes the flashback that began back in verse three.

What follows are Solomon's own words now, not David's.

🔙 Returns from quoting David to speaking himself

👤 Singular address returns, one listener again

🔚 Closes the flashback started in verse three

📖 These are Solomon's own words now

---

## 🔁 The Years Of Thy Life Shall Be Many

This promise of a long life echoes the opening of chapter three.

A long life in this culture was seen as clear evidence of God's favor.

It was not treated as random luck or good genes.

Wisdom was understood as the practical path toward that kind of life.

🔁 Echoes the same promise from chapter three

🙏 Long life was seen as God's favor

🎲 Not treated as random luck

📖 Wisdom was the path toward that life

---

## 🧭 I Have Led Thee In Right Paths

Led pictures a guide walking ahead, not just pointing from a distance.

Right paths means roads that actually reach a good destination.

Solomon is describing his father as a personal guide, not just a rule giver.

This is relationship language, not a list of commands handed down.

🧭 Led pictures a guide walking ahead

🛤️ Right paths lead to a good end

👨‍👦 David is described as a personal guide

📖 This is relationship, not just rules

---

## 🗜️ Thy Steps Shall Not Be Straitened

Straitened is an old word meaning hemmed in or cramped on every side.

It pictures walking through a narrow, blocked passage with nowhere to move.

Wisdom promises open, unobstructed movement instead of that kind of trap.

This is freedom of movement, not freedom from all difficulty.

🗜️ Straitened means hemmed in or cramped

🚧 Pictures a narrow, blocked passage

🚶 Wisdom promises open movement instead

📖 Freedom of movement, not freedom from difficulty

---

## 🏃 When Thou Runnest, Thou Shalt Not Stumble

Running pictures moving through life at full speed, under real pressure.

Even at that pace, wisdom promises steady footing.

Stumbling here means a sudden, damaging fall, not a small trip.

This is a promise for the hardest, fastest seasons of life, not just the calm ones.

🏃 Running pictures moving at full speed

⚖️ Wisdom promises steady footing even then

🕳️ Stumble means a damaging fall

📖 A promise for the hardest seasons too

---

## ✊ Take Fast Hold Of Instruction

Fast hold means gripping something tightly, refusing to let it slip.

Chapter three used the same picture with lay hold on wisdom.

Instruction is not meant to be sampled once and set aside.

It is meant to be held onto the way a climber grips a rope.

✊ Fast hold means gripping tightly

🔁 Chapter three used the same picture

🙅 Not meant to be sampled once

📖 Held onto like a climber grips a rope

---

## 🤲 Let Her Not Go

This short command reinforces the grip described in the line before it.

Wisdom is treated as something that can slip away if not actively held.

Letting go does not require a dramatic rejection, only a loosening grip.

Solomon is warning against gradual release just as much as open refusal.

🔁 Reinforces the grip from the line before

🤲 Wisdom can slip away if not held

📉 Loosening grip counts as letting go

📖 Warns against slow release too

---

## 🌬️ She Is Thy Life

This closes the section with the strongest claim yet about instruction.

It is not compared to life, it is called life itself.

Losing wisdom is pictured as losing something as essential as breath.

The whole section has been building toward this one blunt statement.

🔚 Closes the section with the strongest claim

🌬️ Called life itself, not just compared to it

💀 Losing it is pictured like losing breath

📖 The section builds toward this statement

# Proverbs 4:14-17
# 🌑 The Wicked Cannot Sleep Without Doing Harm
---
## 🔀 Enter Not Into The Path Of The Wicked

Solomon shifts here from telling his son what to pursue to what to avoid.

Path pictures a road already being walked by other people.

Entering means taking even the first step onto that road.

The warning targets the very beginning, not just the destination.

🔀 Shifts from pursuit to avoidance

🛤️ Path pictures a road others walk

👣 Entering means the very first step

📖 The warning targets the beginning, not the end

---

## 🔁 Go Not In The Way Of Evil Men

This line repeats the idea just given in different words.

Hebrew poetry often restates one warning twice for emphasis.

Path and way describe the same picture of a road being walked.

The repetition makes the warning impossible to miss or soften.

🔁 Repeats the idea in different words

📢 Hebrew poetry restates warnings for emphasis

🛣️ Path and way describe the same road

📖 Repetition makes the warning hard to miss

---

## 🔢 Avoid It, Pass Not By It, Turn From It, And Pass Away

Four separate commands are stacked back to back in a single verse.

That pileup is deliberate, not careless writing.

Solomon wants total, active avoidance, not a single half hearted step away.

Reading the four commands out loud shows the urgency Solomon intended.

🔢 Four commands stacked in one verse

🎯 The pileup is deliberate, not careless

🏃 Total avoidance, not one half step

📖 The stacking shows real urgency

---

## 😈 They Sleep Not, Except They Have Done Mischief

Mischief here does not mean a harmless childhood prank.

It means real, planned harm done to another person.

These wicked people are described as unable to rest until they have caused damage.

Their pattern of life runs on doing wrong, not just occasionally slipping into it.

😈 Mischief means real, planned harm

🙅 Not a harmless childhood prank

😴 Unable to rest without causing damage

📖 Wrongdoing runs their whole pattern

---

## 🎯 Unless They Cause Some To Fall

This describes wickedness that needs a victim to feel complete.

Falling here means being tricked or dragged down by someone else's scheme.

The wicked in this verse are not just doing wrong privately.

They are actively working to pull other people down with them.

🎯 Wickedness here needs a victim

🕳️ Falling means being tricked or dragged down

👥 Not just private wrongdoing

📖 They work to pull others down too

---

## 🍞 They Eat The Bread Of Wickedness

Bread was the basic, everyday food of that culture.

Calling wickedness bread pictures it as their normal, daily sustenance.

This is not an occasional sin, it describes a whole way of life.

Wrongdoing has become as ordinary to them as a meal.

🍞 Bread was the everyday basic food

😈 Wickedness pictured as their daily meal

🔁 Describes a whole way of life

📖 Wrongdoing has become that ordinary

---

## 🍷 And Drink The Wine Of Violence

Wine in that culture was a common, everyday drink, much like water.

Pairing it with violence pictures harm as something they consume regularly.

Bread and wine together describe a complete, normal meal.

Solomon uses that familiar picture to show how normal wrongdoing has become to them.

🍷 Wine was a common, everyday drink

😈 Violence pictured as regular consumption

🍞 Bread and wine together mean a full meal

📖 Wrongdoing has become that normal to them

# Proverbs 4:18-19
# 🌅 Light That Grows, Darkness That Trips
---
## ⚖️ The Path Of The Just Is As The Shining Light

Just here describes people who live rightly, matching their choices to what is right.

Their path is compared to light, something that reveals and guides.

This is the same road picture used throughout this chapter.

Now the road itself is described as bright, not just safe.

⚖️ Just means people who live rightly

💡 Their path is compared to light

🛤️ The same road picture continues

📖 The road itself is now bright

---

## 🌅 That Shineth More And More Unto The Perfect Day

This pictures a sunrise, starting dim and slowly growing brighter.

Perfect day means full daylight, the sun at its highest point.

A righteous life is pictured as steady growth, not instant perfection.

Wisdom is a slow sunrise, not a switch flipped on all at once.

🌅 Pictures a sunrise growing brighter

☀️ Perfect day means full daylight

🌱 Righteous life grows steadily over time

📖 Wisdom is a slow sunrise, not a switch

---

## 🌑 The Way Of The Wicked Is As Darkness

Darkness here means more than a lack of light.

It pictures confusion, danger, and an inability to see clearly.

This contrasts directly with the growing light just described for the just.

Two roads are being placed side by side on purpose.

🌑 Darkness means more than no light

🌀 Pictures confusion and real danger

🔀 Contrasts directly with the light before it

📖 Two roads placed side by side

---

## 🕳️ They Know Not At What They Stumble

Stumbling in darkness means hitting an obstacle you never saw coming.

This is not a punishment added on afterward.

It is simply what happens naturally when someone cannot see the road.

Wickedness blinds a person to their own danger, not just to what is right.

🕳️ Stumbling means hitting an unseen obstacle

🙅 Not a punishment added on afterward

🌑 A natural result of not seeing

📖 Wickedness blinds a person to their own danger

# Proverbs 4:20-23
# ❤️ Guard Your Heart Above Everything
---
## 🔙 My Son, Attend To My Words

Solomon returns to direct address after the light and darkness picture.

Attend again means giving full, careful focus, not half listening.

This transition signals a shift toward the most important instruction in the chapter.

What follows in verse twenty three will be the chapter's central command.

🔙 Returns to direct address here

👂 Attend means full, careful focus

🔀 Signals a shift toward the key idea

📖 Leads to the chapter's central command

---

## 👂 Incline Thine Ear Unto My Sayings

Incline thine ear is an old idiom meaning lean in and listen closely.

It does not describe a physical tilt of the head.

The picture is of someone leaning toward a speaker to catch every word.

Solomon wants active, close attention, not passive hearing from a distance.

👂 Incline thine ear means lean in and listen

🙅 Not a literal tilt of the head

🎯 Pictures leaning close to catch every word

📖 Solomon wants active, not passive attention

---

## 👀 Let Them Not Depart From Thine Eyes

Them refers back to Solomon's words and sayings just mentioned.

This is the same warning given back in chapter three about wisdom.

Departing from the eyes means letting something drift out of daily view.

Solomon wants this teaching kept constantly in sight, not tucked away.

👀 Them refers to Solomon's words here

🔁 The same warning from chapter three

🌫️ Departing means drifting out of view

📖 Wants it kept constantly in sight

---

## 🎯 Keep Them In The Midst Of Thine Heart

Midst means the very center, not just somewhere inside.

The heart again refers to a person's will and decisions.

Placing wisdom at the center means it shapes every choice, not just the big ones.

This is the deepest possible placement Solomon could describe.

🎯 Midst means the very center

❤️ Heart means will and decisions

🔗 Shapes every choice, not just big ones

📖 The deepest placement Solomon could describe

---

## 🔍 They Are Life Unto Those That Find Them

This repeats the life language used earlier in the chapter.

Finding here means actively searching, not stumbling on wisdom by accident.

Life is offered as a genuine result, not a vague reward.

Wisdom found is described as wisdom that actually changes how someone lives.

🔁 Repeats the life language used earlier

🔍 Finding means active searching, not accident

🎁 Life is a genuine result, not vague

📖 Found wisdom changes how someone lives

---

## 🫀 Health To All Their Flesh

Flesh here means the whole physical body, not just one part.

Ancient Hebrew often connected inner wisdom to outer physical wellbeing.

This does not promise a life free of every illness.

It describes the kind of whole person health wisdom tends to bring.

🫀 Flesh means the whole physical body

🔗 Hebrew connected wisdom to physical health

🙅 Not a promise of zero illness

📖 Describes whole person health wisdom brings

---

## 🎯 Keep Thy Heart With All Diligence

This is the central command of the whole chapter.

Diligence means careful, constant watchfulness, not a one time decision.

The heart needs active guarding the same way a home needs a locked door.

Everything else in this section explains why this one command matters so much.

🎯 The central command of the whole chapter

👀 Diligence means constant, careful watchfulness

🔒 The heart needs guarding like a home

📖 Everything else explains why this matters

---

## 💧 Out Of It Are The Issues Of Life

Issues here means the source or starting point something flows from.

The heart is pictured as a spring feeding everything downstream.

A person's words, choices, and actions all trace back to that source.

This is why guarding the heart matters more than guarding actions directly.

💧 Issues means the source things flow from

⛲ The heart pictured as a spring

🔗 Words and actions trace back to it

📖 Guarding the source matters most

# Proverbs 4:24-27
# 🚶 Watch Your Mouth, Eyes, And Feet
---
## 🌀 Put Away From Thee A Froward Mouth

Froward is the same word chapter three used for twisted, deliberate wrong.

Applied to a mouth, it means speech that is deceptive on purpose.

Put away pictures a decisive removal, not a gradual improvement.

Guarding the heart in verse twenty three now moves outward to guarding speech.

🌀 Froward means twisted, deliberate wrong

🗣️ Applied here to deceptive speech

✂️ Put away means decisive removal

📖 Guarding the heart moves outward to speech

---

## 🌀 Perverse Lips Put Far From Thee

Perverse here means crooked or distorted, saying one thing while meaning another.

Lips picture the actual words a person chooses to speak.

Put far from thee is stronger than simply avoiding, it means real distance.

Solomon treats dishonest speech as something to actively push away.

🌀 Perverse means crooked or distorted speech

👄 Lips pictures the words chosen

📏 Put far means real distance, not just avoiding

📖 Dishonest speech should be pushed away

---

## 👀 Let Thine Eyes Look Right On

This moves the focus from the mouth to the eyes.

Looking right on pictures a steady, forward gaze.

It suggests someone who knows exactly where they are headed.

Wandering eyes in Proverbs often lead to a wandering, distracted life.

👀 Moves the focus from mouth to eyes

➡️ Right on pictures a steady, forward gaze

🎯 Suggests knowing exactly where you are headed

📖 Wandering eyes lead to a wandering life

---

## 👁️ Let Thine Eyelids Look Straight Before Thee

This repeats the previous line with slightly different words.

Eyelids stands in for the eyes themselves, a common Hebrew substitution.

The repetition doubles down on the same picture of focused attention.

Two lines in a row make this instruction impossible to skim past.

🔁 Repeats the line before with new words

👁️ Eyelids stands in for the eyes

📢 Doubles down on focused attention

📖 Repetition makes it hard to skim past

---

## ⚖️ Ponder The Path Of Thy Feet

Ponder is an old word meaning to weigh something out carefully.

It pictures stopping to think before taking the next step.

Feet here represent daily choices and direction, not literal footsteps only.

Wisdom asks for thought before action, not action followed by regret.

⚖️ Ponder means weighing something carefully

🛑 Pictures stopping to think before stepping

🦶 Feet represent daily choices and direction

📖 Thought comes before action, not after

---

## 🔒 Let All Thy Ways Be Established

Established means set firmly in place, not shifting or uncertain.

Ways continues this chapter's repeated picture of a road being walked.

A firmly established way is one a person can walk with real confidence.

This is the opposite of the wandering path described earlier in the chapter.

🔒 Established means set firmly in place

🛤️ Ways continues the chapter's road picture

💪 A firm way brings real confidence

📖 The opposite of the wandering path

---

## 🧭 Turn Not To The Right Hand Nor To The Left

This is a common idiom in the Old Testament for staying exactly on course.

It does not describe a literal direction on a map.

Turning either way pictures any drift away from wisdom's path, not just an obvious wrong turn.

The command covers small drifting just as much as an open turn away.

🧭 A common idiom for staying on course

🙅 Not a literal direction on a map

↔️ Turning either way means any drift

📖 Covers small drifting, not just big turns

---

## ✂️ Remove Thy Foot From Evil

The chapter closes with one final, simple command.

Remove pictures a deliberate action, not passive avoidance.

Every picture in this chapter has led toward this one instruction.

A wise life is finally measured by where the feet actually go.

🔚 The chapter closes with one command

✂️ Remove pictures a deliberate action

🔗 Every image has led toward this

📖 A wise life is measured by the feet
`.trim();

export const PROVERBS_FOUR_PERSONAL_SECTIONS = parseProverbsFourRawNotes(PROVERBS_FOUR_RAW_NOTES);
