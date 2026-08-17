export type ProverbsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsSevenRawNotes(rawText: string): ProverbsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 7:${startVerse}` : `Proverbs 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 7 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_SEVEN_RAW_NOTES = `# Proverbs 7:1-5
# 🔗 Keep Wisdom Close As Family
---
## 👂 My Son

My son is how a teacher spoke to a student in this kind of writing.

It does not always mean a literal biological son.

Proverbs uses this address again and again to open a new lesson.

The whole book is shaped like a father training a child for real life.

👂 My son opens a new lesson

📚 It can mean any student

🔁 Proverbs repeats this address often

📖 The book trains like a father teaches

---

## 🛡️ Keep My Words

Keep means much more than simply remembering something for later.

It carries the sense of guarding a treasure so it cannot be lost.

Solomon is not asking his son to memorize facts.

He is asking him to protect these words like something valuable.

🛡️ Keep means guard, not just remember

💎 The words are treated like treasure

🙅 Not a call to memorize facts only

📖 Protect them the way you protect something valuable

---

## 📦 Lay Up My Commandments With Thee

Lay up pictures storing something away safely for future use.

A commandment here means a specific instruction from a father to a son.

Storing it with thee means keeping it close, not in some distant place.

Wisdom was never meant to sit on a shelf and gather dust.

📦 Lay up means storing something safely

📜 A commandment is a specific instruction

🤝 With thee means keeping it close by

📖 Wisdom is meant to be used, not shelved

---

## ⚖️ Keep My Commandments, And Live

This line ties obedience directly to life itself.

In Proverbs, following wisdom's path leads toward real flourishing.

Ignoring it leads toward danger, and this whole chapter proves it.

The command and the promise arrive in the very same breath.

⚖️ Obedience is tied directly to life

🌱 Wisdom's path leads toward flourishing

⚠️ Ignoring it leads toward real danger

📖 The warning and the promise arrive together

---

## 👁️ As The Apple Of Thine Eye

The apple of the eye is an old way of naming the pupil.

The pupil is one of the most sensitive, protected parts of the body.

People flinch on instinct to guard their eyes from any threat.

Solomon wants his teaching guarded with that same instinctive care.

👁️ Apple of the eye means the pupil

🛡️ The pupil is instinctively protected

⚡ People flinch to guard their eyes

📖 Guard this teaching with the same instinct

---

## 💍 Bind Them Upon Thy Fingers

Binding something on the fingers pictures wearing it like a ring.

A ring stays visible every time a person looks at their own hand.

This is not private, hidden advice meant to be forgotten by morning.

It is meant to be seen constantly, the way jewelry is seen.

💍 Binding pictures wearing something like a ring

👀 A ring stays constantly in view

🙅 Not private, forgettable advice

📖 It is meant to stay visible always

---

## ❤️ Write Them Upon The Table Of Thine Heart

A table here means a flat writing surface, like a tablet.

This phrase echoes the stone tablets that once held God's law at Sinai.

Now the writing surface has moved from stone to a person's own heart.

The heart in this culture meant the center of a person's will and thinking.

📜 Table means a flat writing tablet

🏔️ It echoes the stone tablets from Sinai

❤️ The heart means the center of the will

📖 The law now lives inside a person

---

## 👭 Say Unto Wisdom, Thou Art My Sister

Calling wisdom a sister uses family language on purpose.

A sister was someone bound by loyalty a person could always trust.

Treating wisdom this way builds a relationship, not just a rulebook.

Family loyalty is exactly what gets tested later in this chapter.

👭 Sister is deliberate family language

🤝 A sister carried built in loyalty

⚠️ That loyalty is tested later in the chapter

📖 Wisdom becomes a relationship, not a rulebook

---

## 👵 Call Understanding Thy Kinswoman

Kinswoman names a close relative bound to a family by blood.

This line repeats the idea of the verse just before it in different words.

Hebrew poetry often restates one idea twice for emphasis.

Wisdom and understanding are both pictured as family a son can lean on.

👵 Kinswoman means a close blood relative

🔁 This restates the line just before it

📝 Hebrew poetry often repeats for emphasis

📖 Wisdom feels like family here

---

## 🚫 The Strange Woman

A strange woman in Proverbs means a woman outside the bounds of marriage.

She is not simply unfamiliar or a stranger in the ordinary sense.

This exact phrase appears again and again through the early chapters of Proverbs.

Naming this danger before the story begins prepares the reader for what comes.

🚫 Strange woman means outside the bounds of marriage

🔁 The phrase repeats through early Proverbs

📢 The danger is named before the story starts

📖 The reader is warned in advance

---

## 🍯 Which Flattereth With Her Words

Flattery means false praise designed to lower someone's guard.

Her weapon named here is not force, it is speech.

This detail sets up the entire scene that follows in this chapter.

The danger in this story arrives through words, not through violence.

🍯 Flattery means false praise

🗣️ Her weapon is speech, not force

🎯 This detail sets up the whole scene

📖 Danger arrives here through words

# Proverbs 7:6-9
# 🪟 Watching From The Window
---
## 🪟 At The Window Of My House

The speaker here is the father telling his son a story he witnessed.

Placing him at a window makes this an eyewitness account, not a rumor.

A window in an upper room let someone see down into the street below.

Solomon is about to show, not just tell, why this warning matters.

🪟 The father speaks as an eyewitness

👀 A window let him see the street below

🙅 This is not secondhand rumor

📖 He is about to show, not just tell

---

## 🔲 Through My Casement

A casement was a lattice or screened opening built into a window.

It let a person look out while staying mostly hidden from view.

This detail explains how the father could watch unnoticed.

Nothing about this scene happened by accident or guesswork.

🔲 Casement means a lattice screened opening

👁️ It let him watch while staying hidden

🎯 This explains how he saw it all

📖 Nothing here is guesswork

---

## 🙈 Among The Simple Ones

Simple in Proverbs does not mean stupid, it means untrained and easily led.

A simple person has not yet learned to spot danger before it arrives.

This word appears often through the book as the reader's own starting point.

The whole book of Proverbs exists to move a reader out of this category.

🙈 Simple means untrained, not stupid

⚠️ A simple person cannot yet spot danger

🔁 The word repeats often through Proverbs

📖 Proverbs exists to move readers past this

---

## 🕳️ Void Of Understanding

Void here means completely empty, missing the thing entirely.

Understanding is exactly what this whole book has been offering from chapter one.

This young man is walking straight toward the one danger wisdom was built to prevent.

His lack is named plainly before a single thing happens to him.

🕳️ Void means completely empty

📚 Understanding is what this book offers

⚠️ He walks toward the danger it warned against

📖 His lack is named before anything happens

---

## 🚶 Passing Through The Street Near Her Corner

He is not lost, he chose this exact route.

A corner in a city was a known, visible location, not hidden by accident.

Choosing to walk here already put him closer to danger than he needed to be.

The trouble in this story does not begin with the woman, it begins with his feet.

🚶 He chose this route, he was not lost

📍 A corner was a known, visible spot

⚠️ He was closer than he needed to be

📖 The trouble begins with his own feet

---

## 🏠 He Went The Way To Her House

This line removes any doubt about where his path was heading.

Going the way to her house means his direction was deliberate, not accidental.

Proverbs often names a destination before naming the danger that waits there.

A choice made early in the story decides most of what happens later.

🏠 His direction was deliberate, not accidental

🎯 The destination is named before the danger

🔁 Proverbs often works this way

📖 An early choice decides what happens later

---

## 🌆 In The Twilight

Twilight was the first stretch of fading daylight after the sun went down.

Choosing this hour was already a small step toward hiding.

Nothing about this journey happened in the bright, visible light of day.

Small choices toward secrecy often come before the larger ones.

🌆 Twilight was the first fading light

🙈 Choosing this hour was a step toward hiding

🚫 Nothing here happened in plain daylight

📖 Small secrecy comes before larger secrecy

---

## 🌃 In The Evening

Evening deepens the same picture named just a moment before.

Naming twilight and then evening tracks time slipping further from safety.

Each named hour moves this young man one step closer to full darkness.

Solomon lets the reader feel the descent happen in real time.

🌃 Evening deepens the darkening picture

⏳ Time keeps slipping further from safety

🚶 Each hour moves him closer to danger

📖 The reader feels the descent happen

---

## 🌑 In The Black And Dark Night

This is the third and final named hour, and the darkest by far.

Black and dark repeated together doubles the weight of total darkness.

By now there is no daylight left to witness what happens next.

The setting has fully become what his heart already was.

🌑 The third hour is the darkest

🔁 Black and dark repeated doubles the weight

🚫 No daylight is left to witness anything

📖 The setting now matches his own heart

# Proverbs 7:10-13
# 🎭 She Meets Him At The Corner
---
## 👗 The Attire Of An Harlot

Clothing in this culture openly signaled a person's trade or intention.

An harlot's attire would have been instantly recognizable to any reader.

This detail is not about fashion, it is about a clear public signal.

The young man could have known exactly what he was walking toward.

👗 Clothing signaled a trade openly here

👀 It would have been instantly recognizable

🚫 This is a signal, not a fashion detail

📖 He could have known exactly what she was

---

## 🦊 Subtil Of Heart

Subtil is an old word meaning crafty, cunning, and calculating.

This is the same word used for the serpent back in Genesis.

Her danger was never only in how she looked, it was in how she planned.

A calculating heart can hide behind an ordinary, attractive appearance.

🦊 Subtil means crafty and calculating

🐍 The same word describes the serpent in Genesis

🧠 Her real danger was in her planning

📖 A calculating heart can hide behind a smile

---

## 📢 Loud And Stubborn

Loud describes brash, attention seeking public behavior.

Stubborn means willfully resistant to correction or restraint.

Both words describe a settled character trait, not a single bad mood.

Proverbs later paints the opposite picture, a woman whose worth is quiet and steady.

📢 Loud means brash public behavior

🚫 Stubborn means resistant to correction

🧭 Both describe a settled character, not a mood

📖 Proverbs paints the opposite picture elsewhere

---

## 🏃 Her Feet Abide Not In Her House

Abide means to stay put or remain settled somewhere.

Her feet not staying home marks her as restless by nature.

This restlessness was itself a warning sign in that culture, worth naming on its own.

A wandering pattern often reveals more than a single choice ever could.

🏠 Abide means staying put and settled

🏃 Restless feet marked a warning sign

🔁 A pattern reveals more than one choice

📖 Her whole lifestyle is the warning

---

## 🌇 Now Is She Without, Now In The Streets

Without here means outside, away from home.

Repeating now twice in one line pictures constant, restless movement.

She is never in one place long enough to be predictable.

This kind of instability was itself treated as a danger sign.

🚪 Without means outside, away from home

🔁 Now repeated pictures constant movement

🌀 She is never predictable or still

📖 Instability itself was a warning sign

---

## 🕸️ Lieth In Wait At Every Corner

Lieth in wait describes an ambush, not a chance encounter.

This is hunting language, the same kind used for predators stalking prey.

Every corner means this was not a single unlucky meeting spot.

She was searching, not simply present, when their paths crossed.

🕸️ Lieth in wait describes an ambush

🦁 This is the language of a predator

📍 Every corner means she searched widely

📖 She was hunting, not just present

---

## 💋 So She Caught Him, And Kissed Him

Caught pictures a quick, decisive seizing, not a gentle greeting.

There was no space here for him to think or hesitate.

The kiss followed the catch immediately, moving faster than he could react.

Speed itself was part of how she overwhelmed his judgment.

💋 Caught means a quick, decisive seizing

⚡ He had no space to think

🏃 The kiss came immediately after

📖 Speed overwhelmed his judgment

---

## 😏 With An Impudent Face

Impudent means shameless, showing no embarrassment at all.

A normal person meeting a stranger this way would show some hesitation.

Her face showed none, which itself revealed how practiced this scene was for her.

Shamelessness here is a character detail, not just an expression.

😏 Impudent means shameless

🙈 A normal person would show hesitation

🎭 Her ease revealed how practiced this was

📖 Shamelessness reveals her character

# Proverbs 7:14-18
# 🍷 Her Invitation
---
## 🐑 I Have Peace Offerings With Me

A peace offering was a sacrifice where the worshipper ate part of the meat.

That meant she had fresh meat and wine already sitting at home, ready.

Naming a religious offering here was meant to sound respectable, even pious.

She is using the language of worship to dress up an ordinary trap.

🐑 A peace offering left meat for the worshipper

🍷 Food and wine were already at home

🙏 Naming it made her sound respectable

📖 Worship language dressed up an ordinary trap

---

## 🙏 This Day Have I Payed My Vows

A vow was a conditional promise made to God, often in exchange for help.

Paying it meant bringing the offering once the prayer had been answered.

Claiming she just paid a vow adds a layer of false credibility to her story.

Piety here is a costume, not a real description of her heart.

🙏 A vow was a conditional promise to God

📜 Paying it meant bringing the promised offering

🎭 This claim adds false credibility

📖 Her piety is a costume, not the truth

---

## 🚪 Therefore Came I Forth To Meet Thee

Therefore ties her actions directly back to the vow she just claimed.

Coming forth to meet him sounds intentional and personal, not accidental.

Every detail in her story has already been arranged to sound believable.

Nothing in this speech is improvised, even though it sounds spontaneous.

🚪 Therefore links her actions to her story

🎯 Meeting him sounds intentional, not accidental

🧩 Every detail was arranged to sound believable

📖 Nothing here is actually spontaneous

---

## 👀 Diligently To Seek Thy Face

Diligently means with real, focused effort, not a casual glance around.

Telling him she searched hard for him flatters his ego directly.

Being chased makes a person feel wanted in a way that lowers their guard.

Flattery works by making someone feel special before they think clearly.

👀 Diligently means real, focused effort

😊 Being sought after flatters his ego

🛡️ Feeling wanted lowers a person's guard

📖 Flattery works before clear thinking starts

---

## 🎯 I Have Found Thee

Found treats him like something she was searching for, not someone she met.

This is hunting language dressed up as romance.

He is being spoken of as prey that has finally been located.

Nothing about this line describes an actual relationship between two people.

🎯 Found treats him as something searched for

🦁 This is hunting language wearing romance

🐦 He is being spoken of as prey

📖 This is not a real relationship

---

## 🛏️ Decked My Bed With Coverings Of Tapestry

Decked means dressed up or decorated in an elaborate way.

Tapestry was expensive, colorfully woven fabric, a clear luxury item.

Describing the bed this way appeals directly to the senses before anything is said aloud.

Every detail she offers targets a different part of his attention.

🛏️ Decked means elaborately decorated

🧵 Tapestry was expensive woven fabric

👀 The description appeals to the senses

📖 Every detail targets his attention

---

## 🏺 Fine Linen Of Egypt

Egypt was famous across the ancient world for producing the finest linen.

Naming Egypt here works like naming a famous luxury brand today.

This detail signals wealth and refinement, not just comfort.

She is selling an experience, not simply offering a bed.

🏺 Egypt was famous for fine linen

💎 It worked like a luxury brand name

💰 It signals wealth, not just comfort

📖 She is selling an experience

---

## 🌿 Perfumed My Bed With Myrrh, Aloes, And Cinnamon

These three spices were rare, imported, and extremely expensive in that world.

Myrrh, aloes, and cinnamon appealed to smell the way tapestry appealed to sight.

Naming three luxury items in a row overwhelms the senses on purpose.

Nothing about this room was left ordinary or plain.

🌿 Myrrh, aloes, and cinnamon were rare imports

👃 They target smell the way tapestry targets sight

🎯 Three luxury items overwhelm the senses on purpose

📖 Nothing here was left plain

---

## 🌙 Come, Let Us Take Our Fill Of Love Until The Morning

This is the true point of everything staged before it.

Take our fill means an unhurried, full amount, not a quick moment.

Until the morning promises time, removing any sense of urgency or risk.

Every earlier detail existed to make this exact invitation land easier.

🌙 This is the real point of her speech

⏳ Take our fill means an unhurried amount

🛡️ Until the morning removes any urgency

📖 Everything else was staged for this moment

---

## 🔁 Solace Ourselves With Loves

Solace means to comfort or soothe oneself.

This line repeats the invitation from the line just before it.

Hebrew poetry often restates the same idea twice for emphasis.

Repeating an invitation this way makes it feel harder to refuse.

🔁 Solace means to comfort oneself

📝 This line repeats the invitation before it

🎵 Hebrew poetry often repeats for emphasis

📖 Repetition makes an invitation harder to refuse

# Proverbs 7:19-20
# 🧳 The Husband Is Away
---
## 🏡 The Goodman Is Not At Home

Goodman is an old English word for the master of the house, her husband.

Naming his absence first removes the biggest reason for hesitation.

Everything luxurious she described earlier now feels safe from discovery.

Her whole pitch depends on this one claim being believed.

🏡 Goodman means the husband, master of the house

🚫 His absence removes the reason to hesitate

🛡️ It makes the earlier luxury feel safe

📖 Her whole pitch depends on this claim

---

## 🧳 He Is Gone A Long Journey

A long journey suggested days or weeks, not a quick errand.

This detail was meant to feel specific and therefore trustworthy.

Vague reassurance rarely convinces anyone the way a precise detail does.

She is not lying in a general way, she is lying with careful precision.

🧳 A long journey meant days or weeks

🎯 Specific details feel more trustworthy

🙅 Vague reassurance rarely convinces anyone

📖 Her lie is precise, not general

---

## 💰 A Bag Of Money With Him

Mentioning money adds a believable, practical reason for the trip.

A merchant traveling with money for business was an ordinary, everyday sight.

This detail makes the whole story sound like real life, not an excuse.

The most convincing lies are usually built from ordinary, believable details.

💰 Money adds a believable, practical reason

🧑‍💼 A traveling merchant was an ordinary sight

🎭 It makes the story sound like real life

📖 Convincing lies are built from ordinary details

---

## 📅 Will Come Home At The Day Appointed

Appointed means a fixed, agreed upon date, not a rough guess.

Claiming to know the exact return date removes any last uncertainty.

She has now answered every practical objection before he could even raise one.

By this point in her speech, nothing is left standing in his way.

📅 Appointed means a fixed, agreed date

🛡️ It removes any last uncertainty

🎯 Every objection is answered before it is raised

📖 Nothing is left standing in his way

# Proverbs 7:21-23
# 🐂 He Goes Like An Ox To The Slaughter
---
## 🗣️ With Her Much Fair Speech She Caused Him To Yield

Much fair speech means a steady flood of pleasant, persuasive words.

Caused him to yield describes his will finally giving way under pressure.

This did not happen instantly, it happened through repeated, wearing persuasion.

Verse five warned about exactly this weapon before the story ever began.

🗣️ Much fair speech means a steady flood

🌊 Yield means his will finally gave way

⏳ It happened through repeated persuasion, not instantly

📖 Verse five already warned about this weapon

---

## 🍯 With The Flattering Of Her Lips She Forced Him

Forced here does not mean physical force at all.

It describes persuasion so total it felt like he had no choice left.

Flattering lips repeats the exact warning named earlier in this same chapter.

Words alone accomplished what no physical force needed to do.

🍯 Forced does not mean physical force

🌀 Persuasion this total can feel like no choice

🔁 This repeats the chapter's earlier warning

📖 Words alone did all the work

---

## 🚶 He Goeth After Her Straightway

Straightway means immediately, without any pause to think.

After everything staged before this moment, his hesitation completely collapses.

The buildup across this whole chapter ends in one instant decision.

A single unhurried moment could have changed everything that follows.

🚶 Straightway means immediately, without pause

💥 His hesitation collapses at last

⏱️ A whole chapter's buildup ends in one instant

📖 One unhurried moment could have changed everything

---

## 🐂 As An Ox Goeth To The Slaughter

An ox walking to slaughter has no idea what is about to happen.

It walks calmly because it cannot see the danger ahead at all.

This picture describes total, tragic blindness, not stupidity.

He is being compared to an animal that trusts right up until the end.

🐂 An ox does not know its fate

😌 It walks calmly, unaware of danger

😔 This pictures blindness, not stupidity

📖 He trusts right up until the end

---

## ⛓️ Or As A Fool To The Correction Of The Stocks

The stocks were a wooden device used to publicly restrain and punish someone.

A fool here means someone who rejects wisdom, not someone unintelligent.

Being led to the stocks pictures walking straight into a deserved, public punishment.

Two pictures now stack together to describe the very same blind walk.

⛓️ The stocks were a public restraint device

🙈 Fool here means one who rejects wisdom

🎯 The stocks were a deserved, public punishment

📖 Two pictures describe the same blind walk

---

## 🏹 Till A Dart Strike Through His Liver

A dart was an old word for a small, thrown spear or arrow.

The liver was seen in this culture as central to life and deep feeling.

Being struck there pictures a mortal, irreversible wound, not a minor injury.

This is the moment the earlier warnings become fully, physically real.

🏹 A dart was a thrown spear or arrow

❤️ The liver represented deep life and feeling

💔 A mortal, irreversible wound is pictured here

📖 The earlier warnings become fully real

---

## 🐦 As A Bird Hasteth To The Snare

A snare was a hidden trap built to catch birds by surprise.

Hasteth means hurrying, moving toward it with actual speed.

The tragedy is that the bird is not dragged in, it flies there itself.

Danger accepted willingly is still just as dangerous as danger forced.

🐦 A snare was a hidden bird trap

🏃 Hasteth means hurrying toward it

😔 The bird flies there on its own

📖 Willing danger is still real danger

---

## 🕳️ And Knoweth Not That It Is For His Life

Knoweth not means total, complete ignorance of the true stakes.

This is the tragic center of the entire chapter in one short phrase.

Everything that led here felt like pleasure, comfort, and flattery, never danger.

The cost was always life itself, even when it never once felt that way.

🕳️ Knoweth not means total ignorance

🎯 This is the chapter's tragic center

🍯 It felt like pleasure, never danger

📖 The real cost was life itself

# Proverbs 7:24-27
# ⚰️ Her House Is The Way To Hell
---
## 📢 Hearken Unto Me Now Therefore

Hearken means listen closely, more urgent than a simple ask to pay attention.

The narrator returns here, stepping back out of the story just told.

This mirrors the exact words that opened this whole chapter.

The lesson has come full circle, now backed by everything just witnessed.

📢 Hearken means listen closely, urgently

🔙 The narrator steps back out of the story

🔁 This mirrors the chapter's opening words

📖 The lesson comes full circle

---

## 👶 O Ye Children

Children here is plural, widening the audience beyond the one son from verse one.

This warning was never meant for a single family alone.

Every reader of this chapter is now included in the address directly.

The story of one young man becomes a lesson for everyone reading it.

👶 Children widens the audience beyond one son

🌍 The warning was never for one family alone

👥 Every reader is now included directly

📖 One story becomes a lesson for everyone

---

## 💔 Let Not Thine Heart Decline To Her Ways

Decline means to gradually turn aside, not to suddenly leap.

This describes drift, a slow lean rather than one dramatic decision.

The young man's fall began with small choices, not with one giant one.

Guarding against decline means paying attention long before real danger ever arrives.

💔 Decline means a gradual turn aside

🐌 This describes drift, not a sudden leap

🚶 His fall began with small choices

📖 Guard the small choices, not the big one

---

## 🛤️ Go Not Astray In Her Paths

Astray means wandering off a path that was already marked and known.

This line repeats the idea just given, using a different picture.

Hebrew poetry often pairs two images to press one point home.

Straying is a choice made one step at a time, not an accident.

🛤️ Astray means wandering off a known path

🔁 This repeats the idea before it

📝 Hebrew poetry often pairs two images

📖 Straying happens one step at a time

---

## ⚔️ For She Hath Cast Down Many Wounded

Cast down pictures defeat, the language of a battlefield, not a metaphor alone.

This is not a hypothetical warning, it is stated as a known record.

Many wounded means this pattern has already happened again and again.

The warning carries the full weight of real history behind it.

⚔️ Cast down uses battlefield language

📊 This is stated as a known record

🔁 Many wounded means this pattern repeats

📖 Real history backs up this warning

---

## 💪 Yea, Many Strong Men Have Been Slain By Her

Strong men specifically means physical strength offered no protection here at all.

Slain is blunt, final language, not a softened warning.

This detail proves that only wisdom protects, never willpower or physical strength alone.

The chapter's warning was never really about weakness, it was about being untaught.

💪 Strong men still fell to this danger

⚠️ Slain is blunt, final language

🛡️ Only wisdom protects, not strength alone

📖 The real problem was being untaught

---

## 🚪 Her House Is The Way To Hell

Hell here translates a word better understood as the grave, the realm of the dead.

This is not primarily a picture of eternal fire, but of death itself.

Her literal house from earlier in the chapter becomes a symbol for something far larger.

The bed she decorated and the grave she leads to turn out to be the same road.

🚪 Hell here means the grave, not fire

⚰️ This pictures death more than punishment

🛏️ Her literal house becomes a larger symbol

📖 The decorated bed and the grave match

---

## 🕳️ Going Down To The Chambers Of Death

Chambers echoes the very bed she decked out earlier in the chapter.

Going down repeats the same downward direction named at the start of the scene.

The luxury and the danger were never two separate things, only one disguised as the other.

The chapter that opened with a warning to hold wisdom close now closes on exactly why.

🕳️ Chambers echoes her decorated bed

⬇️ Going down repeats the earlier direction

🎭 Luxury and danger were the same thing

📖 The chapter closes on exactly why it warned
`.trim();

export const PROVERBS_SEVEN_PERSONAL_SECTIONS = parseProverbsSevenRawNotes(PROVERBS_SEVEN_RAW_NOTES);
