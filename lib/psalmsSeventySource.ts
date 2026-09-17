export type PsalmsSeventyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyRawNotes(rawText: string): PsalmsSeventyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+70:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 70 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+70:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+70:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 70 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 70,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 70:${startVerse}` : `Psalms 70:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 70 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_RAW_NOTES = `# Psalms 70:1
# 🏃 A Prayer That Wastes No Time
---
## 🏃 Make Haste, O God, To Deliver Me

Make haste means come quickly, not eventually.

David is not asking for help someday.

He wants it now.

This entire psalm repeats words David already prayed once before.

Psalm 40 ends with nearly the same lines, years earlier.

Many scholars believe this short prayer was pulled out to stand on its own.

David skips any slow introduction and goes straight to asking.

🏃 Make haste means come now

🔁 This prayer repeats Psalm 40's ending

✍️ Scholars think it became its own short prayer

📖 David skips straight to the request

## ⚡ Make Haste To Help Me, O LORD

LORD written in all capital letters marks God's own personal name.

In Hebrew that name is usually written as YHWH.

English Bibles use LORD in capitals to show it is that name, not a title.

David repeats his opening request in nearly the same words.

Hebrew poetry often restates one idea twice using different words.

Saying the same plea twice shows how urgent it feels to him.

🔤 LORD in capitals marks God's own name

📜 In Hebrew that name is written YHWH

🔁 David repeats his plea in different words

📖 Repeating the request shows how urgent it is

# Psalms 70:2-3
# 😳 A Curse Aimed At Their Plans, Not Their Lives
---
## 😳 Let Them Be Ashamed And Confounded That Seek After My Soul

Seek after my soul is an old way of saying these people want him dead.

This is not simple teasing or petty rivalry.

Ashamed and confounded means David wants their plan to fail in public.

He is not asking God to kill them here.

He is asking God to expose and embarrass their plot instead.

😳 Seek my soul means they want him dead

🙅 This is not petty rivalry

📢 Ashamed and confounded means their plan fails publicly

📖 David asks for exposure, not their death

## 🔙 Let Them Be Turned Backward, And Put To Confusion

Turned backward is a picture borrowed from ancient battle.

An army turned backward means it is retreating in defeat.

David pictures his enemies as a routed army, not just embarrassed people.

Put to confusion means their whole plan falls apart at once.

That desire my hurt names their real motive.

They wanted David harmed, not just outmatched.

⚔️ Turned backward pictures an army in retreat

🏃 A defeated army flees instead of fighting

🧩 Put to confusion means their plan collapses

📖 Their real motive was to hurt David

## 😏 Let Them Be Turned Back For A Reward Of Their Shame

Reward normally means a prize earned for something good.

Here David flips the word on its head.

Their own shame becomes their payment instead of a prize.

This repeats the request from the verse before it.

Twice in a row David asks for their plan to fail.

🔄 Reward is flipped, shame becomes their payment

🔁 This repeats the same request twice

🎯 He asks twice for their failure

📖 The repetition shows how strongly he feels it

## 😆 That Say, Aha, Aha

Aha is an old taunting sound.

People shouted it to mock someone who had just fallen.

Saying it twice makes the mockery feel even crueler.

This exact taunt also appears in Psalm 40, the very psalm this one echoes.

These enemies are not attacking with weapons, only words.

Cruel words can wound as deeply as any physical blow.

😆 Aha was an old taunting sound

🪞 It mocked someone who had just fallen

🔁 The same taunt appears in Psalm 40

📖 Cruel words can wound like a physical blow

# Psalms 70:4-5
# 🙌 From Cursing Enemies To Blessing Believers
---
## 😊 Let All Those That Seek Thee Rejoice And Be Glad In Thee

Seek thee here means seeking God, the opposite of seeking David's harm.

The psalm just described enemies chasing David down to destroy him.

David now turns from cursing enemies to blessing believers.

Rejoice and be glad in thee describes genuine joy found in God himself.

The mood of the psalm shifts here for the first time.

😊 Seek thee means seeking God himself

🔄 The psalm turns from curses to blessing

🎉 This describes real joy found in God

📖 The whole mood shifts for the first time

## 📣 Let Such As Love Thy Salvation Say Continually, Let God Be Magnified

Magnified means spoken of as truly great.

Think of a telescope making something distant look larger.

Praise does not make God any bigger than He already is.

It makes God's greatness known to people who had not noticed.

Continually means this is not a one time thank you.

Loving God's salvation shows up as ongoing praise, not a single prayer.

🔭 Magnified means spoken of as truly great

🔍 Praise makes God's greatness known to others

🔁 Continually means praise that never stops

📖 Loving God shows up as ongoing praise

## 🙇 But I Am Poor And Needy

Poor and needy here has nothing to do with money.

It means someone with no resources of his own to rely on.

David is describing complete dependence on God alone.

This is a sharp contrast to the proud enemies from earlier in the psalm.

Admitting need out loud is its own kind of honesty.

🙇 Poor and needy is not about money

🤲 It means total dependence on God alone

⚖️ This contrasts the proud enemies from earlier

📖 Naming his need out loud is honest prayer

## ⏱️ O LORD, Make No Tarrying

Tarrying means delaying or taking a long time to act.

Make no tarrying repeats the same urgency from the very first line.

The psalm opened with make haste and closes with make no tarrying.

This is a deliberate bookend, not an accident of repetition.

The prayer ends without any answer recorded.

David is still waiting on God as the psalm closes.

Faith here means asking again, even without a resolved ending.

⏱️ Tarrying means delaying or taking too long

🔁 This echoes make haste from verse one

📚 The psalm opens and closes on urgency

📖 It ends still waiting, not yet resolved`.trim();

export const PSALMS_SEVENTY_PERSONAL_SECTIONS = parsePsalmsSeventyRawNotes(PSALMS_SEVENTY_RAW_NOTES);
