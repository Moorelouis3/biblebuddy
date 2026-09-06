export type PsalmsThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyRawNotes(rawText: string): PsalmsThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 30:${startVerse}` : `Psalms 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 30 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_RAW_NOTES = `# Psalms 30:1-3
# ⬆️ Lifted From The Grave
---
## 🗣️ I Will Extol Thee

To extol means much more than simply saying thank you.

It means lifting someone up in praise, on purpose, out loud.

David opens this psalm choosing that stronger word instead of a quiet feeling.

Real praise here is a decision, not just an emotion.

🗣️ Extol means praise on purpose
📢 It is stronger than a quiet thanks
✅ David chooses this word first
📖 Praise here is a decision

## ⬆️ Thou Hast Lifted Me Up

"Lifted up" means being drawn up from somewhere low, the way a bucket is drawn from a well.

David is not describing a small improvement in his mood.

He is describing being pulled from a place he could not escape alone.

Something outside of him had to do the lifting.

🪣 Lifted up pictures drawing water from a well
🕳️ David could not escape that place alone
🙌 Someone outside of him did the lifting
📖 God pulls people from what traps them

## 😔 Not Made My Foes To Rejoice Over Me

This does not mean David's enemies simply stayed quiet out of politeness.

In David's world, watching a rival fall was treated as public entertainment.

David says God refused to give them that show.

His rescue became their disappointment instead.

👀 Enemies expected to see him fall
🎉 Gloating over a rival was common
🛡️ God refused to let that happen
➡️ His rescue silenced their gloating

## 🩹 I Cried Unto Thee, And Thou Hast Healed Me

"Cried unto thee" describes an urgent, desperate call, not a calm request.

David is not saying he simply asked and felt a little better.

He is saying his healing came directly from that desperate cry.

Honest prayer sometimes sounds like crying, not conversation.

🗣️ Crying unto God means an urgent call
😖 It comes from real pain, not routine prayer
🩹 Healing followed that desperate cry
📖 God hears the cries that hurt the most

## ⚰️ Brought Up My Soul From The Grave

The grave here does not just mean a hole in the ground.

It translates Sheol, the Hebrew word for the realm of the dead.

David is describing a rescue from the edge of death itself, not just illness.

God brought his very life back up from that place.

⚰️ Grave here translates Sheol
💀 Sheol means the realm of the dead
🆙 God brought his life back from there
📖 This rescue reached beyond mere sickness

## 🕳️ Kept Me Alive, That I Should Not Go Down To The Pit

This does not introduce a second, different close call.

The pit repeats the same idea as the grave already named.

Hebrew poetry often restates one idea using two different pictures.

Repetition here makes the rescue feel even more complete.

🔁 Pit repeats the idea of the grave
📜 Hebrew poetry often restates ideas twice
🎯 One truth, said in two pictures
📖 Repetition here strengthens the rescue's meaning

# Psalms 30:4-7
# 🌅 Joy Comes In The Morning
---
## 🙏 Sing Unto The LORD, O Ye Saints Of His

Saints here does not mean people who never sin.

The Hebrew word points to those set apart and devoted to God.

David calls that whole group to join his personal praise.

His private rescue becomes a reason for public worship.

🙏 Saints means people set apart for God
🚫 It does not mean sinless people
🎶 David invites them to join his praise
📖 A private rescue becomes public worship

## 🕯️ Give Thanks At The Remembrance Of His Holiness

"Remembrance" means calling something to mind on purpose, not by accident.

His holiness names God's whole set apart character, not one trait among many.

Worship in the Bible often means deliberately remembering who God is.

Thanks flows from actually recalling God's character, not from a vague feeling.

🧠 Remembrance means calling something to mind
✨ Holiness names God's whole character
📿 Worship means recalling who God is
📖 Remembering leads to real thanks

## ⏳ His Anger Endureth But A Moment

God's anger in this psalm is real, but it does not last.

A moment describes something brief, over almost as soon as it starts.

David contrasts that short anger with a much longer favour.

Discipline from God was never meant to be the final word.

⏳ A moment means something brief
😤 God's anger here is real but short
🤍 Favour outlasts anger by far
📖 Discipline is never God's final word

## 🌙 Weeping May Endure For A Night, But Joy Cometh In The Morning

Weeping and joy are pictured here as opposite ends of a single night.

Night pictures any season of real grief, not one actual evening.

Morning pictures the moment God's rescue finally arrives.

Joy is what this psalm expects to have the last word.

🌙 Night pictures any season of grief
🌅 Morning pictures when rescue finally comes
⏱️ Weeping is temporary, not permanent
📖 Joy gets the last word

## 👑 In My Prosperity I Said, I Shall Never Be Moved

"Prosperity" here means his comfortable, successful season, not wealth or sin.

Moved means shaken or knocked off a stable position.

David admits he once mistook comfort for permanent security.

Success can quietly convince anyone they no longer need God.

📈 Prosperity means his comfortable, successful season
🧱 Moved means shaken from a stable place
😳 David admits mistaking comfort for security
📖 Success can quietly crowd out dependence

## ⛰️ By Thy Favour Thou Hast Made My Mountain To Stand Strong

"My mountain" pictures David's kingdom standing tall and secure.

That strength did not come from David's own skill or army.

It came from God's favour holding it steady underneath.

Even a mountain like that still depends on someone else's strength.

⛰️ Mountain pictures his kingdom's strength
💪 That strength was not his own doing
🤝 God's favour held it steady
📖 Even strong things depend on God

## 🙈 Thou Didst Hide Thy Face, And I Was Troubled

"Hide the face" is an old way of describing God pulling back His felt presence.

It does not mean God physically left or stopped existing.

David felt that absence the moment his pride took over.

Losing that sense of nearness troubled him more than any enemy had.

🙈 Hiding the face means withdrawn presence
🚫 It does not mean God actually left
😟 David felt that absence right away
📖 Losing God's nearness troubled him most

# Psalms 30:8-10
# 🙏 Crying Out For Mercy
---
## 🙏 Unto The LORD I Made Supplication

"Supplication" means a humble, urgent request, not a casual prayer.

David is not simply mentioning a need in passing.

He is pleading, the way someone begs when nothing else is left.

This is the same low moment already described earlier in the psalm.

🙏 Supplication means an urgent, humble plea
🚫 Not a casual or routine prayer
😢 David is pleading, not just mentioning
📖 This is the same low moment as before

## 💰 What Profit Is There In My Blood

This is not really a question David expects an answer to.

"Profit" means what good or gain would come from something.

Blood stands for David's own death, not a wound.

David is reasoning with God about why his life is worth keeping.

💰 Profit means what good would come
🩸 Blood here stands for his death
⚖️ This is an argument, not a complaint
📖 David reasons with God for his life

## 🕳️ When I Go Down To The Pit

The pit returns here, but this time inside an argument, not a description.

David is not just naming death, he is using it to reason with God.

A dead man in the pit cannot keep worshiping God on earth.

That practical loss becomes part of his appeal for rescue.

🕳️ The pit returns inside an argument now
🗣️ David is reasoning, not just describing
🙅 The dead cannot keep worshiping
📖 That loss becomes part of his appeal

## 💀 Shall The Dust Praise Thee

"Dust" pictures a body that has died and begun to decay.

It echoes the same language from Genesis, dust returning to dust.

A dead body cannot speak, let alone praise anyone.

David argues that his living voice still has a purpose.

💀 Dust pictures a decaying dead body
📜 It echoes the language from Genesis
🤐 A dead body cannot speak or praise
📖 His living voice still has a purpose

## 👂 Hear, O LORD, And Have Mercy Upon Me

"Mercy" means kindness given to someone who has not earned it.

David is not claiming he deserves rescue.

He is asking God to act out of compassion instead.

That request sits at the center of the whole psalm.

👂 Hear means listen and respond
🤍 Mercy means kindness that is not earned
🙏 David asks for compassion, not fairness
📖 This request sits at the psalm's center

## 🤝 LORD, Be Thou My Helper

"Helper" is a simple, direct word for someone who comes to your aid.

David does not ask God for a distant blessing.

He asks for a rescuer close enough to actually help.

This prayer ends in a request for nearness, not just relief.

🤝 Helper means someone who comes to aid
🙌 David asks for a hands on rescuer
📏 He wants nearness, not distance
📖 This prayer asks for closeness

# Psalms 30:11-12
# 💃 Mourning Turned To Dancing
---
## 💃 Thou Hast Turned For Me My Mourning Into Dancing

"Turned" describes a complete reversal, not a small improvement.

Mourning was the grief David carried through the earlier part of this psalm.

Dancing pictures the opposite, a full, physical expression of joy.

God did not just ease his sorrow, He replaced it.

🔄 Turned means a complete reversal
😢 Mourning was his grief from earlier
💃 Dancing pictures full, physical joy
📖 Joy replaced sorrow completely

## 👕 Thou Hast Put Off My Sackcloth, And Girded Me With Gladness

"Sackcloth" was a rough, uncomfortable garment worn during deep mourning.

To put it off means the mourning season itself has ended.

"Girded" means being wrapped or clothed, the way a belt secures clothing.

Gladness became his new clothing instead.

👕 Sackcloth was rough mourning clothing
✅ Taking it off means mourning ended
🎗️ Girded means clothed or wrapped
📖 Gladness became his new clothing

## 🎤 My Glory May Sing Praise To Thee, And Not Be Silent

"Glory" here means a person's inmost self, not visible light or fame.

David is saying his whole being, not just his lips, will praise God.

Staying silent after a rescue like this was never really an option.

Rescue gave his whole self a voice.

✨ Glory here means his inmost self
🗣️ His whole being will praise God
🚫 Silence was never really an option
📖 Rescue gave his whole self a voice

## 🙌 I Will Give Thanks Unto Thee For Ever

This closing line echoes the exact same idea the psalm opened with.

David began by extolling God and ends by promising thanks without end.

"For ever" means this praise is not tied to just one rescue.

Crying out, in this psalm, ends in endless praise.

🔁 This echoes the psalm's opening line
🙌 David began and ends with praise
♾️ For ever means praise without limit
📖 Crying out ends in endless praise
`.trim();

export const PSALMS_THIRTY_PERSONAL_SECTIONS = parsePsalmsThirtyRawNotes(PSALMS_THIRTY_RAW_NOTES);
