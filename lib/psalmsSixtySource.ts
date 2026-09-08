export type PsalmsSixtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyRawNotes(rawText: string): PsalmsSixtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+60:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 60 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+60:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+60:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 60 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 60,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 60:${startVerse}` : `Psalms 60:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 60 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_RAW_NOTES = `# Psalms 60:1-5
# ⚔️ A Painful Setback During David's Wars
---
## O God, Thou Hast Cast Us Off

Cast off does not mean God rejected Israel forever.

This Psalm was written during David's wars against Aram.

Its title says Joab later defeated Edom at the Valley of Salt.

The song still opens with the sting of earlier losses.

🗺️ Written during David's wars against Aram
⚔️ Joab later defeated Edom nearby
😔 Cast off means the pain of defeat
📖 The prayer names that pain honestly

## Thou Hast Scattered Us, Thou Hast Been Displeased

Scattered pictures an army broken apart and running in different directions.

This was not a small skirmish or a minor setback.

Displeased does not mean God stopped loving His people.

It means God allowed real discipline to fall on them.

💥 Scattered means an army broken apart
🏃 Soldiers ran in different directions
❤️ Displeased is not the same as unloved
📖 God allowed real discipline to fall

## Thou Hast Made The Earth To Tremble

David describes the defeat as an earthquake under the whole nation.

Think of solid ground suddenly shifting under your feet.

Everything that once felt stable now feels uncertain.

That is the picture behind this line.

🌍 Defeat is pictured as an earthquake
🦶 Solid ground suddenly feels unstable
😟 Nothing feels certain anymore
📖 The picture captures national shock

## Heal The Breaches Thereof, For It Shaketh

A breach is a gap torn open in a wall during an attack.

David keeps the earthquake picture going in this line.

He asks God to repair the damage, not just stop the shaking.

A cracked wall left unrepaired only grows weaker over time.

🧱 Breach means a gap torn in a wall
🔨 David asks God to repair it
⏳ An unrepaired crack only grows weaker
📖 He wants real healing, not a pause

## Thou Hast Shewed Thy People Hard Things

Shewed is an old spelling of showed.

Hard things means real hardship, not a minor inconvenience.

David does not soften what the nation actually went through.

He names the difficulty honestly before he asks for help.

📝 Shewed is an old word for showed
💢 Hard things means real hardship
😤 David does not soften the truth
📖 He is honest before he asks for help

## Made Us To Drink The Wine Of Astonishment

Drinking a cup is a common Bible picture for receiving judgment.

The wine of astonishment means being left dazed and disoriented.

It is the same feeling as a person stumbling after too much wine.

David uses that image instead of simply saying we are confused.

🍷 Drinking a cup pictures receiving judgment
😵 Astonishment means dazed and disoriented
🥴 Like someone stumbling after too much wine
📖 The image is stronger than plain words

## Thou Hast Given A Banner To Them That Fear Thee

A banner was a flag raised so scattered soldiers could regroup.

Armies rallied around it in the middle of chaos and retreat.

God gives His frightened people a rallying point, not just a warning.

Selah likely marks a pause here, perhaps for reflection or music.

🚩 Banner means a rallying flag
🪖 Armies regrouped around it in chaos
🙏 God gives His people a rallying point
📖 Selah marks a pause to reflect

## That Thy Beloved May Be Delivered

Beloved refers to Israel, the people God chose for Himself.

The word carries deep affection, not distant duty.

David is not praying as a stranger begging a favor.

He is praying as someone who already belongs to God.

❤️ Beloved refers to Israel, God's own people
👪 The word carries real affection
🙏 David is not a stranger begging
📖 He already belongs to God

## Save With Thy Right Hand, And Hear Me

The right hand is an old picture of strength and honor.

Ancient readers pictured a king's strongest, most trusted hand.

David asks God to act with that same strength on his behalf.

The prayer closes this section by asking simply to be heard.

✋ Right hand pictures strength and honor
👑 It suggests a king's most trusted hand
💪 David asks God to act that way
📖 He closes by asking to be heard

# Psalms 60:6-8
# 👑 God Claims Every Piece Of The Land
---
## God Hath Spoken In His Holiness

In his holiness marks this as a divine promise, not a human boast.

David is quoting words God once spoke, not making a new claim.

The line separates this section from the desperate prayer before it.

What follows is God answering, not David asking.

👑 In his holiness marks a divine promise
🗣️ David quotes words God once spoke
🔀 This shifts from prayer to promise
📖 God answers before David even finishes asking

## I Will Divide Shechem, And Mete Out The Valley Of Succoth

Shechem sat west of the Jordan River, deep in the land's center.

Succoth sat east of the Jordan, on the opposite side.

Mete out means to measure and divide up like a surveyor.

Naming both places together claims the whole land, not just part of it.

🗺️ Shechem sat west of the Jordan
🏞️ Succoth sat east of the Jordan
📏 Mete out means measure and divide
📖 Together they claim the whole land

## Gilead Is Mine, And Manasseh Is Mine

Gilead was a hilly region east of the Jordan River.

Manasseh was one Israelite tribe split across both sides of the Jordan.

Claiming both shows God's ownership stretching across the whole territory.

Nothing east of the river was outside His reach.

⛰️ Gilead was a region east of Jordan
👪 Manasseh was a tribe split both sides
🗺️ God's ownership stretched across the territory
📖 Nothing was outside His reach

## Ephraim Also Is The Strength Of Mine Head

Ephraim was the leading tribe in the northern part of Israel.

Strength of mine head pictures a helmet protecting a warrior.

God compares Ephraim to His own battle strength.

The tribe is being named as a source of military might.

👑 Ephraim led the northern tribes
⛑️ Strength of mine head pictures a helmet
💪 God compares Ephraim to His strength
📖 Named as a source of military might

## Judah Is My Lawgiver

Lawgiver here means the ruler who holds the royal scepter.

Judah was David's own tribe, the tribe of Israel's kings.

Naming Judah this way points straight back to God's promise of kingship.

The ruling authority in Israel belongs to this one tribe.

⚖️ Lawgiver means the ruler with the scepter
👑 Judah was David's own royal tribe
🤝 It points to God's promise of kingship
📖 Ruling authority belongs to this tribe

## Moab Is My Washpot

A washpot was the basin used to wash a servant's feet.

Calling Moab a washpot was a sharp insult in that culture.

It pictures a proud enemy reduced to the lowest household task.

God is describing total authority, not literal laundry.

🧺 Washpot means the basin for washing feet
😳 Calling Moab that was a sharp insult
📉 A proud enemy reduced to a servant
📖 It pictures total authority, not laundry

## Over Edom Will I Cast Out My Shoe

Throwing a shoe over land was a way of claiming ownership of it.

It could also picture treating a servant the way you toss him a sandal.

Edom is named here because Israel had just fought them at the Valley of Salt.

God is claiming this hostile neighbor as His own possession.

👟 Casting a shoe pictures claiming ownership
🧦 Or treating a servant like a sandal
⚔️ Edom was the enemy from the recent battle
📖 God claims even this neighbor as His

## Philistia, Triumph Thou Because Of Me

Triumph here is likely sarcastic, not a real invitation to celebrate.

Philistia was a longtime enemy along Israel's coast.

The line pictures them forced to cry out before God's power.

It is submission dressed up as an ironic command.

😏 Triumph here is likely sarcastic
🌊 Philistia was Israel's coastal enemy
📢 Pictures them forced to cry out
📖 Submission dressed up as command

# Psalms 60:9-12
# 🛡️ Trusting God Over Human Strength
---
## Who Will Bring Me Into The Strong City

The strong city likely refers to Petra or Bozrah, Edom's capital.

Edom's cities were built high into steep, rocky mountains.

That made them some of the hardest cities in the region to capture.

David is asking who can accomplish what feels nearly impossible.

🏔️ Likely refers to Edom's mountain capital
🪨 Edom's cities were carved into rock
🛡️ Some of the hardest cities to capture
📖 David asks who can do the impossible

## Who Will Lead Me Into Edom

This question repeats the one just before it, almost word for word.

Hebrew poetry often restates an idea with slightly different words.

The repetition makes the challenge feel even heavier.

No human answer to that question has come yet.

🔁 Repeats the question just asked
🎵 Hebrew poetry often restates ideas
⚖️ Repetition makes the challenge heavier
📖 No human answer has come yet

## Wilt Not Thou, O God, Which Hadst Cast Us Off

This line returns to the exact complaint from the opening verse.

David does not hide from that pain.

He returns to face it directly instead.

Facing hard questions honestly is part of real prayer.

The Psalm does not skip past discomfort to reach hope.

🔗 Returns to the complaint from verse one
🗣️ David does not hide from the pain
🙏 Honest questions are part of real prayer
📖 The Psalm does not skip past discomfort

## Thou, O God, Which Didst Not Go Out With Our Armies

This names the hardest part of the prayer honestly.

It feels like God was absent from that battle.

David is not accusing God of failing to exist.

He is naming a painful feeling, not a theological claim.

Real faith can hold both the feeling and the trust together.

😞 Names the feeling of God's absence
🙅 Not an accusation that God failed
💔 God seemed far away that day
📖 Faith can hold pain and trust together

## Give Us Help From Trouble

The request turns simple and direct after all the heavy imagery before it.

David stops describing the pain and starts asking plainly for help.

Sometimes the most honest prayer is also the shortest one.

This line is easy to pray in the middle of real trouble.

🙏 The request turns simple and direct
🗣️ David stops describing and starts asking
✂️ The shortest prayers are often the most honest
📖 Easy to pray in real trouble

## Vain Is The Help Of Man

Vain means empty or useless, not simply small.

David is not saying people can never help at all.

He is saying human strength alone can never win this fight.

Only God's help reaches far enough to actually save them.

🕳️ Vain means empty or useless
🙅 Not saying people can never help
⚔️ Human strength alone cannot win this
📖 Only God's help reaches far enough

## Through God We Shall Do Valiantly

Valiantly means with real courage and strength in battle.

The confidence here is not in Israel's own army.

It rests completely on what God will do through them.

The Psalm's fear has turned into settled trust by this point.

🦁 Valiantly means courage and strength
🚫 Not confidence in Israel's own army
🙏 Confidence rests on what God will do
📖 Fear has turned into settled trust

## He It Is That Shall Tread Down Our Enemies

Tread down pictures crushing something completely underfoot.

The Psalm began with Israel scattered and defeated.

It ends with God pictured as the one who wins the battle.

The nation's fear becomes confidence because the victory belongs to God, not to them.

👣 Tread down pictures crushing underfoot
😔 The Psalm began with Israel scattered
🏆 It ends with God winning the battle
📖 The victory belongs to God, not them
`.trim();

export const PSALMS_SIXTY_PERSONAL_SECTIONS = parsePsalmsSixtyRawNotes(PSALMS_SIXTY_RAW_NOTES);
