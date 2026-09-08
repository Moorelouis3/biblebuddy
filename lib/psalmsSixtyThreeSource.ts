export type PsalmsSixtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyThreeRawNotes(rawText: string): PsalmsSixtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+63:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 63 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+63:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+63:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 63 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 63,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 63:${startVerse}` : `Psalms 63:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 63 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_THREE_RAW_NOTES = `# Psalms 63:1-4
# 🏜️ Thirsting For God In The Wilderness
---
## 🙋 O God, Thou Art My God

David repeats the word God twice in this opening line.

The first names who God is.

The second claims God as his own.

The heading says David wrote this in the wilderness of Judah.

He was likely hiding from Saul or fleeing from Absalom.

Even in danger, David claims God as personally his.

🙋 God is named twice, then claimed
🏜️ Written from the wilderness of Judah
😨 Composed during real personal danger
📖 David claims God in real danger

## 🌅 Early Will I Seek Thee

"Early" does not just mean at sunrise.

The Hebrew word pictures an eager, urgent search.

David is not describing his morning schedule.

He is describing what comes first in his heart.

Seeking God is not squeezed in after everything else.

It is the very first thing David reaches for.

🌅 Early means urgent, not just morning
🙅 Not a comment about his schedule
❤️ Describes what comes first in his heart
📖 God is sought before anything else

## 💧 My Soul Thirsteth For Thee

"Thirsteth" describes the desperate feeling of a body without water.

David borrows that physical image to describe his soul.

Think of walking for hours under a hot sun with nothing to drink.

The need is not polite or optional at that point.

David says his longing for God feels exactly that urgent.

💧 Thirsteth pictures the body without water
☀️ David borrows a desert survival image
🚶 Like walking for hours with no drink
📖 His longing for God feels that urgent

## 🏜️ In A Dry And Thirsty Land, Where No Water Is

The wilderness of Judah was rocky, hot, and nearly waterless.

David is not using thirst only as a picture here.

He wrote this from genuinely dry, rocky ground.

His physical surroundings matched exactly what his soul already felt.

The outward desert and the inward longing point to the same thing.

🏜️ Judah's wilderness was rocky and waterless
🥵 This was David's literal surroundings then
🎯 Outward desert matched inward longing
📖 Body and soul thirst together here

## 💪 To See Thy Power And Thy Glory

"Power" describes God's strength put on display.

"Glory" describes the weight of who God actually is.

David is not asking for a private feeling only.

He wants to see God's greatness made visible again.

These two words often appear together in the Psalms.

💪 Power means God's strength shown openly
👑 Glory means God's true weight and worth
👀 David wants to see it again
📖 Power and glory often pair in Psalms

## 🏛️ As I Have Seen Thee In The Sanctuary

The "sanctuary" was the tabernacle where Israel gathered to worship God.

David had experienced God's presence there before, in the middle of that worship.

Now he is far from it, out in the wilderness.

He wants that same nearness again, even in exile.

Memory becomes part of his prayer here.

🏛️ Sanctuary means the tabernacle of worship
🙏 David had felt God's presence there
🏜️ Now he prays far from it
📖 Memory fuels his longing to return

## 📜 Thy Lovingkindness Is Better Than Life

"Lovingkindness" translates the Hebrew word hesed.

It means loyal, covenant love that does not quit.

David says that love is worth more than life itself.

Life was the very thing under threat in the wilderness.

Even survival mattered less than God's loyal love.

📜 Lovingkindness translates the word hesed
🤝 It means loyal, covenant love
⚖️ David values it above his own life
📖 Even survival mattered less than God's love

## 👄 My Lips Shall Praise Thee

Praise here is not just a feeling David keeps inside.

He names his lips specifically, meaning an outward, spoken response.

Even surrounded by danger, David commits to speak it out loud.

Praise becomes the natural answer to a love worth more than life.

👄 Lips means an outward, spoken response
🚫 Not just an inward, private feeling
😨 Spoken even during real danger
📖 Praise answers a love worth more than life

## 🗣️ Thus Will I Bless Thee While I Live

To "bless" God means to speak well of Him and declare His worth.

David is not promising a single prayer.

He promises to bless God for as long as he lives.

This becomes a lifelong commitment, not a passing feeling.

The wilderness has not shaken that resolve at all.

🗣️ Bless means declaring God's worth out loud
📆 Not a single prayer but a lifelong one
🏜️ The wilderness has not shaken this
📖 David commits his whole life to it

## 🙌 I Will Lift Up My Hands In Thy Name

Lifting hands was a common posture for prayer in the ancient world.

It could also signal surrender or a solemn oath.

David pairs an outward action with an inward promise.

His whole body joins in what his heart has already decided.

🙌 Lifted hands were a common prayer posture
🤝 It could also signal surrender or an oath
❤️ Outward action joins an inward promise
📖 David's whole body joins his heart's decision

# Psalms 63:5-8
# 🌙 Satisfied And Clinging Through The Night
---
## 🍖 Satisfied As With Marrow And Fatness

"Marrow and fatness" describes the richest parts of a feast.

In the ancient world, fat portions were considered the best part of a meal.

David uses that picture to describe deep, complete satisfaction.

This is not a small taste but a full, satisfied soul.

🍖 Marrow and fatness means the richest food
🍽️ Fat portions were prized in ancient meals
😌 Pictures deep, complete satisfaction
📖 David's soul is fully, not partly, filled

## 😄 My Mouth Shall Praise Thee With Joyful Lips

"Joyful lips" describes praise that comes from real gladness.

This is not praise offered out of duty alone.

David expects his satisfaction to turn into open joy.

Inward fullness overflows into outward words.

😄 Joyful lips means glad, willing praise
🚫 Not praise offered only from duty
🌊 Inward fullness spills into outward joy
📖 Satisfaction naturally becomes praise

## 🛏️ I Remember Thee Upon My Bed

David's bed was likely a mat on the ground in the wilderness.

Lying awake at night often brings fear and worry to the surface.

Instead, David's mind turns toward remembering God.

The quiet hours become an opportunity, not just a danger.

🛏️ David's bed was a mat in hiding
😰 Night often brings fear to the surface
🙏 His mind turns toward God instead
📖 Quiet hours become opportunity, not only danger

## 🌙 In The Night Watches

The "night watches" were the divided shifts guards used through the night.

Ancient nights were commonly split into three watch periods.

David is not sleeping through those hours.

He is awake, meditating on God through each one.

🌙 Night watches were divided guard shifts
🕰️ Ancient nights split into three watches
👁️ David stayed awake through them
📖 He meditated on God the whole night

## 🛟 Thou Hast Been My Help

David points back to real help God has already given.

This is not blind hope about the future alone.

His confidence rests on what God has already done.

Past faithfulness becomes the reason to trust again now.

🛟 Help points to what God already did
🚫 Not blind hope about the future alone
🔁 Past faithfulness fuels present trust
📖 What God did before shapes David's confidence now

## 🐦 In The Shadow Of Thy Wings

This picture compares God to a mother bird sheltering her young.

Wings spread wide to cover and hide the vulnerable young underneath.

David has used this same image in earlier psalms.

He returns to it here because it still feels true.

🐦 Wings picture a mother bird sheltering young
🛡️ Wings cover and hide what is vulnerable
🔁 David reuses this image from earlier psalms
📖 The picture still feels true to him now

## 🤲 My Soul Followeth Hard After Thee

"Followeth hard" means clinging tightly, not casually tagging along.

The Hebrew picture is of something pressed close, refusing to separate.

David is not passively waiting for God to come to him.

He is actively pursuing and holding on.

🤲 Followeth hard means clinging tightly
🚫 Not a casual, distant following
🏃 David actively pursues, not waits
📖 He holds on and refuses to let go

## ✋ Thy Right Hand Upholdeth Me

The "right hand" was the ancient symbol of strength and favor.

"Upholdeth" means actively holding something up so it does not fall.

David clings to God, and God holds him up in return.

The relationship works in both directions here.

✋ Right hand symbolizes strength and favor
🏗️ Upholdeth means actively holding up
🔁 David clings, God holds him up
📖 The relationship moves in both directions

# Psalms 63:9-11
# ⚔️ Enemies Fall, The King Rejoices
---
## 🔎 They That Seek My Soul, To Destroy It

David used the word "seek" for himself back in verse one.

Now the same word describes his enemies seeking his life instead.

One seeking leads toward God.

The other seeking leads toward destruction.

The contrast is deliberate, not an accident of language.

🔎 Seek repeats from verse one, changed
😈 Now it describes enemies hunting his life
⚖️ One seeking leads to God, one to ruin
📖 The contrast is deliberate, not accidental

## ⚰️ Shall Go Into The Lower Parts Of The Earth

"The lower parts of the earth" was an ancient way of naming the grave.

David is not describing a location on a map.

He is naming the fate waiting for those who hunt him.

Their plotting will end in defeat, not victory.

⚰️ Lower parts of the earth means the grave
🗺️ Not a literal place on a map
😈 Names the fate of David's enemies
📖 Their plotting ends in defeat

## 🗡️ They Shall Fall By The Sword

David has spent this whole psalm hiding and fleeing.

Now the picture flips completely onto his enemies.

They will not simply lose an argument or a chase.

They will fall by violence themselves.

🗡️ Enemies will fall by the sword
🔄 The danger flips onto them instead
🏃 David was fleeing, now they fall
📖 Their violence turns back on themselves

## 🦊 A Portion For Foxes

Leaving a body unburied for scavengers was considered a severe dishonor.

Foxes eating the dead was as shameful an end as the ancient world could picture.

David is not just predicting death for his enemies.

He is predicting a disgraced, forgotten end.

🦊 Foxes eating the dead was severe dishonor
🚫 Unburied bodies had no honor at all
😔 A disgraced end, not just death
📖 David predicts shame, not just defeat

## 👑 The King Shall Rejoice In God

David switches here and calls himself "the king."

Writing about yourself in the third person was common in royal psalms.

The danger from the whole psalm has not disappeared yet.

David still declares that his joy will be in God, not in victory alone.

👑 The king refers to David himself
📜 Third person voice was common in royal psalms
😨 The danger has not disappeared yet
📖 His joy rests in God, not just victory

## 🤝 Every One That Sweareth By Him Shall Glory

To "swear by" someone means naming them as the authority behind a promise.

Swearing by God, instead of by an idol, showed true allegiance.

Everyone who does this will share in this same glory.

The psalm's ending widens from David alone to everyone loyal to God.

🤝 Swearing by God names Him as authority
🚫 Not swearing loyalty to a false idol
👥 Everyone loyal to God shares this glory
📖 The ending widens beyond David alone

## 🤐 The Mouth Of Them That Speak Lies Shall Be Stopped

This closes the psalm by silencing the very voices causing the danger.

Lies had fueled the plotting against David this whole time.

Now those same lying mouths are the ones stopped for good.

The psalm that opened in a dry, thirsty land ends in settled justice.

🤐 Lying mouths are finally stopped
😈 Lies had fueled the plotting all along
⚖️ Justice reaches the ones causing danger
📖 A thirsty opening ends in full justice
`.trim();

export const PSALMS_SIXTY_THREE_PERSONAL_SECTIONS = parsePsalmsSixtyThreeRawNotes(PSALMS_SIXTY_THREE_RAW_NOTES);
