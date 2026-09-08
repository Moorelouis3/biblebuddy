export type PsalmsFiftyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyThreeRawNotes(rawText: string): PsalmsFiftyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+53:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 53 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+53:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+53:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 53 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 53,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 53:${startVerse}` : `Psalms 53:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 53 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_THREE_RAW_NOTES = `# Psalms 53:1-3
# 🙄 The Fool's Denial
---
## 🙄 The Fool Hath Said In His Heart, There Is No God

"Fool" here does not describe someone lacking intelligence.

The Hebrew word behind it is "nabal," someone living as if God does not exist.

This fool has made a moral choice, not reached an intellectual conclusion.

He has not run out of arguments for God's existence.

He has simply decided to live as though God will never call him to account.

🙄 Fool means morally reckless, not unintelligent

🧠 Nabal describes willful rejection of God

⚖️ This is a moral choice, not doubt

📖 The fool lives as if unaccountable to God

## Corrupt Are They, And Have Done Abominable Iniquity

"Corrupt" here means morally rotten all the way through, not just flawed in one area.

"Abominable" describes something God finds deeply disgusting, not merely wrong.

This is some of the strongest language the Bible uses for sin.

The verse is not describing one bad decision.

It is describing a whole life bent away from God.

🤢 Corrupt means rotten all the way through

😡 Abominable means deeply disgusting to God

🌀 This describes a whole life, not one act

📖 Sin here runs deeper than a single choice

## God Looked Down From Heaven Upon The Children Of Men

This picture of God looking down appears elsewhere in the Bible at key moments.

Genesis uses almost the same language right before the flood.

God is not searching for information He lacks.

The picture shows God personally examining the human race, not ignoring it from a distance.

When this phrase appears, judgment is usually close behind.

👀 God looking down echoes the flood story

🌊 Genesis uses this same picture before judging

🔍 God is not searching for missing information

📖 This phrase often signals judgment is near

## There Is None That Doeth Good, No, Not One

This exact line gets repeated by the apostle Paul centuries later.

Romans chapter three quotes it to prove that every person needs God's mercy.

The doubling, "no, not one," removes any possible exception.

Nobody gets to claim they are the one good person left.

The whole human race stands in the same condition.

🔁 Paul quotes this line in Romans three

⚖️ It proves everyone needs God's mercy

🚫 No, not one removes every exception

📖 The whole human race shares this condition

# Psalms 53:4-6
# ⚔️ Judgment And A Cry For Rescue
---
## Have The Workers Of Iniquity No Knowledge

This question is not really asking for information.

It is a rhetorical way of expressing shock at how blind these people seem.

"Workers of iniquity" describes people who practice evil as a habit, not a single failure.

They act as though their choices carry no consequences.

Their blindness does not make God any less real.

❓ A rhetorical question, not a real one

😲 It expresses shock at their blindness

🔁 Workers of iniquity describes habitual evil

📖 Their actions carry consequences they ignore

## Who Eat Up My People As They Eat Bread

This is a vivid idiom, not a description of actual cannibalism.

Eating bread was the most common, everyday act in that culture.

Comparing the harm done to God's people with eating bread shows it happened constantly and without a second thought.

The wicked took advantage of others as easily and as often as they ate a meal.

Casual cruelty can become as routine as eating.

🍞 Eating bread was the most everyday act

😈 Exploiting God's people became just as routine

🔁 This idiom means constant, thoughtless harm

📖 Cruelty can become as casual as eating

## There Were They In Great Fear, Where No Fear Was

Psalm fifty three closely repeats Psalm fourteen almost word for word.

This verse is the clearest place the two psalms actually differ.

"Great fear where no fear was" pictures sudden panic with no real threat present.

Guilt can invent danger that is not actually there.

The fear described here comes from a conscience, not from an enemy.

😨 Fear appears though no threat is real

📜 This verse differs most from Psalm fourteen

🧠 Guilt can invent danger that is not real

📖 A guilty conscience creates its own fear

## God Hath Scattered The Bones Of Him That Encampeth Against Thee

"Encampeth against thee" pictures an army camped for battle, not a private enemy.

Scattered bones describes a defeated army left unburied on the battlefield.

Leaving bodies unburied was considered a severe public disgrace in that culture.

This line is far more specific than anything found in Psalm fourteen.

Many scholars believe this psalm was adapted for one particular national deliverance.

💀 Scattered bones means a defeated, unburied army

⚔️ Encampeth against thee pictures a real battle

😳 Unburied bodies were a severe public disgrace

📖 This likely marks one specific deliverance

## Thou Hast Put Them To Shame, Because God Hath Despised Them

Shame here is not just embarrassment.

It describes total public disgrace in front of everyone who once feared them.

Their downfall did not happen by accident.

God actively despised them because of who they became.

Their own choices brought them to this exact end.

😳 Shame here means total public disgrace

👎 God actively despised their choices

💥 Their downfall was not an accident

📖 Their choices brought their own end

## Oh That The Salvation Of Israel Were Come Out Of Zion

"Zion" refers to Jerusalem, specifically the hill where the temple stood.

This is a longing cry, not a calm statement of fact.

The psalmist wants God's rescue to come from His own dwelling place among His people.

Salvation here means national deliverance from real enemies, not only spiritual rescue.

The place God's rescue comes from matters as much as the rescue itself.

🏔️ Zion means Jerusalem, where the temple stood

😢 This is a longing cry, not a fact

🛡️ Salvation here means national deliverance

📖 Rescue comes from where God dwells

## When God Bringeth Back The Captivity Of His People, Jacob Shall Rejoice

"Bringeth back the captivity" is a common Old Testament idiom.

It means restoring what was lost, not always a literal return from exile.

"Jacob" here is another name for the whole nation of Israel.

The psalm ends by turning that earlier corruption into a picture of future joy.

What began with a fool denying God ends with a nation set free.

🎉 Restoring what was lost, not just exile

📛 Jacob is another name for Israel

🔁 The psalm turns corruption into future joy

📖 It ends where it began, but redeemed
`.trim();

export const PSALMS_FIFTY_THREE_PERSONAL_SECTIONS = parsePsalmsFiftyThreeRawNotes(PSALMS_FIFTY_THREE_RAW_NOTES);
