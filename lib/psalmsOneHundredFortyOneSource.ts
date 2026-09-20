export type PsalmsOneHundredFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyOneRawNotes(rawText: string): PsalmsOneHundredFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+141:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 141 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+141:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+141:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 141 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 141,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 141:${startVerse}` : `Psalms 141:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 141 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_ONE_RAW_NOTES = `# Psalms 141:1-3
# 🙏 A Prayer Rising Like Incense
---
## 🆘 Make Haste Unto Me

"Make haste" means come quickly, not eventually.

David is not making a calm, composed request.

The word "cry" pictures a loud, urgent call for help.

He wants God's attention now, not sometime later.

This is what desperate, honest prayer sounds like.

🆘 Make haste means come quickly
📣 Cry pictures a loud urgent call
⏱️ David wants help now, not later
📖 Urgent prayer is still honest prayer

## 🕯️ My Prayer Be Set Forth Before Thee As Incense

"Incense" was burned every morning and evening at the temple.

The smoke rose up and slowly disappeared from sight.

David compares his prayer to that rising smoke.

He wants his words to reach God the same way.

A prayer cannot be seen once it leaves the person praying.

It can still reach God just as surely as that smoke did.

🕯️ Incense burned morning and evening at the temple
💨 The smoke rose out of sight
🙏 David compares his prayer to that smoke
📖 Unseen prayer still reaches God

## 🙌 The Lifting Up Of My Hands As The Evening Sacrifice

Lifting the hands was the normal posture for prayer in that time.

It pictures someone reaching up, open and asking.

The "evening sacrifice" was a regular offering made at the temple each evening.

David compares his raised hands to that daily offering.

His private prayer is treated with the same weight as formal worship.

🙌 Lifted hands was the normal prayer posture
🌇 Evening sacrifice was a daily temple offering
⚖️ David compares his prayer to that offering
📖 Private prayer carries the weight of worship

## 👮 Set A Watch, O LORD, Before My Mouth

A "watch" was a guard stationed to protect something valuable.

David is asking God to guard his mouth the same way.

He is not asking to be controlled against his will.

He is asking for help resisting words he might regret.

Admitting that need is not weakness.

👮 Watch means a guard stationed to protect
🗣️ David asks God to guard his mouth
🙏 This is a request for help, not control
📖 Admitting the need is not weakness

## 🚪 Keep The Door Of My Lips

A door controls what comes in and what goes out.

David pictures his lips the same way, something that can open or stay shut.

Think of a guard standing at that door.

Nothing passes through without the guard's permission.

David wants that same control over his own words.

🚪 A door controls what passes through
👤 Lips work the same way as a door
🛡️ Picture a guard standing at that door
➡️ David wants control over his own words

# Psalms 141:4-5
# ⚖️ Welcoming Correction, Refusing Evil
---
## 🧭 Incline Not My Heart To Any Evil Thing

"Incline" means to lean or turn toward something.

David asks God to keep his heart from drifting toward evil.

He is not claiming he could never be tempted.

He is asking for protection from that pull.

Even a king favored by God still prays this way.

🧭 Incline means to lean toward something
❤️ David asks God to guard his heart
😈 He admits he could still be tempted
📖 Even a king still prays for protection

## ⚖️ To Practise Wicked Works With Men That Work Iniquity

"Iniquity" means sin, especially wrongdoing done on purpose.

David is not only worried about his own actions.

He is worried about joining in with people who do wrong.

Bad company can pull even a good heart off course.

He prays to be kept out of that circle entirely.

⚖️ Iniquity means sin done on purpose
👥 David fears joining wrongdoers, not just sinning alone
🧲 Bad company can pull a heart off course
➡️ He prays to stay out of that circle

## 🍽️ Let Me Not Eat Of Their Dainties

"Dainties" means rich, tempting food, the kind kept for special occasions.

Sharing a meal in this culture meant sharing loyalty and friendship.

David is not simply talking about food here.

He is refusing close fellowship with wicked people.

Accepting their table would mean accepting their way of life.

🍽️ Dainties means rich, tempting food
🤝 Sharing a meal meant sharing loyalty
🚫 David refuses close fellowship with the wicked
📖 Accepting their table meant accepting their ways

## 🙅 Let The Righteous Smite Me

This does not describe an act of violence.

"Smite" here means a sharp, honest correction from a godly friend.

David welcomes that kind of correction as a kindness.

Most people avoid criticism instead of asking for it.

David asks for it directly.

🙅 Not describing an act of violence
🗣️ Smite means sharp, honest correction here
🤝 David welcomes correction as a kindness
📖 He asks for it instead of avoiding it

## 🫗 An Excellent Oil, Which Shall Not Break My Head

Oil was used in that culture to soothe and to honor a guest.

David compares honest correction to that same soothing oil.

Think of a bruise that gets treated and heals clean.

Correction stings for a moment but leaves no lasting wound.

A true friend's words heal instead of harm.

🫗 Oil was used to soothe and to honor
🩹 Correction heals like treated oil, not harm
😖 It may sting but leaves no lasting wound
📖 A true friend's words heal instead of harm

## ❓ My Prayer Also Shall Be In Their Calamities

This line is one of the hardest to translate in the whole psalm.

It does not mean David enjoys watching his enemies suffer.

Many scholars believe it means David keeps praying even as trouble comes to them.

He does not stop trusting God once judgment is underway.

The exact detail here is genuinely unclear.

❓ One of the hardest lines to translate
🚫 Not David enjoying his enemies suffering
🙏 He likely keeps praying through their trouble
📖 The exact detail here stays unclear

# Psalms 141:6-7
# 🪨 When The Wicked Fall
---
## ⚖️ Their Judges Are Overthrown In Stony Places

"Judges" here means the leaders of the group opposing David.

"Stony places" likely points to a rocky cliff used for executions.

Ancient armies sometimes threw defeated leaders from high, rocky ground.

David pictures the downfall of the men leading this attack.

Their power does not last forever.

⚖️ Judges means the leaders opposing David
🪨 Stony places likely means a rocky execution site
⚔️ Ancient armies threw defeated leaders from high ground
📖 Their power does not last forever

## 👂 They Shall Hear My Words, For They Are Sweet

Once these harsh leaders fall, David expects people to finally listen to him.

"Sweet" here means pleasant and welcome, not weak or soft.

Right now his words are ignored or resisted.

That will change once the wicked lose their grip.

👂 David expects people to finally listen
🍯 Sweet means pleasant and welcome here
🙅 His words are currently ignored
➡️ That changes once the wicked lose power

## ⚰️ Our Bones Are Scattered At The Grave's Mouth

This pictures a battlefield or execution site littered with the dead.

"The grave's mouth" means the open entrance of a grave or pit.

Bodies were left unburied instead of given a proper burial.

That was considered a horrifying fate in that culture.

⚰️ Pictures a battlefield littered with the dead
🕳️ Grave's mouth means the open pit entrance
🚫 The dead were left unburied here
📖 An unburied death was seen as horrifying

## 🪓 As When One Cutteth And Cleaveth Wood Upon The Earth

Think of wood chips scattering across the ground while someone chops a log.

That is the picture David uses for how the bodies lay.

The image is jarring on purpose.

It shows how many died and how little care their bodies received.

🪓 Wood chips scatter while someone chops a log
💀 That pictures how the bodies were left
😨 The image is meant to be jarring
📖 It shows how little care the dead received

# Psalms 141:8-10
# 🕸️ Eyes Fixed On God, A Trap For The Wicked
---
## 👀 Mine Eyes Are Unto Thee, O GOD The Lord

After scattered bones and real danger, David turns his eyes back to God.

"GOD the Lord" combines two Hebrew names for God in one title.

Stacking both names adds weight to this moment of trust.

David says his trust rests in God alone.

Fear does not get the last word here.

👀 David turns his eyes back to God
📛 GOD the Lord combines two divine names
⚖️ Stacking both names adds weight here
📖 Fear does not get the last word

## 📉 Leave Not My Soul Destitute

"Destitute" means left with absolutely nothing, completely empty handed.

David is not asking for comfort or ease.

He is asking to not be abandoned in the danger he faces.

Trusting God does not mean pretending the danger is not real.

📉 Destitute means left with absolutely nothing
🙏 David is not asking for comfort or ease
🛡️ He is asking not to be abandoned
📖 Trust does not mean ignoring real danger

## 🪤 Keep Me From The Snares Which They Have Laid For Me

A "snare" was a hunting trap designed to catch an animal by surprise.

David uses it here as a picture of a hidden plot against him.

The danger is not open combat but something concealed.

He asks God to see what he cannot see coming.

🪤 Snare means a hidden hunting trap
🎯 It pictures a hidden plot here
🙈 The danger is hidden, not open combat
📖 David asks God to see what he cannot

## 🪢 The Gins Of The Workers Of Iniquity

"Gins" is an old word for traps, related to the word engine.

It repeats the same warning as "snares" in different words.

Hebrew poetry often says one idea twice using two pictures.

The repetition shows how seriously David takes this threat.

🪢 Gins is an old word for traps
🔁 It repeats the snares warning again
📚 Hebrew poetry often doubles an image
📖 Repetition shows how serious the threat is

## 🔄 Let The Wicked Fall Into Their Own Nets

David asks for the traps meant for him to catch the ones who set them instead.

This idea shows up again and again across the psalms.

It is not random luck when a plan backfires.

God can turn a trap back on the one who built it.

🔄 David asks the trap to catch its makers
⚖️ God can turn a trap on its builder
🚫 A backfiring plan is not random luck
📖 This idea repeats often across the psalms

## 🕰️ Whilst That I Withal Escape

"Whilst" means while, and "withal" means at the same time.

David ends the psalm picturing two very different outcomes at once.

The wicked fall into the very trap they built.

David walks away safe in that same moment.

The psalm that began with an urgent cry ends in quiet confidence.

🕰️ Whilst and withal are both old words
⚖️ Two outcomes happen at the very same moment
🪤 The wicked fall into their own trap
📖 An urgent cry ends in quiet confidence
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_ONE_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyOneRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_ONE_RAW_NOTES,
);
