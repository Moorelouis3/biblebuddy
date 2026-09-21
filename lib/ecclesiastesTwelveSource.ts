export type EcclesiastesTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesTwelveRawNotes(rawText: string): EcclesiastesTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 12:${startVerse}` : `Ecclesiastes 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ecclesiastes 12 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_TWELVE_RAW_NOTES = `# Ecclesiastes 12:1-2
# 🕯️ Remember Him While You Are Young
---
## 🧠 Remember Now Thy Creator

Remember here means far more than simply recalling a fact.

It means turning your full attention and loyalty toward God.

Solomon points this command straight at the young, not just the old.

A life built on God early still holds up when hard years come.

🧠 Remember means turn toward God

👦 Solomon speaks straight to the young

🏗️ Early devotion still holds up later

📖 God should come first, not last

## ⏳ In The Days Of Thy Youth

Youth is a narrow window most people never get back.

Habits and beliefs formed early tend to shape an entire life.

Waiting until old age to seek God often means waiting too long.

Solomon writes this after chasing nearly every pleasure life could offer.

⏳ Youth is a narrow window

🌱 Early habits shape a whole life

⌛ Waiting too long is a real risk

📖 Solomon writes from hard experience

## ⚠️ Nor The Years Draw Nigh

The evil days does not mean sudden disaster out of nowhere.

It means the ordinary hardships that build up with age.

Aches, slower strength, and loss all belong to these years.

Solomon urges remembering God before these years even arrive.

⚠️ Evil days means aging hardships

🦴 Aches and slower strength arrive

💔 Loss becomes more common with age

➡️ Remember God before these years come

## 🌧️ Nor The Clouds Return After The Rain

This is a picture of trouble following trouble without relief.

Think of clouds gathering again right after the rain stops.

There is no dry season to enjoy in between.

In youth, one hard season usually clears before the next begins.

In old age, the storms can start overlapping instead.

🌧️ Clouds returning means no relief

☀️ Youth sees hardship clear before the next

🌫️ Old age can bring overlapping storms

📖 Better to remember God before this starts

# Ecclesiastes 12:3-4
# 👴 The Body Slowly Gives Way
---
## 💪 The Keepers Of The House Shall Tremble

This whole section paints old age as a house falling into disrepair.

The keepers of the house are the arms and the hands.

Many scholars believe this pictures hands that once worked steadily starting to shake.

Simple daily tasks start requiring far more effort than before.

💪 Keepers of the house means arms

🤲 Hands once steady start to shake

🏠 Old age pictured as a fading house

📖 Even simple tasks grow harder

## 🦵 The Strong Men Shall Bow Themselves

The strong men in this picture are the legs.

Legs that once carried a person easily begin to bend and weaken.

Walking upright without support slowly becomes harder.

The picture stays consistent, each part of the aging body gets its own image.

🦵 Strong men pictures the legs

🚶 Legs once strong begin to bend

🦯 Walking upright grows more difficult

➡️ Every image here fits one whole picture

## 🦷 The Grinders Cease Because They Are Few

The grinders are the teeth used for chewing food.

Because they are few means some teeth are missing or worn down.

Eating itself becomes slower and more difficult with age.

Something once done without a thought now takes real effort.

🦷 Grinders means the teeth

🍞 Few teeth means chewing slows down

🍽️ Eating becomes harder with age

📖 Ordinary tasks demand real effort now

## 👀 Those That Look Out Of The Windows Be Darkened

The windows here are the eyes.

Darkened windows picture eyesight growing dim with age.

A house with darkened windows lets in far less light.

The same is true for a person whose sight is fading.

👀 Windows pictures the eyes

🌑 Darkened means fading eyesight

🏚️ Less light reaches a fading house

📖 Aging dims what once was clear

## 🚪 The Doors Shall Be Shut In The Streets

Doors shutting toward the street pictures the mouth or the ears closing off.

An old house with its doors shut no longer welcomes the noise outside.

Conversation and hearing both grow quieter with age.

The busy sound of the street slowly fades from within.

🚪 Doors closing pictures mouth or ears

🔇 The outside noise grows fainter

🏠 A shut house lets in less life

➡️ Age can quiet a once busy world

## 🐦 He Shall Rise Up At The Voice Of The Bird

This describes waking at the very first birdsong of the morning.

Deep, restful sleep becomes harder to hold onto with age.

The smallest sound is enough to end the night early.

What once took a loud alarm now only takes a chirp.

🐦 Rising at a bird means light sleep

😴 Deep rest grows harder to hold

🌅 Even small sounds end the night

📖 Old age often brings thinner sleep

## 🎶 The Daughters Of Musick Shall Be Brought Low

The daughters of musick refers to singing voices and the sounds of music.

Brought low pictures hearing that can no longer catch every note.

It can also picture a voice too weak to sing as it once did.

Something that once brought real joy grows fainter with age.

🎶 Daughters of musick means singing voices

👂 Hearing catches fewer notes with age

🎤 A once strong voice may weaken

➡️ Simple joys can grow quieter too

# Ecclesiastes 12:5
# 🌸 Fear And Frailty Take Hold
---
## 🏔️ Afraid Of That Which Is High

A body that once climbed without a thought now hesitates at a height.

Aging joints and slower balance make heights feel genuinely dangerous.

This is not cowardice, it is the honest caution of a weaker body.

Fear here describes a real physical change, not a character flaw.

🏔️ High places now feel dangerous

🦴 Weaker joints change what feels safe

🧍 Balance grows less steady with age

📖 This fear reflects the body, not the character

## 🛣️ Fears Shall Be In The Way

The way simply means the ordinary road or path someone walks.

Even a familiar walk can now feel uncertain and risky.

A stumble that once meant nothing can now mean a real injury.

Everyday movement itself becomes something to think carefully about.

🛣️ The way means an ordinary path

🚶 Familiar walks can now feel risky

🤕 A small stumble now carries real danger

➡️ Everyday movement takes more care

## 🌸 The Almond Tree Shall Flourish

The almond tree blooms with pale white blossoms in early spring.

Many scholars believe this pictures hair turning white with age.

The comparison is gentle, a tree in bloom rather than a tree dying.

Even this marker of age gets pictured with real beauty.

🌸 Almond blossoms are pale white

👴 This pictures hair turning white

🌳 The image is gentle, not harsh

📖 Even age is pictured with beauty

## 🦗 The Grasshopper Shall Be A Burden

A grasshopper is about as light as anything in nature.

This pictures a body so weakened that even light things feel heavy.

Simple movement that once cost nothing now costs real effort.

The smallest weight can feel enormous to a frail body.

🦗 A grasshopper is naturally light

🏋️ Light things now feel heavy

🐢 Simple movement costs real effort

📖 Frailty makes small things feel large

## 🍽️ Desire Shall Fail

The Hebrew word behind desire likely names the caperberry.

That was a small fruit eaten to stir up appetite.

Many scholars believe this line pictures appetite itself fading with age.

Even a food meant to spark hunger no longer works.

A simple daily pleasure quietly disappears.

🍽️ Desire likely points to appetite

🫒 The caperberry was used to stir hunger

📉 Even that no longer works

➡️ A simple pleasure fades with age

## ⚰️ Man Goeth To His Long Home

Long home is a gentle way of naming the grave.

It describes the body's final and lasting resting place.

The word choice softens something the whole chapter has been building toward.

Death arrives here not as a shock but as the picture's final step.

⚰️ Long home means the grave

🏡 It names a final resting place

📉 The chapter has built toward this step

📖 Death is named gently, not harshly

## 😢 The Mourners Go About The Streets

Mourners here were often hired to publicly grieve for the dead.

Their loud, open grief announced a death to the whole community.

This custom made sure a life was not allowed to pass unnoticed.

The private ending in verse five becomes a public event in the street.

😢 Mourners were often hired to grieve

📢 Their grief announced a death publicly

🏘️ The whole community took notice

➡️ A private ending became a public one

# Ecclesiastes 12:6-7
# 🏺 The Cord Breaks And The Bowl Falls
---
## 🕯️ The Silver Cord Be Loosed

Ancient lamps were sometimes hung from the ceiling by a cord.

Picture a golden bowl of oil suspended by a silver cord above it.

Once that cord snaps, the whole lamp comes crashing down.

This pictures the very last moment life is finally cut loose.

🕯️ A lamp hung by a silver cord

💡 The cord held the whole lamp up

📉 A snapped cord means a sudden fall

📖 This pictures life's final moment

## 🏺 The Golden Bowl Be Broken

The golden bowl held the oil that kept the lamp burning.

Once broken, that bowl can no longer hold anything at all.

The light it once fed simply goes out.

This continues the same lamp picture from the verse before.

🏺 The bowl held the lamp's oil

🔥 A broken bowl cannot hold oil

🌑 The light finally goes out

➡️ One picture carries across both lines

## 💧 The Pitcher Be Broken At The Fountain

A pitcher was the jar people used to carry water home from a well.

A broken pitcher can no longer carry anything at all.

This shifts the picture from a lamp to daily water gathering.

Both pictures point to the same ending, something that once worked now fails.

💧 A pitcher carried water from a well

🚫 A broken pitcher carries nothing

🔄 The picture shifts to daily water

📖 Both pictures point to the same end

## ⚙️ The Wheel Broken At The Cistern

A cistern stored water, and a wheel helped draw that water up.

Many scholars believe this describes a pulley system used at the well.

Once the wheel breaks, no more water can be lifted out.

The whole system that once sustained daily life simply stops.

⚙️ A wheel helped draw up water

🪣 A cistern stored the water below

🛑 A broken wheel stops the system

➡️ What once sustained life now stops

## 🌍 The Dust Return To The Earth As It Was

This recalls how God first formed man from the dust of the ground.

At death, the body simply returns to the material it began as.

Genesis two already describes this same origin in plain terms.

The ending mirrors the beginning exactly.

🌍 Dust recalls how man was first formed

📜 Genesis two already describes this origin

🔁 The body returns to where it began

📖 The ending mirrors the beginning

## 🕊️ The Spirit Shall Return Unto God Who Gave It

The body returns to dust, but the spirit takes a different path.

Genesis two also describes God breathing the breath of life into man.

That same breath or spirit now returns to the God who gave it.

Death here is described as a return, not a disappearance.

🕊️ The spirit came from God originally

💨 Genesis two describes that same breath

🔙 Death is described as a return

📖 Nothing here simply disappears

# Ecclesiastes 12:8
# 🌬️ Vanity Of Vanities Once More
---
## 🌬️ Vanity Of Vanities

This exact phrase opened the entire book back in chapter one.

Vanity here means something fleeting and hard to hold onto, not something worthless.

After eleven chapters of searching, the Preacher lands right back where he started.

The whole book forms one complete circle around this single idea.

🌬️ Vanity means fleeting, not worthless

🔁 This phrase also opened the book

⭕ The book forms one complete circle

📖 The search ends where it began

## 🗣️ Saith The Preacher

Preacher translates a Hebrew word usually understood as one who gathers or teaches an assembly.

Tradition has long connected this voice to Solomon himself.

This title has been repeated throughout the entire book to mark whose voice is speaking.

The whole book closes the same way it kept speaking all along.

🗣️ Preacher means a teacher to an assembly

👑 Tradition connects this voice to Solomon

🔂 This title repeats through the whole book

➡️ The closing voice matches the opening one

# Ecclesiastes 12:9-11
# 📚 The Preacher's Careful Words
---
## 🧠 Because The Preacher Was Wise

This verse steps back to describe the Preacher's own method of work.

His wisdom was not kept to himself.

He still taught the people knowledge, sharing what he had learned.

Real wisdom in this book is never meant to stay private.

🧠 The Preacher worked from real wisdom

🗣️ He still taught ordinary people

🤲 Wisdom here was meant to be shared

📖 Private wisdom was never the goal

## 📋 Sought Out And Set In Order Many Proverbs

The Preacher did not just create wisdom sayings.

He also organized them, setting them in order.

Wisdom that is scattered helps almost no one.

Wisdom that is ordered can actually be taught.

📋 He organized, not just created, sayings

🗂️ Setting in order means arranging for use

✍️ This describes real editorial work

➡️ Ordered wisdom is wisdom that can teach

## ✅ Words Of Truth

The Preacher searched carefully for words that were both fitting and honest.

Acceptable here does not mean popular or pleasing to hear.

It means well chosen and exactly right for what needed to be said.

Truth mattered more to him than sounding impressive.

✅ Acceptable means well chosen, not popular

🎯 His words aimed to be exactly right

🗣️ Sounding impressive was never the goal

📖 Truth mattered more than style

## 🪵 As Goads

A goad was a long pointed stick used to prod oxen forward while plowing.

Wise words are compared to that same sharp prodding.

A goad is uncomfortable, but it moves a stubborn animal in the right direction.

True wisdom is meant to move a person forward too, not just comfort them.

🪵 A goad prodded oxen while plowing

😣 Sharp words can feel uncomfortable

➡️ Discomfort here moves someone forward

📖 Wisdom is meant to move, not just soothe

## 🔨 As Nails Fastened By The Masters Of Assemblies

A well driven nail from a skilled craftsman holds firm for a very long time.

Wise sayings are compared to that same kind of lasting, secure work.

Masters of assemblies likely refers to skilled teachers or collectors of wisdom.

Their words were meant to stay fixed in memory, not fade quickly.

🔨 A well driven nail holds firm

🛠️ Masters of assemblies means skilled teachers

🧠 Their words were meant to stick

➡️ Good wisdom stays fixed, not forgotten

## 🐑 Given From One Shepherd

After naming human teachers, the verse points to a single ultimate source.

One shepherd names God as the true origin behind all real wisdom.

Every human teacher mentioned in this chapter is only passing on what God gave.

This quietly answers where lasting truth actually comes from.

🐑 One shepherd points to God

🔗 Human teachers only pass wisdom along

🌟 God is the true source of it

📖 Lasting truth traces back to Him

# Ecclesiastes 12:12-14
# ⚖️ Fear God And Keep His Commandments
---
## 📚 Of Making Many Books There Is No End

Solomon had access to more resources for study than almost anyone in his day.

Even he admits that human research alone never reaches a finish line.

There will always be one more book, one more theory, one more question.

Endless study by itself was never going to be the real answer.

📚 Solomon had vast resources for study

🔄 Human research alone never finishes

❓ There is always one more question

📖 Endless study is not the whole answer

## 😩 Much Study Is A Weariness Of The Flesh

Weariness here describes real physical and mental exhaustion, not simple tiredness.

Endless searching without God's answer can genuinely wear a person down.

This is not a warning against learning itself.

It is a warning against treating learning as the final destination.

😩 Weariness means real exhaustion

🔍 Endless searching without God is draining

🚫 Learning itself is not the warning

➡️ Learning as a final answer is the warning

## 🙏 Fear God, And Keep His Commandments

Fear here does not mean being afraid of an angry God.

It means holding Him in the deepest possible respect and awe.

That respect naturally leads to obeying what He has commanded.

After eleven chapters of searching, this is the simple conclusion Solomon lands on.

🙏 Fear here means deep reverence

⚖️ Reverence leads naturally to obedience

🔚 This is Solomon's actual conclusion

📖 Respect for God comes before obedience

## 👤 This Is The Whole Duty Of Man

Whole duty means the complete point of a person's entire existence.

It is not one option among many.

It is the single thing that matters most.

Pleasure, work, and wisdom all point back to this same purpose.

Solomon strips the entire search down to one simple conclusion.

👤 Whole duty means life's complete point

🎯 Not one option among many

🧭 Pleasure, work, and wisdom point here

📖 One purpose outweighs every alternative

## ⚖️ God Shall Bring Every Work Into Judgment

Judgment here means every action gets weighed by God eventually.

Nothing done in this life stays permanently unexamined.

This includes actions no other person ever even noticed.

That truth gives real weight to choices made in private.

⚖️ Judgment means every act gets weighed

👁️ Nothing stays permanently unexamined

🤫 Even unnoticed actions are included

📖 Private choices carry real weight

## 🔍 Every Secret Thing, Whether It Be Good, Or Whether It Be Evil

Secret here means anything done where no other person was watching.

God's judgment reaches those hidden moments just as much as public ones.

Good secret actions are counted, not only bad ones.

Nothing escapes notice, whether it was done in kindness or in wrong.

🔍 Secret means done where no one saw

👁️ God's judgment reaches hidden moments

✅ Good hidden acts are counted too

📖 Nothing escapes God's notice
`.trim();

export const ECCLESIASTES_TWELVE_PERSONAL_SECTIONS = parseEcclesiastesTwelveRawNotes(ECCLESIASTES_TWELVE_RAW_NOTES);
