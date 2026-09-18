export type PsalmsNinetySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetySevenRawNotes(rawText: string): PsalmsNinetySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+97:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 97 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+97:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+97:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 97 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 97,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 97:${startVerse}` : `Psalms 97:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 97 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_SEVEN_RAW_NOTES = `# Psalms 97:1-3
# 👑 The LORD Reigns
---
## 👑 The LORD Reigneth

"Reigneth" means actively ruling right now, not just existing somewhere out there.

This psalm opens with a flat announcement, not a suggestion.

The LORD is already on his throne this very moment.

That announcement is why "the earth" can respond with joy next.

A ruling king, not an absent one, is worth celebrating.

👑 Reigneth means actively ruling now
📢 The psalm opens with a flat announcement
🌍 The earth is told to respond
📖 A ruling king deserves celebration

## 🏝️ Let The Multitude Of Isles Be Glad Thereof

"Isles" in the King James Bible means coastlands and islands far from Israel.

"Multitude" means a large number, not just a few.

The phrase pictures worship spreading to the farthest, most scattered places on earth.

Even lands with no contact with Israel are pulled into this call to joy.

This reach was never meant to stay local.

🏝️ Isles means far off coastlands
🔢 Multitude means a large number
🌐 Worship spreads to the most scattered places
📖 This reach was never meant to stay local

## ☁️ Clouds And Darkness Are Round About Him

This is not a picture of confusion or gloom.

Clouds and thick darkness were common signs of God's presence in the Old Testament.

Mount Sinai was covered the same way when God gave the law to Moses.

A visible God would be too much for sinful people to bear directly.

The clouds hide his full glory while still showing he is truly there.

☁️ Clouds and darkness signal God's presence
⛰️ Mount Sinai was covered the same way
🙈 A visible God would overwhelm sinful people
📖 The clouds hide him while proving his presence

## ⚖️ Righteousness And Judgment Are The Habitation Of His Throne

"Habitation" means dwelling place, the ground something is built on.

A throne here pictures God's rule as a king's authority.

"Righteousness" and "judgment" are not decorations on that throne.

They are its foundation.

Every decision God makes rests on what is right and fair.

🏠 Habitation means dwelling place or foundation
👑 A throne pictures God's ruling authority
⚖️ Righteousness and judgment hold up that throne
📖 His rule is never random or unpredictable

## 🔥 A Fire Goeth Before Him

Fire often marks God's presence arriving in the Old Testament.

It appeared in the burning bush and again at Mount Sinai.

"Goeth before him" pictures fire leading the way like a herald.

A herald announces a king before the king himself arrives.

The fire is not decoration.

It signals that something holy is approaching.

🔥 Fire often signals God's presence
🌵 It appeared at the burning bush and Sinai
📯 Fire leads the way like a herald
📖 It announces someone holy approaching

## 🔥 Burneth Up His Enemies Round About

This fire is not only about announcing God's arrival.

It also destroys everything that opposes him.

"Enemies round about" means every side, not just one direction.

Ancient readers pictured a king's enemies being consumed as he advanced.

No enemy escapes by hiding on the far side.

🔥 This fire also destroys, not just announces
💥 It consumes what opposes God
🔄 Round about means every side
📖 No enemy escapes by hiding

# Psalms 97:4-6
# ⚡ Creation Trembles Before Him
---
## ⚡ His Lightnings Enlightened The World

"Enlightened" here simply means lit up or made visible.

Lightning was one of the most dramatic, uncontrollable forces ancient people knew.

Picturing God's lightning lighting up the whole world shows power on a massive scale.

No single human ruler could ever cause a light like this.

⚡ Enlightened means lit up
🌩️ Lightning was an uncontrollable force to ancient people
🌍 This lightning lights up the whole world
📖 No human ruler holds power like this

## 😨 The Earth Saw, And Trembled

The earth is pictured here as if it could see and feel fear.

This is personification, a common tool in Hebrew poetry.

Giving the earth human reactions makes God's power feel even larger.

Even the ground itself is not neutral toward its Maker.

👁️ The earth is given human reactions
📝 This tool is called personification
🌍 It makes God's power feel larger
📖 Even the ground responds to its Maker

## 🕯️ The Hills Melted Like Wax

Hills stand for the most solid, unmovable things people could picture.

Wax is the opposite.

It softens and melts almost instantly under heat.

Comparing hills to melting wax pictures God overturning what seems most permanent.

Nothing stands too firm to bend before him.

⛰️ Hills picture the most solid things
🕯️ Wax melts almost instantly under heat
💧 This pictures God overturning what seems permanent
📖 Nothing stands too firm before him

## 🌍 At The Presence Of The Lord Of The Whole Earth

This phrase repeats "presence of the LORD" from earlier in the same verse.

Hebrew poetry often says the same idea twice in slightly different words.

The second half adds one detail. He is Lord of the whole earth, not one region.

The repetition presses home how total his rule really is.

🔁 This repeats the earlier phrase in the verse
📝 Hebrew poetry often restates an idea twice
🌐 It adds that he rules the whole earth
📖 The repetition presses home his total rule

## 📣 The Heavens Declare His Righteousness

"Declare" means to announce or make known, not stay silent.

The heavens are pictured here as a kind of witness.

Psalm 19 uses this same picture, the sky proclaiming God's glory without a single word.

Creation itself testifies to who God is, even without language.

📣 Declare means announce or make known
👁️ The heavens are pictured as a witness
🌌 Psalm 19 uses this same picture
📖 Creation testifies to God without words

## 👀 All The People See His Glory

This is not a private revelation meant for one nation only.

"All the people" points outward to every nation on earth.

"Glory" refers to the visible weight of who God is, not just a feeling about him.

What one nation once saw at Sinai is now shown to everyone.

🌍 All the people means every nation
✨ Glory means God's visible weight
🔁 This was once seen mainly at Sinai
📖 Now it reaches everyone

# Psalms 97:7-9
# 🗿 Idols Put To Shame
---
## 😳 Confounded Be All They That Serve Graven Images

"Confounded" means put to shame or humiliated, not simply embarrassed.

"Graven images" were idols carved out of wood, stone, or metal.

Many nations surrounding Israel worshipped gods represented by these carved statues.

The verse pictures those worshippers facing a shame they cannot avoid.

😳 Confounded means put to shame
🪵 Graven images means carved idols
🗿 Many nations worshipped statues like these
📖 Their worship ends in shame

## 🙇 Worship Him, All Ye Gods

"Gods" here likely refers to the false gods and spiritual powers other nations worshipped.

Psalm 82 pictures God judging these same beings in a heavenly council.

Even beings people treated as gods are commanded to bow to the true LORD.

There is no rival power left standing equal to him.

🗿 Gods likely means false gods and powers
⚖️ Psalm 82 pictures God judging these beings
🙇 Even they are commanded to worship him
📖 No power stands equal to the LORD

## 🏙️ Zion Heard, And Was Glad

"Zion" is another name for Jerusalem, especially the temple mount.

The city itself is pictured as if it could hear and rejoice.

News that the LORD reigns and judges idols reaches his own people first here.

Their gladness answers the shame of the idol worshippers in the verse before.

🏙️ Zion means Jerusalem's temple mount
👂 The city is pictured as hearing
😊 This news reaches God's people
📖 Their joy answers the idols' shame

## 👧 The Daughters Of Judah Rejoiced

"Daughters of Judah" is a common Hebrew way of naming the towns and villages of Judah.

It does not point to literal daughters of one family.

The whole region, not just the capital city, joins in the celebration.

News this big could not stay inside Jerusalem's walls alone.

👧 Daughters of Judah means the towns of Judah
📍 It is not literal daughters
🏘️ The whole region joins the celebration
📖 This news could not stay in one city

## 🌍 Thou, LORD, Art High Above All The Earth

This line states God's position in space and status at once.

"High above" pictures him ruling over every place on earth without exception.

No mountain, kingdom, or nation stands outside his reach.

The claim is total, not partial.

🌍 High above means ruling every place
⛰️ No mountain or kingdom is excluded
👑 His reach is total
📖 Nothing stands outside his rule

## ⬆️ Thou Art Exalted Far Above All Gods

"Exalted" means lifted up high in honor and rank.

This repeats the thought from verse 7, where the false gods were told to worship him.

Saying it twice in these verses drives the point home with force.

No other power, real or imagined, ranks anywhere close to him.

⬆️ Exalted means lifted up in honor
🔁 This repeats the thought from verse 7
🗿 It answers the false gods directly
📖 Nothing ranks close to him

# Psalms 97:10-12
# 🌱 Light Sown For The Righteous
---
## 💔 Ye That Love The LORD, Hate Evil

Loving God here is tied directly to a moral response, not just a feeling.

"Hate evil" means actively opposing what is wrong, not merely disliking it.

A love for God that tolerates evil is not the love this verse describes.

The two, love for God and hatred of evil, cannot be separated.

❤️ Love for God is tied to action
🚫 Hate evil means actively opposing wrong
⚠️ Tolerating evil is not real love here
📖 The two cannot be separated

## 🛡️ He Preserveth The Souls Of His Saints

"Preserveth" means protects and keeps safe over time, not just a single rescue.

"Saints" here means people set apart as belonging to God, not perfect people.

This is a promise of ongoing care, not one rescue and then silence.

God's protection over his people continues.

🛡️ Preserveth means protects over time
🙌 Saints means people set apart for God
🔄 This is ongoing care, not one rescue
📖 God's protection continues

## ✊ He Delivereth Them Out Of The Hand Of The Wicked

"Hand" is a common Hebrew idiom for power or control.

"Out of the hand of the wicked" means being rescued from someone else's control.

This does not promise the righteous will never face the wicked at all.

It promises they will not stay trapped under their power.

✊ Hand means power or control
🔓 This means rescue from someone's control
⚔️ The righteous still may face the wicked
📖 They will not stay trapped under them

## 🌱 Light Is Sown For The Righteous

"Sown" means planted, the way a farmer plants seed in a field.

Seed does not produce fruit the moment it is planted.

Light here is pictured the same way, planted now and appearing in its own time.

Blessing for the righteous is not always instant.

🌱 Sown means planted like seed
⏳ Seed takes time before it grows
💡 Light works the same way here
📖 Blessing is not always instant

## 😊 Gladness For The Upright In Heart

"Upright in heart" describes someone whose inner life matches their outward actions.

It is not about a perfect record, but a sincere direction.

Gladness is paired with light in this same line on purpose.

Hebrew poetry often pairs two similar ideas to say one thing twice.

❤️ Upright in heart means sincere, not perfect
😊 Gladness is paired with light on purpose
📝 This is Hebrew parallelism at work
📖 Both describe the same reward

## 🎉 Rejoice In The LORD, Ye Righteous

This is a direct command, not a suggestion or a passing feeling.

The whole psalm builds toward this moment of celebration.

"Ye righteous" points back to the same group described as upright in heart.

The proper response to everything just described is joy.

🎉 Rejoice is a command, not a suggestion
📈 The psalm builds toward this moment
🙌 Ye righteous echoes the upright in heart
📖 Joy is the proper response

## 🙏 Give Thanks At The Remembrance Of His Holiness

"Remembrance" means calling something to mind on purpose, not simply not forgetting.

"His holiness" refers to God's complete purity and set apart nature.

Thanksgiving here is tied to actively remembering who God is, not a passing mood.

The psalm ends the same way it began, focused on who the LORD is.

🙏 Remembrance means calling something to mind
✨ Holiness means his complete purity
🎯 Thanksgiving is tied to remembering him
📖 The psalm ends focused on who God is
`.trim();

export const PSALMS_NINETY_SEVEN_PERSONAL_SECTIONS = parsePsalmsNinetySevenRawNotes(PSALMS_NINETY_SEVEN_RAW_NOTES);
