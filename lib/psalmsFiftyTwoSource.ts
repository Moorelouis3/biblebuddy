export type PsalmsFiftyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyTwoRawNotes(rawText: string): PsalmsFiftyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+52:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 52 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+52:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+52:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 52 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 52,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 52:${startVerse}` : `Psalms 52:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 52 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_TWO_RAW_NOTES = `# Psalms 52:1-4
# 🗡️ Doeg's Deceitful Boasting
---
## 🗡️ Why Boastest Thou Thyself In Mischief

The mighty man here refers to Doeg the Edomite, not to David's enemies in general.

Doeg served as Saul's chief herdsman, not as a soldier.

He told Saul that the priest Ahimelech had helped David escape.

That single report led to the death of eighty five priests in one day.

"Mischief" in this old use means deliberate harm, not a small prank.

Doeg is boasting about causing that harm.

🗡️ Mighty man refers to Doeg the Edomite

👑 Doeg served as Saul's chief herdsman

⚔️ His report caused the priests' deaths

📖 Mischief means deliberate cruelty here

## 💛 The Goodness Of God Endureth Continually

God's goodness does not shrink because of what Doeg does.

David places that goodness right next to Doeg's cruelty in the very same verse.

"Continually" means without any interruption, not just most of the time.

Evil can be loud for a season.

God's goodness never actually stops.

⚖️ God's goodness sits beside Doeg's cruelty

🕊️ Evil could not stop God's goodness

⏳ Continually means without any interruption

📖 Loud evil is still only temporary

## 🔪 Thy Tongue Deviseth Mischiefs

"Deviseth" means to plan something out on purpose.

Doeg's harmful words were not a careless slip of the tongue.

He thought through exactly what to say to Saul before he said it.

The next line compares that planning to a blade being sharpened.

Careful cruelty does more damage than a careless remark.

🧠 Deviseth means planning something on purpose

🗣️ Doeg planned his cruel words

🔪 Planning compares to sharpening a blade

📖 Careful cruelty cuts deeper than carelessness

## 🪒 Like A Sharp Razor, Working Deceitfully

A tongue can be a weapon disguised as ordinary speech.

Think of a razor sitting closed on a shelf.

It looks harmless until it opens and cuts skin.

Doeg's words worked the same way.

They sounded smooth on the surface.

Underneath, they were built to wound.

🪒 A razor looks harmless until it cuts

🗣️ Doeg's words sounded smooth on the surface

🩹 Smooth words can still wound deeply

📖 A weapon can be disguised as speech

## 🔥 Thou Lovest All Devouring Words

"Devouring" means words meant to consume or destroy something completely.

Doeg was not simply careless with his speech.

He genuinely preferred words that would ruin people.

That preference led to Ahimelech's death and the death of the other priests.

A person can love destruction the same way others love kindness.

🔥 Devouring means words meant to destroy

😈 Doeg preferred ruin over kindness

⚰️ This preference led to Ahimelech's death

📖 People can love destruction like kindness

# Psalms 52:5-7
# ⚖️ God's Verdict On The Deceiver
---
## 💥 God Shall Likewise Destroy Thee For Ever

"Likewise" ties God's coming judgment to what Doeg did to others.

Doeg tried to destroy Ahimelech's household through a false report.

Now that same kind of destruction turns back on him.

"For ever" means this is not a temporary setback.

It is a complete and lasting end.

💥 Likewise ties judgment to Doeg's own actions

🔁 Doeg tried to destroy another household first

⚖️ Destruction now turns back on him

📖 For ever means a lasting complete end

## 🌪️ Pluck Thee Out Of Thy Dwelling Place

"Pluck out" is the same picture used for pulling up a plant by its roots.

A "dwelling place" is more than a house.

It includes a person's whole settled life and standing among others.

Doeg is pictured being torn out of that entire life at once.

Nothing about his position will be left standing.

🌱 Pluck out pictures pulling up a plant

🏠 Dwelling place means a settled life

🌪️ Doeg is torn from that whole life

📖 Nothing of his position remains standing

## ⚰️ Root Thee Out Of The Land Of The Living

"Land of the living" is an old idiom for life on this earth.

To be rooted out of it means death, not exile.

This line repeats the uprooting picture from the verse just before it.

Hebrew poetry often restates one idea twice for weight.

The judgment against Doeg could not be more final.

🌍 Land of the living means life on earth

⚰️ Rooted out here means death, not exile

🔁 This repeats the uprooting picture again

📖 The judgment against Doeg is final

## 😄 The Righteous Also Shall See, And Fear

"The righteous" here means the people who watched this whole conflict unfold.

"Fear" here is not terror.

It is reverence at seeing God act in real time.

That reverence quickly turns into something else in the same verse.

Watching justice happen teaches onlookers as much as it punishes the guilty.

👥 Righteous means the people who watched it

😮 Fear here means reverence toward God

😄 Reverence turns into laughter in this verse

📖 Justice teaches onlookers as it judges

## 💰 Trusted In The Abundance Of His Riches

This does not mean wealth itself is the problem here.

Doeg's failure was putting his trust in that wealth instead of in God.

He made not God his strength is the phrase right before this one.

"Strength" here means the source a person actually leans on.

Doeg leaned on money instead.

💰 Wealth itself is not the problem

🙅 Doeg trusted riches instead of God

🦴 Strength means what a person leans on

📖 Doeg leaned on money instead of God

# Psalms 52:8-9
# 🌳 Planted In The House Of God
---
## 🫒 I Am Like A Green Olive Tree In The House Of God

David pictures stability here, not destruction.

An olive tree can live and bear fruit for centuries.

David is planted, not pulled up like Doeg was in the verse before.

The "house of God" means the tabernacle grounds, a place of lasting shelter.

Stability, not wealth, is what actually keeps a person secure.

🫒 Olive trees live and bear fruit long

🌳 David is planted, Doeg was uprooted

🏛️ The house of God means lasting shelter

📖 Stability comes from God, not wealth

## 💞 I Trust In The Mercy Of God For Ever And Ever

Doeg trusted the abundance of his riches back in verse seven.

David deliberately uses the opposite word here, mercy.

"Mercy" means kindness a person has not earned.

Riches can run out or be stolen.

Mercy never runs out because it was never based on merit.

💰 Doeg trusted riches back in verse seven

💞 David trusts mercy instead of riches

🎁 Mercy means kindness that is not earned

📖 Mercy cannot run out like riches can

## 🗣️ I Will Wait On Thy Name

To "wait on thy name" here means to rely on it publicly, not privately.

David is not simply hoping something happens someday.

He is committing to keep relying on God out loud, in front of others.

This is a public declaration, not a private feeling.

⏳ Wait on thy name means public reliance

🗣️ David commits to this out loud

🙅 This is not a private feeling

📖 Trust in God is meant to be shown

## 🙌 It Is Good Before Thy Saints

"Saints" here means the whole community of people who worship God together.

David does not plan to praise God only in private.

He wants that trust to be seen and shared among others who believe.

Doeg used words to destroy a whole community of priests.

David uses words to build up a whole community of believers.

👥 Saints means the whole worshiping community

👀 David's trust is meant to be seen

⚔️ Doeg's words destroyed a community of priests

📖 David's words build up a community instead
`.trim();

export const PSALMS_FIFTY_TWO_PERSONAL_SECTIONS = parsePsalmsFiftyTwoRawNotes(PSALMS_FIFTY_TWO_RAW_NOTES);
