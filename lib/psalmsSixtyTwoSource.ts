export type PsalmsSixtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyTwoRawNotes(rawText: string): PsalmsSixtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+62:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 62 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+62:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+62:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 62 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 62,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 62:${startVerse}` : `Psalms 62:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 62 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_TWO_RAW_NOTES = `# Psalms 62:1-4
# 🪨 Waiting Only Upon God
---
## 🤫 Truly My Soul Waiteth Upon God

"Waiteth" means far more than passing time.

The Hebrew picture behind it is a soul gone still and quiet.

This is not giving up on the problem.

It is choosing to stop struggling and stay confident instead.

David opens the whole psalm in that quiet posture.

🤫 Waiteth means going still and quiet
🙅 Not the same as giving up
😌 A quiet, confident posture
📖 David opens the psalm this way

## 🆘 From Him Cometh My Salvation

"Salvation" here does not mean the afterlife.

It means real rescue from real danger.

David is surrounded by enemies plotting against him later in this psalm.

He names the only source that can actually save him.

🆘 Salvation means real rescue here
🚫 Not a promise about the afterlife
😨 Enemies are already circling David
📖 God alone is named as the source

## 🪨 He Only Is My Rock And My Salvation

The word "only" is not filler here.

David repeats it three times across this one psalm.

Each repeat rules out every other option he could have trusted instead.

A rock in the Psalms pictures solid, unmovable ground to stand on.

David is naming God as that ground, and nothing else.

🔁 Only repeats three times in this psalm
🚫 Each repeat rules out other options
🪨 Rock pictures solid, unmovable ground
📖 God alone is that ground

## 🏰 He Is My Defence

"Defence" pictures a high, walled place built for protection.

Rock covers the ground under him.

Defence covers the walls around him.

David is not describing one kind of protection but several layered together.

🏰 Defence pictures a walled, protected place
🪨 Rock is footing, defence is walls
🧱 Two images stack for full protection
📖 David describes layered, complete safety

## 🌀 I Shall Not Be Greatly Moved

"Moved" means knocked off stable footing.

David admits here that he might be shaken a little.

He is not yet claiming to be completely unmovable.

That kind of honesty makes his confidence feel real, not rehearsed.

🌀 Moved means knocked off footing
😕 David admits a little shaking is possible
🙋 Not a claim of being unmovable yet
📖 Honest confidence, not fake talk

## 🗣️ How Long Will Ye Imagine Mischief

The word "ye" switches David's focus to his enemies directly.

"Imagine mischief" means plotting harm on purpose, not daydreaming.

David asks how long they intend to keep planning against one man.

The question itself is a warning.

🗣️ Ye now addresses David's enemies
🧠 Imagine mischief means plotting harm
❓ David asks how long this continues
📖 Their plotting has a real limit

## 🧱 As A Bowing Wall Shall Ye Be, And As A Tottering Fence

A bowing wall is a wall already leaning, ready to collapse.

A tottering fence is a fence too weak to keep standing on its own.

The enemies are certain David looks that fragile and close to falling.

David is far more solid than they assume.

🧱 Bowing wall means already leaning, collapsing
🪵 Tottering fence means weak, about to fall
👀 Enemies think David looks this fragile
📖 Their whole plan rests on a wrong read

## 🎭 They Delight In Lies: They Bless With Their Mouth, But They Curse Inwardly

This is not simply two honest opinions clashing.

Blessing with the mouth means kind, friendly words spoken out loud.

Cursing inwardly means wishing harm in private, hidden from view.

The public face and the private heart do not match at all.

David sees straight through the performance.

🎭 Two faced behavior, not honesty
😊 Bless with mouth means friendly words
😠 Curse inwardly means hidden ill will
📖 David sees past the performance

## ⏸️ Selah

"Selah" appears often in the Psalms, usually at a turning point.

Nobody today knows its exact original meaning for certain.

Many scholars believe it marked a pause, maybe for music or silence.

It invites the reader to stop and sit with what was just said.

⏸️ Selah likely marks a pause
🎵 Possibly a musical or silent break
❓ Its exact meaning is still unclear
📖 It invites a moment to reflect

# Psalms 62:5-8
# 🙏 Renewed Trust And A Call To The People
---
## 🔁 My Soul, Wait Thou Only Upon God

David repeats his own opening line from verse one almost word for word.

This time he says it as a command to himself, not just a statement.

Preaching truth to your own soul is a real practice found throughout the Psalms.

He is choosing to tell himself the truth first.

🔁 Repeats verse one almost exactly
🗣️ Now spoken as a command to himself
🧠 Preaching truth to his own soul
📖 Choosing truth before feelings catch up

## ⏳ For My Expectation Is From Him

"Expectation" means what David is actually counting on to happen.

It is not a wish or a guess.

Every hope he has for rescue traces back to this one source.

Nothing else gets named as a backup plan.

⏳ Expectation means what he counts on
🎯 Not a wish, a real hope
🔗 Every hope traces to one source
📖 No backup plan is named

## 📈 He Only Is My Rock And My Salvation: I Shall Not Be Moved

This verse repeats verse two almost exactly, with one small change.

Verse two said David would not be "greatly moved."

This verse simply says he shall not be moved at all.

The missing word marks real growth in his confidence.

📈 Repeats verse two almost word for word
✂️ The word greatly quietly disappears
🔺 A small sign of growing confidence
📖 Repetition let the truth sink in

## 👑 In God Is My Salvation And My Glory

"Glory" here means David's honor and reputation before other people.

He is saying even his good name depends on God, not his own effort.

Salvation covers rescue.

Glory covers reputation.

Both are placed in the same hands.

👑 Glory means honor and reputation
🙅 Not something David earns himself
🛟 Salvation covers rescue, glory covers reputation
📖 Both are placed in God's hands

## 🧱 The Rock Of My Strength, And My Refuge, Is In God

This verse piles up nearly every image used so far in one line.

Rock, strength, and refuge all point back to the same one God.

Stacking that many pictures together is not repetition for its own sake.

It builds a wall of assurance one image at a time.

🪨 Rock, strength, and refuge stack together
🎯 All three point to one God
🧱 Each image builds more assurance
📖 A wall of confidence, image by image

## 🔀 Trust In Him At All Times

David suddenly turns from talking about himself to speaking to "ye people."

His personal testimony becomes a public command.

"At all times" leaves out no exception, easy days or hard ones.

What worked for David is now offered to everyone listening.

🔀 David shifts from himself to the crowd
📢 His testimony becomes a public command
⏰ At all times leaves out no exception
📖 What helped David is offered to all

## 🫗 Pour Out Your Heart Before Him

"Pour out your heart" is not a literal instruction.

It means holding nothing back, no polished or careful prayer.

Ancient prayers often stayed formal and guarded.

This command asks for the opposite, complete honesty instead.

🫗 Pour out your heart means total honesty
🚫 Not a formal, guarded prayer
💧 Holding nothing back from God
📖 Honesty replaces careful, polished words

## 🤝 God Is A Refuge For Us

The pronoun quietly shifts from "my" to "us" in this line.

David's personal rock and refuge becomes a shared shelter for everyone.

The whole psalm has moved from private prayer to public promise.

Nobody watching is left out of that offer.

🔀 Pronoun shifts from my to us
🤝 David's refuge becomes a shared shelter
📣 Private prayer becomes public promise
📖 Nobody listening is left out

# Psalms 62:9-12
# ⚖️ Weightless Riches And The God Who Repays
---
## 💨 Men Of Low Degree Are Vanity, And Men Of High Degree Are A Lie

"Vanity" means a breath or vapor, something that vanishes the moment you try to hold it.

David is not insulting poor people specifically here.

He means anyone, poor or powerful, fails as a source of ultimate security.

Rank and status do not change that fact.

💨 Vanity means a breath or vapor
🙅 Not an insult aimed at the poor
👑 Applies to powerful people too
📖 No rank makes a person a safe rock

## ⚖️ To Be Laid In The Balance, They Are Altogether Lighter Than Vanity

A "balance" was a scale used to weigh out real goods like grain or silver.

Vanity itself already weighs close to nothing.

David says people trusted this way weigh even less than that.

It is a deliberately extreme picture of how little security people can offer.

⚖️ Balance means an ancient weighing scale
💨 Vanity already weighs almost nothing
📉 People weigh even less than that
📖 An extreme picture of human weakness

## 🪤 Trust Not In Oppression

"Oppression" here means wealth gained by crushing or exploiting someone weaker.

David is not warning against wealth itself in this line.

He is warning against wealth built on someone else's suffering.

That kind of foundation cannot hold real security.

🪤 Oppression means wealth built on exploiting others
🚫 Not a warning against wealth itself
😖 A warning against how it was gained
📖 That kind of foundation cannot hold

## 🥷 Become Not Vain In Robbery

"Robbery" widens the warning to include stolen gain of any kind.

"Vain" here means falsely proud, puffed up over something that will not last.

Stolen wealth can feel like power for a while.

It never becomes the real security it seems to promise.

🥷 Robbery means stolen or seized gain
🎈 Vain means falsely, temporarily proud
⏳ Stolen wealth never lasts as security
📖 It only seems to promise safety

## ❤️ If Riches Increase, Set Not Your Heart Upon Them

This final line widens the warning one more time.

Now it covers riches gained the honest way too.

The danger was never only stolen wealth.

The real danger is where a person lets their heart settle.

📈 Now covers honestly earned riches too
🚫 The danger was never only theft
❤️ The real risk is where the heart settles
📖 Wealth was never meant to be trusted

## 🔢 God Hath Spoken Once, Twice Have I Heard This

"Once, twice" is a Hebrew way of building toward a full, certain point.

It does not mean God spoke exactly one time and then a second time.

This same counting pattern shows up elsewhere in the Bible making a similar claim.

David is saying this truth is completely settled, not still in question.

🔢 Once, twice builds toward full certainty
🙅 Not a literal count of two speeches
📜 Same pattern appears elsewhere in scripture
📖 This truth is fully, finally settled

## 💪 That Power Belongeth Unto God

This is the exact truth David says God spoke to him.

Power here means real, ultimate strength, not borrowed or shared.

Every rich or violent person mentioned earlier only ever borrows power.

God is the one place power actually originates.

💪 Power means real, ultimate strength
🚫 Never borrowed, never shared with rivals
👑 Oppressors earlier only borrow power
📖 God is where power begins

## ❤️ Also Unto Thee, O Lord, Belongeth Mercy

"Mercy" pairs with power to soften what could otherwise sound frightening.

Raw power alone could feel like a threat.

Mercy means steady, loyal love that does not quit on people.

Together the two describe a God who is both strong and kind.

❤️ Mercy means steady, loyal love
😨 Power alone could sound frightening
🤝 Mercy softens what power might threaten
📖 God is both strong and kind

## ⚖️ Thou Renderest To Every Man According To His Work

"Renderest" means paying back exactly what is due, not more and not less.

This closes the loop on everyone named earlier in the psalm.

The liars, the oppressors, and the robbers will all be repaid in full.

So will anyone who waited quietly on God the whole time.

The psalm that opened in threat ends in settled justice.

⚖️ Renderest means paying back what is due
🎭 Closes the loop on the liars
🪤 Closes the loop on the oppressors too
📖 The psalm ends in settled justice
`.trim();

export const PSALMS_SIXTY_TWO_PERSONAL_SECTIONS = parsePsalmsSixtyTwoRawNotes(PSALMS_SIXTY_TWO_RAW_NOTES);
