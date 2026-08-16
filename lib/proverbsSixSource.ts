export type ProverbsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsSixRawNotes(rawText: string): ProverbsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 6:${startVerse}` : `Proverbs 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 6 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_SIX_RAW_NOTES = `# Proverbs 6:1-5
# 🤝 Trapped By A Promise For Someone Else
---
## 🤝 If Thou Be Surety For Thy Friend

Surety means promising to pay someone else's debt if that person cannot pay it.

A friend borrowing money would ask another man to guarantee the loan.

If the borrower failed to pay, the surety owed the whole debt himself.

Solomon opens this chapter with a very specific kind of trouble.

🤝 Surety means guaranteeing another man's debt

💰 The borrower's failure becomes the surety's bill

📜 A common financial arrangement in that culture

📖 Solomon opens with a specific kind of trouble

---

## ✋ Stricken Thy Hand With A Stranger

Striking hands together sealed an agreement the way a signature does today.

No paper contract was needed once two hands had struck a deal.

A stranger here likely means someone outside the immediate family or town.

Making that promise to an unfamiliar man carried even more risk.

✋ Striking hands sealed an agreement like a signature

📄 No written contract was needed after that

🚶 Stranger likely means someone from outside the family

📖 Promising a stranger carried extra risk

---

## 🪤 Thou Art Snared With The Words Of Thy Mouth

A snare was a trap set to catch an animal by surprise.

Solomon says a spoken promise can trap a person the very same way.

The danger did not come from an enemy attacking from outside.

It came from the man's own words, spoken freely at the time.

🪤 A snare was a trap for catching animals

🗣️ A spoken promise can trap a person too

🙅 The danger came from no outside enemy

📖 His own words became the trap

---

## 🔁 Thou Art Taken With The Words Of Thy Mouth

Hebrew poetry often says the same idea twice in a row for emphasis.

This line repeats the warning from the line just before it.

Repeating a warning twice, back to back, made it impossible to miss.

Solomon wants his son to feel the weight of this trap, not just hear it once.

🔁 Hebrew poetry often repeats an idea twice

⏮️ This line restates the warning just given

📢 Repetition made the warning impossible to miss

📖 Solomon wants the weight felt, not just heard

---

## ⏰ Do This Now My Son And Deliver Thyself

Now is the most urgent word in this whole verse.

Solomon does not suggest thinking it over for a few days.

Deliver thyself pictures actively rescuing oneself from a real danger.

The debt was already a trap, and traps do not loosen on their own.

⏰ Now is the most urgent word here

🚫 Not advice to think it over slowly

🆘 Deliver thyself means actively rescuing oneself

📖 Traps do not loosen on their own

---

## 🙇 Go Humble Thyself And Make Sure Thy Friend

Humbling himself meant setting pride aside and admitting the promise was a mistake.

Make sure thy friend means going and getting formally released from the obligation.

This was not a quiet, private fix done from a distance.

Solomon tells his son to go in person and deal with it directly.

🙇 Humbling himself meant setting pride aside

📝 Make sure means getting formally released

🚶 Not a quiet fix from a distance

📖 Go in person and deal with it

---

## 😴 Give Not Sleep To Thine Eyes Nor Slumber To Thine Eyelids

Solomon pictures a man so worried about the debt that he cannot rest.

Sleep and slumber name the same thing twice for emphasis, a common pattern in this book.

This is not laziness Solomon is describing, it is urgency.

The son should feel the same urgency, not comfort, until the promise is settled.

😴 Pictures a man too worried to rest

🔁 Sleep and slumber repeat the same idea

🚫 This describes urgency, not laziness

📖 Comfort should wait until the promise is settled

---

## 🦌 Deliver Thyself As A Roe From The Hand Of The Hunter

A roe is a small, swift deer known for outrunning danger.

A roe caught by a hunter does not politely negotiate its escape.

It runs immediately, with everything it has, the moment it senses danger.

Solomon wants that same urgency from his son toward this debt.

🦌 A roe was a small swift deer

🏃 It escapes immediately, not by negotiating

⚡ It runs with everything it has

📖 Solomon wants that same urgency here

---

## 🪶 As A Bird From The Hand Of The Fowler

A fowler was a hunter who caught birds using nets or traps.

A bird held in a fowler's hand has only a narrow moment to escape.

Pairing the roe and the bird pictures two different kinds of trapped creatures.

Both images say the same thing, escape quickly, while escape is still possible.

🪶 A fowler was a hunter of birds

⏳ A caught bird has only a narrow moment

🦌 Pairs with the roe as two trapped creatures

📖 Escape quickly while it is still possible

# Proverbs 6:6-11
# 🐜 Learn From The Ant
---
## 🐌 Go To The Ant Thou Sluggard

A sluggard is an old word for someone who is habitually lazy.

Solomon sends this lazy man to school, but the teacher is an insect.

Choosing the smallest possible creature makes the lesson harder to dismiss.

If an ant can learn this, a man has no excuse.

🐌 Sluggard is an old word for lazy

🐜 Solomon sends him to learn from an ant

🔎 A tiny teacher is hard to dismiss

📖 If an ant can, he can too

---

## 🔍 Consider Her Ways And Be Wise

Consider means to actually stop and study something closely, not glance at it.

Wisdom in Proverbs often comes from paying attention to ordinary things.

Solomon is not asking for a quick observation, he wants real study.

Watching an ant carefully can produce more wisdom than the sluggard expects.

🔍 Consider means studying closely not glancing

📚 Wisdom often comes from ordinary things here

⏱️ Solomon asks for real study not a glance

📖 Careful watching can produce real wisdom

---

## 👀 Which Having No Guide Overseer Or Ruler

An overseer was someone who supervised workers and made sure they kept working.

The ant has none of these three kinds of authority watching over it.

No one stands over the ant forcing it to gather food.

Its hard work comes entirely from within, not from outside pressure.

👀 An overseer supervised workers to keep them working

🐜 The ant has none of these three

🙅 No one forces the ant to work

📖 Its work comes from within, not pressure

---

## 🍞 Provideth Her Meat In The Summer

Meat here is an old word simply meaning food in general.

Summer was the season when food was plentiful and easy to gather.

The ant does not wait until food becomes scarce to start working.

It works hardest while working is easiest, not while it is desperate.

🍞 Meat here is an old word for food

☀️ Summer was the easy plentiful season

⏳ The ant works before scarcity forces it to

📖 It works hardest while it is easiest

---

## 🌾 Gathereth Her Food In The Harvest

Harvest was the short window when crops were ready to collect.

Missing that narrow window meant waiting an entire year for another chance.

The ant treats that short window with total seriousness.

Solomon points out that opportunity, like harvest, does not stay open forever.

🌾 Harvest was a short narrow window

⏰ Missing it meant waiting a full year

🐜 The ant treats that window seriously

📖 Opportunity does not stay open forever

---

## 🗣️ How Long Wilt Thou Sleep O Sluggard

Solomon shifts here from describing the ant to speaking straight to his son.

How long is a direct question, not a rhetorical shrug.

Naming him sluggard again makes the comparison to the ant unmistakable.

The gentle nature lesson has just become a pointed personal challenge.

🗣️ Solomon now speaks straight to his son

❓ How long is a direct real question

🐌 Naming him sluggard repeats the comparison

📖 The lesson becomes a personal challenge

---

## 🐌 Yet A Little Sleep A Little Slumber

The sluggard is not refusing to work outright, that would be obvious even to him.

He is choosing delay in small pieces that each feel harmless.

Little repeated three times pictures a habit of constant small excuses.

Small delays add up the same way small savings do, only in reverse.

🐌 Not outright refusal, that would be obvious

🧩 Delay comes in small harmless feeling pieces

🔁 Little repeats three times on purpose

📖 Small delays add up in reverse

---

## 🙌 A Little Folding Of The Hands To Sleep

Folding the hands pictures someone deliberately settling in rather than getting up.

It is a small, comfortable gesture, not dramatic laziness.

Solomon shows how ordinary and quiet real laziness usually looks.

Nobody falls into poverty through one obvious, dramatic decision.

🙌 Folding the hands means settling in comfortably

😌 A small gesture not dramatic laziness

🤫 Laziness usually looks quiet and ordinary

📖 No one falls into poverty in one moment

---

## 🚶 Thy Poverty Come As One That Travelleth

A traveler moves steadily toward a destination without stopping along the way.

Poverty pictured this way arrives gradually, step by step, never in a rush.

The sluggard does not notice it coming because it never seems urgent.

By the time it arrives, it has been approaching the entire time.

🚶 A traveler moves steadily toward a destination

🐌 Poverty arrives gradually step by step

🙈 It never feels urgent enough to notice

📖 It has been approaching the whole time

---

## ⚔️ Thy Want As An Armed Man

An armed man does not approach slowly, he arrives with sudden force.

Pairing a slow traveler with a sudden armed man shows two sides of the same danger.

Poverty can feel gradual and distant right up until it does not.

Solomon warns that the ending is never as slow as the beginning felt.

⚔️ An armed man arrives with sudden force

🔀 Pairs a slow traveler with a sudden attacker

😨 Poverty can turn sudden without warning

📖 The ending is faster than the beginning felt

# Proverbs 6:12-15
# 🤥 The Wicked Man's Body Language
---
## 🚫 A Naughty Person A Wicked Man

Naughty in this verse means far more than the mild word it is today.

It describes someone genuinely worthless and morally corrupt, not just mischievous.

Pairing naughty person with wicked man doubles down on how serious this is.

Solomon is not describing a minor troublemaker in this passage.

🚫 Naughty here means worthless, not mischievous

🤥 Wicked man doubles down on the warning

🙅 Not a description of a minor troublemaker

📖 Solomon means someone genuinely corrupt

---

## 🌀 Walketh With A Froward Mouth

Froward means twisted, dishonest, and deliberately hard to pin down.

Walketh describes his whole ongoing way of life, not one bad moment.

His mouth is where this crookedness first becomes visible to others.

Deceit here is a lifestyle, not a rare slip of the tongue.

🌀 Froward means twisted and dishonest

🚶 Walketh means a whole way of life

👄 His mouth reveals it first

📖 Deceit here is a lifestyle, not a slip

---

## 😉 He Winketh With His Eyes

A wink like this was a secret signal shared between people scheming together.

It let a partner in crime know something without a single word spoken.

Solomon is describing a man fluent in silent, hidden communication.

Deceit does not always need words to travel from person to person.

😉 A wink was a secret signal to partners

🤫 It communicated without a single word

🎭 He is fluent in hidden communication

📖 Deceit can travel without words at all

---

## 🦶 He Speaketh With His Feet He Teacheth With His Fingers

This man sends signals with his whole body, not only his face.

Feet and fingers likely pictured subtle gestures used to point, warn, or plan.

Teacheth here means he trains others in this same silent scheming.

Every part of him has been recruited into the deception.

🦶 He signals with his whole body

👉 Feet and fingers pointed, warned, or planned

👨‍🏫 Teacheth means he trains others in this

📖 Every part of him serves the deception

---

## ❤️ Frowardness Is In His Heart

The heart in this culture meant the center of a person's will and thinking.

Placing frowardness there shows the corruption is not just external behavior.

The winking eyes and signaling hands are only the visible surface.

The real problem sits far deeper than anything the eye can catch.

❤️ The heart meant the center of the will

🌊 Frowardness there means deep, not surface, corruption

👀 Winking and signaling are only the surface

📖 The real problem runs far deeper

---

## 🧠 He Deviseth Mischief Continually

Deviseth means actively planning, not stumbling into trouble by accident.

Continually shows this scheming never really stops or takes a break.

This is not a man who occasionally slips into a bad decision.

Plotting harm has become his ongoing occupation.

🧠 Deviseth means active planning, not stumbling

🔁 Continually means it never stops

🙅 Not an occasional slip into a bad choice

📖 Plotting harm has become his occupation

---

## 🌱 He Soweth Discord

Sowing pictures a farmer deliberately planting seeds in the ground.

Discord means conflict and division between people who might otherwise get along.

Calling it sowing shows this conflict was planted on purpose, not an accident.

He plants trouble the way a farmer plants a crop, expecting it to grow.

🌱 Sowing pictures deliberate planting

⚔️ Discord means conflict between people

🎯 The conflict was planted on purpose

📖 He expects the trouble to grow

---

## ⚡ Suddenly Shall He Be Broken Without Remedy

Suddenly appears twice in this verse, and both uses are on purpose.

All that hidden, slow scheming ends in a downfall with no warning.

Without remedy means there is no fixing it once it happens.

The secrecy that protected him for years cannot protect him at the end.

⚡ Suddenly repeats twice on purpose

💥 Years of hidden scheming end without warning

🚫 Without remedy means it cannot be fixed

📖 Secrecy cannot protect him at the end

# Proverbs 6:16-19
# 😤 Seven Things The Lord Hates
---
## 🔢 These Six Things Doth The Lord Hate Yea Seven

Six then seven is a common pattern in Hebrew poetry called a numerical proverb.

The pattern builds up a number, then adds one more for full weight.

It does not mean God stopped counting exactly at seven.

The pattern signals a complete, deliberately full list is about to be given.

🔢 Six then seven is a Hebrew number pattern

📈 It builds up, then adds one more

🙅 God did not stop counting at seven

📖 It signals a complete full list

---

## 👁️ A Proud Look

A proud look describes the way pride shows on a person's face before it ever shows in words.

This is the very first item on the whole list.

Pride sits at the root of nearly every other sin named here.

Solomon starts with what is hardest to see and easiest to excuse.

👁️ Pride shows on the face first

🥇 The first item on the whole list

🌳 Pride is the root of the others

📖 It is the hardest sin to see

---

## 🗣️ A Lying Tongue

Lying here means deliberately saying something known to be false.

This is not confusion or a genuine mistake in what someone reports.

The Lord hates false words spoken on purpose to deceive.

Speech built on lies corrupts every relationship it touches.

🗣️ Lying means saying something known false

🙅 Not confusion or an honest mistake

🎯 It is deception spoken on purpose

📖 Lies corrupt every relationship they touch

---

## ✋ Hands That Shed Innocent Blood

This names violence against someone who did nothing to deserve it.

Hands here represents the actions a person actually carries out.

Innocent narrows this beyond ordinary conflict to genuine injustice.

Harming someone who is truly blameless earns a place near the top of God's hatred.

✋ Hands represents a person's actual actions

🩸 This names violence against the innocent

⚖️ Innocent means truly blameless, not just an enemy

📖 This earns a place near the top

---

## 🧠 An Heart That Deviseth Wicked Imaginations

This same word deviseth appeared in the verse just before this list.

It means actively planning, not just having a passing dark thought.

Imaginations here means schemes worked out in detail inside the mind.

The plotting happens long before any harmful act is carried out.

🧠 Deviseth means active planning, not a stray thought

🔁 The same word used in the verse before

🗺️ Imaginations means detailed inner scheming

📖 The plotting comes long before the act

---

## ⚡ Feet That Be Swift In Running To Mischief

Swift means eager and quick, not merely capable of moving fast.

Feet running toward mischief pictures someone racing toward harm, not stumbling into it.

There is no hesitation described here, only eagerness.

The speed itself reveals how willing this person is to do wrong.

⚡ Swift means eager, not just fast

🏃 Racing toward harm, not stumbling into it

🙅 No hesitation is described here

📖 The speed reveals real willingness

---

## ⚖️ A False Witness That Speaketh Lies

A witness in this culture had enormous power over another person's fate in court.

A false witness could take away someone's freedom, property, or even life.

This lie is not casual gossip, it is testimony given under public trust.

Betraying that trust for a lie made the crime especially serious.

⚖️ A witness held real power in court

💔 A false one could ruin a life

🙏 This lie breaks a position of public trust

📖 That trust made the crime especially serious

---

## 🌱 He That Soweth Discord Among Brethren

This same sowing image appeared just a few verses earlier in this chapter.

Brethren makes this personal, this is division planted inside a family or close community.

Some sins harm strangers, but this one wounds people meant to be closest.

The list ends with a sin aimed at breaking apart what should hold together.

🌱 The same sowing image from earlier

👨‍👩‍👧 Brethren means family or close community

💔 It wounds people meant to be closest

📖 It breaks apart what should hold together

# Proverbs 6:20-24
# 🔥 A Lamp To Keep You From The Dark
---
## 🗣️ Keep Thy Father's Commandment

Solomon returns here to the same call to attention that opened this book.

Commandment carries the weight of a serious, binding instruction.

A father's teaching in this culture was meant to be taken seriously for life.

This is not casual advice offered once and forgotten.

🗣️ Solomon repeats the book's opening call

📜 Commandment means a serious binding instruction

👨 A father's teaching was meant to last

📖 Not casual advice, given once and forgotten

---

## 👩 Forsake Not The Law Of Thy Mother

Naming the mother alongside the father shows both parents taught wisdom in this home.

Law here means the same kind of serious teaching as commandment did.

Forsake means abandoning something completely, not simply drifting from it slowly.

Solomon credits his mother's teaching as equally worth keeping.

👩 Both parents are named as teachers here

📜 Law means serious teaching, like commandment

🚫 Forsake means complete abandonment

📖 The mother's teaching is equally worth keeping

---

## 🔗 Bind Them Continually Upon Thine Heart

Binding pictures physically attaching something so it cannot slip away or be lost.

The heart again means the center of a person's will and thinking.

Continually shows this was meant to be constant, not something to revisit occasionally.

The teaching was meant to live inside him at all times.

🔗 Binding pictures physically attaching something secure

❤️ The heart means the center of the will

🔁 Continually means constant, not occasional

📖 The teaching was meant to live inside him

---

## 📿 Tie Them About Thy Neck

A cord tied around the neck often held a valuable item, like a seal or pendant.

Wearing the teaching this way made it visible, not just privately remembered.

Some scholars connect this image to jewelry worn openly in daily life.

Wisdom here is pictured as something worn proudly, not hidden away.

📿 A neck cord often held something valuable

👀 Wearing it made the teaching visible

📚 Some scholars connect this to worn jewelry

📖 Wisdom is worn proudly, not hidden

---

## 🚶 When Thou Goest It Shall Lead Thee

Goest pictures ordinary daily movement, walking through everyday life and decisions.

Leading means the teaching goes ahead, guiding the direction taken.

This is the first of three moments named in this verse.

Wisdom was meant to travel with him wherever daily life took him.

🚶 Goest means ordinary daily movement

🧭 Leading means it guides the direction taken

🥇 The first of three moments named here

📖 Wisdom was meant to travel with him

---

## 🌙 When Thou Sleepest It Shall Keep Thee And When Thou Awakest It Shall Talk With Thee

Sleeping and waking cover the two edges of every single day.

Keep pictures protection during the most defenseless hours a person has.

Talk with thee pictures the teaching as an actual voice, present the moment he wakes.

Solomon covers all of life this way, both motion and rest.

🌙 Sleeping and waking cover every day's edges

🛡️ Keep pictures protection during defenseless hours

🗣️ Talk with thee pictures an active voice

📖 All of life is covered this way

---

## 🏺 The Commandment Is A Lamp

A lamp in this culture was a small, portable clay dish holding burning oil.

It gave just enough light to see the very next step, not the whole road.

Commandments work the same way, giving clear direction for the choice right in front of someone.

They do not explain everything at once, only what is needed right now.

🏺 A lamp was a small clay oil dish

👣 It lit only the very next step

🧭 Commandments give direction for what is right now

📖 Not everything at once, only what is needed

---

## 🌤️ The Law Is Light

Light here describes something wider than a lamp, more like daylight filling a whole room.

Where a lamp shows one step, light reveals the whole shape of the path.

Pairing lamp and light together pictures both immediate guidance and a broader understanding.

Wisdom in this verse works at both a close range and a wide range.

🌤️ Light means a wider general glow

🛤️ It reveals the whole shape of the path

🔗 Lamp and light together, close and wide

📖 Wisdom works at both ranges here

---

## ⚖️ Reproofs Of Instruction Are The Way Of Life

Reproof means correction, the kind that points out exactly where someone went wrong.

Instruction pairs correction with actual teaching, not punishment alone.

Way of life describes an entire path, not a single helpful moment.

Solomon presents correction as something that leads toward life, not away from it.

⚖️ Reproof means pointed honest correction

📚 Instruction pairs correction with real teaching

🛤️ Way of life describes an entire path

📖 Correction leads toward life, not away

---

## 🍯 To Keep Thee From The Evil Woman From The Flattery Of The Tongue Of A Strange Woman

This verse names exactly what all of this careful teaching was preparing him for.

Flattery means false praise designed to lower someone's guard.

Strange woman again means a woman outside the bond of marriage.

The whole point of the lamp and the light was to see this danger coming.

🎯 This verse names what the teaching prepares for

🍯 Flattery means false praise that lowers guard

💍 Strange woman means one outside marriage

📖 The teaching exists to see this danger coming

# Proverbs 6:25-29
# 🔥 Playing With Fire
---
## ❤️ Lust Not After Her Beauty In Thine Heart

This warning targets the heart, the place desire begins before any action is taken.

Beauty alone is not the sin Solomon warns against here.

Lusting after it in the heart means dwelling on it and feeding it on purpose.

Solomon is warning against the choice to nurture desire, not noticing beauty exists.

❤️ The warning targets desire at its root

👀 Noticing beauty is not the sin itself

🔥 Lusting means choosing to dwell on it

📖 Solomon warns against feeding desire on purpose

---

## 👁️ Neither Let Her Take Thee With Her Eyelids

Eyelids likely refers to a woman's made up, deliberately alluring eyes.

Some scholars connect this to eye makeup used in the ancient world.

Take pictures being captured, the same word used for animals in traps.

Even something as small as a glance was treated as a real danger here.

👁️ Eyelids likely means deliberately alluring eyes

📚 Some scholars connect this to ancient makeup

🪤 Take pictures being captured, like a trap

📖 Even a glance is treated as real danger

---

## 🍞 Brought To A Piece Of Bread

This pictures a man reduced to poverty through pursuing a hired woman.

A piece of bread describes the smallest, most basic kind of poverty.

The cost described here is mainly financial, painful but survivable.

Solomon sets this cost up only to contrast it with something worse.

🍞 Pictures poverty from pursuing a hired woman

📉 A piece of bread means basic poverty

💰 The cost described here is mainly financial

📖 This cost sets up a worse contrast

---

## 🎯 The Adulteress Will Hunt For The Precious Life

An adulteress here specifically means a married woman unfaithful to her husband.

Hunt pictures active, deliberate pursuit, not a passive risk stumbled into.

Precious life shows the stakes have jumped from money to life itself.

This is the contrast Solomon was building toward the whole verse.

💍 Adulteress means a woman unfaithful in marriage

🎯 Hunt pictures active deliberate pursuit

⚠️ The stakes jump from money to life

📖 This is the contrast being built

---

## 🔥 Can A Man Take Fire In His Bosom

Bosom means the fold of clothing against the chest, close to the body.

This is a rhetorical question with only one possible honest answer, no.

Fire held that close will always burn whatever is touching it.

Solomon uses a law of nature to make consequence feel unavoidable.

🔥 Bosom means clothing held close to the chest

❓ A rhetorical question with an obvious answer

🙅 Fire held close always burns something

📖 A law of nature makes consequence feel certain

---

## 🦶 Can One Go Upon Hot Coals

This second question repeats the same logic using a different picture.

Hebrew poetry often restates one idea twice using two separate images.

Walking on coals barefoot has no version that avoids getting burned.

Solomon stacks two impossible questions to make the point undeniable.

🔥 A second question, same logic as before

🔁 Hebrew poetry often restates ideas twice

🦶 Walking on coals has no safe version

📖 Two questions make the point undeniable

---

## 🔗 So He That Goeth In To His Neighbour's Wife

Solomon now applies both fire questions directly to the situation being warned against.

Neighbour's wife makes this specific, this is a married woman, not an unattached one.

So connects the picture of fire straight to this exact choice.

The comparison was never really about fire, it was always about this.

🔥 Both fire questions apply here directly

💍 Neighbour's wife means a married woman

🔗 So connects the picture to this choice

📖 The comparison was always about this

---

## 👋 Whosoever Toucheth Her Shall Not Be Innocent

Toucheth here is a gentle word for a very serious act, adultery itself.

Shall not be innocent states the outcome as a certainty, not a possibility.

Just like fire, there is no version of this that leaves someone unburned.

Solomon closes this section on that one unavoidable fact.

👋 Toucheth is a gentle word for adultery

✅ Shall not be innocent states a certainty

🔥 Like fire, there is no unburned version

📖 The section closes on this one fact

# Proverbs 6:30-35
# ⚖️ Worse Than A Thief
---
## 🙄 Men Do Not Despise A Thief If He Steal To Satisfy His Soul When He Is Hungry

Despise here means holding someone in open contempt.

Solomon admits that people show a strange kind of sympathy toward a hungry thief.

Satisfy his soul simply means meeting a basic, desperate need.

This sympathy is about to be used to make a sharper point.

🙄 Despise means holding someone in contempt

😔 People show sympathy toward a hungry thief

🍞 Satisfy his soul means meeting a basic need

📖 This sympathy sets up a sharper point

---

## 🔢 But If He Be Found He Shall Restore Sevenfold

Restoring sevenfold meant paying back seven times the value of what was stolen.

This reflects a real principle of restitution used in that culture's law.

Even a sympathetic thief still faced a heavy, exact financial penalty.

Sympathy for his hunger never erased his responsibility to repay.

🔢 Sevenfold meant seven times the value repaid

⚖️ Reflects a real restitution principle in that law

💰 Even sympathy did not erase the penalty

📖 Responsibility to repay still stood

---

## 🏠 He Shall Give All The Substance Of His House

Substance here means everything a man owned, his entire household wealth.

A thief without enough money could lose everything he had to make restitution.

The cost was severe, but it was still only a cost measured in property.

Solomon is about to show a debt that property alone cannot repay.

🏠 Substance means everything a man owned

💸 He could lose his entire household wealth

📉 A severe cost, but still only property

📖 A worse debt is about to be shown

---

## 🧠 But Whoso Committeth Adultery With A Woman Lacketh Understanding

Lacketh understanding means this man made his choice without any real excuse.

The hungry thief at least had genuine desperation behind his crime.

This man's motive is not survival, it is misplaced desire alone.

Solomon strips away any sympathy that might have carried over from the thief.

🧠 Lacketh understanding means no real excuse

🍞 The thief at least had genuine desperation

🔥 This man's motive is only misplaced desire

📖 Any leftover sympathy is stripped away here

---

## 💔 He That Doeth It Destroyeth His Own Soul

A thief takes something that belongs to somebody else, painful but external.

This sin turns inward and damages the man committing it directly.

Destroyeth is a strong, permanent sounding word, not a temporary setback.

The comparison to the thief has now completely flipped.

🏠 A thief harms someone else's property

💔 This sin damages the man himself

⚠️ Destroyeth sounds permanent, not temporary

📖 The comparison to the thief has flipped

---

## 🩹 A Wound And Dishonour Shall He Get

Wound pictures real, lasting physical or social harm, not a minor embarrassment.

Dishonour means his standing and respect in the community is damaged.

Both consequences were meant to be visible to everyone around him.

Unlike a private debt, this cost could not be quietly hidden.

🩹 Wound pictures real lasting harm

👥 Dishonour damages his standing in the community

👀 Both consequences were visible to others

📖 This cost could not be hidden

---

## 😳 His Reproach Shall Not Be Wiped Away

Reproach means public shame that follows a person going forward.

Sevenfold restitution could fully pay off the thief's entire debt.

This reproach has no such payment that can erase it completely.

Some costs in life cannot be settled, no matter how much is offered.

😳 Reproach means lasting public shame

✅ The thief's debt could be fully paid

🚫 This shame has no such payoff

📖 Some costs cannot be settled at all

---

## 😡 For Jealousy Is The Rage Of A Man

Jealousy here describes a husband's furious response to being betrayed.

Rage is a strong word describing intense, burning anger, not mild annoyance.

This is not calculated legal punishment, it is a personal, emotional response.

Solomon warns that this danger is unpredictable in a way a legal fine is not.

😡 Jealousy describes a betrayed husband's fury

🔥 Rage means intense anger, not mild annoyance

🙅 Not calculated punishment, but personal response

📖 This danger is unpredictable, unlike a fine

---

## 💰 He Will Not Regard Any Ransom

A ransom was a payment offered to settle a debt or avoid punishment.

Regard means he will not even consider or accept the offer.

The sevenfold restitution that satisfied the thief's debt cannot satisfy this husband.

Money that closed one case entirely fails to close this one.

💰 A ransom was a payment to settle debt

🙅 Regard means he will not even consider it

🔢 The thief's sevenfold payment cannot work here

📖 Money that worked before fails completely now

---

## 😤 Neither Will He Rest Content Though Thou Givest Many Gifts

Rest content means reaching a point of being satisfied and letting the matter go.

Many gifts pictures repeated attempts to buy his way out of the consequence.

No amount offered is described as ever being enough.

The chapter that began with a debt a man could repay ends with one he cannot.

😤 Rest content means satisfied enough to stop

🎁 Many gifts pictures repeated attempts to pay him

🚫 No amount offered is ever enough

📖 A debt this time that cannot be paid
`.trim();

export const PROVERBS_SIX_PERSONAL_SECTIONS = parseProverbsSixRawNotes(PROVERBS_SIX_RAW_NOTES);
